import Taro, { Component } from "@tarojs/taro";
import classNames from "classnames";
import { View, Button } from "@tarojs/components";

import "./button.less"

type size = "large" | "small" | "inline";
type type = "primary" | "default";

interface Props {
  size?: size,
  type?: type,
  onClick?: () => void,
  style?: React.CSSProperties
}

export class Btn extends Component<Props> {

  render() {
    let { size, type, style, onClick } = this.props;
    size = size || "large";
    type = type || "default";
    onClick = onClick || (() => { });

    const className = classNames("cu-btn", size, type)
    return (
      <Button onClick={onClick} className={className} style={style}>{this.props.children}</Button>
    )
  }
}