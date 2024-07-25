import React, { useEffect, useState, CSSProperties } from 'react';
import { json, useNavigate } from 'react-router-dom';
import { User } from '../models/user';
import Navbar from './Navbar';
import {useUser} from './UserContext';


const Login = () => {
  const [currentUsers, setCurrentUsers]=useState<User[]>([new User('',''), new User('','')]);
  const { currentUserContext, setCurrentUserContext } = useUser();

  const addUsers = () => {
      
      setCurrentUserContext(currentUsers);
  };
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [loginCount, setCount] = useState<number>(1);
  const [isRegistering , setIsRegistering]= useState<boolean>(false);
  const [buttonColor, setButtonColor] = useState<string>('#A2D2FF');
  const backgroundColorProperty: CSSProperties = {"backgroundColor":buttonColor};
  const colorProperty: CSSProperties = {"color":buttonColor};
  const registerButtonColor:string = '#ECF3E7';
  const registerButtonColorProperty: CSSProperties = {"backgroundColor":registerButtonColor};
  const [users, setUsers] = useState<User[]>( []
  );

 useEffect(()=>{updateUsers()},[])
 
 async function updateUsers() {
 
  try {
    const response = await fetch("http://localhost:5000/userapi");
    if (!response.ok) {
      throw new Error( String(response.status));
    }

    const tempUsers = await response.json();
    console.log("USERS!!",tempUsers);
    setUsers(tempUsers);
    return tempUsers; 
  } catch (error) {
    console.error('Error pri fetchovanju usera:' + error);
    return [];
  }
}

  
 
  

 

  

  const goTo = useNavigate();
  
  function userExists(users:User[]): boolean {

for(let i=0; i<currentUsers.length;i++){if(currentUsers[i].password===password && currentUsers[i].username==username)return false;}

for(let i=0;i<users.length;i++){ 
    console.log(users[i].username,users[i].password,users.length);
if (users[i].username===username && users[i].password=== password){let tempCurrentUsers:User[] = currentUsers;  tempCurrentUsers[loginCount-1]=users[i]; setCurrentUsers(tempCurrentUsers);console.log("currentusers ",currentUsers);return true;}}

  return false;
 }


  async function attemptLogin (e: React.FormEvent) {
    e.preventDefault();
    updateUsers().then( ()=>{ console.log(users,"trenutni useri zapravo");
    if(isRegistering){if(password!=passwordConfirm){alert('Ne poklapaju se šifre. Pokušajte ponovo.'); setPassword('');
        setUsername('');
        setPasswordConfirm('');
    return; }}
    let tempUsers:User[]=  users;
    if (userExists(users)) { 
        if(isRegistering){alert('Prazno polje ili podaci postoje. Pokušajte ponovo.');}else{ 
        if(loginCount==1){
        setCount(loginCount+1); setButtonColor('#FFC8DD');}else{
            
     console.log("currentusers ",currentUsers); addUsers(); goTo('/home'); console.log("currentusers ",currentUsers);}}
    } else {

        if(isRegistering){
let regFlag:boolean=false;
         for( let i=0; i<users.length;i++){ if(username===users[i].username){regFlag=true;break;}}
         if(regFlag==false){
let newUser:User= new User(username,password);
tempUsers.push(newUser);
saveUsers(tempUsers);

         }else{alert('Nalog postoji. Pokušajte ponovo.');}
        }else{
      alert('Netačni podaci. Pokušajte ponovo.');}
      
    }
    setPassword('');
setUsername('');
setPasswordConfirm('');
console.log(users,'useri');});
  }
  
async function saveUsers(tempUsers:User[]){
   console.log(JSON.stringify(tempUsers),"TU");

    const request = new Request("http://localhost:5000/userapi", { headers: {
      'Content-Type': 'application/json',
  },
      method: "POST",
      body: JSON.stringify(tempUsers),
    });
    
    const response = await fetch(request);
    console.log("POST request response:"+response);

}
   
function changeToRegister(){
setIsRegistering(!isRegistering);
setCount(1);
setButtonColor('#A2D2FF')
setCurrentUsers([new User('',''), new User('','')]);
setPassword('');
setUsername('');
setPasswordConfirm('');


}

if(!isRegistering){

  return (
    <div className='login-body'>
        
        <div className="login-bg"></div>
            <div className="centered-container">
            <img className="login-container" src="images/podlogaZaPrijavu.png"></img>
      <h2 className='login-title'>PRIJAVI SE</h2>
      <h2 className='login-title-2' style={colorProperty}>IGRAČ {loginCount}
      </h2>
      <form onSubmit={attemptLogin} className="login-form">
        <div>
          <label>UNESI KORISNIČKO IME: </label>
          <input type="text" placeholder='' name="username" value={username} onChange={(e) => setUsername(e.target.value)}   />
        </div>
        <div>
          <label>UNESI ŠIFRU: </label>
          <input type="password" placeholder='' name="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" style={backgroundColorProperty}>PRIJAVI SE</button>
      </form>
     
      </div>
      <button onClick={changeToRegister}  className='register-question'>Nemaš nalog? Registruj se</button>
      </div>
    
  );} else {return (
    <div className='login-body'>
        
        <div className="login-bg"></div>
            <div className="centered-container">
            <img className="login-container" src="images/podlogaZaPrijavu.png"></img>
      <h2 className='login-title'>REGISTRUJ SE</h2>
      <h2 className='login-title-2' >
      </h2>
      <form onSubmit={attemptLogin} className="login-form">
        <div>
          <label>UNESI KORISNIČKO IME: </label>
          <input type="text" placeholder='' name="username" value={username} onChange={(e) => setUsername(e.target.value)}   />
        </div>
        <div>
          <label>UNESI ŠIFRU: </label>
          <input type="password" placeholder='' name="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
          <label>PONOVI ŠIFRU: </label>
          <input type="password" placeholder='' name="passwordConfirm" value={passwordConfirm}  onChange={(e) => setPasswordConfirm(e.target.value)} />
        </div>
        <button type="submit" style={registerButtonColorProperty}>REGISTRUJ SE</button>
      </form>
     
      </div>
      <button onClick={changeToRegister} className='register-question'>Imaš nalog? Uloguj se</button>
      </div>
    
  );}
};

export default Login;
