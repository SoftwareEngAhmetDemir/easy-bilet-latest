import React, { memo, useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import EeasyBiletInput from "./EeasyBiletInput";
import { Security } from "../Authentication/context";
import { getCookie, setCookie } from "..";
// import { AppContext } from "../Authentication/context";
import ReCAPTCHA from "react-google-recaptcha";
import { Timers } from "../Authentication/timers";
function Login() {
  
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  const [auth, setAuth] = useContext(Security);
  const [loginTime, SetLoginTime] = useContext(Timers);
  const navigate = useNavigate();
  const recaptchaRef = React.createRef();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      parola: "",
    },
  });
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
          setAuth((prev) => {
            return {
              email: decoded.email,
              username: decoded.ad,
              token: token,
              authunticated: true,
            };
          });

          // if(window.location.pathname==="/login")
          navigate("/biletal");
        }
      });
    return () => {};
  }, []);
  const onSubmit = (Fdata) => {
   
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const recaptchaValue = recaptchaRef.current.getValue();
    // console.log(recaptchaValue);
    if (recaptchaValue.length === 0) {
      window.alert("recaptcha is Required !!!");
      return;
    }
    axios
      .post(
        "/login",
        {
          email: Fdata.email || "",
          parola: Fdata.parola || "",
        },
        axiosConfig
      )
      .then(({ data, ...res }) => {
        let { msg } = data;
        if (msg === 200) {
          setAuth((prev) => {
            return {
              email: Fdata.email,
              username: res.headers.username,
              token: res.headers.token,
              authunticated: true,
            };
          });
         sessionStorage.setItem("loginTime",new Date())
          navigate("/biletal");
          alert("sucess")
          // location.href="https://www.google.com"
        } else {
          window.alert("Şifre Veya Kullanıcı adı yanlıştır");
        // throw new Error("error")
        }
      })
      .catch((err) => err);

  };
  const[shown,setShown] = useState(false);
  return (
    <div className="login row justify-content-center fadeIn">
      <form
        className="row justify-content-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-0 col-lg-5 col-8 d-flex justify-content-lg-start justify-content-center">
          <h2>Üye Girişi</h2>
        </div>
        <div className="row"></div>
        <div className="mb-3 p-0 col-lg-5 col-8">
          <label forhtml="exampleFormControlInput1" className="form-label p-0">
            Email address
          </label>
          <div
            style={{ background: "#E8F0FE" }}
            className="d-flex form-control py-0 inp-c"
          >
            {/* <img width="25px" src="./assets/email.svg" />{" "} */}
            <i className="icon-email"></i>

            <EeasyBiletInput
              control={control}
              name={"email"}
              placeholder="email"
            />
          </div>
        </div>
        <div className="row"></div>
        <div className="mb-3 p-0 col-lg-5 col-8">
          <label forhtml="exampleFormControlInput2" className="form-label p-0">
            Parola
          </label>
          <div
            style={{ background: "#E8F0FE" }}
            className="d-flex form-control py-0 inp-c"
          >
            {/* <img width="25px" src="./assets/lock.svg" /> */}
            <i className="icon-lock" onClick={(e)=>{
              setShown(!shown)
              if(!shown)
              e.currentTarget.style.color = "red"
              else e.currentTarget.style.color =""
            }}></i>

            <EeasyBiletInput
              control={control}
              name={"parola"}
              placeholder="parola"
              type={shown?"text":"password"}
            />
          </div>
        </div>
        <div className="row"></div>

        <div className="my-3 p-0 col-lg-5 col-8 d-lg-block d-flex justify-content-center form-group">
          <ReCAPTCHA
            ref={recaptchaRef}
            required
            sitekey="6LcBSr8jAAAAAB0beG578ZY7hjT906wzXlSVOOS7"
            onChange={onChange}
          />
        </div>
        <div className="row"></div>
        <div className="p-0 col-lg-5 col-8 d-lg-block d-flex justify-content-center">
          <button className="py-2 px-5 btn btn-primary">Giriş Yap</button>
        </div>
      </form>
      <div className="row justify-content-center mt-4">
        <div className="p-0 col-lg-5 col-8 d-lg-block d-flex flex-column align-items-center">
          <div className="mb-3">
            <h5>Üye Değilseniz</h5>
          </div>
          <div>
            <button
              type="submit"
              style={{ width: "158.45px" }}
              className="py-2 px-5 btn btn-primary position-relative"
            >
              <Link
                to={"/Member"}
                className="stretched-link color-white"
                style={{ color: "white" }}
              >
                Üye Ol
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
