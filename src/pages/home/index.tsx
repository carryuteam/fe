import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  getMaterials,
  SortByRange,
  SortRange,
  MaterailItem
} from "../../services";
import { SearchBar } from "./components/searchBar";
import { Sorter } from "./components/sorter";
import { Card } from "../../components";

type PageStateProps = {};

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  sortBy: SortByRange;
  list: MaterailItem[];
  searchWorld?: string;
  sort?: SortRange;
  pageCount?: number;
  pageSize?: number;
  formatFilter?: string[];
  typeFilter?: string[];
  majorFilter?: string[];
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

interface Home {
  props: IProps;
}

const sortByRange: { value: SortByRange; label: string }[] = [
  {
    value: "score",
    label: "评分"
  },
  {
    value: "time",
    label: "时间"
  },
  {
    value: "price",
    label: "价格"
  }
];

class Home extends Component {
  state: PageState = {
    list: [],
    sortBy: "score",
    sort: "inverse",
    searchWorld: ""
  };

  config: Config = {
    navigationBarTitleText: "资料城",
    navigationBarBackgroundColor: "#87E8DE"
  };

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    const { searchWorld, sort, sortBy } = this.state;
    getMaterials({
      name: searchWorld,
      sort,
      sortBy
    }).then(list => {
      console.log(list);
      this.setState({
        list
      });
    });
  };

  render() {
    const { sortBy, sort, list, searchWorld } = this.state;
    return (
      <View className="home">
        <View style={{ background: "#87E8DE" }}>
          <View style={{ padding: "10px 15px 0" }}>
            <SearchBar
              value={searchWorld}
              onInput={value => {
                this.setState(
                  {
                    searchWorld: value
                  },
                  this.getList
                );
              }}
            />
          </View>
          <Sorter
            range={sortByRange}
            value={sortBy}
            onValueChange={value =>
              this.setState({ sortBy: value }, this.getList)
            }
            onSortClick={() =>
              this.setState(
                { sort: sort === "inverse" ? "reverse" : "inverse" },
                this.getList
              )
            }
            onFilterClick={() => { }}
          />
        </View>
        <View style={{ padding: "15px" }}>
          {list.map(item => {
            return (
              <View
                style={{ marginBottom: "7px" }}
                key={item.resid}
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/detail/index?id=${item.resid}`
                  })
                }}
              >
                <Card
                  title={item.name}
                  score={item.score.toFixed(1)}
                  time={item.update_time.substring(0, 10)}
                  price={item.cost}
                  tags={item.school
                    .map(i => i.shortName)
                    .concat(item.tags)
                    .concat([item.formats])}
                />
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>;
