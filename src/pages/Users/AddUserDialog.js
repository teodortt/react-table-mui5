import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const initialUser = {
  firstName: "",
  lastName: "",
  age: 0,
  visits: 0,
  status: "single",
  progress: 0,
  subRows: undefined
};

const AddUserDialog = (props) => {

  // menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
          New User
        </IconButton>
      </MenuItem>

    </Menu>
  );




  function BasicBreadcrumbs() {
    return (
      <div role="presentation" style={{ paddingBottom: '10px' }}>
        <p><b>User List</b></p>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="white" href="/">
            Dashboard
          </Link>
          <Link
            underline="hover"
            color="white"
            href="/getting-started/installation/"
          >
            User
          </Link>
          <Typography color="white">List</Typography>
        </Breadcrumbs>
      </div>
    );
  }
  // end menu

  const [user, setUser] = useState(initialUser);
  const { addUserHandler } = props;
  const [open, setOpen] = React.useState(false);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false
  });

  const handleSwitchChange = (name) => (event) => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const handleAdd = (event) => {
    addUserHandler(user);
    setUser(initialUser);
    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
  };

  return (
    <div>
      {/* <Tooltip title="Add">
        <IconButton aria-label="add" style={{ borderRadius: 10, background: '#65a665', color: 'white', paddingInline: '20px' }} onClick={handleClickOpen}>
          <AddIcon />
          New User
        </IconButton>
      </Tooltip> */}

      {/*  */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <BasicBreadcrumbs />
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              MUI
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="Add">
                <IconButton aria-label="add" style={{ borderRadius: 7, background: '#65a665', color: 'white', paddingInline: '15px' }} onClick={handleClickOpen}>
                  <AddIcon />
                  New User
                </IconButton>
              </Tooltip>

            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

      {/*  */}




      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>Demo add item to react table.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            value={user.firstName}
            onChange={handleChange("firstName")}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            value={user.lastName}
            onChange={handleChange("lastName")}
          />
          <TextField
            margin="dense"
            label="Age"
            type="number"
            fullWidth
            value={user.age}
            onChange={handleChange("age")}
          />
          <TextField
            margin="dense"
            label="Visits"
            type="number"
            fullWidth
            value={user.visits}
            onChange={handleChange("visits")}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={user.status}
            onChange={handleChange("status")}
          />
          <TextField
            margin="dense"
            label="Profile Progress"
            type="number"
            fullWidth
            value={user.progress}
            onChange={handleChange("progress")}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange("addMultiple")}
              value="addMultiple"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired
};

export default AddUserDialog;
