import {BaseScene} from "./base.scene";

export class BarScene extends BaseScene {
    constructor(image, radius){
        super(image, radius);
        this.scene.name = "Bar Scene";
        
        //city door
        this.cityDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(127, 152, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        this.cityDoor.name = 'City Door';
        this.cityDoor.position.set(-160, -55, 450);
        this.cityDoor.visible = false;
        this.cityDoor.material.transparent = true;
        this.cityDoor.material.opacity = 0.1;

        Reticulum.add( this.cityDoor, {
            onGazeLong: () =>{
                this.transition(this.scenes.Bar, this.scenes.City, false);
            }
        });

        this.scene.add(this.cityDoor);


        //bar video

        this.barVideo = new THREE.Mesh(
            new THREE.PlaneGeometry(160, 90, 1, 1),
            new THREE.MeshPhongMaterial({ map: this.videoTexture, side: THREE.DoubleSide })
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
                this.barElement.visible = true;

                this.videoBtn.visible = false;
                this.barVideo.visible = false;
                this.sceneVideo.pause();
                this.sceneVideo.children[0].src = null;
                this.sceneVideo.currentTime = 0;
            }
        });

        this.barVideo.add(this.videoBtn);
        this.scene.add(this.barVideo);


        //bar element

        this.barElement = new THREE.Mesh(
            new THREE.PlaneGeometry(12, 4, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide })
        );

        this.barElement.name = 'Bar Element';
        this.barElement.position.set(15, -19, 100);
        this.barElement.visible = false;
        this.barElement.material.transparent = true;
        this.barElement.material.opacity = 0.1;

        Reticulum.add( this.barElement, {
            onGazeLong: () =>{
                this.barElement.visible = false;

                this.scenes.Bar.passFound = true;

                this.barVideo.visible = true;
                this.videoBtn.visible = true;

                this.videoPlay('./assets/video/m.mp4');

            }
        });

        this.scene.add(this.barElement);

        //lock door

        this.lockDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 6, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        this.lockDoor.name = 'Lock Door';
        this.lockDoor.position.set(-62, -19, -100);
        this.lockDoor.visible = false;
        this.lockDoor.material.transparent = true;
        this.lockDoor.material.opacity = 0.1;

        Reticulum.add( this.lockDoor, {
            onGazeLong: () =>{
                this.lockDoor.visible = false;
                this.locker.visible = true;
            }
        });

        this.scene.add(this.lockDoor);

        //locker

        this.locker = new THREE.Mesh(
            new THREE.PlaneGeometry(80, 120, 1, 1),
            new THREE.MeshPhongMaterial({ map: TextureLoader.load(image), side: THREE.DoubleSide })
        );

        this.locker.name = 'Locker';
        this.locker.position.set(-62, -19, -100);
        this.locker.rotation.y = 0.6;
        this.locker.visible = false;


        for(let i = 0; i < 10; i++){
            let num = new THREE.Mesh(
                new THREE.PlaneGeometry(20, 20, 1, 1),
                new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
            );

            num.position.set(-62, -19, -100);
            this.locker.add(num);
        }



        this.scene.add(this.locker);


    }
}