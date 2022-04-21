export interface ApiData {
  results: Array<[]>,
  total: number,
}

export interface Response {
  code: number,
  value: ResponseValue
}

export interface ResponseValue {
  list:[],
  page:{
    page_num: number,
    page_size: number,
  },
  total: number,
}
