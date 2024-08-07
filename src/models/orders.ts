import { Personal } from "./personal"
import { Category, Item, Product, ProductInOrder, Unit } from "./products"
import { Role } from "./roles"
import { Setting, settingEmptyStat } from "./setting"
import { Table } from "./tables"

export interface OrdersApi {
  products: Product[]
  categories: Category[]
  items: Item[]
  items_categories: Category[]
  units: Unit[]
  role: Role[]
  personal: Personal[]
  tables: Table[]
  settings: Setting
  orders: Order[]
  currentOrder: CurrentOrder
}
export interface CurrentOrder {
  products: ProductInOrder[]
  orderId: string
  isTableSelected: boolean
  tableSelectId: number
  tableSelectName: string
  isPersonalSelected: boolean
  personalSelectDocument: string
  personalSelectName: string
  isModalPreview: boolean
  isModalFacture: boolean
  isFactureView: boolean
}

export interface Order {
  order_id: string
  order_table_id: number
  order_personal_document: string
  order_list_inventary: OrderListInventory[]
  order_create: Date | string
  order_status: number
}

export interface OrderListInventory {
  product_id: string
  product: ProductInOrder
  product_count: number
  product_items: Item[]
}

export const currentOrderEmptyState = {
  products: [] as ProductInOrder[],
  orderId: "",
  isTableSelected: false,
  tableSelectId: 0,
  tableSelectName: "",
  isPersonalSelected: false,
  personalSelectDocument: "",
  personalSelectName: "",
  isModalPreview: false,
  isModalFacture: false,
  isFactureView: false,
}

export const OrdersEmptyState = {
  products: [] as ProductInOrder[],
  categories: [] as Category[],
  items: [] as Item[],
  items_categories: [] as Category[],
  units: [] as Unit[],
  role: [] as Role[],
  personal: [] as Personal[],
  tables: [] as Table[],
  settings: settingEmptyStat,
  orders: [] as Order[],
  currentOrder: currentOrderEmptyState,
}

export const OrderEmptyState = {
  order_id: 0,
  order_table_id: 0,
  order_personal_document: "",
  order_list_inventary: "",
  order_create: "",
  order_status: 0,
}
