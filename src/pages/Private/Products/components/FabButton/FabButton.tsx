import { dialogOpenSubject$ } from "@/components/CustomDialog/CustomDialog"
import AddIcon from "@mui/icons-material/Add"
import { Fab } from "@mui/material"
import { useProductsViewContext } from "../../contexts/ProductsView"

const FabButton = () => {
  const { setDialog } = useProductsViewContext()
  const handleClick = () => {
    setDialog({ action: "add" })
    dialogOpenSubject$.setSubject = true
  }

  return (
    <Fab
      size="medium"
      color="primary"
      aria-label="Agregar"
      sx={{
        position: "fixed",
        right: 20,
        bottom: 20,
      }}
      onClick={handleClick}
    >
      <AddIcon />
    </Fab>
  )
}

export default FabButton
