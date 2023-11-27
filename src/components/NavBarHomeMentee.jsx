import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import LogoHat from '../assets/logo-hat.png';
import { Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchBar from './NavBarSearch';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { Icon } from '@mui/material';

const appBarTheme = createTheme({
  palette: {
    primary: {
      main: '#f5faff',
    },
  },
});

const drawerWidth = 240;
//const navItems = ['Home', 'Events', 'Profile', 'Find a Mentor'];
//const settings = ['Profile', 'Edit Profile', 'Account Settings', 'Sign Out'];

// used for searchbar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: alpha(theme.palette.common.white, 0.15),
  // '&:hover': {
  //   backgroundColor: alpha(theme.palette.common.white, 0.25),
  // },
  backgroundColor: alpha('#016eea', 0.15),
  '&:hover': {
    backgroundColor: alpha('#016eea', 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// used for searchbar
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

// used for searchbar
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

// mobile view menu drawer
function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      {/* <Link to="/home"> */}
        <img src={LogoHat} alt="Logo" style={{ width: '50px'}} />
      {/* </Link> */}
      <Divider />
      <List>
        <ListItem key={"Home"} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href='/Home'>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Events"} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href='/EventPage'>
            <ListItemText primary={"Events"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Profile"} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href='/profile'>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"Find a Mentor"} disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }} href='/findmentor'>
            <ListItemText primary={"Find a Mentor"} />
          </ListItemButton>
        </ListItem>
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const isMobile = useMediaQuery(useTheme().breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      {/* sx={{px: '100px'}} */}
      <AppBar component="nav" theme={appBarTheme} sx={{ px: isMobile ? '0px': '150px' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/home">
            <img src={LogoHat} alt="Logo" style={{ width: '60px', marginRight: '5px' }}/>
          </Link>

          {/* <Search> */}
            {/* <SearchIconWrapper> */}
              {/* <SearchIcon sx={{color: '#016eea'}}/> */}
              {/* <SearchIcon sx={{color: '#818181'}}/>
            </SearchIconWrapper> */}
            {/* <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          {/* </Search> */}

          <SearchBar onSearch={props.onSearch}/>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2}}>
            <Button key={"Home"} sx={{ color: '#016eea', textTransform: 'none', mr: 1 }}  component={Link}  to="/home">
                <Typography textAlign="center">{"Home"}</Typography>
            </Button>
            <Button key={"Events"} sx={{ color: '#016eea', textTransform: 'none', mr: 1 }} component={Link}  to="/EventPage">
              <Typography textAlign="center">{"Events"}</Typography>
            </Button>
            <Button key={"Profile"} sx={{ color: '#016eea', textTransform: 'none', mr: 1 }} component={Link}  to="/profile">
                <Typography textAlign="center">{"Profile"}</Typography>
            </Button>
            <Button key={"Find a Mentor"} variant="contained" sx={{ backgroundColor: '#016eea', color: '#fff', textTransform: 'none' }} component={Link}  to="/findmentor">
                <Typography textAlign="center">{"Find a Mentor"}</Typography>
            </Button>
            {/* {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu 
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={"Profile"} onClick={handleCloseUserMenu} component={Link}  to="/profile">
                <Typography textAlign="center">{"Profile"}</Typography>
              </MenuItem>
              <MenuItem key={"Edit Profile"} onClick={handleCloseUserMenu} component={Link}  to="/profile">
                <Typography textAlign="center">{"Edit Profile"}</Typography>
              </MenuItem>
              <MenuItem key={"Account Settings"} onClick={handleCloseUserMenu} component={Link}  to="/settings/account">
                <Typography textAlign="center">{"Account Settings"}</Typography>
              </MenuItem>
              <Divider sx={{ margin: 'auto', my: 2, width: '85%'}}/>
              <MenuItem key={"Sign Out"} onClick={handleCloseUserMenu} component={Link}  to="/">
                <LogoutIcon sx={{ color: '#f50057', mr: '3px', pr: '2px'}} />
                <Typography sx={{ color: '#f50057' }} textAlign="center">{"Sign Out"}</Typography>
              </MenuItem>
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
