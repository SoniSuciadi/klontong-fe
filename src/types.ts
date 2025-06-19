export interface ProductForm {
  name: string
  description: string
  weight: number | null
  width: number | null
  length: number | null
  height: number | null
  price: number | null
  category: string | null
  image: File | null
  imageUrl?: string | null
}
