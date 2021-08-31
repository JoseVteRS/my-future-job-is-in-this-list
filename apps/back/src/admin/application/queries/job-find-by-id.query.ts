import { IQuery } from '@nestjs/cqrs';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

export class JobFindByIdQuery implements IQuery {
  constructor(public readonly jobId: VOUuid) {}
}
