import React from "react";

function ListPhotos({ selectedSalon, prefixLink }) {
    return (
        <div className="container py-2 " style={{ backgroundColor: '#f8f8ff' }}>
            <div className="row my-2 h-auto">
                {
                    selectedSalon.images_pub_ids.map((pub_id,index) =>
                        <div className="col my-1" key={index}>
                            <img style={{height:"180px",width:"250px"}} src={prefixLink + pub_id + ".png"}></img>
                        </div>)
                }
            </div>
        </div>
    )
}

export default ListPhotos;