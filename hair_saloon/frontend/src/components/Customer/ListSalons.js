import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import ModalInterface from "../Modal/ModalInterface";
import Salon from "./Salon";

function ListSalons() {
    const [show, setShow] = useState(false);
    const [header, setHeader] = useState("");
    const [msg, setMsg] = useState("");
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundImage: "url('/img/bg3.jpg')"
    }
    // const history = useHistory();
    const [salonList, setsalonList] = useState([]);
    const [prefixLink, setPrefixLink] = useState('');

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
            setHeader("Something Wrong");
            setMsg(res.message);
            setShow(true);
        } else {
            if (res.stat) {
                setsalonList(res.shops);
                setPrefixLink(res.prefix_link);
            } else {
                setHeader("Invalid");
                setMsg(res.message);
                setShow(true);
            }
        }

    }
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosInState, failAccess);
        }
    }

    function failAccess() {
        setHeader("Fail to Access");
        setMsg(`Unable to access your location !
        Please enable it`);
        setShow(true);
    }
    function getPosInState(position) {
        // console.log(position.coords.longitude);
        fetchSalonList(position.coords.longitude, position.coords.latitude);
    }
    useEffect(() => {
        getLocation();
    }, []);


    return (
        <div style={style}>
            <Card.Header style={{ backgroundColor: "#d8d8d8", textAlign: "center" }}>
                <h1>
                    Near By Salon
                </h1>
            </Card.Header>
            <div className="container mt-5" style={{ width: '60vw' }}>
                {salonList.map((s, index) => <Salon key={index} salon={s}  prefixLink={prefixLink} />)}
            </div>
            <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />


        </div>
    )
}
export default ListSalons;
