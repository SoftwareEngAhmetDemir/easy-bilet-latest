import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Security } from "../Authentication/context";
import SeyahatlarinCard from "./SeyahatlarinCard";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Layout from "../Layout";
import loadingImg from "../assets/loading.gif";
function Seyahatlarim() {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(Security);
  const [results, setResults] = useState([]);
  const [start, SetStart] = useState(0);
  const [numberOfBtns, setNumberOfBtns] = useState(0);
  let end = 5;
  const get_data = () => {
    setLoading(true);
    axios
      .post("/seyahatlarim", { email: auth.email, start: start, end: end })
      .then(({ data }) => {
        let { records, msg, maxRecordNumbers } = data;
        let numberOfButtons = maxRecordNumbers / end;
        setNumberOfBtns(numberOfButtons);
        setResults(records);
        setTimeout(() => {
          setLoading(false);
        }, 700);
      });
  };
  useEffect(() => {
    get_data();
    return () => {};
  }, [start]);
  const handlePageClick = (event) => {
    if (event.selected === Math.floor(numberOfBtns)) {
      document.querySelector("li.next").classList.add("disabled");
    } else document.querySelector("li.next").classList.remove("disabled");
    SetStart(event.selected);
  };
  return (
    <div>
      <div className="mb-3">
        <h2>Seyahatlarim</h2>
      </div>

      <div>
        <div className="mb-3 p-0">
          <Link
            to={"/biletal"}
            style={{ width: "161px" }}
            className="btn btn-danger"
          >
            geri gel
          </Link>
        </div>
        <div
          className="border rounded p-0"
          style={{
            display: "flex",
            flexDirection: "column",
            height: "500px",
            alignItems: "center",
          }}
        >
          {loading === true ? (
            <div>
              {" "}
              <div
                className="d-flex justify-content-center align-items-center loading-icon fadeOut"
                id="loading"
              >
                <img width="100px" height="100px" src={loadingImg} />
              </div>
            </div>
          ) : (
            <div
              id="show-c"
              style={{ height: "480px", overflowY: "auto", direction: "rtl" }}
              className="p-2 w-100 fadeIn"
            >
              <div style={{ direction: "ltr" }}>
                {results.map((e, index) => (
                  <div key={index} className="container mt-3">
                    <SeyahatlarinCard data={e} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <ReactPaginate
          className="mt-3"
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={numberOfBtns > 12 ? 12 : numberOfBtns}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}
export default Seyahatlarim;
