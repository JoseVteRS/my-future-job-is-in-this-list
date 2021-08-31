import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { JobNotFoundException } from '@back/admin/domain/exceptions/job-not-found.exception';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';

export class JobChangeStatusUseCase implements IUseCase {
  constructor(
    @InjectJobRepository()
    private readonly jobRepository: IJobRepository
  ) {}

  async execute(jobId: VOUuid, status: VOStatus) {
    const jobById = await this.jobRepository.findById(jobId);
    if (!jobById) throw new JobNotFoundException();
    jobById.changeStatusJob(status);
    await this.jobRepository.changeStatusJob(jobId, status);
  }
}
