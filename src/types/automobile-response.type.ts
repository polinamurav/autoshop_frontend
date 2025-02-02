import {EngineTypeType} from "./engine-type.type";
import {ApplicationResponseType} from "./application-response.type";

export type AutomobileResponseType = {
  id: string,
  name: string,
  price: number,
  photo: string,
  origin: string,
  count: number,
  engineType: EngineTypeType,
  carModelId: number,
  carModelName: string,
  applications?: ApplicationResponseType[],
  incomePrice?: number,
  incomeCount?: number

  engineTypeRus?: string
}
