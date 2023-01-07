import { Container, Grid, Paper, useMediaQuery } from "@mui/material";
import ProductCarousel from "./Product-Carousel";
import { carouselProducts } from "./Products-utils";

const Home = () => {
  const large = useMediaQuery("(min-width:901px)");
  const mid = useMediaQuery("(max-width:900px)");
  const sm = useMediaQuery("(max-width:400px)");
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={6} sm={12} xs={12}>
          <ProductCarousel
            carouselList={carouselProducts}
            itemized={false}
            sm={sm}
            mid={mid}
          />
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Paper sx={{ minHeight: 1, padding: 2 }}>
            <h1 className="title text-color">about us</h1>
            <h2 className="tag text-color">
              It's always snacks time with BHOJAJI!
            </h2>
            <h3 className="tag text-color">
              KFB Bhojaji has over 45 to 56 products. Our product range includes
              traditional namkeens, snacks , wafers, fryums and sweets. The
              Company also produces gram flour (besan) and gram pulses(chana
              dal). KFB Bhojaji offers a wide range of healthy and fresh
              namkeens. Enjoy the taste of different flavours like spicy,
              khatta, tangy and tasty namkeens. Our taste your trust is our
              belief.
            </h3>
            <h2 className="tag text-color">THE TRUST OF YOUR TASTE</h2>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
