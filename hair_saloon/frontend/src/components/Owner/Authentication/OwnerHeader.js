import React, { useState } from "react";
import OwnerRegister from "../Authentication/OwnerRegister";
import ShopRegister from "../Authentication/ShopRegister";
function OwnerHeader() {
  const [state, setState] = useState(1);

  // create a handleClick function
  const handleClick = (State) => {
    setState(State);
  };
  return (
    <div style={{backgroundColor:"#42536e"}}>
      <div className="pt-5">
        <div className="card w-25 p-4 m-auto">
          <div className="card-body">
            <div className="position-relative" style={{ width: "100%" }}>
              <div className="progress" style={{ height: "1px" }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: state===1?"0%":"100%" }}
                //   aria-valuenow="25"
                //   aria-valuemin="0"
                //   aria-valuemax="100"
                ></div>
              </div>
              <button
                type="button"
                className= {`position-absolute top-0 start-0 translate-middle btn btn-sm btn-${state===1?"success":"primary"} rounded-pill`}
                style={{ width: "3rem", height: "3rem",fontSize:"10px" }}
              >
                1
              </button>
              <button
                type="button"
                className={`position-absolute top-0 start-100 translate-middle btn btn-sm btn-${state===2?"success":"primary"} rounded-pill`}
                style={{ width: "3rem", height: "3rem" }}
              >
                2
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {(() => {
          switch (state) {
            case 1:
              return <OwnerRegister handleClick={handleClick} />;
            case 2:
              return <ShopRegister handleClick={handleClick} />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default OwnerHeader;
