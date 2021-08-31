import { Field, InputType } from '@nestjs/graphql';



@InputType()
export class JobUpdateInput {
  @Field(() => String, { nullable: true })
  title?: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  extraInformation?: string;
  @Field(() => String, { nullable: true })
  url?: string;
}
