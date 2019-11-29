import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import PropTypes from 'prop-types';

const ParkingMap = props => {
  // Represent the viewport for the map as a state. Pass the setting function
  // to Mapbox as the callback for changes to viewport
  const [mapState, setMapState] = useState({
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 44.0086,
      longitude: -73.1783,
      zoom: 15
    }
  });

  const [key, setKey] = useState(''); // Represent MapBox API Key as state
  const [parkable, setParkable] = useState({});
  const [nonparkable, setNonparkable] = useState({});

  // Fetch and set the API key from server (saved in the .env)
  useEffect(() => {
    fetch('/api/map/key')
      .then(response => response.text())
      .then(body => {
        setKey(body);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const timeIn = props.timeIn.toString().replace(/\s+/g, '-');
    const timeOut = props.timeOut.toString().replace(/\s+/g, '-');
    fetch(`/api/map/filter/${props.userType}/${timeIn}/${timeOut}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setParkable(data.parkable);
        setNonparkable(data.nonparkable);
      })
      .catch(err => console.log(err));
  }, [props.userType, props.timeIn, props.timeOut]);

  // props.dataSet is loaded only one time in App.js
  // This loads the map with all lots having an overlay initially
  // Subsequent changes to parameters will set parkable properly
  useEffect(() => {
    setParkable(props.dataSet);
  }, [props.dataSet]);

  if (key !== '' && parkable) {
    return (
      <ReactMapGL
        {...mapState.viewport}
        mapboxApiAccessToken={key}
        onViewportChange={viewport => setMapState({ viewport })}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <Source id="parkable-regions" type="geojson" data={parkable}>
          <Layer
            id="parkable"
            type="fill"
            paint={{
              'fill-outline-color': '#105e01',
              'fill-color': '#4800b3',
              'fill-opacity': 0.75
            }}
          />
        </Source>
        <Source id="nonparkable-regions" type="geojson" data={nonparkable}>
          <Layer
            id="nonparkable"
            type="fill"
            paint={{
              'fill-outline-color': '#a10003',
              'fill-color': '#ff3d41',
              'fill-opacity': 0.75
            }}
          />
        </Source>
      </ReactMapGL>
    );
  } else {
    return <p>Loading...</p>;
  }
};

ParkingMap.propTypes = {
  userType: PropTypes.string.isRequired,
  dataSet: PropTypes.object.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired
};

export default ParkingMap;
