import React, { useEffect, useState } from "react";
import { Table, Card, Button } from "react-bootstrap";
import ModalInterface from "../Modal/ModalInterface";
import ShopDetailsModal from "./ShopDetailsModal";

function AdminPage() {
  const [prefixLink, setPrefixLink] = useState("")
  const [showShopDetails, setShowShopDetails] = useState(false);
  const [fullList, setFullList] = useState([]);
  const [listObj,setListObj] = useState();
  const [show, setShow] = useState(false);
  const [header, setHeader] = useState("");
  const [msg, setMsg] = useState("");
  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
    backgroundImage: "url('/img/bg3.jpg')",
  };

  async function getfullList() {
    var res = await fetch("http://localhost:9700/admin/getfullList", {
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
    } else {
      if (res.stat) {
        setPrefixLink(res.prefix_link);
        setFullList(res.fullList);
      } 
    }
  }

  async function approve(id, state) {
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
      setHeader("Something Wrong");
      setMsg(res.message);
      setShow(true);
    } else {
      if (res.stat) {
        setHeader("Success");
        setMsg(res.message);
        setShow(true);
        window.location.reload(true);
      }
    }
  }
  function shownow(obj){
    setListObj(obj);
    setShowShopDetails(true);
  }
  useEffect(() => {
    getfullList();
  }, []);
  let i = 1;
  let td = fullList.map((obj, index) => {
    return (
      <tr  key={index}>
        <td>
          <strong>{i++}</strong>
        </td>
        <td>{obj.shop.shop_name}</td>
        <td style={{ textAlign: "left" }}>
          <li>
            <strong>Location :</strong> {obj.shop.address}{" "}
          </li>
          <li>
            <strong>gender typpe:</strong>
            {obj.shop.salon_gender_type}
          </li>
        </td>
        <td>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => shownow(obj)}
          >
            Show Full Details
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              approve(obj.shop._id, "Accept");
            }}
          >
            Approve
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              approve(obj.shop._id, "Reject");
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
      {listObj && <ShopDetailsModal show={showShopDetails} onHide={() => setShowShopDetails(false)} listObj={listObj} prefixLink={prefixLink} />}
      <ModalInterface show={show} setShow={setShow} header={header} msg={msg} />
    </div>
  );
}

export default AdminPage;
