import async from 'async';

import {Renderer} from './renderer';
import {CityScene} from "./scenes/city.scene";
import {MetroScene} from "./scenes/metro.scene";
import {BarScene} from "./scenes/bar.scene";

export class Game {
    constructor() {
        this.renderer = new Renderer('.game');
        this.sceneVideo = document.getElementById('video');
        this.config();
        this.start();


        this.before([
            this.load
        ], () => {
            this.listener();
        });

    }

    before(funcs, done) {
        async.eachSeries(funcs, (func, next) => {
            func.call(this, next);
        }, (err) => {
            done.call(this, err);
        });
    }

    config() {
        // Renderer basic config (light, camera, etc), creating basic object
        // this.renderer.camera.position.set(0, 0, -100);
        
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
    }

    start() {

        this.scenes = {};
        this.scenes.City = new CityScene('./assets/img/game/city.jpg', 1000);
        this.scenes.Metro = new MetroScene('./assets/img/game/metro.jpg', 1010);
        this.scenes.Bar = new BarScene('./assets/img/game/bar.jpg', 1020);

        for(let i in this.scenes){
            this.scenes[i].scenes = this.scenes;
            this.renderer.scene.add(this.scenes[i].scene);
        }

    }

    load(done) {
        // load object
        done();
    }

    listener() {
        // event listeners
        // this.renderer.on('mousemove', (event) => {
        //     this.renderer.raycaster.hit(event, this.sphere, (intersects) => {
        //         // console.log(intersects);
        //     });
        // });
    }
    
}
