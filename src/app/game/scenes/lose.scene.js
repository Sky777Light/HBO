import {BaseScene} from "./base.scene";

export class LoseScene extends BaseScene {
    constructor(game, radius){
        super(game.textures[6], radius, game);
        this.scene.name = "Lose";
        this.audioSrc = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';

    //restart btn
        this.restartBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(70, 17, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        );
        this.restartBtn.name = 'Restart Btn';
        this.restartBtn.position.set(-260, 51.5, 23);
        this.restartBtn.rotation.y = 1.87;
        this.restartBtn.rotation.z = 0.04;
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
        this.Video.position.set(-200, -30, -15);
        this.Video.rotation.y = 1.46;
        this.Video.eventFlag = true;

        this.scene.add(this.Video);


        //video btn
        this.videoBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(70, 17, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        );
        this.videoBtn.name = 'Video Btn';
        this.videoBtn.position.set(-260, 52, -62);
        this.videoBtn.rotation.y = 1.32;
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