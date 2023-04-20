import React, { useState } from "react";
import { Security } from "./Authentication/context";
import Croutes from "./routes/Crouters";
import axios from "axios";
import { getCookie, setCookie } from ".";
import Header from "./components/Header";
import loadingImg from "./assets/loading.gif";
import { Timers } from "./Authentication/timers";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
function App() {
  const [loading, setLoading] = useState(false);
  function getMinutesDiff(startDate, endDate) {
    const msInMinutes = 60 * 1000;

    return Math.floor((endDate - startDate) / msInMinutes);
  }
  const logout = () => {
    console.log("logout");
    window.location.href = "/login";
    setCookie("token", "", 0);
    sessionStorage.removeItem("loginTime");
  };
  axios.interceptors.response.use(
    function (response) {
      let token = getCookie("token");
      if (response.headers.token !== undefined) {
        axios.defaults.headers.common["token"] = response.headers.token;
        setCookie("token", response.headers.token, 1);
      }
      if (
        (response.url !== "/login" || response.url !== "/Member") &&
        token.length === 0
      ) {
        response.headers.token = token;
      }
      if (response.data.msg === 401) {
        // window.location.href = "/login";
        logout();
      }

      return response;
    },
    function (error) {
      throw new Error(error)
      // return Promise.reject(error);
    }
  );
  axios.interceptors.request.use((req) => {
    let token = getCookie("token");
    if (token.length > 0) {
      axios.defaults.headers.common["token"] = token;
      if (
        sessionStorage.getItem("loginTime") === null &&
        (req.url !== "/login" || req.url !== "/Member")
      )
        sessionStorage.setItem("loginTime", new Date());
      let LoginTime = new Date(sessionStorage.getItem("loginTime").toString());
      let currentTime = new Date();
      let diffM = getMinutesDiff(LoginTime, currentTime);
 
      if (parseInt(diffM) >= 54) {
        
        document.addEventListener("click", function () {
          let { username, email } = auth;

          sessionStorage.setItem("loginTime", new Date());

          fetch(process.env.REACT_APP_BASE_URL + "/refreshToken", {
            method: "POST",
            body: JSON.stringify({
              ad: username,
              email: email,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              token: axios.defaults.headers.common["token"],
            },
          })
            .then((response) => response.json())
            .then((e) => {
              setCookie("token", e.msg, 1);
              req.headers.token = e.msg;
              axios.defaults.headers.common["token"] = e.msg;
            });
        });
      } 
      if (diffM > 59) {
        if (req.url !== "/login" || req.url !== "/Member") {
          logout();
        }
      }
    }

    if ((req.url !== "/login" || req.url !== "/Member") && token.length === 0) {
      req.headers.token = token;
    }
    if (req.data?.msg === 401) {
      // window.location.href = "/login";
      logout();
    }
   
    return req;
  },
  function (error){
  
  }
  );

  const [auth, setAuth] = useState({
    email: "",
    username: "",
    token: "",
    authunticated: false,
  });
  const [loginTime, SetLoginTime] = useState(null);

 
  return (
    <div className="App">
        <Security.Provider value={[auth, setAuth]}>
    
          <Header />
          <div className="container">
            {loading === true ? (
              <div
                className="d-flex justify-content-center loading-icon fadeOut"
                id="loading"
              >
                <img
                  className="d-block"
                  width="100px"
                  height="100px"
                  src={loadingImg}
                />
              </div>
            ) : (
              <Timers.Provider value={[loginTime, SetLoginTime]}>
                <Croutes />
              </Timers.Provider>
            )}
          </div>
      
        </Security.Provider>
    </div>
  );
}

export default App;
