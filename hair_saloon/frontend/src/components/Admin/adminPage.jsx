import React, { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
import { Table, Card, Button, Modal, ModalBody } from "react-bootstrap";
import ModalInterface from "../Modal/ModalInterface";

function AdminPage() {
  // const history = useHistory();
  const [fullpath, setfullPath] = useState("");
  const [PrefixLink,setPrefixLink] = useState("")
  const [show, setShow] = useState(false);
  const [shops, setShopList] = useState([]);
  const [owners, setOwnerList] = useState([]);
  const [header, setHeader] = useState("");
  const [msg, setMsg] = useState("");
  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    backgroundImage: "url('/img/bg3.jpg')",
  };
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
        setPrefixLink(res.prefix_link);
        setShopList(res.shoplist);
        setOwnerList(res.ownerlist);
      } else {
        // setHeader("Invalid");
        // setMsg(res.message);
        // setShow(true);
      }
    }
  }

  async function approve(id, state) {
    // alert(id);
    var res = await fetch("http://localhost:9700/admin/approveRegistration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        approve: state,
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
  function set_modal(index) {
    setfullPath(PrefixLink + shops[index].images_pub_ids[0] + ".png");
    const shop = shops[index];
    const owner = owners[index];
    setHeader(shop.shop_name);
    setMsg(
      <div className="row shadow-lg p-3 mt-3 bg-white rounded">
        <div className="col-md-12 ml-0">
          <img
            className="img-fluid float-start "
            style={{ height: "200px" }}
            src={fullpath}
            alt="#"
          />
        </div>
        <div
          className="col-md-12 border-left pt-1"
          style={{ position: "relative" }}
        >
          <p
            style={{
              fontSize: "22px",
            
              fontFamily: "Monaco",
            }}
          >
             <b>Owner Email : </b>
            {owner.email}
            <br />
            <b>Owner Name : </b>
            {owner.name}
            <br />
            <hr/>
            <b>Shop Name : </b>
            {shop.shop_name}
            <br />
            <b>Gender : </b> {shop.salon_gender_type}
            <br />
            <b>Time : </b>
            {shop.opening_time} to {shop.closing_time}
            <br />
            <b>Seat Capacity : </b>
            {shop.capacity_seats}
            <br />
            <b>Address : </b>
            {shop.address}
            <br />
          </p>
        </div>
      </div>
    );
    setShow(true);
  }
  useEffect(() => {
    getList();
  }, []);
  let i = 1;
  let td = shops.map((o, index) => {
    return (
      <tr>
        <td>
          <strong>{i++}</strong>
        </td>
        <td>{o.shop_name}</td>
        <td style={{ textAlign: "left" }}>
          <li>
            <strong>Location :</strong> {o.address}{" "}
          </li>
          <li>
            <strong>gender typpe:</strong>
            {o.salon_gender_type}
          </li>
        </td>
        <td>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              set_modal(index);
            }}
          >
            Show Shop
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              approve(o._id, "Accept");
            }}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              approve(o._id, "Reject");
            }}
          >
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
          <Button
            variant="primary"
            onClick={() => window.location.reload(true)}
          >
            Refresh
          </Button>
        </Card.Footer>
      </Card>
      <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />
    </div>
  );
}

export default AdminPage;
