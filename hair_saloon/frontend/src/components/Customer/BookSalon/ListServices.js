import React, { useState, useEffect } from "react";
import Service from "./Service";

function ListServices({ selectedSalon }) {
    const [services, setServices] = useState([]);

    async function fetchServices() {
        var res = await fetch("http://localhost:9700/owner/listServices", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shop_id: selectedSalon._id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
        } else {
            if (res.stat) {
                setServices(res.servicelist);
            }
        }
    }
    useEffect(() => {
        fetchServices()
    }, []);

    return (
        <div className="container ml-0 " style={{ position: 'relative' }}>
            {services.length == 0 ? "No services Found" : services.map((s, index) => <Service s={s} key={index} />)}
        </div>
    )
}

export default ListServices;