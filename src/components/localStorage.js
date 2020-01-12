const updateLocalstorage = (username)=>{
  localStorage.setItem("userName",username)
}
const userID = (id) =>{
    localStorage.setItem('userId', id);
}

module.exports.updateLocalstorage = updateLocalstorage;
module.exports.userID = userID;
