import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Confrim() {
  const [state, setState] = useState();
  const [state2, setState2] = useState("none");

  useEffect(() => {
    const URL =
      "http://43.72.53.49:8001/AM/PICS/PartFindInfo/Api/GetPartState?part_no=100100611&part_seri=IA3829UE4N1R";
    axios.get(URL).then((res) => {
      // const data = res.data ;
      setState(res.data);
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    console.log("state" + state);
    if (state !== "none") {
      setState2('True');
    }
  }, [state]);

  useEffect(() => {
    if (state2 !== "none") {
      const loadData = JSON.parse(state);
      console.log(loadData[0]);
      setState2('none');
    }
  }, [state2]);

  // const loadData = JSON.parse(state);
  // const getdata = loadData[0]; 
  // const getdata = loadData[1]; 
  // setState2(getdata.PartSeri);
  // console.log(loadData);
  // console.log(loadData[0]);
  // console.log(getdata.PartSeri);
  // console.log('State : ' + state2);

  return (
    <>
      <h3> test data 1</h3>
    </>
  );
}
