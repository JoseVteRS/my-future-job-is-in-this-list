import { PrimitiveValueObject } from '../../../common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Number value object
 */
export class VONumber extends PrimitiveValueObject<number> {
  /**
   * Validate if a number is a Number
   */
  protected validate(value: number): boolean {
    return !isNaN(value);
  }
}
