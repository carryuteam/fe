import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from "@tarojs/components"
import { connect } from '@tarojs/redux'
import { login } from '../../services'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Login {
  props: IProps;
}

@connect(({ }) => ({

}), (dispatch) => ({

}))
class Login extends Component {

  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }

  componentDidMount() {
    Taro.showLoading({
      title: "登录中"
    })
    Taro.login({
      success: function (res) {
        login(res.code).then(({ is_first, token, openid }) => {
          Taro.hideLoading()
          if (is_first) {
            Taro.setStorage({
              key: "openid",
              data: openid
            })
            Taro.redirectTo({ url: "/pages/register/index" })
          } else {
            Taro.setStorage({
              key: "jwt",
              data: token
            })
            Taro.redirectTo({ url: "/pages/home/index" })
          }
        }).catch(() => {
          Taro.hideLoading()
        })
      },
      fail: function (e) {
        Taro.hideLoading();
      }
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View></View>
    )
  }
}

export default Login as ComponentClass<PageOwnProps, PageState>
