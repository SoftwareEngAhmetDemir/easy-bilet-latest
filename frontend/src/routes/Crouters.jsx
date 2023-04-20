import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "..";
import { AppContext, Security } from "../Authentication/context";
import Auth from "../components/Auth";
import BiletAl from "../components/BiletAl";
import ErrorPage from "../components/ErrorPage";
import KoltukSec from "../components/KoltukSec";
import Login from "../components/Login";
import Member from "../components/Member";
import Odeme from "../components/Odeme";
import SeferSec from "../components/SeferSec";
import Seyahatlarim from "../components/Seyahatlarim";
import axios from "axios";
import { connect } from "react-redux";
import Hello from "../components/Hello";
function Croutes() {
  const [auth, setAuth] = useContext(Security);
  const navigate = useNavigate();

  useEffect(() => {
    let token = getCookie("token");
    if (token.length < 0) return;

    axios
      .post(
        "/decode",
        {
          token: token,
        },
        {}
      )
      .then(({ data }) => {
        let { msg, decoded } = data;
        if (msg === 200) {
          setAuth({
            email: decoded.email,
            username: decoded.ad,
            token: token,
            authunticated: true,
          });

          // navigate("/biletal");
        }
      });
  }, []);
  if (navigator.onLine) {
    // alert('online');
    console.log("internet connection working...");
  } else {
    throw new Error("no Enternet Connection!!!");
  }
  return (
    <Routes>
      {auth.authunticated === true ? (
        <>
          <Route path="/biletal">
            <Route index element={<BiletAl />} />
            <Route path="sefersec">
              <Route index element={<SeferSec />} />
              <Route path="koltuksec">
                <Route index element={<KoltukSec />} />
                <Route path="odeme" element={<Odeme />} />
              </Route>
            </Route>
          </Route>
          <Route
            path="/seyahatlarim"
            element={<Seyahatlarim />}
            auth={auth}
          ></Route>
        </>
      ) : (
        <Route path="*" element={<Auth />} />
      )}
      <Route path="/" element={<Hello />}></Route>
      <Route path="/Member" element={<Member />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}
export default Croutes;
// export default Croutes;
