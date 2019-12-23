export let updateLocalstorage = (saveIntoLocalStorage) =>{
    localStorage.setItem('userData', JSON.parse(saveIntoLocalStorage));
}