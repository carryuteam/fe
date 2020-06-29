import Taro, { Component } from '@tarojs/taro';
import { View } from "@tarojs/components";
import cmt from '../../assets/cmt.jpg'

class Comment extends Component {

  render () {
    return (
      <View>
        <image src={cmt} style="height: 370px; width: 100vw"></image>
      </View>
    )
  }

}

export default Comment;