import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import IletisimBilgileri from "./IletisimBilgileri";
import OdemeBilgileri from "./OdemeBilgileri";
import SeferBilgileri from "./SeferBilgileri";
import YolcuBilgileri from "./YolcuBilgileri";
import axios from "axios";
import cities from "../cities.json";
import sucessImg from "../assets/sucess.gif";
function Odeme() {
  const controller = new AbortController();
  const navigate = useNavigate();
  const location = useLocation();
  const Data = location.state.data;
  const [sucessv, setSucess] = useState(false);
  console.log(Data);
  let from = cities[Data.fromTo.split("-")[0]];
  let to = cities[Data.fromTo.split("-")[1]];
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      ad: "",
      soyad: "",
      tc: "",
      email: "",
      cep: "",
      kartNum: "",
      sonKullanma: "",
      cvv2: "",
    },
  });
  console.log(from, to);
  const onSubmit = (data) => {
    let req1 = axios.post("/odeme", {
      ...data,
      fromTo: `${from}-${to}`,
      otobusFirmasi: Data.otobusFirmasi,
      Ucret: Data.Ucret,
    });
    let req2 = axios.post("/updateseyahatlar", {
      _id: Data._id,
      numberOfSeat: location.state.koltukNo,
    });

    axios
      .all([req1, req2])
      .then(
        axios.spread((...responses) => {
          let res1 = responses[0];
          let res2 = responses[1];
          console.log(res1.data.msg);
          console.log(res2.data.msg);
          if (res1.data.msg === 201 && res2.data.msg === 200) {
            setSucess(true);
            setTimeout(() => {
              navigate("/login");
            }, 4000);
          }
        })
      )
      .catch((err) => {
        controller.abort();
        alert("error");
        navigate("/login");
        return;
      });
  };

  return (
    <div>
      <div
        className={`sucess ${sucessv === true ? "d-flex" : "d-none"}`}
        style={{ zIndex: "999", position: "relative" }}
      >
        <img width="400px" src={sucessImg} />
      </div>
      <form
        className={`row ${sucessv === false ? "d-flex" : "d-none"}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-lg-4 col-12">
          <SeferBilgileri data={Data} koltukNo={location.state.koltukNo} />
        </div>
        <div className="col-lg-4 col-12">
          <div className="col-12">
            <IletisimBilgileri control={control} />
          </div>
          <div className="col-12">
            <YolcuBilgileri control={control} />
          </div>
        </div>
        <div className="col-lg-4 col-12 mt-lg-0 mt-3">
          <OdemeBilgileri control={control} />
        </div>
      </form>
    </div>
  );
}

export default Odeme;
