import { JobExtraInformationUpdateUseCase } from './../../application/use-cases/write/job-extra-information-update.usecase';
import { JobExtraInformationUpdateCommandHandler } from './../../application/commands/job-extra-information-update.handler';
import { Provider } from '@nestjs/common';
import { JobResolver } from '@back/admin/infrastructure/graphql/job.resolver';
import { DITokenJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { JobMongoRepository } from '@back/admin/infrastructure/repository/job-mongo.repository';
import { JobCreateCommandHandler } from '@back/admin/application/commands/job-create.handler';
import { JobCreateUsecase } from '@back/admin/application/use-cases/write/job-create.usecase';
import { JobChangeStatusCommandHandler } from '@back/admin/application/commands/job-change-status.handler';
import { JobChangeStatusUseCase } from '@back/admin/application/use-cases/write/job-change-status.usecase';
import { JobUpdateUsecase } from '@back/admin/application/use-cases/write/job-update.usecase';
import { JobUpdateCommandHandler } from '@back/admin/application/commands/job-update.handler';
import { JobDeleteUseCase } from '@back/admin/application/use-cases/write/job-delete.usecase';
import { JobDeleteCommandHandler } from '@back/admin/application/commands/job-delete.handler';
import { JobListQueryHandler } from '@back/admin/application/queries/job-list.handler';
import { JobListUsecase } from '@back/admin/application/use-cases/read/job-list.usecase';
import { JobByIdUsecase } from '@back/admin/application/use-cases/read/job-by-id.usecase';
import { JobFindByIdQueryHandler } from '@back/admin/application/queries/job-find-by-id.handler';

const Repositories: Provider[] = [
  { provide: DITokenJobRepository, useClass: JobMongoRepository },
];

const QueryHandlers: Provider[] = [
  JobListQueryHandler,
  JobFindByIdQueryHandler,
];

const CommandHandlers: Provider[] = [
  JobCreateCommandHandler,
  JobChangeStatusCommandHandler,
  JobUpdateCommandHandler,
  JobDeleteCommandHandler,
  JobExtraInformationUpdateCommandHandler,
];

const EventHandlers: Provider[] = [];

const UseCases: Provider[] = [
  JobCreateUsecase,
  JobChangeStatusUseCase,
  JobExtraInformationUpdateUseCase,
  JobUpdateUsecase,
  JobDeleteUseCase,
  JobListUsecase,
  JobByIdUsecase,
];

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
