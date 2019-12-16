// Creates a Express server in Node JS and use diff... modules    
const express = require('express');
const app = express();
let cors = require('cors');

// The server information
const port = process.env.PORT || backConfig.serverPort;
let serverIO = app.listen(port, () => console.log(`getSQLData is listening on port ${port}!`));

app.use(express.json());
app.use(cors());


// Validate the user who whants logging in
let validateUser = (incommingUser) => {
    let getFullName = '';
    let userReturnData = {userMatch: false};
    
    let userList = regedUserList['regedUser'];
    console.log('130');
    console.log(incommingUser);
    
    // Check the userList for a userName vs password match
    for (let index = 0; index < userList.length; index++) {
        const getUsername = userList[index].userName;
        const getPassword = userList[index].userPassWord;
        // Check if there are any match with a reged user
        if (getUsername === incommingUser.userName && getPassword === incommingUser.userPassWord) {
            userReturnData = {
                userId: userId(),
                userMatch: true,
                loginName: userList[index].fullName
            }
        }
        if (getUsername === incommingUser.userName || getPassword === incommingUser.userPassWord) isUserMatch = false;
    }

    
    return userReturnData;
}
// Run method when requested from client ======================================================================================
// Get - Default
app.get('/SQLData', (req, res) => {
    runSQLConn(buildCorrectSQLStatements('default', ''));
    setTimeout(()  => {
        console.log('156');
        //console.log(incommingSQLDataArr.length);
        res.status(200).send(incommingSQLDataArr);
    }, 1000);  
        console.log('=========================userSpec==========================================');
        
    emtyDataArrays();
});

app.post('/SQLData/AddRecord', (req, res) => {
    addRecord = true;
    let currentInData = req.body.bodyData;

    runSQLConn(buildCorrectSQLStatements('add', currentInData));
    //incommingSQLDataArr.push(currentStatement);
    console.log('===================================================================');
    addRecord = false;
    emtyDataArrays();
});
//===================================================================================