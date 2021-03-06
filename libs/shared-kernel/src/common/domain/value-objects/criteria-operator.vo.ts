import { EnumValueObject } from '../../../common/domain/classes/value-objects/enum-value-object.class';
import { CriteriaOperator } from '../enums/criteria-operators.enum';

/**
 * Employee's find by criteria operator value object
 */
export class VOCriteriaOperator extends EnumValueObject<CriteriaOperator> {
  /**
   * Creates a find by criteria operator value object
   * @param value current value
   */
  constructor(value: CriteriaOperator) {
    super(value, Object.values(CriteriaOperator));
  }
}
