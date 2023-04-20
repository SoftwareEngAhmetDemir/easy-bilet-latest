import React, { useContext } from "react";
import {  Link, NavLink } from "react-router-dom";
import { setCookie } from "..";
import { Security } from "../Authentication/context";

function Header() {
 
  //  if(true){
  //    throw new Error('Crashed!!!!');
  //  }
 

  const [auth,setAuth]  = useContext(Security);
  const logout=()=>{
    console.log("logout")
    window.location.href= "/login";
    setCookie("token","",0);
    sessionStorage.removeItem("loginTime")
  }
  return (
    <header id="header">
      <div className=" head-1">
       <div className="d-flex justify-content-lg-between justify-content-center h-100 container flex-wrap">
        <div>
        <Link to={"/"}><h1>EasyBilet.com</h1></Link>
        </div>
        <div className="row d-lg-none d-block w-100">

        </div>
        <ul className="d-flex h-100 list-unstyled bread-crumb align-items-center">
          <li>
           {!auth.authunticated? <NavLink to={"login"}>Üye Giriş</NavLink>:<span >{auth.username}</span>}
          </li>
          <li>
            <NavLink to={"seyahatlarim"}>Seyahatlarım</NavLink>
          </li>
          {auth.authunticated?
          <li className={auth.authunticated?'d-inline':'d-none'}>
         <span className="logout-btn" onClick={logout}>çıkış yap</span>
          </li>
          :''}
        </ul>
      </div>
      </div>
      <nav className="color-dark head-2">
        <ul className="container list-unstyled py-4">
          <li>
            <NavLink to={"biletal"} className="d-inline-block">
              <h4>
              Otobüs
              </h4>
            </NavLink>
          </li>
          {/* <li>Uçak</li> */}
        </ul>
      </nav>
      <br />
    </header>
  );
}

export default Header;
