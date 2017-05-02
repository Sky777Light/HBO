import {BaseScene} from "./base.scene";

export class MetroScene extends BaseScene {
    constructor(image, radius){
        super(image, radius);
        this.scene.name = "Metro Scene";
        //city
        this.cityDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(50, 100, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        this.cityDoor.name = 'City Door';
        this.cityDoor.position.set(0, 30, -450);
        this.cityDoor.visible = false;
        this.cityDoor.material.transparent = true;
        this.cityDoor.material.opacity = 0.1;

        Reticulum.add( this.cityDoor, {
            onGazeLong: () =>{
                this.transition(this.scenes.Metro, this.scenes.City, false);
            }
        });

        this.scene.add(this.cityDoor);


        //metro video

        this.metroVideo = new THREE.Mesh(
            new THREE.PlaneGeometry(160, 90, 1, 1),
            new THREE.MeshPhongMaterial({ map: this.videoTexture, side: THREE.DoubleSide })
        );
        this.metroVideo.visible = false;
        this.metroVideo.name = 'Metro Video';
        this.metroVideo.position.set(175, 7, 0);
        this.metroVideo.rotation.y = 1.57;
        this.metroVideo.eventFlag = true;

        this.videoBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff00ff, side: THREE.DoubleSide })
        );
        this.videoBtn.position.y = -50;
        Reticulum.add( this.videoBtn, {
            onGazeLong: () =>{
                this.metroDiary.visible = true;

                this.videoBtn.visible = false;
                this.metroVideo.visible = false;
                this.sceneVideo.pause();
                this.sceneVideo.children[0].src = null;
                this.sceneVideo.currentTime = 0;
            }
        });

        this.metroVideo.add(this.videoBtn);
        this.scene.add(this.metroVideo);


        //metro diary

        this.metroDiary = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 7, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide })
        );

        this.metroDiary.name = 'Metro Diary';
        this.metroDiary.position.set(53, -25, 8);
        this.metroDiary.rotation.y = 0.4;
        this.metroDiary.rotation.x = 1.3;
        this.metroDiary.rotation.z = -0.9;
        this.metroDiary.visible = false;
        this.metroDiary.material.transparent = true;
        this.metroDiary.material.opacity = 0.1;

        Reticulum.add( this.metroDiary, {
            onGazeLong: () =>{
                this.metroDiary.visible = false;

                this.scenes.City.barOpened = true;

                this.metroVideo.visible = true;
                this.videoBtn.visible = true;

                this.videoPlay('./assets/video/metro.mp4');
            }
        });

        this.scene.add(this.metroDiary);
    }

}