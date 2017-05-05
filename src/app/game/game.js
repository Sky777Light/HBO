import {Renderer} from './renderer';
import {CityScene} from "./scenes/city.scene";
import {MetroScene} from "./scenes/metro.scene";
import {BarScene} from "./scenes/bar.scene";
import {WinScene} from "./scenes/win.scene";
import {LoseScene} from "./scenes/lose.scene";

export class Game {
    constructor(textures, video, sceneAudio, bgAudio) {
        this.textures = textures;
        this.scenes = {};
        this.renderer = new Renderer('.game');
        this.state = "City";
        this.sceneVideo = video;
        this.sceneVideo.onended = ()=>{
            this.sceneVideo.currentTime = 0;
            this.sceneVideo.pause();
        };

        this.sceneAudio = sceneAudio;
        this.bgAudio = bgAudio;

        this.config();
    }


    config() {
        //Crosshair
        this.crosshair = Reticulum.init(this.renderer.camera, {
            proximity: false,
            clickevents: true,
            near: null,
            far: null,
            reticle: {
                visible: true,
                restPoint: 1,
                color: 0x00ffff,
                innerRadius: 0.01,
                outerRadius: 0.02,
                hover: {
                    innerRadius: 0.01,
                    outerRadius: 0.02,
                    speed: 5,
                    vibrate: 50
                }
            },
            fuse: {
                visible: true,
                duration: 1,
                color: 0xff0000
            }
        });

        // Light
        this.light = {};
        this.light.directional1 = new THREE.DirectionalLight(0xe1e1e1, 1.0);
        this.light.directional1.name = 'Directional Light';
        this.light.directional1.position.set(1, 1, 1).multiplyScalar(100);

        this.light.directional2 = new THREE.DirectionalLight(0xe1e1e1, 1.0);
        this.light.directional2.name = 'Directional Light';
        this.light.directional2.position.set(1, 1, -1).multiplyScalar(100);

        this.light.directional3 = new THREE.DirectionalLight(0xe1e1e1, 1.0);
        this.light.directional3.name = 'Directional Light';
        this.light.directional3.position.set(-1, 1, 1).multiplyScalar(100);

        this.light.directional4 = new THREE.DirectionalLight(0xe1e1e1, 1.0);
        this.light.directional4.name = 'Directional Light';
        this.light.directional4.position.set(-1, 1, -1).multiplyScalar(100);

        this.renderer.scene.add(this.light.directional1);
        this.renderer.scene.add(this.light.directional2);
        this.renderer.scene.add(this.light.directional3);
        this.renderer.scene.add(this.light.directional4);

        this.start();
    }

    start() {
        this.scenes.City = new CityScene(this, 1000);
        this.scenes.Metro = new MetroScene(this, 1010);
        this.scenes.Bar = new BarScene(this, 1020);
        this.scenes.Win = new WinScene(this, 1030);
        this.scenes.Lose = new LoseScene(this, 1040);

        for(let i in this.scenes){
            this.renderer.scene.add(this.scenes[i].scene);
        }
    }
    
    gameLose(){
        for(let i in this.scenes){
            if((this.scenes[i] != this.scenes[this.state]) && (this.scenes[i] != this.scenes.Lose)){
                this.scenes[i].scene.visible = false;
            }
        }
        this.scenes.City.transition(this.scenes[this.state], this.scenes.Lose, true);
    }
}
