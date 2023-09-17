import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';

import { PaginationResult } from '../modules/pagination';

export function getPaginatedResult<T>(
  url: string,
  params: HttpParams,
  http: HttpClient
) {
  const paginatedResult: PaginationResult<T> = new PaginationResult<T>();

  return http.get<T>(url, { observe: 'response', params }).pipe(
    map((response) => {
      paginatedResult.result = response.body;
      if (response.headers.get('X-Pagination') !== null) {
        paginatedResult.pagination = JSON.parse(
          response.headers.get('X-Pagination') as string
        );
      }
      return paginatedResult;
    })
  );
}

export function getPaginationHeaders(
  pageNumber: number,
  pageSize: number,
  // keyword: string
) {
  let params = new HttpParams();

  if (pageNumber !== null && pageNumber !== undefined && pageNumber > 0) {
    params = params.append('page', pageNumber.toString());
  } else {
    params = params.append('page', '1');
  }
  if (pageSize !== null && pageSize !== undefined && pageSize > 0) {
    params = params.append('limit', pageSize.toString());
  } else {
    params = params.append('limit', '10');
  }
  // params = params.append('keyword', keyword);
  return params;
}
