import { BadRequestException } from "@nestjs/common";



export class JobExtraInformationLongerException extends BadRequestException {
  constructor() {
    super('JOB_EXTRA_INFORMATION_LONGER')
  }
}
