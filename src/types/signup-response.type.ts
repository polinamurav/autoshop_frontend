import {RoleTypeType} from "./role-type.type";

export type SignupResponseType = {
  id: string,
  name: string,
  username: string
  email: string,
  phone: string,
  roles?: {
    id: number,
    name: RoleTypeType
  }[]
}
