import React from "react";
import { Controller } from "react-hook-form";
import { useLocation } from "react-router-dom";
import EeasyBiletInput from "./EeasyBiletInput";

function OdemeBilgileri({ control }) {
  const location = useLocation();
  const data = location.state.data;
  console.log(data);
  return (
    <div className="border rounded p-4 pb-5" style={{ height: "100%" }}>
      <div>
        <h4>Ödeme Bilgileri</h4>
      </div>
      <div className="row">
        <div className="col-12 px-2">
          <label
            forhtml="exampleFormControlInput2"
            className="form-label p-0"
          ></label>
          <EeasyBiletInput
            control={control}
            name={"kartNum"}
            placeholder="kartNum"
            type="text"
           format="****-****-****-****" mask="....-....-....-...."
          />
        </div>
        <div className="col-lg-6 col-12 pt-2 px-2">
          <label
            forhtml="exampleFormControlInput2"
            className="form-label p-0"
          ></label>
          <EeasyBiletInput
            control={control}
            name={"sonKullanma"}
            placeholder="sonKullanma"
            format="**/**" mask="../.."
          />
        </div>
        <div className="col-lg-6 col-12 pt-2 px-2">
          <label
            forhtml="exampleFormControlInput2"
            className="form-label p-0"
          ></label>
          <EeasyBiletInput control={control} format="***" mask="..." name={"cvv2"} placeholder="cvv2" type="text"/>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-primary">Ödeme Yap</button>
      </div>
    </div>
  );
}
EeasyBiletInput.defaultProps = {
  // control: control
};
export default OdemeBilgileri;
