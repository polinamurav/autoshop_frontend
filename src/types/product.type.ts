export type ProductType = {
  id: string,
  name: string,
  price: number,
  image: string,
  origin: string,
  lightning: string,
  humidity: string,
  temperature: string,
  height: number,
  diameter: number,
  url: string,
  carModel: {
    id: string,
    name: string,
    url: string
  },
  engineType: {
    name: string,
  }
  countInCart?: number,
  isInFavorite?: boolean
}
