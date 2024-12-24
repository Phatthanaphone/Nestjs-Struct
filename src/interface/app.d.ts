import { Request } from 'express';

declare interface IMyRequest extends Request {
  user: {
    userId: number;
    role: string;
  };
  skip: number;
  page: number;
  limit: number;
  offset: number;
  search: string;
  q: string;
  sortBy: string;
  orderBy: string;
  domestic: string;
  provinceId: number;
  userId: number;
}
