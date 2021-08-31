import { Injectable } from '@nestjs/common';
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { JobNotFoundException } from '@back/admin/domain/exceptions/job-not-found.exception';
import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';

@Injectable()
export class JobDeleteUseCase implements IUseCase {
  constructor(
    @InjectJobRepository()
    private readonly jobRepository: IJobRepository
  ) {}

  async execute(jobId: VOUuid) {
    const jobById = await this.jobRepository.findById(jobId);
    if (!jobById) throw new JobNotFoundException();
    await this.jobRepository.delete(jobId);
  }
}
