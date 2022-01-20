import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function ShopRegister() {
    const history = useHistory();
    
    const [shop, setShop] = useState({
        shop_name: "",
        address: "",
        opening_time: "",
        closing_time: "",
        salon_gender_type: "",
        capacity_seats: "",
        verified: false,
        owner_id: 0,
        longitude: 0.0,
        latitude: 0.0
    })
    function handlechange(e) {
        const { name, value } = e.target;

        setShop(
            {
                ...shop,
                [name]: value
            }
        )
    }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(getPosInState);
        } else { 
        //   x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
    
    function getPosInState(position) {
        // x.innerHTML = "Latitude: " + position.coords.latitude + 
        // "<br>Longitude: " + position.coords.longitude;
        
        setShop({...shop, longitude:position.coords.longitude, latitude:position.coords.latitude})
        
        // return position;
    }
    function getOwnerId(){
        const ownerId = JSON.parse(localStorage.getItem("owner"))._id;
        setShop({...shop,owner_id:ownerId});
    }
    useEffect(() => {
        getLocation();
        getOwnerId();
    }, []);
    async function registerShop() {

        const {
            shop_name,
            address,
            opening_time,
            closing_time,
            salon_gender_type,
            capacity_seats,
            owner_id,
            longitude,
            latitude
        } = shop;
        console.log(shop);
        if (shop_name, address, opening_time, closing_time, salon_gender_type, capacity_seats, owner_id, longitude, latitude) {
            var res = await fetch("http://localhost:9700/owner/addShop", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shop_name:shop_name,
                    address:address,
                    opening_time:opening_time,
                    closing_time:closing_time,
                    salon_gender_type:salon_gender_type,
                    capacity_seats:capacity_seats,
                    verified : false,
                    owner_id:owner_id,
                    longitude:longitude,
                    latitude:latitude
                    // owner_id:150,
                    // latitude:10,
                    // longitude:5
                })
            })

            res = await res.json();
            console.log(res)
            if (res.wentWrong) {
                alert(res.message);
            }
            else {
                if (res.stat) {
                    // localStorage.setItem("shop", JSON.stringify(res.shop));
                    alert(res.message);
                    history.push('/');
                }
                else {
                    alert(res.message);
                }
            }
        }
        else {
            alert("Input fields can't be blank.");
        }

    }

    return (
        <div>

        <h1>Shop Reg</h1>
        <input type="text" placeholder="Shop Name" name="shop_name" value={shop.shop_name} onChange={handlechange} />
        <br />
        <input type="text" placeholder="Shop Addr" name="address" value={shop.address} onChange={handlechange} />
        <br />
        <input type="text" placeholder="Shop open" name="opening_time" value={shop.opening_time} onChange={handlechange} />
        <br />
        <input type="text" placeholder="Shop close" name="closing_time" value={shop.closing_time} onChange={handlechange} />
        <br />
        <input type="text" placeholder="Shop gender" name="salon_gender_type" value={shop.salon_gender_type} onChange={handlechange} />
        <br />
        <input type="text" placeholder="Shop cap" name="capacity_seats" value={shop.capacity_seats} onChange={handlechange} />
        <br />
       
        
       
        <button type="submit" onClick={registerShop}>Shop Reg</button>
    </div>
    )
}

export default ShopRegister;