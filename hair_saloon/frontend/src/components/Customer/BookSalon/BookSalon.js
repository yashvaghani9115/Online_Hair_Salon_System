import React, { useState } from "react";

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
import ListBarbers from "./ListBarbers";

function BookSalon() {
  const style = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "max-content",
    backgroundImage: "url('/img/bg3.jpg')"
}
  const [basicActive, setBasicActive] = useState('tab1');
  const selectedSalon = JSON.parse(localStorage.getItem("selectedSalon"));
  const prefixLink = JSON.parse(localStorage.getItem("prefixLink"));
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <div style={style} className="pb-3">
      <SalonCarousel selectedSalon={selectedSalon} prefixLink={prefixLink} />
      <div className='container shadow-lg mt-4 rounded bg-white text-black' style={{ width: '60vw' }}>
        <MDBTabs className='mb-3 border-bottom '>
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
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={basicActive === 'tab4'}>
              Barbers Details
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
            <ListPhotos selectedSalon={selectedSalon} prefixLink={prefixLink}/>
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'tab4'}>
            <ListBarbers selectedSalon={selectedSalon}/>
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </div>
  );
}

export default BookSalon;
