import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";
import Salon from "./Salon";

function ListSalons() {
    let index = 0;

    const history = useHistory();
    const [salonList, setsalonList] = useState([]);

    async function fetchSalonList(lon, lat) {
        var res = await fetch("http://localhost:9700/customer/listShops", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                lon: lon,
                lat: lat
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
            // setHeader("Something Wrong");
            // setMsg(res.message);
            // setShow(true);
        } else {
            if (res.stat) {
                setsalonList(res.shops);

            } else {
                // setHeader("Invalid");
                // setMsg(res.message);
                // setShow(true);
            }
        }

    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosInState, failAccess);
        }
    }

    function failAccess() {
        // setHeader("Fail to Access");
        // setMsg(`Unable to access your location !
        // Please enable it`);
        // setShow(true);
        alert("failed")
    }
    function getPosInState(position) {
        console.log(position.coords.longitude);
        fetchSalonList(position.coords.longitude, position.coords.latitude);
    }
    useEffect(() => {
        getLocation();
        fetchSalonList();
    }, []);


    return (
        <div className="container mt-5" style={{width: '60vw'}}>
           { salonList.map((s)=><Salon salon={s}/>)}
        </div>
    )
}
export default ListSalons;
