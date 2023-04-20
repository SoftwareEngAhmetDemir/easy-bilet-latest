import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Security } from "../Authentication/context";
import SeferCard from "./SeferCard";

function SeferSec() {
  const location = useLocation();
  let seyahatlar = location.state.seyahatlar;
  return (
    <div className="fadeIn">
      <div className="mb-3 p-0">
        <Link to={"../"} style={{ width: "161px" }} className="btn btn-danger">
          geri gel
        </Link>
      </div>
      {seyahatlar.map((e) => (
        <div key={e._id} className="container mt-3">
          <SeferCard detaylar={e} />
        </div>
      ))}
    </div>
  );
}

export default SeferSec;
