import { Model } from './../@types/Model';
import { Gender } from './../@types/common';
import { login } from '../services';

export type UserState = {
  nickName: string,
  avatarUrl: string,
  description: string,
  school: number,
  grade: number,
  gender: Gender,
  jwt: string,
  openid: string,
}

const userModel: Model<UserState> = {
  namespace: "user",
  state: {
    nickName: "",
    avatarUrl: "",
    description: "",
    school: 0,
    grade: 0,
    gender: Gender.male
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        ...action,
      }
    }
  },
};


export default userModel;
