import {
  Alert,
  Autocomplete,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { categories, Category, Params, Product, products } from "./Products-utils";
interface OptionsMap {
  [key: string]: string | undefined;
}
function App() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchOptions, setSearchOptions] = useState<OptionsMap>({});
  const [selectedSearch, setSelectedSearch] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const large = useMediaQuery("(min-width:901px)");
  const mid = useMediaQuery("(max-width:900px)");
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const navigateToProducts = (field: string | undefined, value: string) => {
    if (field) {
      const i = JSON.stringify({ field: field, value: value });
      navigate(`/products?query=${i}`);
    }
  };
  const handleClose = (i?: Category) => {
    setAnchorEl(null);
    if (i) {
      navigateToProducts("type", i.title);
    }
  };
  useEffect(() => {
    let opts: OptionsMap = {};
    products.forEach((p) => {
      if (p.title && !opts[p.title]) {
        opts[p.title] = "title";
      }
      if (p.type && !opts[p.type]) {
        opts[p.type] = "type";
      }
    });
    opts["All Products"] = "type";
    setSearchOptions(opts);
    navigate("/home");
  }, []);
  useEffect(() => {
    if (selectedSearch) {
      navigateToProducts(searchOptions[selectedSearch], selectedSearch);
    }
  }, [selectedSearch]);
  return (
    <div className="App">
      <header className="App-header">
        <div className="top-banner">
          <div className="banner-msg">
            <Link
              component="button"
              underline="hover"
              sx={{ color: "#fff", fontFamily: "Amaranth", fontSize: "15px" }}
              onClick={() => navigate("/home")}
            >
              About Us
            </Link>{" "}
            |{" "}
            <Link
              component="button"
              underline="hover"
              sx={{ color: "#fff", fontFamily: "Amaranth", fontSize: "15px" }}
              onClick={() => navigate("/contactUs")}
            >
              Contact Us
            </Link>
          </div>
        </div>
        {!large && (
          <>
            <div className="drawer-icon">
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose()}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {categories.map((i) => (
                <MenuItem onClick={() => handleClose(i)} className="item">
                  {i.title}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
        <Grid container>
          <Grid item md={2} sm={12} xs={12}>
            <div className="centerAlign">
              <img src="/Logo_1.png" alt="" className="logo" />
            </div>
          </Grid>
          <Grid item md={10} sm={12} xs={12} container justifyContent="center">
            <div
              className={
                !mid
                  ? "search-box large-search-position"
                  : "search-box short-search-position"
              }
            >
              <Autocomplete
                freeSolo
                id="search"
                value={selectedSearch}
                onChange={(event: any, value: string) => {
                  setSelectedSearch(value);
                }}
                disableClearable
                options={Object.keys(searchOptions)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    size="small"
                    placeholder="Search"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              navigateToProducts(
                                searchOptions[selectedSearch],
                                selectedSearch
                              )
                            }
                          >
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />
            </div>
          </Grid>
          {large && (
            <Grid
              item
              container
              justifyContent="center"
              sx={{ mt: `${!mid ? 0 : 5}px` }}
              xs={12}
            >
              <div className={!mid ? "large-menu-position" : ""}>
                <Stack direction="row" spacing={8}>
                  {categories.map((i) => (
                    <Button
                      variant="text"
                      className="item"
                      onClick={() => navigateToProducts("type", i.title)}
                    >
                      {i.title}
                    </Button>
                  ))}
                </Stack>
              </div>
            </Grid>
          )}
        </Grid>
      </header>
      <section>
        <div className="body-container">
          <Container sx={{ width: 9 / 10, height: 1 }}>
            <Outlet />
          </Container>
        </div>
      </section>
      <footer>
        <div className="banner-msg">
          Copyright © 2021 KFB BHOJAJI. All Rights Reserved.
        </div>
      </footer>
      {error && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setError(false)}
        >
          <Alert
            onClose={() => setError(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please select a valid product/category.
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}
export default App;
