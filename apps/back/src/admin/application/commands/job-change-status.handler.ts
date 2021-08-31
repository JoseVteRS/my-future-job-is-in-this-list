import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobChangeStatusCommand } from '@back/admin/application/commands/job-change-status.comand';
import { JobChangeStatusUseCase } from '@back/admin/application/use-cases/write/job-change-status.usecase';
import { VOStatus } from '@back/admin/domain/value-objects/status.vo';

@CommandHandler(JobChangeStatusCommand)
export class JobChangeStatusCommandHandler
  implements ICommandHandler<JobChangeStatusCommand> {
  constructor(private readonly jobChangeStatus: JobChangeStatusUseCase) {}

  async execute(command: JobChangeStatusCommand) {
    return this.jobChangeStatus.execute(
      command.jobId,
      new VOStatus(command.status)
    );
  }
}
