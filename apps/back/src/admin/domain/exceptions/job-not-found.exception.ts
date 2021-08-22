import { NotFoundException } from '@nestjs/common';


export class JobNotFoundException extends NotFoundException {
    constructor() {
      super('JOB_NOT_FOUND');
    }
}
