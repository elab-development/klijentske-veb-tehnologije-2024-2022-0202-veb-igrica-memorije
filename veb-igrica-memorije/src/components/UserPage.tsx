import React from "react";
import { useParams } from "react-router-dom";
/*import Image1 from "images/podlogaMala.png";
import Image2 from "images/podlogaVelika.png";*/
const UserPage: React.FC =()=> {

    const {username} = useParams( );



return(<>
<div className="user-layout">
  <div className="user-layout-left">
    <div className="component">
    <div className="stack-layout">
  <div className="top">Top Component</div>
  <div className="middle">Middle Component</div>
  <div className="bottom"><img height={50} width={50} ></img></div>
</div>
    </div>
    <div className="component">Component 2</div>
  </div>
  <div className="user-layout-right">
    <div className="component">Component 3</div>
  </div>
</div>


</>);


};
export default UserPage;