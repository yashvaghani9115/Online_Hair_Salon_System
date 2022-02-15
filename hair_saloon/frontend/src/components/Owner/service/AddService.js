import React, { useState } from "react";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { MDBInput } from "mdbreact";

function AddService() {
  const [show, setShow] = useState(false);
  const [header, setHeader] = useState("");
  const [msg, setMsg] = useState("");
  const [service, setService] = useState({
    service_name: "",
    price: 0,
    gender_type: true, //t : male,f:female
    category: "",
  });
  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: "url('/img/service.jpg')"
  }

  async function addService() {
    if (
      service.category &&
      service.price &&
      service.service_name
    ) {
      var res = await fetch("http://localhost:9700/owner/addService", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_name: service.service_name,
          gender_type: service.gender_type,
          price: service.price,
          category: service.category,
          owner_id:JSON.parse(localStorage.getItem('owner'))
        }),
      });
      res = await res.json();
      if (res.wentWrong) {
        // alert(res.message);

        setHeader("Something Wrong");
        setMsg(res.message);
        setShow(true);
      } else {
        if (res.stat) {
          setHeader("Success");
          setMsg(res.message);
          setShow(true);
          // history.push('/ownerService');
        } else {
          setHeader("Invalid");
          setMsg(res.message);
          setShow(true);
        }
      }
    } else {
      setHeader("Invalid");
      setMsg("Input Field can't be blank");
      setShow(true);
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;

    setService({
      ...service,
      [name]: value,
    });
  }
  return (
    <div style={style} className="main">
      <div className="d-flex justify-content-center">
        <div
          className="col-md-8 bg-white"
          style={{ borderRadius: "25px", boxShadow: "3px 3px rgb(33,34,41)" }}
        >
          <div className="mt-4">
            <h3 className="card-header text-white bg-dark">AddService</h3>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div style={{ border: "solid", borderRadius: "10px" }} className="m-2 p-2 text-dark" >
                <h2>Please FillUp the Form</h2>
                <div className="form-group">
                  <MDBInput
                    containerClass="text-left text-dark"
                    label="Service Name"
                    type="text"
                    name="service_name"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <MDBInput
                    containerClass="text-left text-dark"
                    label="Price"
                    type="number"
                    name="price"
                    onChange={handleChange}
                  />
                  <div className="form-group">
                    <Dropdown style={{ marginRight: "16px" }}>
                      <Dropdown.Toggle variant="dark" className="form-control p-2">
                        Select Gender
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="bg-dark">
                        <Dropdown.Item
                          className="text-primary"
                          onClick={() => {
                            setService({ ...service, gender_type: true });
                          }}
                        >
                          Male
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-primary"
                          onClick={() => {
                            setService({ ...service, gender_type: false });
                          }}
                        >
                          Female
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>

                    <MDBInput
                      containerClass="text-left text-dark"
                      label="Gender"
                      value={service.gender_type ? "Male" : "Female"}
                      title="please select from below"
                    />

                  </div>
                  <div className="form-group">
                    <Dropdown style={{ marginRight: "16px" }}>
                      <Dropdown.Toggle variant="dark" className="form-control p-2">
                        Select category
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="bg-dark">
                        {service.gender_type ? (
                          <>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Hair Style",
                                });
                              }}
                            >
                              Hair Style
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Hair Coloring",
                                });
                              }}
                            >
                              Hair coloring
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({ ...service, category: "Shaving" });
                              }}
                            >
                              Shaving
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Head Massage",
                                });
                              }}
                            >
                              Head Massage
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Facials and skin care",
                                });
                              }}
                            >
                              Facials and skin care
                            </Dropdown.Item>
                          </>
                        ) : (
                          <>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Hair Style",
                                });
                              }}
                            >
                              Hair Style
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Hair coloring",
                                });
                              }}
                            >
                              Hair coloring
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({ ...service, category: "Waxing" });
                              }}
                            >
                              Waxing
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Head Massage",
                                });
                              }}
                            >
                              Head Massage
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Nail Treatments",
                                });
                              }}
                            >
                              Nail Treatments
                            </Dropdown.Item>
                            <Dropdown.Item
                              className="text-primary"
                              onClick={() => {
                                setService({
                                  ...service,
                                  category: "Facials and skin care",
                                });
                              }}
                            >
                              Facials and skin care
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>

                    <MDBInput
                      containerClass="text-left text-dark"
                      value={service.category}
                      title="Please select from below "

                      label="Category"
                    />

                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 text-right mt-5">
              <img
                src="https://mdbootstrap.com/img/Photos/new-templates/bootstrap-registration/draw1.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>

          <Button
            variant="blue"
            style={{ borderRadius: "20px" }}
            className="col-6 mb-5"
            onClick={addService}
          >
            Add
          </Button>
          <Modal size="md" show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {header}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-light">{msg}</Modal.Body>
            <Modal.Footer>
              <Button
                style={{ borderRadius: "20px" }}
                onClick={() => setShow(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AddService;
