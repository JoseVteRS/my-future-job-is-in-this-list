import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobFindByIdQuery } from '@back/admin/application/queries/job-find-by-id.query';
import { JobByIdUsecase } from '@back/admin/application/use-cases/read/job-by-id.usecase';
import { jobItemMapper } from '@back/admin/domain/mappers/job-item.mapper';

@QueryHandler(JobFindByIdQuery)
export class JobFindByIdQueryHandler
  implements IQueryHandler<JobFindByIdQuery> {
  constructor(private readonly jobFindByIdUseCase: JobByIdUsecase) {}

  async execute(query: JobFindByIdQuery) {
    const jobById = await this.jobFindByIdUseCase.execute(query.jobId);
    return jobItemMapper(jobById);
  }
}
