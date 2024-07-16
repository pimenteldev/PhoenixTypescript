import { Breadcrumbs, Container, Link, Typography } from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant"
import { SelectedPersonal, SelectedTable } from "./components"
import useInitialGetData from "./hooks/useInitialGetData"
import { useEffect, useState } from "react"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
interface OrderInProcess {
  isTableSelected: boolean
  tableSelectId: number | null
  tableSelectName: string | null
  isPersonalSelected: boolean
  personalSelectDocument: string | null
  personalSelectName: string | null
}

const INITIAL_ORDER_IN_PROCESS: OrderInProcess = {
  isTableSelected: false,
  tableSelectId: null,
  tableSelectName: null,
  isPersonalSelected: false,
  personalSelectDocument: null,
  personalSelectName: null,
}

function Orders() {
  const { dispatchGetData } = useInitialGetData()

  const [state, setState] = useState<OrderInProcess>(INITIAL_ORDER_IN_PROCESS)

  const handleSelectTable = (table_id: number, table_name: string) => {
    setState({
      ...state,
      isTableSelected: true,
      tableSelectId: table_id,
      tableSelectName: table_name,
    })
  }

  const handleSelectPersonal = (
    personalSelectDocument: string,
    personalSelectName: string
  ) => {
    setState({
      ...state,
      isPersonalSelected: true,
      personalSelectDocument: personalSelectDocument,
      personalSelectName: personalSelectName,
    })
  }

  useEffect(() => {
    dispatchGetData()
  }, [])

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{
          mt: 1,
          mb: 0,
        }}
      >
        Pedidos
      </Typography>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {state.isTableSelected && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <TableRestaurantIcon
              fontSize="inherit"
              sx={{ mr: 0.5 }}
            />
            Mesa: {state.tableSelectName}
          </Link>
        )}
        {state.isPersonalSelected && (
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
          >
            <AccountCircleIcon
              fontSize="inherit"
              sx={{ mr: 0.5 }}
            />
            Mesonero: {state.personalSelectName}
          </Link>
        )}
      </Breadcrumbs>

      {!state.isTableSelected && (
        <SelectedTable handleSelectTable={handleSelectTable} />
      )}

      {state.isTableSelected && !state.isPersonalSelected && (
        <SelectedPersonal handleSelectPersonal={handleSelectPersonal} />
      )}
    </Container>
  )
}

export default Orders