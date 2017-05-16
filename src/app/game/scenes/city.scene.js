import {BaseScene} from "./base.scene";
import * as TWEEN from '../tween';

export class CityScene extends BaseScene {
    constructor(game, radius){
        super(game.textures[1], radius, game);
        this.scene.name = "City";
        this.barOpened = false;
        this.audioSrc = './assets/audio/city.mp3';
        
    //metro label
        this.metroLabel = new THREE.Mesh(
            new THREE.CircleBufferGeometry(20, 32),
            new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
        );
        this.metroLabel.name = 'Metro Label';
        this.metroLabel.position.set(486, 79.5, -257);
        this.metroLabel.rotation.y = -1.5;
        this.metroLabel.material.transparent = true;
        this.metroLabel.material.opacity = 0.9;
        let self = this;
        new TWEEN.Tween( { opacity : 0.4 } )
            .to( { opacity : 0 }, 200 )
            .repeat( Infinity )
            .yoyo( true )
            .onUpdate( function(){
                self.metroLabel.material.opacity = this.opacity;
            } )
            .start();
        
        this.scene.add(this.metroLabel);

    //metro
        this.metroDoor = new THREE.Mesh(
            new THREE.BoxBufferGeometry(135, 120, 200),
            new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
        );
        this.metroDoor.name = 'Metro Door';
        this.metroDoor.position.set(470, 0, -320);
        this.metroDoor.rotation.y = -Math.PI/2;
        this.metroDoor.material.transparent = true;
        this.metroDoor.material.opacity = 0.001;
        Reticulum.add( this.metroDoor, {
            onGazeLong: () =>{
                this.transition(this, this.game.scenes.Metro, true);
            }
        });
        this.scene.add(this.metroDoor);

        
    //bar
        this.barDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(60, 90, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
        );
        this.barDoor.name = 'Bar Door';
        this.barDoor.position.set(-350, 0, 370);
        this.barDoor.rotation.y = -Math.PI/4;
        this.barDoor.material.transparent = true;
        this.barDoor.material.opacity = 0.001;
        Reticulum.add( this.barDoor, {
            onGazeLong: () =>{
                if(this.barOpened){
                    this.transition(this, this.game.scenes.Bar, true);
                }
            }
        });
        this.scene.add(this.barDoor);

    }

}