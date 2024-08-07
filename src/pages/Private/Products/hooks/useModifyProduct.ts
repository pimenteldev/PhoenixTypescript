import { dialogCloseSubject$ } from "@/components/CustomDialog/CustomDialog"
import { AppStore } from "@/redux/models/store"
import { AlertColor } from "@mui/material"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import AddProductService from "../services/addNewProduct"
import ModifyProductService from "../services/modifyProduct"
import { snackbarOpenSubject$ } from "@/components/CustomSnackBar/CustomSnackBar"
import { Item, Product } from "@/models/products"
import { useProductsViewContext } from "../contexts/ProductsView"
import removeProduct from "../services/removeProduct"
import useGetAllProducts from "./useGetAllProducts"

function useModifyProduct() {
  const { dialog } = useProductsViewContext()
  const { product } = dialog
  const [listItems, setListItems] = useState<Item[]>(product.product_items)
  const [file, setFile] = useState()
  const { items, items_categories, categories, units } = useSelector(
    (store: AppStore) => store.products
  )

  const { callToEndPointsAndDispatchs } = useGetAllProducts()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: product,
  })

  useEffect(() => {
    setValue("product_name", product.product_name)
    setValue("product_description", product.product_description)
    setValue("product_category", product.product_category)
    setValue("product_base_price", product.product_base_price)
    setValue("product_status", product.product_status)
  }, [product])

  const handleClick = () => {
    dialogCloseSubject$.setSubject = false
  }

  const handleSnackBar = (message: string, severity: AlertColor) => {
    snackbarOpenSubject$.setSubject = {
      open: true,
      message: message,
      severity: severity,
    }
  }

  const handleSelect = (itemSelect: Item) => {
    const itemsFiltered = listItems.filter(
      ({ item_id }) => item_id === itemSelect.item_id
    )
    if (itemsFiltered.length === 0) {
      setListItems([...listItems, { ...itemSelect, item_count: 0 }])
    } else {
      handleSnackBar(`${itemSelect.item_name} ya existe en la lista`, "warning")
    }
  }

  const handleRemove = (itemSelect: Item) => {
    const newList = listItems.filter(
      ({ item_id }) => item_id !== itemSelect.item_id
    )
    setListItems(newList)
  }

  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    itemChange: Item
  ) => {
    setListItems(
      listItems.map((item: Item) =>
        item.item_id === itemChange.item_id
          ? { ...item, item_count: parseFloat(e.currentTarget.value) }
          : item
      )
    )
  }

  type FormData = Omit<Product, "product_items"> & {
    product_items?: Item[]
  }

  const onSubmit = async (data: FormData) => {
    const {
      product_base_price,
      product_category,
      product_description,
      product_name,
      product_photo,
      product_status,
    } = data

    const productModify: Product = {
      product_id: product.product_id,
      product_base_price,
      product_category,
      product_description,
      product_items: listItems,
      product_name,
      product_photo,
      product_photo_thumb: product.product_id,
      product_status,
    }

    const productFormatedForApi = {
      ...productModify,
      product_items: JSON.stringify(productModify.product_items),
    }

    const formData = new FormData()

    formData.append("file", file || "")
    formData.append("photo", crypto.randomUUID())
    formData.append("photo_prev", product.product_photo)
    formData.append("location", "productos")
    formData.append("product", JSON.stringify(productFormatedForApi))
    formData.append("method", "PUT")

    try {
      const response = await ModifyProductService(formData)

      if (response.modify === true) {
        handleSnackBar(`Has Modificado un Producto`, "success")
        handleClick()
        callToEndPointsAndDispatchs()
      } else {
        handleSnackBar(`${response.message}`, "error")
      }
    } catch (err) {
      handleSnackBar(`Ups, algo salió mal.`, "error")
      console.error(err)
    }
  }
  //FALTA SEPARAR LA LOGICA AL SERVICIO
  const handleClickDelete = async (
    product_id: string,
    product_photo: string
  ) => {
    try {
      const response = await removeProduct(product_id, product_photo)

      if (response.delete) {
        handleSnackBar(`Has Eliminado un Producto`, "success")
        handleClick()
        callToEndPointsAndDispatchs()
      } else {
        handleSnackBar(`${response.message}`, "error")
      }
    } catch (err) {
      handleSnackBar(`Ups, algo salió mal.`, "error")
      console.error(err)
    }
  }

  return {
    categories,
    errors,
    file,
    handleChange,
    handleClick,
    handleSelect,
    handleRemove,
    handleSubmit,
    handleClickDelete,
    items,
    items_categories,
    listItems,
    onSubmit,
    register,
    setFile,
    units,
    product,
  }
}

export default useModifyProduct
