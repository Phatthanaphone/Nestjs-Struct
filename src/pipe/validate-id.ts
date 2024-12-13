import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIdPipe implements PipeTransform {
  transform(value: string): number {
    const id = parseInt(value, 10);
    if (isNaN(id)) {
      throw new BadRequestException('ID must be number');
    }
    return id;
  }
}
