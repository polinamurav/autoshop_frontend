import {EngineTypeType} from "./engine-type.type";
import {StatusTypeType} from "./status-type.type";

export type StatResponseType = {
  income: number,
  automobiles: {
    id: string,
    name: string,
    photo: string,
    price: number,
    origin: string,
    count: number,
    engineType: EngineTypeType,
    applications:   {
      id: number,
      price: number,
      status: StatusTypeType,
      titleAuto: string,
      buyer: string
    }[],
    incomePrice: 0.0,
    incomeCount: 0
  }[],
}
