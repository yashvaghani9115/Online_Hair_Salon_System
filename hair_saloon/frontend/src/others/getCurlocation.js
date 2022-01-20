function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getPosInState);
    } else { 
    //   x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

export default function getPosInState(position) {
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
    return position;
}
