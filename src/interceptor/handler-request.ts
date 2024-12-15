import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class ValidatePaginationGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const req = context.switchToHttp().getRequest();
  
      const limit = req.query.limit ? Number(req.query.limit) : 10;
      const skip = req.query.page ? (req.query.page - 1) * limit : 0;
      const offset = skip;
      const search = req.query.search ? String(req.query.search).trim() : '';
  
      // Define startDate and endDate properties
      let startDate = '';
      let endDate = '';
      let orderBy = 'id'
      let sortBy = 'desc'
      if (req.query.startDate && req.query.endDate) {
        if (req.query.startDate > req.query.endDate) {
          throw new BadRequestException("Invalid date range");
        }
  
        startDate = req.query.startDate + 'T00:00:00.000Z';
        endDate = req.query.endDate + 'T23:59:59.999Z';
      }
  
      req.skip = skip;
      req.limit = limit;
      req.offset = offset;
      req.search = search;
      req.startDate = startDate;
      req.endDate = endDate;
      req.status = req.query.status
      req.orderBy = orderBy 
      req.sortBy = sortBy
      return true;
    }
  }
  