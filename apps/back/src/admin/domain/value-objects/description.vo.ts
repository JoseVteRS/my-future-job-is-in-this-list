import { PrimitiveValueObject } from '@shared-kernel/common/domain/classes/value-objects/primitive-value-object.class';
import { JobDescriptionLongerException } from '@back/admin/domain/exceptions/job-description-longer.exception';

export class VODescription extends PrimitiveValueObject<string> {
  protected validate(value: string) {
    if (typeof value !== 'string')
      throw new Error('Description must be a string');
    if (value.length > 150) throw new JobDescriptionLongerException();
    return true;
  }
}
