import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import AboutSalon from "./AboutSalon";
import ListServices from "./ListServices";
import ListPhotos from "./ListPhotos";
import SalonCarousel from "./SalonCarousel";

function BookSalon() {
  const [basicActive, setBasicActive] = useState('tab1');
  // const [selectedSalon,setSelectedSalon] = useState(JSON.parse(localStorage.getItem("selectedSalon")));
  const selectedSalon = JSON.parse(localStorage.getItem("selectedSalon"));
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <SalonCarousel selectedSalon={selectedSalon} />
      <div className='container shadow-lg my-4 rounded' style={{ width: '60vw' }}>
        <MDBTabs className='mb-3 border-bottom'>
          <MDBTabsItem >
            <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
              Hair Styles
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
              About
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
              Photos
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent style={{ paddingBottom: '10px' }}>
          <MDBTabsPane show={basicActive === 'tab1'}>
            <ListServices selectedSalon={selectedSalon} />
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'tab2'}>
            <AboutSalon selectedSalon={selectedSalon} />
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'tab3'}>
            <ListPhotos />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </>
  );
}

export default BookSalon;
