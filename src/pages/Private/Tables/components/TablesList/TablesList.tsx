import { Table } from "@/models/tables"
import { AppStore } from "@/redux/models/store"
import { Alert } from "@mui/material"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import useGetAllTables from "../../hooks/useGetAllTables"
import { CardTableGrid } from "../../styled-components/CardTable"
import CardTable from "../CardTable/CardTable"

function TablesList() {
  const { callToEndPointsAndDispatchs } = useGetAllTables()
  const { tables } = useSelector((store: AppStore) => store.tables)

  useEffect(() => {
    callToEndPointsAndDispatchs()
  }, [])

  return tables.length >= 1 ? (
    <CardTableGrid>
      {tables &&
        tables.map((table: Table) => {
          return (
            <CardTable
              key={table.table_id}
              table={table}
            />
          )
        })}
    </CardTableGrid>
  ) : (
    <Alert severity="info">No existen Mesas Registradas</Alert>
  )
}

export default TablesList
