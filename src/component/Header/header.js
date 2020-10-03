/* eslint-disable no-fallthrough */
import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowDropDownCircleRoundedIcon from "@material-ui/icons/ArrowDropDownCircleRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { headerStyles } from "./headerStyles";
import { connect } from "react-redux";
import { logoutUser } from "../../store/user";

const Header = props => {
  const classes = headerStyles();
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    history.push("/editProfile");
  };
  const handleLogOut = () => {
    props.logoutUser();
    history.push("/login");
  };

  const handleHome = () => {
    history.push("/dashboard");
  };

  useEffect(() => {
    let user_details = JSON.parse(localStorage.getItem("user_details"));
    setUsername(user_details.firstName + " " + user_details.lastName);
    localStorage.setItem(
      "logggedInUsername",
      user_details.firstName + " " + user_details.lastName
    );
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbarStyle}>
          <Typography className={classes.welcomeFont}>
            Welcome, {username}
          </Typography>
          &nbsp; &nbsp; <HomeRoundedIcon onClick={handleHome} />
          <div className={classes.toolbarMenu}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <ArrowDropDownCircleRoundedIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              getContentAnchorEl={null}
              anchorEl={anchorEl}
              anchorOrigin={{
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
