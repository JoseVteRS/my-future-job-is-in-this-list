import { JobExtraInformationUpdateUseCase } from './../use-cases/write/job-extra-information-update.usecase';
import { VOExtraInformation } from '@back/admin/domain/value-objects/extra-information.vo';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { IJobRepository } from '@back/admin/domain/repository/job-repository.interface';
import { JobExtraInformationUpdateCommand } from './job-extra-information-update.command';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectJobRepository } from '@back/admin/domain/repository/job-repository.ditoken';
import { JobNotFoundException } from '@back/admin/domain/exceptions/job-not-found.exception';



@CommandHandler(JobExtraInformationUpdateCommand)
export class JobExtraInformationUpdateCommandHandler
    implements ICommandHandler<JobExtraInformationUpdateCommand> {
    constructor(private readonly jobExtraInformationUpdateUseCase: JobExtraInformationUpdateUseCase) { }
    execute(command: JobExtraInformationUpdateCommand) {
        return this.jobExtraInformationUpdateUseCase.execute(
            command.jobId,
            new VOExtraInformation(command.extraInformation)
        )

    };
}