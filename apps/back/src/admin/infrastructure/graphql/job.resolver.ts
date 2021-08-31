import { JobExtraInformationUpdateCommand } from './../../application/commands/job-extra-information-update.command';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JobCreateInput } from '@back/admin/infrastructure/graphql/inputs/job-create.input';
import { JobCreateCommand } from '@back/admin/application/commands/job-create.command';
import { JobStatusEnum } from '@back/admin/domain/enums/job-status.enum';
import { JobChangeStatusCommand } from '@back/admin/application/commands/job-change-status.comand';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { JobUpdateInput } from '@back/admin/infrastructure/graphql/inputs/job-update.input';
import { JobUpdateCommand } from '@back/admin/application/commands/job-update.command';
import { JobDeleteCommand } from '@back/admin/application/commands/job-delete.command';
import { JobListQuery } from '@back/admin/application/queries/job-list.query';
import { Job } from '@back/admin/infrastructure/graphql/types/job.gqltype';
import { JobModel } from '@back/admin/domain/model/job.model';
import { JobFindByIdQuery } from '@back/admin/application/queries/job-find-by-id.query';

@Resolver()
export class JobResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  @Query(() => String)
  gql_test() {
    return 'Grapqh running';
  }

  @Query(() => [Job])
  async job_list_all(): Promise<JobModel[] | null> {
    return await this.queryBus.execute(new JobListQuery());
  }

  @Query(() => Job)
  async job_find_by_id(
    @Args('jobId', { type: () => ID })
    jobId: VOUuid
  ): Promise<JobModel | null> {
    return await this.queryBus.execute(new JobFindByIdQuery(jobId));
  }

  @Mutation(() => Boolean)
  async job_create(
    @Args('input', { type: () => JobCreateInput })
    input: JobCreateInput
  ): Promise<boolean> {
    await this.commandBus.execute(
      new JobCreateCommand(
        input.title,
        input.description,
        input.extraInformation,
        input.url,
        input.status
      )
    );
    return true;
  }

  @Mutation(() => Boolean)
  async job_change_status(
    @Args('jobId', { type: () => ID })
    jobId: VOUuid,
    @Args('status', { type: () => JobStatusEnum })
    status: JobStatusEnum
  ): Promise<boolean> {
    await this.commandBus.execute(new JobChangeStatusCommand(jobId, status));
    return true;
  }

  @Mutation(() => Boolean)
  async job_update(
    @Args('jobId', { type: () => ID })
    jobId: VOUuid,
    @Args('input', { type: () => JobUpdateInput })
    input: JobUpdateInput
  ): Promise<boolean> {
    await this.commandBus.execute(
      new JobUpdateCommand(
        jobId,
        input.title,
        input.description,
        input.extraInformation,
        input.url
      )
    );
    return true;
  }

  @Mutation(() => Boolean)
  async job_extra_information_update(
    @Args('jobId', { type: () => ID })
    jobId: VOUuid,
    @Args('input', { type: () => String })
    input: string
  ): Promise<boolean> {
    await this.commandBus.execute(
      new JobExtraInformationUpdateCommand(
        jobId,
        input
      )
    )
    return true;
  }

  @Mutation(() => Boolean)
  async job_delete(
    @Args('jobId', { type: () => ID })
    jobId: VOUuid
  ): Promise<boolean> {
    await this.commandBus.execute(new JobDeleteCommand(jobId));
    return true;
  }
}
