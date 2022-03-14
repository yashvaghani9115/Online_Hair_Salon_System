import React from 'react';
import { FcExpired } from 'react-icons/fc';
import { Card, Button } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

function VerificationRejected() {
    const history = useHistory()
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight:"100vh",
        backgroundImage: "url('/img/bg3.jpg')"
    }

    function editshop(){
        history.push('/editShop');
    }
    
    return (
        <>
            <div className="pt-5 text-center" style={style} >
                <Card style={{ width: "50%", margin: "auto" }} >
                    <Card.Header className="h1">Verification Status</Card.Header>
                    <Card.Body>
                        <FcExpired className='my-4' style={{fontSize:"70px"}} />
                        <Card.Text style={{fontSize:"25px"}}>
                            Your shop verification is <strong className='text-black'>rejected</strong> , check and your edit shop details.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={editshop} variant="primary">Edit Now!</Button>
                    </Card.Footer>
                </Card>
            </div>
        </>
    )
}

export default VerificationRejected;