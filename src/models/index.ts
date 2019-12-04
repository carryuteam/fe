import user, { UserState } from "./user"

export type RootState = {
  user: UserState
}

export default [
  user
]