export interface Pagination {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  prev?: number;
}

export class PaginationResult<T> {
  result: T | null = null;
  pagination: Pagination | null = null;
}


