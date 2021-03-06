import { PrimitiveValueObject } from '../../../common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Boolean value object
 */
export class VOBoolean extends PrimitiveValueObject<boolean> {
  /**
   * Validate if a value is a boolean
   * @param value Boolean
   */
  protected validate(value: boolean) {
    return value === true || value === false;
  }
}
