import React from "react";
import Service from "./Service";

function ListServices({selectedSalon}) {
    const list = [
        {
            hname : "Haircut",
            price : 400,
            category : "Hair Style",
            gender : "Male"
        },
        {
            hname : "Beardo",
            price : 300,
            category : "Shaving",
            gender : "Male"
        },
        {
            hname : "Haircut",
            price : 300,
            category : "Hair Style",
            gender : "FEmale"
        }
    ];
    return (
        <div className="container ml-0 " style={{position:'relative'}}>
            {list.map((l)=><Service l={l}/>)} 
        </div>
    )
}

export default ListServices;