export type Data<T> = {
  message: string
  data: T
}
export type Product = {
  id: string
  categoryName: string
  name: string
  image: string
  price: number
}

export type ProductDetail = {
  id: string
  sku: string
  name: string
  description: string
  weight: number
  width: number
  length: number
  height: number
  image: string
  price: number
  createdAt: Date
  updatedAt: Date
  categoryName: string
}
