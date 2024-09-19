export interface GizmoApiPaginatedResponse<T> {
  version: string | null;
  result: {
    data: T[];
    nextCursor: null | string;
    prevCursor: null | string;
  };
  httpStatusCode: number;
  message: string | null;
  isError: boolean;
}

export interface GizmoApiWrappedResponse<T> {
  version: string | null;
  result: T;
  httpStatusCode: number;
  message: string | null;
  isError: boolean;
}
