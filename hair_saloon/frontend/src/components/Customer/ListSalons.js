import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";

function ListSalons() {
    let index = 0;

    const history = useHistory();
    const [salonList, setsalonList] = useState([]);
    // const [location,setLocation] = useState({longitude:0.0,latitude:0.0});


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
    }, []);

    const td = salonList.map((s) => {
        return (
            <tr>
                <td><strong>{++index}</strong></td>
                <td>{s.shop_name}</td>
                <td>{s.capacity_seats}</td>
                <td style={{ textAlign: "left" }}>
                    <li><strong>Location :</strong> {s.address} </li>
                    <li><strong>gender type:</strong>{s.salon_gender_type}</li>
                </td>
                <td>
                    <Button variant="success" size="sm" onClick={() => { history.push("/customerlogin") }}>
                        Book Now
                    </Button>

                </td>
            </tr>
        );
    });

    return (
        <div className="mt-5 text-center">
            <Card style={{ width: "70%", margin: "auto" }}>
                <Card.Header className="h1">All Nearby Salons</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Table bordered hover>
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th>#</th>
                                    <th>Shop Name</th>
                                    <th>Capacity</th>
                                    <th>address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{td}</tbody>
                        </Table>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>

                    <Button variant="primary" onClick={() => window.location.reload(true)}>Refresh</Button>
                </Card.Footer>
            </Card>
        </div>
    )
}
export default ListSalons;
