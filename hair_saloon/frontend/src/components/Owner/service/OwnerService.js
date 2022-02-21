import React, { useEffect, useState } from 'react';
import { Button, Table, Card, Nav } from 'react-bootstrap';
import { GrAddCircle } from 'react-icons/gr';
import OwnerSidebar from '../OwnerSidebar';


function OwnerService() {
    const [list, setList] = useState([]);
    const [print_list, Setprintlist] = useState([]);
    let index = 0;
    const style = {
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage: "url('/img/bg3.jpg')"
    }



    async function getList() {
        var res = await fetch("http://localhost:9700/owner/listServices", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                shop_id: JSON.parse(localStorage.getItem('shop'))._id
            }),
        });

        res = await res.json();

        if (res.wentWrong) {
            alert(res.message);
            // setHeader("Something Wrong");
            // setMsg(res.message);
            // setShow(true);
        } else {
            if (res.stat) {
                // let shop = {name:res.shoplist[0].owner_id,location:res.shoplist[0].location_id,gender:res.shoplist[0].salon_gender_type,shop_name:res.shoplist[0].shop_name};
                setList(res.servicelist);



            } else {
                // setHeader("Invalid");
                // setMsg(res.message);
                // setShow(true);
            }
        }
    }
    async function set_list(cat) {
        const tmp = list.filter((x) => x.category === cat)
        // console.log(tmp)
        Setprintlist(tmp.map((o) => {

            return (
                <tr>
                    <td>
                        {++index}
                    </td>
                    <td>
                        {o.service_name}
                    </td>
                    <td>
                        {o.price}
                    </td>
                    <td>
                        {o.gender_type ? "MALE" : "FEMALE"}
                    </td>

                    <td style={{ width: "35%" }}>
                        <Button size='sm' variant='orange'>
                            Edit
                        </Button>
                        <Button size='sm' variant='danger'>
                            Delete
                        </Button>
                    </td>
                </tr>
            );
        })
        )


    }
    useEffect(() => {
        getList().then(
            set_list("Hair_Style")
        );

    }, []);

    return (
        <div className='container-fluid' style={style} >
            <div className='row'>
                <div className='col-auto p-0'>
                    <OwnerSidebar />
                </div>
                <div className='col-auto' style={{ width: "80%" }} >

                    <div>


                        <Card style={{ width: "80%", margin: "auto", textAlign: "center", marginTop: "2em" }} >
                            <Card.Header className="h1">Sevices
                                <Button href="/addService" className="btn btn-success float-right">
                                    Add <GrAddCircle size={20} style={{ marginBottom: "2px" }} />
                                </Button>
                            </Card.Header>
                            <Card.Header className='bg-light'>
                                <div >

                                    <Nav variant="pills" defaultActiveKey="Hair Style">
                                        <Nav.Item>
                                            <Nav.Link onClick={() => {
                                                set_list("Hair Style")
                                            }} eventKey="Hair Style">Hair Style</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => {
                                                set_list("Hair coloring")
                                            }} eventKey="Hair coloring" >Hair coloring</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Shaving") }} eventKey="Shaving" >Shaving</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Head Massage") }} eventKey="Head Massage" >Head Massage</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Facials and skin care") }} eventKey="Facials and skin care" >Facials and skin care</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Waxing") }} eventKey="Waxing" >Waxing</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => { set_list("Nail Treatments") }} eventKey="Nail Treatments" >Nail Treatments</Nav.Link>
                                        </Nav.Item>




                                    </Nav>
                                </div>

                            </Card.Header>
                            <Card.Body >
                                <Card.Text >
                                    <Table bordered hover >
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <th>
                                                    No.
                                                </th>
                                                <td>
                                                    Name
                                                </td>
                                                <td>
                                                    Price
                                                </td>
                                                <td>
                                                    Gender
                                                </td>

                                                <td>
                                                    Operation
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {!(print_list.length === 0) ?
                                                print_list
                                                : (<tr>
                                                    <td colSpan={5}>No list Found</td>
                                                </tr>)}
                                        </tbody>
                                    </Table>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default OwnerService;