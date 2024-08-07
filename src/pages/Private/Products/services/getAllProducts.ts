import { baseUrl } from "@/constants/utilitys"
import { Product, ProductsApi } from "@/models/products"
import { ProductsViewAdapter } from "../adapters/productsView"

const getAllProducts = async (): Promise<ProductsApi> => {
  return await fetch(`${baseUrl}products.php`, {
    method: "GET",
  })
    .then((response): Promise<ProductsApi> => response.json())
    .then((response) => ProductsViewAdapter(response))
}

export default getAllProducts
