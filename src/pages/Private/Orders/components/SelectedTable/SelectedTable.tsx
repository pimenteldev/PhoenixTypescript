import { CardTableGrid, useSelectTable } from "@/pages/Private/Orders"
import {
  Alert,
  AlertTitle,
  Avatar,
  Badge,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  IconButton,
  styled,
  Typography,
} from "@mui/material"

import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined"

const SelectedTable = () => {
  const { tables, orders, personal, handleSelectTable } = useSelectTable()

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }))

  return (
    <Container sx={{ mb: 4 }}>
      <Alert
        variant="standard"
        severity={"info"}
        sx={{
          px: 1,
          py: 0,
          mt: 1,
          mb: 2,
        }}
      >
        Selecciona una Mesa
      </Alert>
      <CardTableGrid>
        {tables?.length === 0 && <>No existen Mesas en el Sistema</>}

        {tables?.map(({ table_id, table_name, table_active }) => {
          const orderActive = [...orders].filter(
            (order) => order.order_table_id === table_id
          )

          const personalInfo = [...personal].filter(
            (person) =>
              orderActive[0]?.order_personal_document ===
              person.personal_document
          )

          return (
            <Card
              sx={{
                maxWidth: 345,
                position: "relative",
                cursor: "pointer",
              }}
              key={table_id}
            >
              <CardActionArea onClick={() => handleSelectTable()}>
                <CardHeader
                  sx={{
                    height: 60,
                    backgroundColor: "#f7f7f7",
                    padding: "10px",
                  }}
                  avatar={
                    personalInfo[0]?.personal_photo ? (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar src="/staff.svg" />
                      </StyledBadge>
                    ) : (
                      <Typography
                        variant="overline"
                        color="text.secondary"
                      >
                        Mesa Disponible
                      </Typography>
                    )
                  }
                  title={personalInfo[0]?.personal_name}
                  subheader={personalInfo[0]?.personal_name && "Cuenta Activa"}
                  style={{
                    fontWeight: "bold",
                  }}
                />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: table_active ? "#10b981" : "#ffffff",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="194"
                    image="/mesa.jpg"
                    alt={table_name}
                    sx={{
                      position: "relative",
                      opacity: 0.3,
                      zIndex: 9,
                    }}
                  />

                  <Typography
                    variant="h5"
                    color={table_active ? "white" : "#10b981"}
                    sx={{
                      position: "absolute",
                      opacity: "1",
                      zIndex: 99,
                      fontWeight: "bold",
                    }}
                  >
                    {table_name}
                  </Typography>
                </div>
              </CardActionArea>
            </Card>
          )
        })}
      </CardTableGrid>
    </Container>
  )
}

export default SelectedTable
