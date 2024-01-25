
export interface Stock {
  code: string;
  name: string;
}

export declare const StockErrors = {
  UNKNOWN: string
};

export declare async function getStocks(): Promise<Stock[]>;