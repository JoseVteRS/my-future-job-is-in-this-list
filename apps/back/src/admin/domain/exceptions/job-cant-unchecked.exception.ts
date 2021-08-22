import { BadRequestException } from '@nestjs/common';


export class JobCantUncheckedException extends BadRequestException {
  constructor() {
    super('JOB_CANT_MARK_AS_UNCHECKED_EXCEPTION');
  }
}
