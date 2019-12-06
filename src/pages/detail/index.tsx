import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

type Props = {

}

class Detail extends Component<Props> {

  componentDidMount() {
    console.log(this)
  }

  render() {
    return (
      <View className='detail'>
        
      </View>
    )
  }
}

export default Detail
