import Taro, { Component } from '@tarojs/taro'
import { Input } from '@tarojs/components'

// import "./input.less"

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void
}

class CuInput extends Component<Props> {

  render() {
    let { placeholder, value, onChange } = this.props;
    const inputProps = {
      placeholder: placeholder || "请输入",
      onChange: onChange || (() => {}),
      value: value || undefined
    };
    
    return (
      <Input type="text" className="cu-input" {...inputProps} />
    )
  }
}

export { CuInput } 
