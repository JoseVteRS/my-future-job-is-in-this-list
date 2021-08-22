import { AggregateRoot } from '@nestjs/cqrs';
import type { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';

/**
 * Aggregate root: Auth user
 */
export class AuthUserModel extends AggregateRoot {
  /**
   * Creates a new auth user
   * @param userId User's id
   */
  constructor(public userId: VOUuid) {
    super();
  }
}
