import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  IconButtonProps,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Product } from "./Products-utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from '@mui/material/Collapse';
interface ProductWrapper {
  product: Product;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
const ProductCard = ({ product }: ProductWrapper) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product?.img}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product?.title}
          </Typography>
          {!expanded && <Typography variant="body2" color="text.secondary">
            {product?.desc?.substring(0, 80) + "..."}
          </Typography>}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" color="text.secondary">
              {product?.desc}
            </Typography>
          </Collapse>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
