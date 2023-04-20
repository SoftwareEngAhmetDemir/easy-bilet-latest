import React from "react";
import EeasyBiletInput from "./EeasyBiletInput";

function YolcuBilgileri({ control }) {
  return (
    <div className="border mt-3 rounded p-4 pb-5">
      <div>
        <h4>Yolcu Bilgileri</h4>
      </div>
      <div className="row">
        <div className="col-12 px-2">
          <label forhtml="exampleFormControlInput2" className="form-label p-0">
            Adı
          </label>
          <EeasyBiletInput control={control} name={"ad"} placeholder="ad" />
        </div>
        <div className="col-12 pt-2 px-2">
          <label forhtml="exampleFormControlInput2" className="form-label p-0">
            Soyadı
          </label>
          <EeasyBiletInput
            control={control}
            name={"soyad"}
            placeholder="soyad"
          />
        </div>
        <div className="col-12 pt-2 px-2">
          <label forhtml="exampleFormControlInput2" className="form-label p-0">
            Tc
          </label>
          <EeasyBiletInput
            format="************"
            mask="-----------"
            control={control}
            name={"tc"}
            type="text"
            placeholder="tc"
          />
        </div>
      </div>
    </div>
  );
}

export default YolcuBilgileri;
