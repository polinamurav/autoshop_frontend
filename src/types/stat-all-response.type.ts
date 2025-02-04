import {AutomobileResponseType} from "./automobile-response.type";
import {StatModelResponseType} from "./stat-model-response.type";

export type StatAllResponseType = {
  top5ByIncome: AutomobileResponseType[],
  sortedByCount: AutomobileResponseType[],
  modelIncome: StatModelResponseType[]
}
