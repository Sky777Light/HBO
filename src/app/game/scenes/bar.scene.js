import {BaseScene} from "./base.scene";

export class BarScene extends BaseScene {
    constructor(image, radius){
        super(image, radius);
        this.scene.name = "Bar Scene";
        //city
        this.cityDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(135, 155, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        this.cityDoor.name = 'City Door';
        this.cityDoor.position.set(-165, -65, 450);
        this.cityDoor.visible = false;

        Reticulum.add( this.cityDoor, {
            onGazeLong: () =>{
                this.transition(this.scenes.Bar, this.scenes.City, false);
            }
        });

        this.scene.add(this.cityDoor);


        //bar video

        this.barVideo = new THREE.Mesh(
            new THREE.PlaneGeometry(160, 90, 1, 1),
            new THREE.MeshPhongMaterial({ map: new THREE.VideoTexture( this.sceneVideo ), side: THREE.DoubleSide })
        );
        this.barVideo.visible = false;
        this.barVideo.name = 'Bar Video';
        this.barVideo.position.set(30, 22, 240);
        this.barVideo.eventFlag = true;

        this.videoBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 10, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff00ff, side: THREE.DoubleSide })
        );
        this.videoBtn.position.y = -50;
        Reticulum.add( this.videoBtn, {
            onGazeLong: () =>{
                this.videoBtn.visible = false;
                this.barVideo.visible = false;
                this.sceneVideo.currentTime = 0;
                this.sceneVideo.pause();
            }
        });

        this.barVideo.add(this.videoBtn);
        this.scene.add(this.barVideo);


        //bar element

        this.barElement = new THREE.Mesh(
            new THREE.PlaneGeometry(8, 6, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide })
        );

        this.barElement.name = 'Bar Element';
        this.barElement.position.set(15, -21, 100);
        this.barElement.visible = false;

        Reticulum.add( this.barElement, {
            onGazeLong: () =>{
                this.scenes.Bar.passFound = true;
                this.barVideo.visible = true;
                this.videoBtn.visible = true;
                this.sceneVideo.children[0].src = './assets/video/m.mp4';
                this.sceneVideo.load();
                this.sceneVideo.currentTime = 0;
                this.sceneVideo.play();
            }
        });

        this.scene.add(this.barElement);

    }
}