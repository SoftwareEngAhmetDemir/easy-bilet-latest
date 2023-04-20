import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SeferCard({ detaylar }) {
  const navigate = useNavigate();
  const koltukAl = () => {
    navigate("koltuksec", { state: { data: detaylar } });
  };
  return (
    <div className="row justify-content-center border p-3 rounded align-items-center">
      <div className="col-3">{detaylar.otobusFirmasi}</div>
      <div className="col-3">{detaylar.kalkisSaati}</div>
      <div className="col-3">{detaylar.Ucret} TL</div>
      <div className="col-3 d-flex justify-content-center">
        <button className="btn btn-primary" onClick={koltukAl}>
          {" "}
          Koltuk Seç
        </button>
      </div>
    </div>
  );
}

export default SeferCard;
