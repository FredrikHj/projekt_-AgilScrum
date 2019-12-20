export let updateLocalstorage = (saveIntoLocalStorage) =>{
    localStorage.setItem('userData', saveIntoLocalStorage);
}