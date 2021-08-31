import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { JobListQuery } from '@back/admin/application/queries/job-list.query';
import { JobListUsecase } from '@back/admin/application/use-cases/read/job-list.usecase';
import { jobListMapper } from '@back/admin/domain/mappers/job-list.mapper';

@QueryHandler(JobListQuery)
export class JobListQueryHandler implements IQueryHandler<JobListQuery> {
  constructor(private readonly jobListUseCase: JobListUsecase) {}

  async execute() {
    const jobList = await this.jobListUseCase.execute();
    return jobListMapper(jobList);
  }
}
