//const urls = "http://localhost:8080";
const urls = "https://mapapi.gebeta.app";
//const urls = "https://nmapapi.gebeta.app";
export const direction = async (start, newMarker, apiKey) => {
  const url =
    urls +
    "/api/v1/route/driving/direction/?la1=" +
    start.lat +
    "&lo1=" +
    start.lon +
    "&la2=" +
    newMarker.lat +
    "&lo2=" +
    newMarker.lng +
    "&apiKey=" +
    apiKey;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};

export const matrix = async (gmarker, apiKey) => {
  let startpoint = [];
  for (let i = 0; i < gmarker.length; i++) {
    let points = [];
    points.push(gmarker[i].lat);
    points.push(gmarker[i].lng);

    startpoint.push(points);
  }

  const url =
    urls +
    "/api/v1/route/driving/matrix/?start=" +
    startpoint +
    "&apiKey=" +
    apiKey;

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};

export const tss = async (gmarker, apiKey) => {
  let startpoint = [];
  for (let i = 0; i < gmarker.length; i++) {
    let points = [];
    points.push(gmarker[i].lat);
    points.push(gmarker[i].lng);

    startpoint.push(points);
  }

  const url =
    urls +
    "/api/v1/route/driving/tss/?start=" +
    startpoint +
    "&apiKey=" +
    apiKey;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    return err;
  }
};

export const oneToMany = async (start, gmarker, apiKey) => {
  let startpoint = [];
  for (let i = 0; i < gmarker.length; i++) {
    let points = [];
    points.push(gmarker[i].lat);
    points.push(gmarker[i].lng);

    startpoint.push(points);
  }
  const url =
    urls +
    "/api/v1/route/driving/onm/?la1=" +
    start.lat +
    "&lo1=" +
    start.lon +
    "&json=" +
    startpoint +
    "&apiKey=" +
    apiKey;
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export const geocoding = async (name, apiKey) => {
  const url =
    urls + "/api/v1/route/geocoding?name=" + name + "&apiKey=" + apiKey;
  try {
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    return error;
  }
};

//module.exports = { direction: direction,  matrix: matrix,  oneToMany: oneToMany,  tss: tss,  geocoding: geocoding }

//
