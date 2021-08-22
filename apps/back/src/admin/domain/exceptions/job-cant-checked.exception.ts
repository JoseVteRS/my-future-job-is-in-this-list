import { BadRequestException } from '@nestjs/common';


export class JobCantCheckedException extends BadRequestException {
  constructor() {
    super('JOB_CANT_MARK_AS_CHECKED_EXCEPTION')
  }
}
