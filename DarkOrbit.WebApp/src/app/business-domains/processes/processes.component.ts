import { Component, OnInit } from '@angular/core';
import { ProcessEntity } from '../../api/models';
import { ProcessesService } from '../../api/services/processes.service';
import { ApiService } from '../../api-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

export type ProcessFormModes = 'NotSelected'|'New'|'Edit';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html'
})
export class ProcessesComponent implements OnInit {
  firstView = true;
  processes: ProcessEntity[] = [];
  isLoading = true;
  rawCurrentProcess: ProcessEntity;
  currentProcess: ProcessEntity;
  formMode: ProcessFormModes = 'NotSelected';

  constructor(
    public apiService: ApiService,
    public processesService: ProcessesService,
    private router: Router,
    private route: ActivatedRoute,
    private notifications: NotificationsService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.currentProcess = this.generateNewProcess();
    const id = this.route.snapshot.params.id;
    if (!id) { this.router.navigateByUrl('/business-domains/processes/list'); }
    try {
      this.processes = await this.processesService.ApiProcessesGet().toPromise();
    } catch (error) {
      this.notifications.error('Error', 'Unable to get processes');
    }
    if (this.processes.length > 0) { this.firstView = false; }
    this.isLoading = false;
  }

  startNewProcess() {
    this.currentProcess = this.generateNewProcess();
    this.firstView = false;
    this.formMode = 'New';
  }

  selectProcess(process) {
    this.rawCurrentProcess = {...process};
    this.currentProcess = process;
    this.formMode = 'Edit';
  }

  cancelNewEditProcess() {
    const currentProcessIndex = this.processes.findIndex(e => e.id === this.currentProcess.id);
    this.processes[currentProcessIndex] = this.rawCurrentProcess;
    this.currentProcess = this.generateNewProcess();
    this.formMode = 'NotSelected';
  }

  async saveProcess() {
    if (this.formMode === 'New') {
      const newProcess = {...this.currentProcess};
      this.processes.push(newProcess);
      this.currentProcess = newProcess;
      this.formMode = 'NotSelected';
      this.rawCurrentProcess =  {...newProcess};
      try {
        await this.createProcess(newProcess);
        this.notifications.success('Created', 'Process Created');
        this.processes = await this.processesService.ApiProcessesGet().toPromise();
      } catch (error) {
        this.notifications.error('Error', 'Error creating new process');
      }
    } else if (this.formMode === 'Edit') {
      this.rawCurrentProcess =  {...this.currentProcess};
      try {
        await this.updateProcess();
        this.notifications.success('Saved', `Process Saved`);
      } catch (error) {
        this.notifications.error('Error', 'Error saving new process');
      }
    }
  }

  createProcess = async (process) => await this.processesService.ApiProcessesPost(process)
    .toPromise()

  updateProcess = async () => await this.processesService
    .ApiProcessesByIdPut({ entity: this.currentProcess, id: this.currentProcess.id })
    .toPromise()

  async deleteProcess() {
    let processToBeDeleted = this.processes.find(e => e.id === this.currentProcess.id);
    processToBeDeleted = {...processToBeDeleted};
    this.processes = this.processes.filter(e => e.id !== this.currentProcess.id);
    this.currentProcess = this.generateNewProcess();
    this.formMode = 'NotSelected';

    try {
      await this.processesService.ApiProcessesByIdDelete(processToBeDeleted.id).toPromise();
      this.notifications.success('Deleted', `Process Deleted`);
    } catch (err) {
      this.processes.push(processToBeDeleted);
      this.notifications.error('Delete Error', 'Error deleting process');
    }
  }

  private generateNewProcess(): ProcessEntity {
    const process = {} as ProcessEntity;
    return process;
  }
}
