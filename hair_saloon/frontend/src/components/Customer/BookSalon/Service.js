import React from "react";
import {Button} from 'react-bootstrap';

function Service({ s }) {
    return (
        <div className="row border my-2" style={{backgroundColor:'#f8f8ff'}}>
            <div className="row mb-5 mt-3">
                <div className="col-10 pl-3">
                    <h3>{s.service_name}</h3>
                    <h5>category : {s.category}</h5>
                </div>
                <div className="col-2">
                    <h3>{s.price}₹</h3>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-8">
                    <span>
                        Valid for : {s.gender_type?"Male":"Female"}
                    </span>
                </div>
                <div className="col-4">
                    <Button variant="success" style={{position: 'absolute', bottom:'0px', right:'10px'}}>Book Now</Button>
                </div>
            </div>
        </div>
    )
}

export default Service;