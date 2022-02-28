import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Card,Nav } from "react-bootstrap";
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
    const [filterList, setFilterList] = useState([]);
    const [prefixLink, setPrefixLink] = useState('');
    const [response, setResponse] = useState(true);


    async function fetchSalonList(lon, lat) {
        setResponse(false);
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
                setFilterList(res.shops.filter((x) => x.salon_gender_type === "Both"))
                setPrefixLink(res.prefix_link);
                setResponse(true);
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
    function set_list(gender) {
        setFilterList(salonList.filter((x) => x.salon_gender_type === gender))
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
            <center><Card.Header  style={{width:"60%"}}>
                <Nav variant="pills" defaultActiveKey="Both">
                    <Nav.Item>
                        <Nav.Link onClick={() => { set_list("Both") }} eventKey="Both" >Both</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { set_list("Male") }} eventKey="Male">Male</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => { set_list("Femate") }} eventKey="Female" >Female</Nav.Link>
                    </Nav.Item>
                    
                </Nav>
            </Card.Header>
            </center>
            {!response ?
                <center>
                    <div style={{ width: "50px", height: "50px" }} className="spinner-border text-primary mt-5 mr-3" role="status"></div>
                    <span className="text-white">Loading...</span>

                </center>
                :
                <div className="container " style={{ width: '60vw' }}>
                    {filterList.length == 0 ?
                    <div>
                        <h4 className="form-control mt-5">
                            No Salon Found
                        </h4>
                    </div>
                    :
                    filterList.map((s, index) => <Salon key={index} salon={s} prefixLink={prefixLink} />)}
                </div>
            }
            <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />


        </div>
    )
}
export default ListSalons;
