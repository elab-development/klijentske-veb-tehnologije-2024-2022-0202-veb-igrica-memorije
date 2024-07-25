const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();



const connection = mysql.createConnection({
  host: 'memorije-db',
  user: 'root',
  password: 'rootpass123',
  database: 'user_database'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Povezan sa bazom.');

  const createTableSql = `
    CREATE TABLE IF NOT EXISTS  User (
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  matchesplayed INT NOT NULL,
  windate DATE NOT NULL,
  wincount INT NOT NULL,
  PRIMARY KEY (username, windate)
);`

  connection.query(createTableSql, (err, result) => {
    if (err) throw err;
    console.log("User tabela je spremna.");
  });
});

const initUsers = connection.query(
  'SELECT * FROM User ORDER BY username ASC, windate ASC', (err, results) => {
  if (err) {
    console.error('Greska baze podataka:', err);
    return [];
  } else {
    console.log("results:",results);
    let newUsers=[];
    if(results.length==0){return [];}
    let currentUser=results[0].username;
    let firstUser = new Object();
    firstUser.username = results[0].username;
    firstUser.password =  results[0].password;
    firstUser.matchesPlayed = results[0].matchesplayed;
    firstUser.winHistory = [];
    newUsers.push(firstUser);
    let j= 0;
    for(let i=0;i<results.length;i++){
      if(currentUser!=results[i].username){
j++;
currentUser=results[i].username;
let newUser = new Object();
    newUser.username = results[i].username;
    newUser.password =  results[i].password;
    newUser.matchesPlayed = results[i].matchesplayed;
    newUser.winHistory = [];
    newUsers.push(newUser);
      }
     /* const user = new Object();
      user.username = "playerOne";
      user.password = "1";
      user.matchesPlayed = 50;
      user.winHistory = [
        { date: "2024-07-20", winCount: 3 },
        { date: "2024-07-22", winCount: 3 },
        { date: "2024-07-16", winCount: 5 }
      ];*/

      const winEntry = new Object();
      winEntry.date= results[i].windate;
      winEntry.winCount= results[i].wincount;

      newUsers[j].winHistory.push(winEntry);
      

    }
    console.log("results2:",newUsers);
    users=newUsers;
    return;
  }
});
let users=[];
let mockUsers = initUsers;





app.use(cors());
app.use(bodyParser.json());
/*export class User{
username: string;
password: string;
matchesPlayed: number;
winHistory: dailyWin[]; */
app.get("/userapi", (req,res) => {
    if(users.length==0){
res.json([
    {
      "username": "playerOne",
      "password": "1",
      "matchesPlayed": 50,
      "winHistory": [
        {
          "date": "2024-07-20T22:00:00.000Z",
          "winCount": 3
        },
        {
            "date": "2024-07-22T22:00:00.000Z",
            "winCount": 3
          },
        {
          "date": "2024-07-16T22:00:00.000Z",
          "winCount": 5
        }
      ]
    },
    {
      "username": "playerTwo",
      "password": "2",
      "matchesPlayed": 30,
      "winHistory": [
        {
          "date": "2024-07-22T22:00:00.000Z",
          "winCount": 2
        },
        {
          "date": "2024-07-21T22:00:00.000Z",
          "winCount": 4
        }
      ]
    }
  ]
  );

}else{
    res.json(users);
}
console.log("userinfo poslat",JSON.stringify(users))});
const deleteUsers = `DELETE FROM User;`;
const insertQuery = `
INSERT INTO User (username, password, matchesplayed, wincount , windate)
VALUES (?, ?, ?, ?, DATE_ADD(?, INTERVAL 1 DAY));
`;

function DbUpdate(newUsers) {
  connection.query(deleteUsers, (err,results)=>{
    if (err) {
      console.error('GRESKA PRI UPDATE UPITU:', err);
      return;}
  })
  for (let i = 0; i < newUsers.length; i++) {
    for (let j = 0; j < newUsers[i].winHistory.length; j++) {
      connection.query(insertQuery, [newUsers[i].username,newUsers[i].password,newUsers[i].matchesPlayed, newUsers[i].winHistory[j].winCount,  new Date(newUsers[i].winHistory[j].date).toISOString().slice(0, 10)], (err, results) => {
        console.log(newUsers[i].username,newUsers[i].password,newUsers[i].matchesPlayed, newUsers[i].winHistory[j].winCount,  new Date(newUsers[i].winHistory[j].date).toISOString().slice(0, 10),"hiiii");
        if (err) {
          console.error('GRESKA PRI UPDATE UPITU:', err,"winHistory",newUsers[i].winHistory[j]);
      
          return;
        } else {
          console.log("FOR",newUsers[i].matchesPlayed, newUsers[i].winHistory[j].winCount, newUsers[i].username, new Date(newUsers[i].winHistory[j].date).toISOString().slice(0, 10) )
          console.log(results, "USPESAN UPIT");
        }
        
      });
    }
  }
  
}

app.post('/userapi', (req, res) => {
    const newUsers = req.body;
   
    
    // Mysql implementacija
    DbUpdate(newUsers);
    let br = users.length;
    
    users = newUsers;
    
    console.log('Users postovan:', users);
  });
 

app.listen(5000, () => {console.log("Server je pokrenut na portu 5000.")});