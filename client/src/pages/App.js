import React from "react";

import Header from '../components/Header';
import Map from '../components/Map';
import withRoot from "../withRoot";

// const styles = theme  => ({
//   root: {
//     flexGrow: 1,
//   },
// });

const App = () => {

  return (
  // two components are needed, so wrap them into fragnent
  <>
    <Header />
    <Map />
  </>

  // <Grid container spacing={1}>
  //   <Grid item xs={12} spacing={2} >
  //       <Header />
  //   </Grid>
  //   <Grid item xs={12} spacing={2} >
  //     <Map />
  //   </Grid>
  // </Grid>
  )
};

// export default withStyles(styles)(App);

export default withRoot(App);
