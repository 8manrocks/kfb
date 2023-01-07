import { Grid, Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./Product";
import { categories, Params, Product, products } from "./Products-utils";
const ProductsList = () => {
  const [params, setParams] = useState<Params | null>(null);
  const query = useQuery();
  let category = null;
  if (params) {
   category = categories.find(c => c.title === params.value);
}
  function predicate(p: Product): boolean {
    if (!params) {
      return false;
    }
    if (params.value === "All Products") {
      return true;
    }
    return p[params.field ? params.field : ""] === params.value;
  }
  useEffect(() => {
    const queryParamsString = query.get("query");
    if (queryParamsString) {
      const p = JSON.parse(queryParamsString);
      setParams(p);
    }
  }, [query]);
  return (
    <>
      <h1 className="title">{params?.value}</h1>
      <h2 className="tag">{category?.tag}</h2>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        {products.filter(predicate).map((p) => (
          <Grid item>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}
export default ProductsList;
