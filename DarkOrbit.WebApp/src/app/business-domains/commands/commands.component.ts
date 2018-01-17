import { Component, OnInit } from '@angular/core';
import { CommandEntity } from '../../api/models/command-entity';
import { CommandsService } from '../../api/services/commands.service';
import { ApiService } from '../../api-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

export type CommandFormModes = 'NotSelected'|'New'|'Edit';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html'
})
export class CommandsComponent implements OnInit {
  firstView = true;
  commands: CommandEntity[] = [];
  isLoading = true;
  rawCurrentCommand: CommandEntity;
  currentCommand: CommandEntity;
  formMode: CommandFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public commandsService: CommandsService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.currentCommand = this.generateNewCommand();
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('/business-domains/commands/list'); }
    try {
      this.commands = await this.commandsService.ApiCommandsGet().toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable to get commands');
    }
    if (this.commands.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  startNewCommand() {
    this.currentCommand = this.generateNewCommand();
    this.firstView = false;
    this.formMode = 'New';
  }

  selectCommand(command) {
    this.rawCurrentCommand = { ...command };
    this.currentCommand = command;
    this.formMode = 'Edit';
  }

  cancelNewEditCommand() {
    const currentCommandIndex = this.commands.findIndex(e => e.id === this.currentCommand.id);
    this.commands[currentCommandIndex] = this.rawCurrentCommand;
    this.currentCommand = this.generateNewCommand();
    this.formMode = 'NotSelected';
  }

  async saveCommand() {
    if (this.formMode === 'New') {
      const newCommand = { ...this.currentCommand };
      this.commands.push(newCommand);
      this.currentCommand = newCommand;
      this.formMode = 'NotSelected';
      this.rawCurrentCommand = { ...newCommand };
      try {
        await this.createCommand(newCommand);
        this.notifications.success('Created', 'Command Created');
        this.commands = await this.commandsService.ApiCommandsGet().toPromise();
      } catch (error) {
        this.notifications.error('Error', 'Error creating new command');
      }
    } else if (this.formMode === 'Edit') {
      this.rawCurrentCommand = { ...this.currentCommand };
      try {
        await this.updateCommand();
        this.notifications.success('Saved', `Command Saved`);
      } catch (error) {
        this.notifications.error('Error', 'Error saving new command');
      }
    }
  }

  createCommand = async (command) => await this.commandsService.ApiCommandsPost(command)
    .toPromise()

  updateCommand = async () => await this.commandsService
    .ApiCommandsByIdPut({ entity: this.currentCommand, id: this.currentCommand.id })
    .toPromise()

  async deleteCommand() {
    let commandToBeDeleted = this.commands.find(e => e.id === this.currentCommand.id);
    commandToBeDeleted = { ...commandToBeDeleted };
    this.commands = this.commands.filter(e => e.id !== this.currentCommand.id);
    this.currentCommand = this.generateNewCommand();
    this.formMode = 'NotSelected';

    try {
      await this.commandsService.ApiCommandsByIdDelete(commandToBeDeleted.id).toPromise();
      this.notifications.success('Deleted', `Command Deleted`);
    } catch (err) {
      this.commands.push(commandToBeDeleted);
      this.notifications.error('Delete Error', 'Error deleting command');
    }
  }

  private generateNewCommand(): CommandEntity {
    const command = {} as CommandEntity;
    return command;
  }

}
