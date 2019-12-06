import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import "./card.less";

type Props = {
  title: string,
  score: string,
  tags?: string[],
  time: string,
  price: number,
}

class Card extends Component<Props> {

  render() {
    const { title, score, tags, time, price } = this.props;
    return (
      <View className='cu-card'>
        <View className="top">
          <View className="title">{title}</View>
          <View className="score">{score}</View>
        </View>
        <View className="content">
          <View className="tags">标签: {tags && tags.join(" | ")}</View>
          <View className="foot">
            <Text className="time">分享于 {time}</Text>
            <Text className="money">{price} 分</Text>
          </View>
        </View>
      </View>
    )
  }
}

export { Card }
