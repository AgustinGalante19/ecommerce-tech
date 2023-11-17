import Order from "@/types/Order"
import { Product } from "@prisma/client"
import { ChangeEvent } from "react"

export default interface CartItemProps {
  item?: Product
  order: Order
  handleChangeQuantity: (e: ChangeEvent<HTMLInputElement>, name: string) => void
}
