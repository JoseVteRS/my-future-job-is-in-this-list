import { ICommand } from '@nestjs/cqrs';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

export class JobDeleteCommand implements ICommand {
  constructor(public readonly jobId: VOUuid) {}
}
