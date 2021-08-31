import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JobDeleteCommand } from '@back/admin/application/commands/job-delete.command';
import { JobDeleteUseCase } from '@back/admin/application/use-cases/write/job-delete.usecase';

@CommandHandler(JobDeleteCommand)
export class JobDeleteCommandHandler
  implements ICommandHandler<JobDeleteCommand> {
  constructor(private readonly jobDeleteUseCase: JobDeleteUseCase) {}

  async execute(command: JobDeleteCommand) {
    return await this.jobDeleteUseCase.execute(command.jobId);
  }
}
