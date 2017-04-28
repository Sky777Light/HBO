let loadingManager = new THREE.LoadingManager();
loadingManager.onProgress =  (item, loaded, total) => {
    console.log(item, loaded, total);
};
loadingManager.onLoad = () => {
    window.gameLoaded = true;
    console.log('LOADING MANAGER: texture loaded');
};


export const TextureLoader = new THREE.TextureLoader(loadingManager);
TextureLoader.setCrossOrigin('anonymous');