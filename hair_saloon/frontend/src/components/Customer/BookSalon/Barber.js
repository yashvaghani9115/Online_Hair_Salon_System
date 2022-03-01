import React,{useState} from "react";
import { Button, Card, Badge } from 'react-bootstrap';
import SummaryModal from "./SummaryModal";

function Barber({ b,selectedSalon }) {
    const [showSummary, setShowSummary] = useState(false);
    // async function book(){
    //     var res = await fetch("http://localhost:9700/customer/bookbarbar", {
    //   method: "POST",
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
        
    //   })
    // })

    // res = await res.json();

    // if (res.wentWrong) {
    //   alert(res.message);
    //   // setHeader("Something Wrong");
    //   // setMsg(res.message);
    //   // setShow(true);
    // } else {
    //   if (res.stat) {
    //     setOwner(res.owner);
    //   } else {
    //     // setHeader("Invalid");
    //     // setMsg(res.message);
    //     // setShow(true);
    //   }
    // }
    // }
    return (
        <>
        <div className="col-md-4 my-2" >
            <Card className="border border-primary">
                <center><Card.Header as="h5" className="bg-primary text-white">{b.name}</Card.Header></center>
                <Card.Body>
                    <Card.Title>
                        <div >
                            No. In Queue :  <Badge bg="dark">{b.customer_ids.length + 1}</Badge>
                        </div>
                    </Card.Title>
                    <Card.Text style={{fontSize:"12px"}}>
                        <hr/>
                        Email : {b.email}<br />
                        Mobile No : {b.mobile_num}
                    </Card.Text>
                    <hr/>
                    <center><Button variant="success" onClick={()=>setShowSummary(true)} >Book My Seat Now</Button></center>
                </Card.Body>
            </Card>
        </div>
        <SummaryModal show={showSummary} setShow={setShowSummary} selectedBarber={b} selectedSalon={selectedSalon}/>
        </>
    )
}

export default Barber;