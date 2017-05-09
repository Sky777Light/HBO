import {BaseScene} from "./base.scene";

export class LoseScene extends BaseScene {
    constructor(game, radius){
        super(null, radius, game);
        this.scene.name = "Lose";
        this.audioSrc = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';

    //final scene
        this.finalScene = new THREE.Mesh(
            new THREE.PlaneGeometry(1067, 600, 1, 1),
            new THREE.MeshBasicMaterial({  map: this.game.textures[6], side: THREE.DoubleSide })
        );
        this.finalScene.name = 'Final Scene';
        this.finalScene.position.set(-200, 0, -100);
        this.finalScene.rotation.y = 0.95;
        this.finalScene.visible = false;
        this.scene.add(this.finalScene);


    //restart btn
        this.restartBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 9, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        );
        this.restartBtn.name = 'Restart Btn';
        this.restartBtn.position.set(-190, 33.6, -79);
        this.restartBtn.rotation.y = 0.95;
        this.restartBtn.visible = false;
        this.restartBtn.material.transparent = true;
        this.restartBtn.material.opacity = 0.001;
        Reticulum.add( this.restartBtn, {
            onGazeLong: () =>{
                this.restartGame();
            }
        });
        this.scene.add(this.restartBtn);

        //lose video
        this.Video = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 112.5, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.game.textures[0], side: THREE.DoubleSide })
        );
        this.Video.visible = false;
        this.Video.name = 'Lose Video';
        this.Video.position.set(-130, -40, -70);
        this.Video.rotation.y = 1;
        this.Video.eventFlag = true;

        this.scene.add(this.Video);


        //video btn
        this.videoBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(40, 9, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        );
        this.videoBtn.name = 'Video Btn';
        this.videoBtn.position.set(-160, 33.2, -120);
        this.videoBtn.rotation.y = 0.98;
        this.videoBtn.visible = false;
        this.videoBtn.material.transparent = true;
        this.videoBtn.material.opacity = 0.001;
        Reticulum.add( this.videoBtn, {
            onGazeLong: () =>{
                this.videoPlay('./assets/video/trailer.mp4');
            }
        });
        this.scene.add(this.videoBtn);
    }

}