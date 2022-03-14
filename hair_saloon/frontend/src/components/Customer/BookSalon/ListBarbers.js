import React, { useState,useEffect } from "react";
import Barber from "./Barber";

function ListBarbers({ selectedSalon }) {

  const [barberList, setBarberList] = useState([]);

  async function fetchBarberList() {
    var res = await fetch("http://localhost:9700/owner/listBarbers", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        owner_id: selectedSalon.owner_id
      })
    })

    res = await res.json();

    if (res.wentWrong) {
      alert(res.message);
    } else {
      if (res.stat) {
        setBarberList(res.barbers);
      }
    }
  }
  
  useEffect(() => {
    fetchBarberList()
  }, []);

  return (
    <div className="container ml-0 " style={{ position: 'relative' }}>
      <div className="row">
        {barberList.length === 0?"No Barbers Found":barberList.map((b, index) => <Barber b={b} selectedSalon={selectedSalon} key={index} />)}
      </div>
    </div>
  )
}

export default ListBarbers;