import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./Product";
import { Product } from "./Products-utils";

interface ProductCarousel {
  carouselList: Product[];
  itemized: boolean;
  mid: boolean;
  sm: boolean;
}

const ProductCarousel = ({
  carouselList,
  itemized,
  mid,
  sm,
}: ProductCarousel) => {
  const desktopSize = sm ? 1 : mid ? 2 : 3;
  function productCard(img: string) {
    return (
      <div className="card">
      <img src={img} alt="" />
      <p>price</p>
    </div>
    )
  }
  function largeCarousel() {
    return (
      <>
        <Carousel animation="slide" duration={1500} indicators={false}>
          {carouselList.map(({img}) => (
            <Grid justifyContent="center">
              <img src={img} alt="First slide" />
            </Grid>
          ))}
        </Carousel>
      </>
    );
  }
  function productItemsCarousel() {
    const i = Math.floor(carouselList.length / desktopSize);
    return (
      <>
        <Carousel animation="slide" duration={1500} indicators={false}>
          {[...Array(i)].map((p, c) => {
            return (
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={2}
              >
                {carouselList
                  .slice(c * desktopSize, (c + 1) * desktopSize)
                  .map((t) => (
                    <Grid item xs={12 / desktopSize}>
                      {productCard(t.img)}
                    </Grid>
                  ))}
              </Grid>
            );
          })}
        </Carousel>
      </>
    );
  }
  return itemized ? productItemsCarousel() : largeCarousel();
};
export default ProductCarousel;
