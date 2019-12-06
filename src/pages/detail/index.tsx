import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { getMaterialDetail, MaterailDetailItem, getComment } from "../../services";

import downLoadImg from "../../assets/download.png";
import addImg from "../../assets/add.png";
import "./index.less"

type Props = {

}

type State = {
  detail?: MaterailDetailItem
}

class Detail extends Component<Props, State> {

  state: State = {

  }

  componentDidMount() {
    const id = parseInt(this.$router.params.id) || 4;
    getMaterialDetail(id).then(detail => {
      this.setState({
        detail
      })
    })
  }

  preview = (urls:string[], index: number) => {
    Taro.previewImage({
      urls: urls,
      current: urls[index]
    })
  }

  render() {
    const { detail } = this.state;
    const tags = detail ? detail.school.map(i => i.shortName).concat(detail.tags, [detail.formats]) : []
    return (
      <View className='detail'>
        {detail && <View className="has-detail">
          <View className="detail-card">
            <View className="title">{detail.name}</View>
            <View className="tags">标签: {tags.join(" , ")}</View>
            <View className="imgs">
              {detail.picURLs.map((url, index) => (<Image key={url} onClick={e => this.preview(detail.picURLs, index)} className="img" src={url} />))}
            </View>
            <View className="footer">
              <View className="time">分享于: {detail.update_time.substring(0, 10)}</View>
              <View className="icons">
                <Image className="img" src={downLoadImg}></Image>
                <Image className="img" src={addImg}></Image>
              </View>
            </View>
          </View>
        </View>}

      </View>
    )
  }
}

export default Detail
