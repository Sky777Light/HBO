export class preLoader{

    constructor(onload){
        let loadingManager = new THREE.LoadingManager();

        loadingManager.onProgress =  (item, loaded, total) => {
            console.log(item, loaded, total);
        };

        loadingManager.onLoad = () => {
            onload(this.textures, this.video);
            console.log('LOADING MANAGER: texture loaded');
        };

        this.video = document.getElementById('video');
        
        this.textures = [];
        this.textureLoader = new THREE.TextureLoader(loadingManager);
        this.textureLoader.setCrossOrigin('anonymous');
        this.textures.push(new THREE.VideoTexture( this.video ));

        for(let i = 1; i < 10; i++){
            this.textures.push(this.textureLoader.load('./assets/img/game/' + i + '.jpg'));
        }
    }


}
