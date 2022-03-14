import React from "react";

function Service({ s }) {
    return (
        <div className="row border my-2" style={{backgroundColor:'#e3e3e3'}}>
            <div className="row mb-2 mt-3">
                <div className="col-md-10 pl-3">
                    <h3>{s.service_name}</h3>
                    <h5>category : {s.category}</h5>
                </div>
                <div className="col-md-2 ">
                    <h3>{s.price}₹</h3>
                    <span>
                        <span className="btn btn-sm btn-outline-orange"> {s.gender_type?"Male":"Female"}</span>
                    </span>
                </div>
            </div>

        </div>
    )
}

export default Service;