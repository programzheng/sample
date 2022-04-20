interface Pagination {
  sortBy: string,
  descending: boolean,
  page: number,
  rowsPerPage: number,
  rowsNumber: number
}
export interface OnRequestProps{
  pagination: Pagination,
  filter: string|undefined
}
