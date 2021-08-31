import { Field, InputType } from '@nestjs/graphql';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';




@InputType()
export class JobCreateInput {
  @Field(() => String)
  title: string;
  @Field(() => String, { nullable: true })
  description?: string;
  @Field(() => String, { nullable: true })
  extraInformation?: string;
  @Field(() => String, { nullable: true })
  url?: string;
  @Field(() => JobStatusEnum, { nullable: true })
  status?: JobStatusEnum;
}
