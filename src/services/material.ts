import request from "../utils/request";

const url = {
  getMaterials: "/api/resource/search",
  getMaterialDetail: "/api/resource/getdetail",
  getComment: "/api/resource/comment/get"
};

export type SortByRange = "price" | "score" | "time";
export type SortRange = "inverse" | "reverse";

type GetMaterialsOption = {
  name?: string;
  cost?: number;
  school?: string[];
  tags?: string[];
  formats?: string[];
  page?: number;
  pageSize?: number;
  sortBy?: SortByRange;
  sort?: SortRange;
};

export interface MaterailItem {
  resid: number,
  name: string,
  author: string,
  school: { code: string, shortName: string }[],
  update_time: string,
  score: number,
  tags: string[],
  cost: number,
  formats: string,
}

export const getMaterials = (opts?: GetMaterialsOption): Promise<MaterailItem[]> => {
  opts = opts || {}
  const {
    name,
    cost,
    school = [],
    tags = [],
    formats = [],
    page,
    pageSize,
    sortBy = "score",
    sort = "inverse"
  } = opts as GetMaterialsOption;

  const orderMap = {
    "price-inverse": 1,
    "price-reverse": 2,
    "time-inverse": 3,
    "time-reverse": 4,
    "score-inverse": 5,
    "score-reverse": 6
  }

  const data: any = {};
  name && (data.name = name)
  cost && (data.cost = cost)
  school.length > 0 && (data.school = `,${school.join(",")},`)
  tags.length + formats.length > 0 && (data.tags = `,${tags.concat(formats).join(",")},`)
  page && (data.page = page)
  pageSize && (data.pageSize = pageSize)
  data.order = orderMap[sortBy + "-" + sort]

  return request(url.getMaterials, {
    method: "GET",
    data: data
  })
};

export interface MaterailDetailItem extends MaterailItem {
  picURLs: string[],
  create_time: string,
}

export const getMaterialDetail = (id: number): Promise<MaterailDetailItem> => {
  return request(url.getMaterialDetail, {
    data: {
      resid: id
    }
  })
}

export interface GetCommentOpt {
  openid?: string,
  resid?: number,
  id?: number,
}

export const getComment = (opt?: GetCommentOpt) => {
  return request(url.getComment, {
    data: opt
  })
}