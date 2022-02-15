import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Card, Button } from "react-bootstrap";

function AdminPage({ setCust }) {
  const history = useHistory();
  const [list,setList] = useState([]);
  let index = 0;
  

  async function getList() {
    var res = await fetch("http://localhost:9700/admin/getlist", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verified: "pending",
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
        setList(res.shoplist);
        

      } else {
        // setHeader("Invalid");
        // setMsg(res.message);
        // setShow(true);
      }
    }
  }
  
  async function approve(id,state){
    // alert(id);
    var res = await fetch("http://localhost:9700/admin/approveRegistration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:id,
        approve:state
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
        alert(res.message);
        window.location.reload(true);
        

      } else {
        // setHeader("Invalid");
        // setMsg(res.message);
        // setShow(true);
      }
    }

  }
  useEffect(() => {
    getList();
  }, []);
  const td = list.map((o) => {
    return (
      <tr>
        <td><strong>{++index}</strong></td>
        <td>{ o.owner_name  }</td>
        <td>{o._doc.shop_name}</td>
        <td style={{textAlign:"left"}}>
          <li><strong>Location :</strong> {o._doc.address} </li>
          <li><strong>gender typpe:</strong>{o._doc.salon_gender_type}</li>
        </td>
        <td>
          <Button variant="primary" size="sm" onClick={() => {approve(o._doc._id,"Accept")}}>
            Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => {approve(o._doc._id,"Reject")}}>
            Remove
          </Button>
        </td>
      </tr>
    );
  });
  
  return (
    <div className="mt-5 text-center">
      <Card style={{ width: "70%", margin: "auto" }}>
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
              <tbody>{td}</tbody>
            </Table>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
      
          <Button variant="primary" onClick={()=>window.location.reload(true)}>Refresh</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default AdminPage;
