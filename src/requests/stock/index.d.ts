import { HttpStatusCode } from "axios";
import { ValueOf } from "next/dist/shared/lib/constants";

export declare const StockErrors: {
  INVALID_ARGUMENTS: string;
  UNKNOWN: string;
};

export interface StockDto {
  code: string;
  name: string;
}

export interface StockGetRequest {
  key: string;
  count: number;
  index: number;
}

export interface StockGetResponse {
  content: StockDto[];
  pageable: string;
  totalPages: number;
  totalElements: number;
  last: boolean;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export declare async function getStock(
  req: StockGetRequest
): Promise<StockGetResponse>;
