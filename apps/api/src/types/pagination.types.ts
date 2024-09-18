export interface IPagination<T> {
  version: string | null;
  result: {
    data: T[];
  };
  prevCursor: string | null;
  nextCursor: string | null;
  httpStatusCode: number;
  message: string | null;
  isError: boolean;
}
