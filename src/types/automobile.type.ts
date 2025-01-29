import {EngineTypeType} from "./engine-type.type";

export type AutomobileType = {
    name: string,
    price: number,
    origin: string,
    count: number,
    engineType: EngineTypeType.DIESEL,
    carModelId: number
  }
