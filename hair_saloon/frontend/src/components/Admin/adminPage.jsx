import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Table, Card, Button, Modal, ModalBody } from "react-bootstrap";

function AdminPage() {
  // const history = useHistory();
  const[show,setShow] = useState(false)
  const [shops,setShopList] = useState([]);
  const [owner,setOwnerList] = useState([]);
  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    backgroundImage: "url('/img/bg3.jpg')"
}
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
    // console.log(res)
    if (res.wentWrong) {
      alert(res.message);
      // setHeader("Something Wrong");
      // setMsg(res.message);
      // setShow(true);
    } else {
      if (res.stat) {
        // let shop = {name:res.shoplist[0].owner_id,location:res.shoplist[0].location_id,gender:res.shoplist[0].salon_gender_type,shop_name:res.shoplist[0].shop_name};
        setShopList(res.shoplist);
        setOwnerList(res.ownerlist);
        // console.log(res.shoplist)
        

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
  
  let td = shops.map((o,index) => {
    let i =0;
    return (
      <tr>
        <td><strong>{++index}</strong></td>
        <td>{o.shop_name}</td>
        <td style={{textAlign:"left"}}>
          <li><strong>Location :</strong> {o.address} </li>
          <li><strong>gender typpe:</strong>{o.salon_gender_type}</li>
        </td>
        <td>
        <Button variant="secondary" size="sm" onClick={()=>{
          setShow(true)
        }} >
          Show Shop
        </Button>
          <Button variant="primary" size="sm" onClick={() => {approve(o._id,"Accept")}}>
            Approve
          </Button>
          <Button variant="danger" size="sm" onClick={() => {approve(o._id,"Reject")}}>
            Remove
          </Button>
        </td>
      </tr>
    );
  });
  
  return (
    <div className="pt-5 text-center" style={style}>
      <Card style={{ width: "70%", margin: "auto" }}>
        <Card.Header className="h1">Admin Page</Card.Header>
        <Card.Body className="overflow-auto">
          <Card.Text>
            <Table bordered hover>
              <thead className="bg-dark text-white">
                <tr>
                  <th>#</th>
                  <th>Shop Name</th>
                  <th>Details</th>
                  {/* <th>Show Shop</th> */}
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
      <Modal
            size="md"
            show={show}
            onHide={() => setShow(false)}

        >
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                  Shop
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='bg-light'>Shop Details</Modal.Body>
            <Modal.Footer>
                <Button style={{ borderRadius: "20px" }} onClick={() => setShow(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  );
}

export default AdminPage;
