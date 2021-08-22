import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { JobCreateInput } from '@back/admin/infrastructure/graphql/inputs/job-create.input';
import { JobCreateCommand } from '@back/admin/application/commands/job-create.command';

@Resolver()
export class JobResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Query(() => String)
  gql_test() {
    return 'Grapqh running';
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
        input.url,
        input.status,
        input.isChecked
      )
    );
    return true;
  }
}
