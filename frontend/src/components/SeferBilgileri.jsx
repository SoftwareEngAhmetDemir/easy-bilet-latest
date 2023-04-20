import React from "react";
import { useLocation } from "react-router-dom";
import cities from '../cities.json';

function SeferBilgileri({data,koltukNo}) {
 console.log(data)
 let from = data.fromTo.split("-")[0];
 let to = data.fromTo.split("-")[1];

  return (
    <div className="border rounded p-4 pb-5">
      <div>
        <h4>SeferBilgileri</h4>
      </div>
      <div className="row">
        <div className="col-6 p-4 px-2">{cities[from]}</div>
        <div className="col-6 p-4 px-2">{cities[to]}</div>

        <div className="col-6 p-4 px-2">{data.kalkisSaati}</div>
        <div className="col-6 p-4 px-2">{koltukNo}</div>
      </div>
    </div>
  );
}

export default SeferBilgileri;
