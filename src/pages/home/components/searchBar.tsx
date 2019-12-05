import Taro, { Component } from '@tarojs/taro'
import { View, Input, Image } from '@tarojs/components'
import searchIcon from "../../../assets/search.png"

import "./searchBar.less"
type Props = {
  value: string,
  onInput: (e: any) => void
}

class SearchBar extends Component<Props> {

  render() {
    const { value, onInput } = this.props;
    return (
      <View className='search-bar'>
        <View className="icon">
          <Image className="img" src={searchIcon}></Image>
        </View>
        <Input placeholder="搜点什么呢" value={value} onInput={onInput} className="input"></Input>
      </View>
    )
  }
}

export { SearchBar }
