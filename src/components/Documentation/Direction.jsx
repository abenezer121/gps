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
const default_latitude = 9.00566;
const default_longitude = 38.80114;


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
const houseids = [
  {
    id : "1419",
    gridId : "89529b79463ffff",
    foundInGrid : "et-aa-bole-woreda5-1419",
    latitude : 9.00566 ,
    longitude : 38.80114
  },
  {
    id : "2022",
    gridId : "89529b7941bffff",
    foundInGrid : "et-aa-bole-woreda5-2022",
    latitude  : 9.0113635,
    longitude : 38.8003394
  },
  {
    id : "2143",
    gridId : "89529b79693ffff",
    foundInGrid : "et-aa-bole-woreda1-2143",
    latitude : 9.00505,
    longitude : 38.78591
  }
]

const foundInHouseIds = (hex) => {
  for(let i=0; i < houseids.length; i++){
    if(houseids[i].gridId == hex) return {name : houseids[i].id , index : i}; 
  }
  return {name : null , index : null};
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
  let ii =  foundInHouseIds(hex.toString())   
  //{name : null , index : null}
  if(ii.name != null){ 
    let id = 'et-'+'aa-'+'bole-'+woredaName+'-'+ii.name;
    console.log(id)
    console.log(hex)   
    alert(id)
  }else{
    let id = 'et-'+'aa-'+'bole-'+woredaName+'-'+returnUniqueId(result);
    
    alert(id)
  }
 
 


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

const [username, setUserName] = useState("");
const [pos, setPos] = useState([]);
const [rmarker, redMarker] = useState([]);
const [gmarker, greenMarker] = useState([]);


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



const handleUsername = (event) => {
  setUserName(event.target.value);
};
 
const directionC = (lat1 , lng1 ,lat2 , lng2) => {


 
  greenMarker([
    { lat: lat1, lng: lng1 }
  ]);

  redMarker([
    { lat: lat2, lng: lng2}
  ]);
  const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb21wYW55bmFtZSI6IkdlYmV0YTEiLCJpZCI6ImE0YzRhYTIxLWJkOWEtNDZkOS04ZDg0LTIzOWVkOWFiYzIxNCIsInVzZXJuYW1lIjoiZ2ViZXRhMSJ9.tsX7gUNLshPSsXTDoqX5MDBXcjakgc1dilSSZlggQq8";
  direction({ lat :lat1 , lon :lng1} , {lat : lat2 , lng:lng2} ,apiKey).then((data)=>{
   
    setPos(data.direction)
  })

}
return (


    <div class="flex flex-row w-full h-screen divide-y divide-solid">
  
    <div class="bg-white  w-[20%] items-center">
    
          <label for="search" class="sr-only">Search</label>
          <div class="relative mx-[5%] mt-[25%]">
            <input onChange={handleUsername} type="search" id="search" class="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-l-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search..."/>
            {/* <button type="submit" class=" mt-[5%] w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={ (e) => setSearchValueData(e) }
            >Search</button> */}
          </div>

          <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
           <div className="mx-[5%]  ">
              {
                houseids.map((n)=>{
                  if( username.trim() != "" &&  n.foundInGrid.includes(username.trim())) {
                     return <button type="submit" class=" mt-[5%] w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
             onClick={ (e) => {
              e.preventDefault()
              directionC(9.021456009795491, 38.75394910263811 , n.latitude , n.longitude )
             } }
            >{n.foundInGrid}</button>
                     
                  }
                  
                })
              }
          </div>
   
    </div>
    <div class=" w-[80%]">

    <div className="leaflet-container">
      <MapContainer center={[default_latitude, default_longitude]} zoom={14}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
         {geojsonLayer}
        {/* <AddMarkerToClick /> */}

        {rmarker.map((marker) => (
        <Marker position={[rmarker[0].lat , rmarker[0].lng]} icon={RedIcon}>
          <Popup>Marker is at {marker}</Popup>
        </Marker>
      ))}

      {gmarker.map((marker) => (
        <Marker position={[gmarker[0].lat , gmarker[0].lng]} icon={GreenIcon}>
          <Popup>Marker is at {marker}</Popup>
        </Marker>
      ))} 


        <Polyline positions={pos} color="red" />
      </MapContainer>
    </div>
    </div>
</div>

   
  );
}

export default Direction;
