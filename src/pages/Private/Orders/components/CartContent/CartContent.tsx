import { baseUrl } from "@/constants/utilitys"
import { currencyPrice, currencyPriceDolar } from "@/helpers/currencyPrice"
import { AppStore } from "@/redux/models/store"
import Add from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import Remove from "@mui/icons-material/Remove"
import {
  Alert,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import useCartOrder from "../../hooks/useCartOrder"

const CartContent = () => {
  const { currentOrder, settings } = useSelector(
    (store: AppStore) => store.orders
  )
  const { percent_iva, price_dollar } = settings
  const { products } = currentOrder

  const { handleProductActions, calculatePrices } = useCartOrder()

  const { subTotalPrice, totalPrice, totalPriceDolar } = calculatePrices(
    products,
    percent_iva,
    price_dollar
  )

  return (
    <List
      sx={{ width: "100%" }}
      style={{ padding: "10px 0" }}
    >
      {products.length === 0 ? (
        <Alert
          severity="info"
          style={{ margin: "10px 0px" }}
        >
          Sin Productos
        </Alert>
      ) : (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={() => handleProductActions("cleanProducts")}
          style={{
            width: "100%",
          }}
        >
          Vaciar Pedido
        </Button>
      )}
      {products.length >= 1 &&
        products.map((product) => (
          <React.Fragment key={product.product_id}>
            <ListItem
              style={{
                position: "relative",
                maxWidth: 360,
                padding: 0,
                marginTop: "5px",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <IconButton
                aria-label="delete"
                color="error"
                size="small"
                classes={{ root: "button" }}
                onClick={() => handleProductActions("removeProduct", product)}
                style={{
                  position: "absolute",
                  right: "0px",
                }}
              >
                <DeleteIcon />
              </IconButton>

              <ListItemAvatar style={{ marginTop: "5px" }}>
                <Avatar
                  alt={product.product_name}
                  src={baseUrl + product.product_photo}
                />
              </ListItemAvatar>

              <Box
                style={{
                  width: "100%",
                  padding: "0px",
                }}
                className="truncateText"
              >
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="subtitle1"
                >
                  <strong>{product.product_name}</strong>
                </Typography>
                <Stack style={{ marginTop: "-10px" }}>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="overline"
                    color="GrayText"
                  >
                    <small>Precio:</small>
                    {currencyPrice.format(product.product_base_price)}
                  </Typography>
                </Stack>
                <Stack
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "-25px",
                    marginTop: "-10px",
                  }}
                >
                  <IconButton
                    aria-label="decrement"
                    color="primary"
                    classes={{ root: "button" }}
                    onClick={() =>
                      handleProductActions("decrementProduct", product)
                    }
                  >
                    <Remove />
                  </IconButton>

                  <Paper
                    elevation={0}
                    style={{
                      padding: "5px 10px",
                      color: "var(--secondary-color)",
                      margin: "0px 5px",
                      backgroundColor: "var(--primary-color)",
                    }}
                  >
                    <strong>{product.product_count}</strong>
                  </Paper>
                  <IconButton
                    aria-label="increment"
                    color="primary"
                    classes={{ root: "button" }}
                    onClick={() =>
                      handleProductActions("incrementProduct", product)
                    }
                  >
                    <Add />
                  </IconButton>
                </Stack>
              </Box>
            </ListItem>
            <Divider
              variant="fullWidth"
              component="li"
              style={{ marginBottom: "5px" }}
            />
          </React.Fragment>
        ))}
      {products.length >= 1 && (
        <Stack>
          <ListItem>
            <Paper
              elevation={0}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                flexWrap: "wrap",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                component="span"
                variant="overline"
                color="GrayText"
                fontWeight="bold"
                fontSize="10px"
              >
                Subtotal
              </Typography>
              <Typography
                component="span"
                variant="h6"
                color="GrayText"
                fontSize="18px"
              >
                {currencyPrice.format(subTotalPrice)}
              </Typography>{" "}
            </Paper>
          </ListItem>
          <ListItem>
            <Paper
              elevation={0}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                flexWrap: "wrap",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                component="span"
                variant="overline"
                color="GrayText"
                fontWeight="bold"
                fontSize="10px"
              >
                Total
              </Typography>
              <Typography
                component="span"
                variant="h5"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                }}
                fontSize="18px"
              >
                {currencyPrice.format(totalPrice)}
              </Typography>{" "}
            </Paper>
          </ListItem>
          <ListItem>
            <Paper
              elevation={0}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                alignContent: "center",
                flexWrap: "wrap",
                flexDirection: "row",
                width: "100%",
              }}
            >
              <Typography
                component="span"
                variant="overline"
                color="GrayText"
                fontWeight="bold"
                fontSize="10px"
              >
                Total en Dólares
              </Typography>
              <Typography
                component="span"
                variant="h5"
                style={{
                  color: "var(--primary-color)",
                  fontWeight: "bold",
                }}
                fontSize="18px"
              >
                {currencyPriceDolar.format(totalPriceDolar)}
              </Typography>{" "}
            </Paper>
          </ListItem>

          <ListItem>
            <Button
              aria-label="delete"
              color="primary"
              variant="contained"
              size="small"
              classes={{ root: "button" }}
              onClick={() => handleProductActions("toggleModalPreview")}
              style={{
                marginTop: "5px",
                width: "100%",
                fontWeight: "bold",
              }}
            >
              Previsualizar Orden
            </Button>
          </ListItem>
        </Stack>
      )}
    </List>
  )
}

export default CartContent
