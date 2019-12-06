import { Model } from "../@types/Model"
import { SortByRange, SortRange, MaterailItem } from "../services/material"


interface MaterailState {
  searchWorld: string,
  sortBy: SortByRange,
  sort: SortRange,
  list: MaterailItem[],
  pageCount?: number,
  pageSize?: number,
  formatFilter?: string[],
  typeFilter?: string[],
  majorFilter?: string[],
}

const material: Model<MaterailState> = {
  namespace: "materail",
  state: {
    searchWorld: "",
    sortBy: "score",
    sort: "inverse",
    pageCount: 1,
    list: [],
  },
  reducers: {
    changeSearchWorld: (state, action) => ({ ...state, searchWorld: action.searchWorld }),
    changeSortBy: (state, action) => ({ ...state, sortBy: action.sortBy }),
    reverseSort: (state) => ({ ...state, sort: state.sort === "inverse" ? "reverse" : "inverse" }),
    changeFormatFilter: (state, action) => ({ ...state, formatFilter: action.formatFilter }),
    changeTypeFilter: (state, action) => ({ ...state, typeFilter: action.typeFilter }),
    changeMajorFilter: (state, action) => ({ ...state, majorFilter: action.majorFilter }),
    addPageCount: (state) => ({ ...state, pageCount: state.pageCount && state.pageCount + 1 }),
    updateList: (state, action) => ({ ...state, list: action.list }),
    addList(state, action) {
      return {
        ...state,
        list: [...state.list, ...action.list]
      }
    }
  },
  effects: {
    *getMaterial(action, effects) {
      
    }
  }
}