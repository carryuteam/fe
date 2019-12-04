import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import {
  View,
  Text,
  Input,
  Image,
  Label,
  Picker,
  Button
} from "@tarojs/components";

import logo from "../../assets/logo.png";
import {
  getSchools,
  SchoolItem,
  getMajors,
  MajorItem
} from "../../services/school";

import "./index.less";
import { RegisterData, register } from "../../services";

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  nickName: string;
  gender: number;
  school: number;
  schoolRange: SchoolItem[];
  majorRange: MajorItem[];
  major: number;
  grade: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Register {
  props: IProps;
}

const genderRange = ["男", "女"];
const gradeRange = [2019, 2018, 2017, 2016, 2015, 2014, 2013];

class Register extends Component {
  state: PageState = {
    nickName: "",
    gender: 0,
    school: 0,
    schoolRange: [
      {
        schoolCode: "",
        schoolName: ""
      }
    ],
    majorRange: [
      {
        code: "",
        majorName: ""
      }
    ],
    major: 0,
    grade: 0
  };

  config: Config = {
    navigationBarTitleText: "首页"
  };

  componentDidMount() {
    getSchools()
      .then(res => {
        this.setState({
          schoolRange: res
        });
        return getMajors(res[0].schoolCode);
      })
      .then(res => {
        this.setState({
          majorRange: res
        });
      });
  }

  submit(e) {
    const { nickName, gender, grade, majorRange, major } = this.state;
    const openid = Taro.getStorageSync("openid");
    const { avatarUrl } = e.detail.userInfo
    const result: RegisterData = {
      nickname: nickName,
      school: `${majorRange[major].code}`,
      gender: gender + 1,
      grade: gradeRange[grade],
      openid,
      avatarUrl,
      description: ""
    }
    register(result).then((res) => {
      Taro.setStorage({
        key: "jwt",
        data: res.token
      })
      Taro.redirectTo({
        url: "/pages/home/index"
      })
    }, () => {
      Taro.showToast({
        title: "注册失败",
        icon: "none"
      })
    })
  }

  render() {
    return (
      <View className="register">
        <View className="logo">
          <Image className="img" src={logo}></Image>
          <Text className="label">为了给您提供更专业服务，请告诉我们</Text>
        </View>
        <View className="form">
          <View className="item">
            <Label className="form-label">昵称</Label>
            <Input
              value={this.state.nickName}
              placeholder="请输入昵称"
              className="form-input"
              onInput={e => {
                this.setState({
                  nickName: e.detail.value
                });
              }}
            />
          </View>
          <View className="item">
            <Label className="form-label">性别</Label>
            <Picker
              className="form-input"
              mode="selector"
              range={genderRange}
              value={this.state.gender}
              onChange={e => {
                this.setState({
                  gender: e.detail.value
                });
              }}
            >
              <View>{genderRange[this.state.gender]}</View>
            </Picker>
          </View>
          <View className="item">
            <Label className="form-label">学院</Label>
            <Picker
              className="form-input"
              mode="selector"
              range={this.state.schoolRange.map(i => i.schoolName)}
              value={this.state.school}
              onChange={e => {
                this.setState({
                  school: e.detail.value
                });
                getMajors(
                  this.state.schoolRange[e.detail.value].schoolCode
                ).then(res => {
                  this.setState({
                    majorRange: res
                  });
                });
              }}
            >
              <View>
                {this.state.schoolRange[this.state.school].schoolName}
              </View>
            </Picker>
          </View>
          <View className="item">
            <Label className="form-label">专业</Label>
            <Picker
              className="form-input"
              mode="selector"
              range={this.state.majorRange.map(i => i.majorName)}
              value={this.state.major}
              onChange={e => {
                this.setState({
                  major: e.detail.value
                });
              }}
            >
              <View>
                {this.state.majorRange[this.state.major].majorName ||
                  "请选择专业"}
              </View>
            </Picker>
          </View>
          <View className="item">
            <Label className="form-label">年级</Label>
            <Picker
              className="form-input"
              mode="selector"
              range={gradeRange}
              value={this.state.grade}
              onChange={e => {
                this.setState({
                  grade: e.detail.value
                });
              }}
            >
              <View>{gradeRange[this.state.grade]}</View>
            </Picker>
          </View>
        </View>
        <Button
          style={{ height: 90, backgroundColor: "#006D75", color: "white" }}
          openType="getUserInfo"
          onGetUserInfo={this.submit}
        >
          提交
        </Button>
      </View>
    );
  }
}

export default Register as ComponentClass<PageOwnProps, PageState>;
