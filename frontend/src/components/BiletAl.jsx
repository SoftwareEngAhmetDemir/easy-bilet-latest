import React, { useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StyledEngineProvider } from "@mui/material";
import cities from "../cities.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingImg from "../assets/loading.gif";
function BiletAl() {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = React.useState(dayjs("2022-04-07"));
  const nereden = useRef(null);
  const nereye = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);
  const navigate = useNavigate();
  const submit = () => {
    let from = nereden.current;
    let to = nereye.current;
    console.log(value);
    let month = value.$D < 9 ? "0" + value.$D : value.$D;
    let day = value.$M + 1 < 9 ? "0" + value.$M + 1 : value.$M + 1;
    let year = value.$y < 9 ? "0" + value.$y : value.$y;

    let fullHistory = year + "-" + day + "-" + month;

    if (typeof from !== "string") from = "1";
    if (typeof to !== "string") to = "1";
    let config = {
      fromTo: from + "-" + to,
      tarih: fullHistory,
    };

    setLoading(true);
    console.log(fullHistory);
    axios
      .post(
        "/seyahatlar",
        {
          ...config,
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        console.log(res);
        let { data } = res;
        if (data.msg === 200) {
          console.log(data);
          let { results } = data;
          console.log(results);

          setTimeout(() => {
            setLoading(false);
          }, 1000);
          setTimeout(() => {
            navigate("sefersec", { state: { seyahatlar: results } });
          }, 1000);
        } else  {
          setLoading(false);
          window.alert("Yolculuk yoktur")};
      });
  };
  const entries = Object.entries(cities);

  return (
    <div>
      {loading ? (
        <div>
          {" "}
          <div className="d-flex justify-content-center fadeIn mt-5" id="loading">
            <img
              className="d-block"
              width="100px"
              height="100px"
              src={loadingImg}
            />
          </div>
        </div>
      ) : (
        <div className="biletAl mt-3 fadeIn">
          <form
            className="row border rounded p-4"
            style={{ maxWidth: "500px" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div
              className="col-lg-3 col-12 dropdown p-lg-0 my-lg-0 mb-3"
              style={{ minWidth: "200px" }}
            >
              <select
                className="form-select"
                ref={nereden}
                aria-label="Default select example"
                onChange={(e) => {
                  nereden.current = e.target.value;
                }}
              >
                <option defaultValue disabled>
                  Nereden
                </option>
                {entries.map((e) => {
                  return (
                    <option key={e[0]} value={e[0]}>
                      {e[1]}
                    </option>
                  );
                })}
              </select>
            </div>

            <div
              className="ms-lg-3 ms-0 col-lg-3 col-12 dropdown p-lg-0 my-lg-0 my-3"
              style={{ minWidth: "200px" }}
            >
              <select
                className="form-select"
                aria-label="Default select example"
                ref={nereye}
                onChange={(e) => {
                  nereye.current = e.target.value;
                }}
              >
                <option defaultValue disabled>
                  Nereye
                </option>
                {entries.map((e) => {
                  return (
                    <option key={e[0]} value={e[0]}>
                      {e[1]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="row"></div>
            <div style={{ marginTop: "20px" }}></div>
            <div
              className="px-lg-0 col-lg-3 col-12 my-lg-0 mt-2"
              style={{ minWidth: "200px" }}
            >
              <StyledEngineProvider injectFirst>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Stack spacing={3}>
                    <MobileDatePicker
                      label="Yolculuk Tarihi"
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                      className="w-100"
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                </LocalizationProvider>
              </StyledEngineProvider>
            </div>
            <div className="row"></div>
            <div className="px-lg-0 p-3 col-lg-3 mt-3">
              <button
                to="sefersec"
                className="btn btn-primary w-100 p-lg p-2"
                onClick={submit}
              >
                Bilet Bul
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default BiletAl;
