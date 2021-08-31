import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { Injectable } from "@nestjs/common";
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
import { JobNotFoundException } from '@back/admin/domain/exceptions/job-not-found.exception';



@Injectable()
export class JobExtraInformationUpdateUseCase implements IUseCase {

    constructor(
        @InjectJobRepository()
        private readonly jobRepository: IJobRepository
    ) { }

    async execute(
        jobId: VOUuid,
        extraInformation: VOExtraInformation
    ) {
        const jobById = await this.jobRepository.findById(jobId);
        if (!jobById) throw new JobNotFoundException();

        jobById.updateExtraInformation(extraInformation);
        await this.jobRepository.updateExtraInformation(jobId, extraInformation);


    }

}