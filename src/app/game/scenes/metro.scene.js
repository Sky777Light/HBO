import {BaseScene} from "./base.scene";

export class MetroScene extends BaseScene {
    constructor(game, radius){
        super(game.textures[3], radius, game);
        this.scene.name = "Metro";
        this.audioSrc = './assets/audio/metro.mp3';
        
        
    //city
        this.cityDoor1 = new THREE.Mesh(
            new THREE.PlaneGeometry(72, 28, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );
        this.cityDoor1.name = 'City Door1';
        this.cityDoor1.position.set(-12, 12, -450);
        this.cityDoor1.visible = false;
        this.cityDoor1.material.transparent = true;
        this.cityDoor1.material.opacity = 0.001;
        Reticulum.add( this.cityDoor1, {
            onGazeLong: () =>{
                this.transition(this, this.game.scenes.City, false);
            }
        });
        this.scene.add(this.cityDoor1);


        this.cityDoor2 = new THREE.Mesh(
            new THREE.PlaneGeometry(38, 14, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );
        this.cityDoor2.name = 'City Door2';
        this.cityDoor2.position.set(-18, 8, 450);
        this.cityDoor2.visible = false;
        this.cityDoor2.material.transparent = true;
        this.cityDoor2.material.opacity = 0.001;
        Reticulum.add( this.cityDoor2, {
            onGazeLong: () =>{
                this.transition(this, this.game.scenes.City, false);
            }
        });
        this.scene.add(this.cityDoor2);

    //metro video
        this.Video = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 112.5, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.game.textures[0], side: THREE.DoubleSide })
        );
        this.Video.visible = false;
        this.Video.name = 'Metro Video';
        this.Video.position.set(200, 7, 25);
        this.Video.rotation.y = -1.57;
        this.Video.eventFlag = true;

        this.scene.add(this.Video);


    //metro diary
        this.videoBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 7, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffffff, side: THREE.DoubleSide })
        );
        this.videoBtn.name = 'Metro Diary';
        this.videoBtn.position.set(54.56, -24.42, 9.38);
        this.videoBtn.rotation.y = 0.12;
        this.videoBtn.rotation.x = 1.3;
        this.videoBtn.rotation.z = -1;
        this.videoBtn.visible = false;
        this.videoBtn.material.transparent = true;
        this.videoBtn.material.opacity = 0.001;
        Reticulum.add( this.videoBtn, {
            onGazeLong: () =>{
                this.videoPlay('./assets/video/metro.mp4');
                this.game.scenes.City.barOpened = true;
                this.game.scenes.City.scene.material.map = this.game.textures[2];
                this.game.scenes.City.scene.material.needsUpdate = true;
            }
        });
        this.scene.add(this.videoBtn);
    }

}