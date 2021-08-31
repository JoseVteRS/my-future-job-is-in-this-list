import { ICommand } from '@nestjs/cqrs';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

export class JobUpdateCommand implements ICommand {
  constructor(
    public jobId: VOUuid,
    public title: string,
    public description: string,
    public extraInformation: string,
    public url: string
  ) {}
}
