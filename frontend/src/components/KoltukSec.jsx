import React from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function KoltukSec() {
  let index = -1;
  let prevIndex = -1;

  useEffect(() => {
    document.getElementById("odeme").disabled = true;
    return () => {};
  }, []);
  const getIndex = (indexV) => {
    document.getElementById("odeme").disabled = false;
    prevIndex = index;
    index = indexV;
    if (prevIndex !== -1)
      document.getElementById(prevIndex).classList.remove("selected");

    document.getElementById(index).classList.add("selected");
    // refbtn.current.disabled = false
  };

  const navigate = useNavigate();
  const location = useLocation();

  const odemefunc = () => {
    console.log("called");
    console.log(location.state.data);
    navigate("odeme", {
      state: { data: location.state.data, koltukNo: index },
    });
  };

  const { maxfilled, filled } = location.state.data;
  let dataSeats = [];
  for (let i = 0; i < maxfilled; i++) {
    dataSeats[i] = true;
  }
  for (let i = 0; i < filled.length; i++) {
    dataSeats[filled[i] - 1] = false;
  }
  // dataSeats.map((e, index) => console.log(e));
  return (
    <div className="koltukSec container fadeIn">
      <div className="row align-items-center border p-lg-5 p-3">
        {dataSeats.map((e, index) => {
          return (
            <div
              key={index}
              className={`numbers d-flex justify-content-center align-items-center col-lg-2 col-3`}
            >
              {e === false ? (
                <i className="icon-seat" style={{ color: "red" }}></i>
              ) : (
                <i
                  onClick={() => getIndex(index + 1)}
                  id={index + 1}
                  className="icon-seat icon-set"
                ></i>
              )}{" "}
              <span className="number-of-chair">
                {index < 9 ? "0" + (index + 1) : index + 1}
              </span>
            </div>
          );
        })}
      </div>
      <div className="row  w-100 justify-content-center p-3">
        <div className="col-6">
          <button
            className="btn btn-danger w-25"
            style={{ minWidth: "161px" }}
            onClick={() => navigate(-1)}
          >
            Geri Gel
          </button>
        </div>
        <div className="row d-md-none d-block"></div>
        <div className="col-6 mt-md-0 mt-2  d-flex justify-content-md-end">
          <button
            id="odeme"
            onClick={() => odemefunc()}
            className="btn btn-primary w-25"
            style={{ minWidth: "161px" }}
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}

export default KoltukSec;
