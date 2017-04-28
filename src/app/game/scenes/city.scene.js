import {BaseScene} from "./base.scene";

export class CityScene extends BaseScene {
    constructor(image, radius){
        super(image, radius);
        this.scene.name = "City Scene";
        this.scene.material.visible = true;
        //metro
        this.metroDoor = new THREE.Mesh(
            new THREE.BoxBufferGeometry(135, 120, 200),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        this.metroDoor.name = 'Metro Door';
        this.metroDoor.position.set(-320, 0, -470);

        Reticulum.add( this.metroDoor, {
            onGazeLong: () =>{
                this.transition(this.scenes.City, this.scenes.Metro, true);
            }
        });

        this.scene.add(this.metroDoor);

        //bar
        this.barDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(48, 50, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );

        this.barDoor.name = 'Bar Door';
        this.barDoor.position.set(305, -5, 270);
        this.barDoor.rotation.y = 0.4;

        Reticulum.add( this.barDoor, {
            onGazeLong: () =>{
                if(this.barOpened){
                    this.transition(this.scenes.City, this.scenes.Bar, true);
                }
            }
        });

        this.scene.add(this.barDoor);


    }
}