import {TextureLoader} from "../textureLoader";
import $ from "jquery";
import * as TWEEN from '../tween';

export class BaseScene {
    constructor(image, radius){
        let cityGeo = new THREE.SphereBufferGeometry(radius, 32, 32);
        cityGeo.dynamic = true;
        cityGeo.verticesNeedUpdate = true;
        cityGeo.scale(-1, 1, 1);
        let cityMat = new THREE.MeshBasicMaterial({ map: TextureLoader.load(image)});
        cityMat.needsUpdate = true;
        this.scene = new THREE.Mesh(cityGeo, cityMat);
        this.scene.material.transparent = false;
        this.scene.material.visible = false;

        this.sceneVideo = $('#video')[0];
    }

    transition(hideObj, showObj, moveForward) {
        this.sceneVideo.currentTime = 0;
        this.sceneVideo.pause();
        hideObj.hideCtrl();

        showObj.scene.material.visible = true;

        showObj.scene.material.opacity = moveForward ? 1 : 0;
        hideObj.scene.material.opacity = 1;

        hideObj.scene.material.transparent = moveForward ? true : false;
        showObj.scene.material.transparent = moveForward ? false : true;

        let opacity = { percentage : moveForward ? 1 : 0 };
        let tween = new TWEEN.Tween( opacity )
            .to( { percentage : moveForward ? 0 : 1 }, 1000 )
            .onUpdate( function(){
                if(moveForward){
                    hideObj.scene.material.opacity = this.percentage;
                }else {
                    showObj.scene.material.opacity = this.percentage;
                }
            } )
            .onComplete(function(){
                showObj.scene.material.transparent = false;
                hideObj.scene.material.transparent = false;
                hideObj.scene.material.visible = false;
                hideObj.scene.material.opacity = 1;
                TWEEN.Tween.remove(tween);
                showObj.showCtrl();
            })
            .start();
    }

    hideCtrl(){
        if(this.videoBtn){
            this.videoBtn.visible = false;
        }
        for(let i = 0; i < this.scene.children.length; i++){
            this.scene.children[i].visible = false;
        }
    }
    showCtrl(){
        for(let i = 0; i < this.scene.children.length; i++){
            if(!this.scene.children[i].eventFlag){
                this.scene.children[i].visible = true;
            }
        }
    }
}