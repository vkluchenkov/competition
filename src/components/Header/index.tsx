import React from "react";
import { useUser } from "../../store/User";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";
import avatar from "../../images/media.webp";
import { Language } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { styles } from "./styles";

const pages = ['My events', 'Menu2', 'Menu3'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export const Header: React.FC = () => {
  console.log("Header")
  const [{ currentUser }, { removeActiveUser }] = useUser();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const { i18n } = useTranslation();
  const navigate = useNavigate();

  const logout = () => {
    removeActiveUser();
    setAnchorElUser(null);
  };

  const navigation = (link: string) => {
    navigate(link);
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const userIcon = () => {
    if (currentUser) {
      return (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ padding: "0 0 0 10px" }}>
              <Avatar alt={currentUser.name} src={avatar} />
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
            <MenuItem onClick={() => navigation("/my-order")}>
              <Typography textAlign="center">My order</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigation("/profile")}>
              <Typography textAlign="center">My profile</Typography>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>

          </Menu>
        </Box>
      );
    }
  };

  const userMenuMobile = () => {
    if (currentUser) {
      return (
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page}</Typography>
            </MenuItem>
          ))}
        </Menu>
      )
    }
  }

  const userMenu = () => {
    if (currentUser) {
      return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button
            onClick={() => navigate('/my-festivals')}
            sx={{ my: 2, color: 'white', display: 'block' }}
          >
            My festivals
          </Button>
        </Box>
      )
    } else {
      return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
      )
    }
  }

  const langMenu = () => {
    if (i18n.language === "en") {
      return (
        <Button
          id="Russian"
          onClick={() => i18n.changeLanguage("ru")}
          sx={{ my: 2, color: 'white' }}
          startIcon={<Language />}
        >
          Русский
        </Button>
      )
    }
    if (i18n.language === "ru") {
      return (
        <Button
          id="English"
          onClick={() => i18n.changeLanguage("en")}
          sx={{ my: 2, color: 'white' }}
          startIcon={<Language />}
        >
          English
        </Button>
      )
    }
  }

  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to="/" css={styles.header_logo}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                LOGO
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {userMenuMobile()}
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              LOGO
            </Typography>
            {userMenu()}
            {langMenu()}
            {userIcon()}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

Header.whyDidYouRender = true;
