import { Provider } from '@nestjs/common';
import { JobResolver } from '@back/admin/infrastructure/graphql/job.resolver';
import { DITokenJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { JobMongoRepository } from '@back/admin/infrastructure/repository/job-mongo.repository';
import { JobCreateCommandHandler } from '@back/admin/application/commands/job-create.handler';
import { JobCreateUsecase } from '@back/admin/application/use-cases/write/job-create.usecase';

const Repositories: Provider[] = [
  { provide: DITokenJobRepository, useClass: JobMongoRepository },
];

const QueryHandlers: Provider[] = [];

const CommandHandlers: Provider[] = [JobCreateCommandHandler];

const EventHandlers: Provider[] = [];

const UseCases: Provider[] = [JobCreateUsecase];

const ApplicationServices: Provider[] = [];

const Resolvers: Provider[] = [JobResolver];

export const BD_ADMIN_Job_Providers = [
  ...Repositories,
  ...QueryHandlers,
  ...CommandHandlers,
  ...EventHandlers,
  ...UseCases,
  ...ApplicationServices,
  ...Resolvers,
];
