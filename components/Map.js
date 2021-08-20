import {useState} from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';

function Map({searchResult}) {
  const [selectionLocation, setSelectionLocation] = useState({});
  // Transfrom Result to object into the { latitude: 52.516272, longitude: 13.377722 },
  // { latitude: 51.515, longitude: 7.453619 },
  const cordinate = searchResult.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  console.log(selectionLocation);

  const center = getCenter(cordinate);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
    width: '100%',
    height: '100%',
  });
  return (
    <ReactMapGL
      mapStyle="mapbox://styles/ridwan226/ckskouqh030if18s0cj6j0paw"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewportChange) =>
        setViewport(nextViewportChange)
      }>
      {searchResult.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}>
            <p
              role="img"
              onClick={() => setSelectionLocation({result})}
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin">
              📌
            </p>
          </Marker>

          {/* The Popup Show if Click Marker */}
          {selectionLocation.long === result.long ? (
            console.log('false')
          ) : (
            <Popup
              onClick={() => setSelectionLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}>
              {result.title}
            </Popup>
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
