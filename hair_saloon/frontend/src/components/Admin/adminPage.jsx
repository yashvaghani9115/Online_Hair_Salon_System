import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";

function AdminPage({ setCust }) {
  const history = useHistory();
  const owners = [{
       
      name:"yash",
      shop_name:"salon 1",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    },
    {
         
        name:"hey",
      shop_name:"salon 2",
      location:"xyz",
      gender:"F",
    }]
    let index=0;
    const td = owners.map((o)=>{
       return  (<tr>
                    <td>{++index}</td>
                    <td>{o.name}</td>
                  <td>{o.shop_name}</td>
                  <td>Location : {o.location} <br/>gender typpe:{o.gender} </td>
                  <td>
                      <Button variant="primary" size="sm">Approve</Button>
                      <Button variant="danger" size="sm">Remove</Button>
                  </td>
        </tr>)
    })


  return (
    <div className="mt-5" >
      <Card style={{ width: "70%",margin:"auto" }} >
        <Card.Header className="h1">Admin Page</Card.Header>
        <Card.Body>
          <Card.Text>
            <Table bordered hover>
              <thead className="bg-dark text-white">
                <tr>
                  <th>#</th>
                  <th>Owner Name</th>
                  <th>Shop Name</th>
                  <th>Details</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {td}
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Go somewhere</Button>

        </Card.Footer>
      </Card>
    </div>
  );
}

export default AdminPage;
