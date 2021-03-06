import { PrimitiveValueObject } from '../../../common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Number greater than zero value object
 */
export class VONumberGtZero extends PrimitiveValueObject<number> {
  /**
   * Validate if a number is a positive number
   * @param value Value
   */
  protected validate(value: number): boolean {
    return value >= 0;
  }
}
