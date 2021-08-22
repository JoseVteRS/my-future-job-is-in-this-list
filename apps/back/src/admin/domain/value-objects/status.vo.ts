import { PrimitiveValueObject } from '@shared-kernel/common/domain/classes/value-objects/primitive-value-object.class';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';

export class VOStatus extends PrimitiveValueObject<string> {
  protected validate(value: JobStatusEnum) {
    if (!Object.values(JobStatusEnum).includes(value))
      throw new Error(`${value} NOT_STATUS_JOB`);
    return true;
  }
}
