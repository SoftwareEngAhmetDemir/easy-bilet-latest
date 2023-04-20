import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

function Member() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      ad: "",
      soyad: "",
      email: "",
      parola: "",
    },
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    axios.post("/yenikayit", data).then(({ data }) => {
      let { msg } = data;
      if (msg === 201) {
        alert("Yeni Hesap Başarıyla oluşturuldu");
        navigate("/login");
      }
      else if(msg===422){
        alert("Bu Hesap Mevcuttur");
      }
      else {
        alert(msg)
      }
    });
  };
  return (
    <div className="uye-ol row justify-content-center fadeIn">
      <div className="p-0 col-lg-5 col-8 d-flex justify-content-lg-start justify-content-center">
        <h2>Üye Ol</h2>
      </div>
      <div className="row"></div>
      <form
        className="row justify-content-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3 p-0 col-lg-5 col-8 input-c">
          <label forhtml="exampleFormControlInput11" className="form-label">
            Ad
          </label>
          <Controller
            name="ad"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="form-control"
                id="exampleFormControlInput11"
                placeholder="Ad"
              />
            )}
          />
        </div>
        <div className="row"></div>
        <div className="mb-3 p-0 col-lg-5 col-8">
          <label forhtml="exampleFormControlInput12" className="form-label">
            Soyad
          </label>
          <Controller
            name="soyad"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className="form-control"
                id="exampleFormControlInput12"
                placeholder="Soyad"
              />
            )}
          />
        </div>
        <div className="row"></div>
        <div className="mb-3 p-0 col-lg-5 col-8">
          <label forhtml="exampleFormControlInput22" className="form-label p-0">
            Email address
          </label>
          <div
            style={{ background: "#E8F0FE" }}
            className="d-flex form-control py-0 inp-c"
          >
            <i className="icon-email"></i>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  className="form-control form-control-inp border-0"
                  style={{ outline: "none" }}
                  id="exampleFormControlInput22"
                  placeholder="name@example.com"
                />
              )}
            />
          </div>
        </div>
        <div className="row"></div>
        <div className="mb-3 p-0 col-lg-5 col-8">
          <label forhtml="exampleFormControlInput23" className="form-label p-0">
            Parola
          </label>
          <div
            style={{ background: "#E8F0FE" }}
            className="d-flex form-control py-0 inp-c"
          >
            <i className="icon-lock"></i>
            <Controller
              name="parola"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="form-control form-control-inp border-0"
                  style={{ outline: "none" }}
                  id="exampleFormControlInput23"
                  placeholder="name@example.com"
                />
              )}
            />
          </div>
        </div>
        <div className="row"></div>
        <div className="p-0 col-lg-5 col-8 d-lg-block d-flex justify-content-center">
          <button
            style={{ width: "161px" }}
            className="py-2 px-5 btn btn-primary"
          >
            Kayıt Ol
          </button>
        </div>
      </form>
      <div className="row justify-content-center mt-4">
        <div className="p-0 col-lg-5 col-8 d-lg-block d-flex flex-column align-items-center">
          <div className="mb-3">
            <h5>Mevcut Üyeliğiniz Varsa</h5>
          </div>
          <div>
            <button
              style={{ width: "161px" }}
              className="py-2 px-5 btn btn-primary position-relative"
            >
              <Link
                to={"/login"}
                className="stretched-link color-white d-flex"
                style={{ color: "white" }}
              >
                Üye Giriş
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;
