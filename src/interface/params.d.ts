export interface IRequestBaseQuery {
  page: number;
  limit: number;
  offset: number;
  search: string;
  sortBy: string;
  orderBy: string;
  userId?: number;
  skip?: number;
}
