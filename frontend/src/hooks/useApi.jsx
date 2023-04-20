import React, { useEffect, useState } from "react";
import axios from "axios";
function useApi(api,body) {
    const [results,setResults] = useState([]);
  useEffect( () => {
     axios.post(api,body).then(({data}) => {
      console.log(data.data)
        if(data.msg===200)
        setResults(data.results);
       
    return ()=>{}
    });
  },[api]);
  return [results];
}

export default useApi;
