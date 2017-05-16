import {BaseScene} from "./base.scene";

export class BarScene extends BaseScene {
    constructor(game, radius){
        super(game.textures[4], radius, game);
        this.scene.name = "Bar";
        this.audioSrc = './assets/audio/bar.mp3';
        this.password = '';
        this.finishGame = false;
        
    //city door
        this.cityDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(127, 152, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
        );
        this.cityDoor.name = 'City Door';
        this.cityDoor.position.set(-150, -50, 430);
        this.cityDoor.visible = false;
        this.cityDoor.material.transparent = true;
        this.cityDoor.material.opacity = 0.001;
        Reticulum.add( this.cityDoor, {
            onGazeLong: () =>{
                this.disableLocker();
                this.transition(this.game.scenes.Bar, this.game.scenes.City, false);
            }
        });
        this.scene.add(this.cityDoor);


    //bar video
        this.Video = new THREE.Mesh(
            new THREE.PlaneGeometry(160, 90, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.game.textures[0], side: THREE.DoubleSide })
        );
        this.Video.visible = false;
        this.Video.name = 'Bar Video';
        this.Video.position.set(45, 22, 200);
        this.Video.rotation.y = Math.PI;
        this.Video.eventFlag = true;
        this.scene.add(this.Video);


    //bar element
        this.videoBtn = new THREE.Mesh(
            new THREE.PlaneGeometry(15, 4, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
        );
        this.videoBtn.name = 'Bar Element';
        this.videoBtn.position.set(16, -19, 100);
        this.videoBtn.visible = false;
        this.videoBtn.material.transparent = true;
        this.videoBtn.material.opacity = 0.001;
        Reticulum.add( this.videoBtn, {
            onGazeLong: () =>{
                this.videoPlay('./assets/video/bar.mp4');
            }
        });
        this.scene.add(this.videoBtn);

        
    //lock door
        this.lockDoor = new THREE.Mesh(
            new THREE.PlaneGeometry(4, 7, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide })
        );
        this.lockDoor.name = 'Lock Door';
        this.lockDoor.position.set(-67.5, -21, -110);
        this.lockDoor.rotation.y = 1.14;
        this.lockDoor.visible = false;
        this.lockDoor.material.transparent = true;
        this.lockDoor.material.opacity = 0.001;
        Reticulum.add( this.lockDoor, {
            onGazeLong: () =>{
                this.enableLocker();
            }
        });
        this.scene.add(this.lockDoor);

    // //exit door
    //     this.exitDoor = new THREE.Mesh(
    //         new THREE.PlaneGeometry(40, 100, 1, 1),
    //         new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide })
    //     );
    //     this.exitDoor.name = 'Exit Door';
    //     this.exitDoor.position.set(-135, -25, -180);
    //     this.exitDoor.rotation.x = -0.06;
    //     this.exitDoor.rotation.y = 1.72;
    //     this.exitDoor.rotation.z = -0.04;
    //     this.exitDoor.visible = false;
    //     this.exitDoor.material.transparent = true;
    //     this.exitDoor.material.opacity = 0.001;
    //     Reticulum.add( this.exitDoor, {
    //         onGazeLong: () =>{
    //             if(this.finishGame){
    //                 this.disableLocker();
    //                 //  FINISH GAME
    //                 this.transition(this.game.scenes.Bar, this.game.scenes.Win, true);
    //                 this.game.timer.stop();
    //                 this.game.bgAudio.pause();
    //             }
    //         }
    //     });
    //     this.scene.add(this.exitDoor);


    //locker
        this.locker = new THREE.Mesh(
            new THREE.PlaneGeometry(80, 120, 1, 1),
            new THREE.MeshBasicMaterial({ map: this.game.textures[7], side: THREE.DoubleSide })
        );
        this.locker.name = 'Locker';
        this.locker.position.set(-85, -15, -140);
        this.locker.rotation.y = 0.6;
        this.locker.visible = false;
        this.locker.eventFlag = true;
        for(let i = 1; i < 11; i++){
            let num = new THREE.Mesh(
                new THREE.PlaneGeometry(16, 16, 1, 1),
                new THREE.MeshPhongMaterial({ color: 0x00b400, side: THREE.DoubleSide })
            );
            num.position.set(-22, 27.5, 1);
            num.visible = false;
            num.material.transparent = true;
            num.material.opacity = 0.001;
            num.number = i;
            if( (i+1)%3 === 0 || i === 10)num.position.x = 0;
            if( i%3 === 0 )num.position.x = 22;
            if(i>3 && i<=6){ num.position.y = 5;}else if(i>6 && i < 10){num.position.y = -18;}else if(i === 10){num.position.y = -41;}
            this.locker.add(num);
        }
        Reticulum.add( this.locker.children[0], {onGazeLong: () =>{this.checkPass(this.locker.children[0]);}});
        Reticulum.add( this.locker.children[1], {onGazeLong: () =>{this.checkPass(this.locker.children[1]);}});
        Reticulum.add( this.locker.children[2], {onGazeLong: () =>{this.checkPass(this.locker.children[2]);}});
        Reticulum.add( this.locker.children[3], {onGazeLong: () =>{this.checkPass(this.locker.children[3]);}});
        Reticulum.add( this.locker.children[4], {onGazeLong: () =>{this.checkPass(this.locker.children[4]);}});
        Reticulum.add( this.locker.children[5], {onGazeLong: () =>{this.checkPass(this.locker.children[5]);}});
        Reticulum.add( this.locker.children[6], {onGazeLong: () =>{this.checkPass(this.locker.children[6]);}});
        Reticulum.add( this.locker.children[7], {onGazeLong: () =>{this.checkPass(this.locker.children[7]);}});
        Reticulum.add( this.locker.children[8], {onGazeLong: () =>{this.checkPass(this.locker.children[8]);}});
        Reticulum.add( this.locker.children[9], {onGazeLong: () =>{this.checkPass(this.locker.children[9]);}});
        this.scene.add(this.locker);
    }

    checkPass(btn){
        console.log(this.game.textures);
        btn.material.opacity = 0.5;
        this.password += btn.number;
        if(this.password[this.password.length - 1] === btn.number)return;

        if(this.password.length === 4){
            if(this.password === '2649'){
                this.finishGame = true;
                this.locker.material.map = this.game.textures[9];
                this.locker.material.needsUpdate = true;
                setTimeout(()=>{
                    this.disableLocker();
                    //  FINISH GAME
                    this.transition(this.game.scenes.Bar, this.game.scenes.Win, true);
                    this.game.timer.stop();
                    this.game.bgAudio.pause();
                }, 500);
            }else {
                this.locker.material.map = this.game.textures[8];
                this.locker.material.needsUpdate = true;
                setTimeout(()=>{
                    this.disableLocker();
                }, 500);
            }
            this.password = '';
        }
    }

    disableLocker(){
        for(let i = 0; i < this.locker.children.length; i++){
            this.locker.children[i].material.opacity = 0.001;
        }
        this.locker.material.map = this.game.textures[7];
        this.lockDoor.visible = true;
        this.locker.visible = false;
        for(let i = 0; i < this.locker.children.length; i++){
            this.locker.children[i].visible = false;
        }
    }

    enableLocker(){
        this.lockDoor.visible = false;
        this.locker.visible = true;
        for(let i = 0; i < this.locker.children.length; i++){
            this.locker.children[i].visible = true;
        }
    }

}