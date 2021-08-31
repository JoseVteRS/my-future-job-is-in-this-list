import { PrimitiveValueObject } from '@shared-kernel/common/domain/classes/value-objects/primitive-value-object.class';
import { JobExtraInformationLongerException } from '@back/admin/domain/exceptions/job-extra-information-longer.exception';

export class VOExtraInformation extends PrimitiveValueObject<string> {
  protected validate(value: string) {
    if (value.length > 1300) throw new JobExtraInformationLongerException();
    return true;
  }
}
