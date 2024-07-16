import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import { scroller, Link as ScrollLink } from "react-scroll";
import { useLocation, useNavigate } from "react-router-dom";

const pages = [
  { name: "Giới thiệu", to: "about-section" },
  { name: "Thực đơn đặc biệt", to: "special-menu" },
  { name: "Liên hệ", to: "contact-section" },
];

function MenuBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = React.useState<string>("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (page: string) => {
    setCurrentPage(page);
    handleCloseNavMenu();

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: page } });
    } else {
      scroller.scrollTo(page, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    }
  };

  React.useEffect(() => {
    if (location.state?.scrollTo) {
      scroller.scrollTo(location.state.scrollTo, {
        smooth: true,
        duration: 500,
        offset: -100,
      });
    } else {
      setCurrentPage("");
    }
  }, [location]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <AppBar sx={{ backgroundColor: "#fff" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
        }}
      >
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="a"
          href=""
          sx={{
            color: "black",
            marginLeft: "5rem",
            display: { xs: "none", md: "flex" },
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>

        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            sx={{ color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem
                key={page.name}
                onClick={() => handlePageClick(page.to)}
              >
                <ScrollLink to={page.to} smooth={true} duration={500}>
                  <Typography textAlign="center">{page.name}</Typography>
                </ScrollLink>
              </MenuItem>
            ))}
          </Menu>
        </Box>

        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            color: "black",
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
        <Box
          sx={{
            marginRight: "5rem",
            flexGrow: 1,
            display: { xs: "none", md: "flex", justifyContent: "flex-end" },
          }}
        >
          {pages.map((page) => (
            <ScrollLink
              key={page.name}
              to={page.to}
              smooth={true}
              duration={500}
              style={{
                marginRight: "2rem",
                cursor: "pointer",
              }}
            >
              <Typography
                onClick={() => handlePageClick(page.to)}
                sx={{
                  my: 2,
                  color: currentPage === page.to ? "#e91a22" : "black",
                  fontSize: "18px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  "&:hover": {
                    color: "#e91a22",
                  },
                }}
              >
                {page.name}
              </Typography>
            </ScrollLink>
          ))}
        </Box>
      </Box>
    </AppBar>
  );
}
export default MenuBar;