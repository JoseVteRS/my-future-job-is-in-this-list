import { ICommand } from '@nestjs/cqrs';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';


export class JobChangeStatusCommand implements ICommand {
  constructor(
    public jobId: VOUuid,
    public status: JobStatusEnum
  ) {
  }
}
