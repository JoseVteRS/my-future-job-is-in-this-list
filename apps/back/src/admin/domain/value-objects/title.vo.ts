import { PrimitiveValueObject } from '@shared-kernel/common/domain/classes/value-objects/primitive-value-object.class';


export class VOTitle extends PrimitiveValueObject<string> {
  protected validate(value: string) {
    if (typeof value !== 'string')
      throw new Error('Title must be a string')
    return true;
  }
}
