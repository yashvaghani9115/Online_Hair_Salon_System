import React, { useEffect, useState } from 'react';
import OwnerSidebar from './OwnerSidebar';
import { Card, Button, Dropdown,Table } from 'react-bootstrap';
function OwnerHome() {
    const [selectedbarber, setSelectedBarber] = useState();
    const [barberList,setBarberList] =useState([]);
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg3.jpg')"
    }
    async function fetchBarberList() {
        var res = await fetch("http://localhost:9700/owner/listBarbers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                owner_id: await JSON.parse(localStorage.getItem("owner"))._id
            })
        })

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);

        } else {
            if (res.stat) {
                setBarberList(res.barbers);
                setSelectedBarber(res.barbers[0]);
            } else {
                alert(res.message);
            }
        }

    }
    useEffect(()=>{
        fetchBarberList();
    },[])
    return (<>
        <div className='container-fluid' style={style} >
            <div className='row'>
                <div className='col-auto p-0'>
                    <OwnerSidebar />
                </div>
                <div className='col-auto' style={{ width: "75%" }} >
                    <div>
                        <Card style={{ width: "80%", margin: "auto", marginTop: "2em" }} >
                            <Card.Header className="h1 row m-0" style={{ backgroundColor: "#383838", color: "white" }}>
                                <div className='col - 8 h2'>
                                    Barber : {selectedbarber?selectedbarber.name : "not selected"}

                                </div>
                                <div className='col-4 text-right'>
                                    <Dropdown style={{ marginRight: "16px" }}>
                                        <Dropdown.Toggle variant="success" >
                                            Select Barber
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="bg-white">
                                            {barberList.map((b,index)=>{
                                                return (<Dropdown.Item
                                                key={index}
                                                className="text-primary"
                                                onClick={()=>{setSelectedBarber(b)}}
                                            >
                                                {b.name}
                                            </Dropdown.Item>)
                                            })}
                                            
                                          
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>


                            </Card.Header>
                            <Card.Body style={{ height: "60vh", overflow: "auto" }}>
                                <Card.Text >
                                            
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    </>

    )
}

export default OwnerHome;
