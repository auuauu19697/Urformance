import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe implements PipeTransform<string, any> {
  transform(value: string) {
    try {
      const parsed = JSON.parse(value);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error('Not a JSON object');
      }
      return parsed;
    } catch (e) {
      throw new BadRequestException('Invalid JSON object provided in form-data field.');
    }
  }
}
