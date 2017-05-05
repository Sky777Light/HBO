import * as TWEEN from '../tween';

export class BaseScene {
    constructor(texture, radius, game){

        let cityGeo = new THREE.SphereBufferGeometry(radius, 64, 64);
        cityGeo.dynamic = true;
        cityGeo.verticesNeedUpdate = true;
        cityGeo.scale(-1, 1, 1);
        let cityMat = new THREE.MeshBasicMaterial({ map: texture});
        cityMat.needsUpdate = true;
        this.scene = new THREE.Mesh(cityGeo, cityMat);

        this.game = game;
    }

    transition(hideObj, showObj, moveForward) {
        let self = this;
        this.audioPause();
        this.videoPause();
        hideObj.hideCtrl();
        this.game.state = showObj.scene.name;
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
            .onComplete( function(){
                showObj.scene.material.transparent = false;
                hideObj.scene.material.transparent = false;
                hideObj.scene.material.visible = false;
                hideObj.scene.material.opacity = 1;
                TWEEN.Tween.remove(tween);
                showObj.showCtrl();
                self.audioPlay(showObj.audioSrc);
            })
            .start();
    }

    hideCtrl(){
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
    
    videoPlay(src){
        this.game.sceneVideo.children[0].src = src;
        this.game.sceneVideo.currentTime = 0;
        this.game.sceneVideo.load();
        this.game.sceneVideo.oncanplay = ()=>{
            this.videoBtn.visible = false;
            this.Video.visible = true;
            this.game.sceneVideo.oncanplay = null;
        };

        this.game.sceneVideo.onended = () => {
            this.game.sceneVideo.currentTime = 0;
            this.game.sceneVideo.pause();
            if(this.Video){
                this.videoBtn.visible = true;
                this.Video.visible = false;
            }
        };

        this.game.sceneVideo.play();
    }

    videoPause(){
        this.game.sceneVideo.children[0].src = null;
        this.game.sceneVideo.currentTime = 0;
        this.game.sceneVideo.pause();
    }

    audioPause(){
        this.game.sceneAudio.currentTime = 0;
        this.game.sceneAudio.pause();
    }
    
    audioPlay(src){
        this.game.sceneAudio.currentTime = 0;
        this.game.sceneAudio.children[0].src = src;
        this.game.sceneAudio.load();
        this.game.sceneAudio.play();
    }

    restartGame(){
        this.game.timer.start();
        this.game.scenes.City.barOpened = false;
        this.game.scenes.Bar.finishGame = false;
        this.game.scenes.Bar.password = '';
        this.game.scenes.City.scene.material.map = this.game.textures[1];
        this.videoPause();
        this.transition(this, this.game.scenes.City, false);
    }
}