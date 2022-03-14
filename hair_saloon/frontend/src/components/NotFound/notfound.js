import React from 'react';
import { Button, Card } from 'react-bootstrap';

function NotFound() {
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        backgroundImage: "url('/img/bg3.jpg')"
    }

    return (
        <>
            <div className='main' style={style} >
                <div className='d-flex justify-content-center' style={{ textAlign: "center" }}>
                    <div className='col-lg-8 bg-white ' style={{ borderRadius: "25px", boxShadow: "0px 0px 1px 5px white" }} >
                        <Card >
                            <Card.Header>
                                <h1>
                                    404 Not Found!
                                </h1>
                            </Card.Header>
                            <Card.Body>
                                <div className='h2'>
                                    Oops!Requested page not found!
                                </div>
                            </Card.Body>
                            <Card.Footer>
                                <Button className='btn btn-secondary' href='/'>Home</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound;