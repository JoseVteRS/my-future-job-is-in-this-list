import { PrimitiveValueObject } from '../../../common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Int greater than zero value object
 */
export class VOIntGtZero extends PrimitiveValueObject<number> {
  /**
   * Validate if a number is a positive int
   * @param value Value
   */
  protected validate(value: number): boolean {
    return value > 0 && Math.floor(value) === value;
  }
}
