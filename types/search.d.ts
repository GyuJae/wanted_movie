export interface ISearchKeywordResult {
  page: number
  results: {
    id: number
    name: string
  }[]
  total_pages: number
  total_results: number
}
