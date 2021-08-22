// import uuid, { test as uuidTest } from 'uuid-random';
import * as uuid from 'uuid-random';
import { PrimitiveValueObject } from '../classes/value-objects/primitive-value-object.class';


/**
 * Uuid value object
 */
export class VOUuid extends PrimitiveValueObject<string> {
  private _id: string;

  get id(): string {
    return this._id;
  }

  /**
   * Creates a new UUID value object
   * @param value Uuid
   */
  protected validate(value: string) {
    return uuid.test(value);
  }

  public static async create(): Promise<VOUuid> {
    return new VOUuid(uuid().toString());
  }

}
