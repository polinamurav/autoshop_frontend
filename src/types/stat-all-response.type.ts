import {AutomobileResponseType} from "./automobile-response.type";

export type StatAllResponseType = {
  top5ByIncome: AutomobileResponseType[],
  sortedByCount: AutomobileResponseType[],
  modelIncome: {
    name: string,
    price: number
  }[]
}
