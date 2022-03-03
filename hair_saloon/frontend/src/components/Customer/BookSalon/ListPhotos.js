import React from "react";
import { Card } from "react-bootstrap";

function ListPhotos({ selectedSalon, prefixLink }) {
    return (
        <div className="container py-2 " style={{ backgroundColor: '#f8f8ff' }}>
            <div className="row my-2 h-auto">
                {
                    selectedSalon.images_pub_ids.map((pub_id,index) =>
                        // <div className="col my-1" key={index}>
                        //     <img style={{height:"180px",width:"250px"}} src={prefixLink + pub_id + ".png"}></img>
                        // </div>
                        
                        <div className="col-md-4 my-2 p-0 "  key={index} >
                           
                            <img className="col-12" style={{height:"130px"}} src={prefixLink + pub_id + ".png"}></img>
                            
                        </div>
                                               
                        )
                }
            </div>
        </div>
    )
}

export default ListPhotos;