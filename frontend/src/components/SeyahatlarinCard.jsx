import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function SeyahatlarinCard({ data }) {
  let date = new Date(data.tarih);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate(); // 20211100 => 20211124
  const DateV = year + "-" + month + "-" + day + ""; // `+ ''` to convert to string from number, 20211124 => "20211124"

  return (
    <div className="row justify-content-center border p-3 rounded align-items-center">
      <div className="col-4">{data.otobusFirmasi}</div>
      <div className="col-4 text-center">{DateV}</div>
      <div className="col-4" style={{ textAlign: "right" }}>
        {data.Ucret} TL
      </div>
    </div>
  );
}

export default SeyahatlarinCard;
