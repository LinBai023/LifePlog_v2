import React, {useState, useEffect, useContext} from "react";
import ReactMapGL ,  { NavigationControl, Marker} from 'react-map-gl';
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import PinIcon from './PinIcon';
import Context from '../context';
import Blog from './Blog';

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4367,
  zoom: 13
}

const Map = ({ classes }) => {
  const {state, dispatch} = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, [])

  {/* get user's current location */}
  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log('position', position);
          const {latitude, longitude} = position.coords;
          setViewport({ latitude, longitude, ...viewport});
          setUserPosition({latitude, longitude});
        },
        console.error,
        {enableHighAccuracy: true},
      );
    }
  }

  const handleMapClick = ({ lngLat, leftButton}) => {
    if(!leftButton) return
    if(!state.draft) {
      dispatch({ type: "CREATE_DRAFT" })
    }
    const [longitude, latitude] = lngLat
    dispatch({
      type: "UPDATE_DRAFT_LOCATION",
      payload: { longitude, latitude }
    })
  }

  return (
    <div className={classes.root}>

      <ReactMapGL
        width="100vw"
        height="100vh"
        // height="calc(100vh - 100px)"
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxApiAccessToken="pk.eyJ1IjoiYmJiYmVybGluIiwiYSI6ImNrY3Fzb3R5cTE4NGwycXM1NDV1ZHl3dmoifQ.C46iDAPWZdhKhvefJF8Lbg"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >

      {/* zoom the map view */}
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>

      {/*pin for user's current position */}
      {userPosition &&
        <Marker
          latitude = {userPosition.latitude}
          longitude = {userPosition.longitude}
          offsetLeft={-20}
          offsetRight={-40}>
            <PinIcon size={30} color="#ffd180" />
          </Marker>
      }

      {/*draft pin */}
      {state.draft &&
        <Marker
          latitude = {state.draft.latitude}
          longitude = {state.draft.longitude}
          offsetLeft={-20}
          offsetRight={-40}>
            <PinIcon size={30} color="#ffd180" />
        </Marker>
      }
      </ReactMapGL>

      {/* Blog area */}
      <Blog />

    </div>);
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
