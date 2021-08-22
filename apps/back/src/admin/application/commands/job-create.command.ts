import { ICommand } from '@nestjs/cqrs';

export class JobCreateCommand implements ICommand {
  constructor(
    public title: string,
    public description: string | null,
    public url: string | null,
    public status: string | null,
    public isChecked: boolean | null
  ) {}
}
