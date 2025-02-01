import {EngineTypeType} from "./engine-type.type";

export type AutomobileResponseType = {
  id: string,
  name: string,
  price: number,
  photo: string,
  origin: string,
  count: number,
  engineType: EngineTypeType.DIESEL,
  // carModel: {
  //   id: string,
  //   name: string
  // },
  carModelId: number,
  carModelName: string,
  applications?: [],
  incomePrice?: number,
  incomeCount?: number
}
