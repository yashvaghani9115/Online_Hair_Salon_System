import React, { useEffect, useState } from "react";

function ListPhotos({selectedSalon}) {
    const photos = [
        1,2,3,4
    ]
    return (
        <div className="container py-2 h-auto" style={{backgroundColor:'#f8f8ff'}}>
            <div className="row my-2" style={{height:'150px'}}>
                <div className="col">
                    <img className="w-100 h-100" src={require('../images/hair_salon_image.png')}></img>
                </div>
                <div className="col">
                    <img className="w-100 h-100" src={require('../images/hair_salon_image.png')}></img>
                </div>
                <div className="col">
                    <img className="w-100 h-100" src={require('../images/hair_salon_image.png')}></img>
                </div>
            </div>
            <div className="row my-2" style={{height:'150px'}}>
                <div className="col">
                    <img className="w-100 h-100" src={require('../images/hair_salon_image.png')}></img>
                </div>
                <div className="col">
                    <img className="w-100 h-100" src={require('../images/hair_salon_image.png')}></img>
                </div>
                <div className="col">
                    <img className="w-100 h-100" src={require('../images/hair_salon_image.png')}></img>
                </div>
            </div>
            
        </div>
    )
}

export default ListPhotos;