import {StatusTypeType} from "./status-type.type";
import {EngineTypeType} from "./engine-type.type";

export type ApplicationResponseType = {
  id: string,
  price: number,
  status: StatusTypeType
  titleAuto: string,
  buyer: string,
  automobileId: number,
  automobilePhoto: string,
  automobileEngineType: EngineTypeType,
  automobileOrigin: string,
  automobileModel: string,
  automobileCount: number,

  automobileEngineTypeRus?: string,
  statusRus?: string
}
