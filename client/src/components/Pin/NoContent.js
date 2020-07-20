import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";

const NoContent = ({ classes }) => (
  <div className={classes.root}>
    <ExploreIcon className={classes.icon} />
    <Typography
      noWrap
      align="center"
      gutterBottom
      className={classes.graphy}>
      Start to explore your journal
    </Typography>
  </div>
);

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    color:"#ffd180"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: "80px"
  },
  graphy: {
    color:"#ffd180"
  }
});

export default withStyles(styles)(NoContent);
