import {
  MapContainer,
  TileLayer,
  Polyline,
  useMapEvents,
  Marker,
  Popup,
  Polygon,
  FeatureGroup,
  EditControl,
  GeoJSON
} from "react-leaflet";
import { useState } from "react";
import { returnBole , checkInWhichWoreda , returnUniqueId } from "../../data/coordinates";
import { direction } from "./../../data/index";
import red from "./red.png";
import green from "./green.png";
import L from "leaflet";
const h3 = require("h3-js");
const default_latitude = 9.02151;
const default_longitude = 38.80115;



const polygon = returnBole()




function AddMarkerToClick() {
  const [rmarker, redMarker] = useState([
    
            
  ]);
  const [gmarker, greenMarker] = useState([
 
  ]);

  const [pos, setPos] = useState([
  

   
  ]);
  const [l1, setL1] = useState("");
  const [lo1, setLO1] = useState("");

  const RedIcon = L.icon({
    iconUrl: require("./red.png"),
    iconRetinaUrl: require("./red.png"),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });

  const GreenIcon = L.icon({
    iconUrl: require("./green.png"),
    iconRetinaUrl: require("./green.png"),
    iconAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: [35, 35],
    className: "leaflet-venue-icon",
  });

  const map = useMapEvents({
    async click(e) {
      const newMarker = e.latlng;
      if (l1 == "") {
        setL1(newMarker.lat);
        setLO1(newMarker.lng);
        let _gmarker = [];
        _gmarker.push(e.latlng);
        greenMarker(_gmarker);
      } else {
        try {
          let data = await direction(
            { lat: l1, lon: lo1 },
            newMarker,
            'sdsd'
          );
          let _rmarker = [];

          _rmarker.push(e.latlng);
          redMarker(_rmarker);
          console.log(data);
          if (data.msg == "Ok") {
            setPos(data.direction);
          }
        } catch (err) {
          console.log(err);
        }
        setL1("");
        setLO1("");
      }
    },
  });

  return (
    <div>
      {rmarker.map((marker) => (
        <Marker position={marker} icon={RedIcon}>
          <Popup>Marker is at {marker}</Popup>
        </Marker>
      ))}

      {gmarker.map((marker) => (
        <Marker position={marker} icon={GreenIcon}>
          <Popup>Marker is at {marker}</Popup>
        </Marker>
      ))}

      <Polyline positions={pos} color="red" />
    </div>
  );
}

function Direction() {


const grid = h3.polygonToCells(polygon, 9);



function hexToBinary(hex) {
  // Convert hex to decimal
  let decimal = parseInt(hex, 16);
  // Convert decimal to binary
  let binary = "";
  while (decimal > 0) {
    // Get the remainder of dividing by 2
    let remainder = decimal % 2;
    // Add the remainder to the binary string
    binary = remainder + binary;
    // Divide the decimal by 2 and round down
    decimal = Math.floor(decimal / 2);
  }
  // Return the binary string
  return binary;
}



const features = grid.map((hex) => ({
  type: "Feature",
  properties: {
    hex: hex.toString() // Convert hex to a string if it's not already
  },
  geometry: {
    type: "Polygon",
    coordinates: [h3.cellToBoundary(hex, true)]
  },
  onClick: () => {
    // Handle click event for the grid cell

    let woredaName = "null"
    let boundary = h3.cellToBoundary(hex , true)
    for(let i=0; i < boundary.length; i++){
      let getWoreda = checkInWhichWoreda(boundary[i][1] , boundary[i][0])
      if(getWoreda != "null"){
        woredaName = getWoreda;
        break;
      }
    }

    
  let n = 4; // number of parts
  let parts = []; // create an empty array for parts
 
  for (let i = 0; i < hex.length; i += n) { // use a for loop with step size
    parts.push(hex.slice(i, i + n)); // use slice method and push to array
  }
  let result = parts.map(p =>  parseInt(hexToBinary(p), 2));
  let id = 'et-'+'aa-'+'bole-'+woredaName+'-'+returnUniqueId(result);
  alert(id)


    // Add your custom logic here
  }
}));


const geojsonLayer = (
  <GeoJSON
    data={features}
    style={{
      color: "blue",
      weight: 1,
      fillOpacity: 0.0
    }}

    onEachFeature={(feature, layer) => {
      layer.on({
        click: feature.onClick // Attach the onClick handler to the layer
      });
    }}
  />
);


  return (
    <div className="leaflet-container">
      <MapContainer center={[default_latitude, default_longitude]} zoom={18}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         {geojsonLayer}
        {/* <AddMarkerToClick /> */}
      </MapContainer>
    </div>
  );
}

export default Direction;
