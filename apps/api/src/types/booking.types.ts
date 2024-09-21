import { AxiosResponse } from 'axios';

export type BookPcResponse = AxiosResponse<{
  version: number | string | null;
  result: number;
  httpStatusCode: number;
  message: string | null;
  isError: boolean;
}>;
