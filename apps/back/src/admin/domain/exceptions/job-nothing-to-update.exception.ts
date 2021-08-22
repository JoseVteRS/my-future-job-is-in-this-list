import { BadGatewayException } from '@nestjs/common';


export class JobNothingToUpdateException extends BadGatewayException {
  constructor() {
    super('TASK_NOTHING_TO_UPDATE');
  }
}
