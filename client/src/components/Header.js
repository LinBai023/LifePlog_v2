import React, { useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Map from "@material-ui/icons/Map";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';

import Context from '../context';
import Signout from '../components/Auth/Signout';

// const Header = ({ classes }) => {
//   const{ state } = useContext(Context)
//   const { currentUser } = state
//   return (
//     <div className={classes.root}>
//       <AppBar position="static">
//         {/* Title/Logo */}
//         <div className={classes.grow}>
//           <MapIcon className={classes.icon} />
//             <Typography
//               component="h1"
//               variant="h6"
//               color="inherit"
//               noWrap
//             >
//               Life PLog
//             </Typography>
//         </div>

//         {/* current user info */}
//         {currentUser && (
//           <div className={classes.grow}>
//             <img
//               className={classes.picture}
//               src={currentUser.picture}
//               atl={currentUser.name}
//             />
//             <Typography
//               variant="h5"
//               color="inherit"
//               noWrap
//             >
//               {currentUser.name}
//             </Typography>
//           </div>
//         )}
//       </AppBar>
//     </div>
//   );
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "72px"
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    // alignItems: "center"
  },
  caption:{
    fontStyle: 'sans-serif',
    color: "#ffd180",
  },
  icon: {
    marginRight: theme.spacing.unit,
    // marginRight: theme.spacing(2),
    color: "#ffd180",
    fontSize: 30
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing.unit * 2
  }
});

const Header = ({ classes }) => {
  const{ state } = useContext(Context)
  const { currentUser } = state

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* Title/Logo */}
          <div className={classes.root}>
            <MapIcon className={classes.icon} />
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                className={classes.caption}
                noWrap
              >
                Life PLog
              </Typography>
          </div>

          {/* current user info */}
          {currentUser && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{currentUser.name}</MenuItem>
                </Menu>
            </div>
          )}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(Header);
