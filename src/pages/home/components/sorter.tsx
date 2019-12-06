import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import ClassNames from "classnames";

import sortIcon from "../../../assets/sort.png";
import filterIcon from "../../../assets/filter.png";

import "./sorter.less"

type rangeItem = {
  label: string,
  value: string
}

type Props = {
  range: rangeItem[],
  value: string,
  onValueChange: (value: string) => void,
  onSortClick: () => void,
  onFilterClick: () => void,
}

class Sorter extends Component<Props> {

  change = (targetValue) => {
    const { value, onValueChange } = this.props;
    if (value !== targetValue) {
      onValueChange(targetValue)
    }
  }

  render() {
    const { range, value, onSortClick, onFilterClick } = this.props
    console.log(range)
    return (
      <View className='sorter'>
        <View className="select">
          {range.map((item) => {
            const cls = ClassNames("select-item", {
              selected: item.value === value
            })
            return (
              <View 
                key={item.value}
                data-value={item.value}
                className={cls}
                onClick={e => this.change(e.currentTarget.dataset.value)}
              >
                {item.label}
              </View>
            )
          })}
        </View>
        <View className="icons">
          <View onClick={onSortClick} className="sort icon-item">
            <Image src={sortIcon} className="img"></Image>
          </View>
          <View onClick={onFilterClick} className="filter icon-item">
            <Image src={filterIcon} className="img"></Image>
          </View>
        </View>
      </View>
    )
  }
}

export { Sorter }
