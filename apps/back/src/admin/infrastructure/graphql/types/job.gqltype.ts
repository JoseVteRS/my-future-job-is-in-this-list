import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job {
  @Field(() => ID)
  _id?: string;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  url?: string;

  @Field(() => Boolean, { nullable: true })
  isChecked?: boolean;
}
