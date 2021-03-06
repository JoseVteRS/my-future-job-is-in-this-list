import { PrimitiveValueObject } from '../../../common/domain/classes/value-objects/primitive-value-object.class';

/**
 * Web url value object
 */
export class VOWebUrl extends PrimitiveValueObject<string> {
  /**
   * Validate if a string is a website
   * @param value Web url
   */
  protected validate() {
    return true;
  }
}
