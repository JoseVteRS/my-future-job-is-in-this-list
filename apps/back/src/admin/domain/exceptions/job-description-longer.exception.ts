import { BadRequestException } from "@nestjs/common";



export class JobDescriptionLongerException extends BadRequestException {
  constructor() {
    super('JOB_DESCRIPTION_LONGER')
  }
}
