import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr'

import { TarefaService } from '../shared/tarefa.service';
import { Subtarefa } from '../shared/subtarefa.model';
import { SubtarefaService } from '../shared/subtarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  constructor(
    private tarefaService: TarefaService,
    private subtarefaService: SubtarefaService,
    private toastr: ToastrService,
    private router: Router) { }

  isModalActive: boolean = false;

  ngOnInit() {
    this.newSubTarefa();
  }

  //#region Tarefa

  onSaveTarefa(form: NgForm) {

    if (form.value.Id == null) {
      this.tarefaService.addTarefa(form.value)
        .subscribe(data => {
          this.router.navigate(['tarefaList']);
          this.toastr.success('Tarefa adicionada com sucesso.');
        }, err => this.toastr.error(err.error.Message));
    }
    else {
      this.tarefaService.editTarefa(form.value)
        .subscribe(data => {
          this.router.navigate(['tarefaList']);
          this.toastr.success('Tarefa atualizada com sucesso.');
        }, err => this.toastr.error(err.error.Message));
    }
  }

  onCancelar() {
    this.router.navigate(['tarefaList']);
  }

  //#endregion

  //#region Subtarefa

  newSubTarefa() {
    this.subtarefaService.subtarefa = {
      Id: null,
      Nome: '',
      Concluida: false,
      IdTarefa: null
    };
  }

  onAddSubtarefa() {
    this.onToggleModal();
    this.newSubTarefa();
  }

  onToggleModal() {
    if (this.tarefaService.tarefa.Id == null)
      this.toastr.error('Primeiro salve a tarefa.');
    else
      this.isModalActive = !this.isModalActive;
  }

  onSaveSubtarefa(subtarefa: Subtarefa) {

    subtarefa.IdTarefa = this.tarefaService.tarefa.Id;

    if (subtarefa.Id == null) {
      this.subtarefaService.addSubtarefa(subtarefa)
        .subscribe(data => {
          this.toastr.success('Subtarefa adicionada com sucesso.');
          this.subtarefaService.getSubtarefasPorIdTarefa(this.tarefaService.tarefa.Id)
            .subscribe(data => {
              this.tarefaService.tarefa.Subtarefas = data;
            });
        }, err => this.toastr.error(err.error.Message));
    }
    else {
      this.subtarefaService.editSubtarefa(subtarefa)
        .subscribe(data => {
          this.toastr.success('Subtarefa atualizada com sucesso.');
          this.subtarefaService.getSubtarefasPorIdTarefa(this.tarefaService.tarefa.Id)
            .subscribe(data => {
              this.tarefaService.tarefa.Subtarefas = data;
            });
        }, err => this.toastr.error(err.error.Message));
    }

    this.isModalActive = !this.isModalActive;
  }

  onEditSubtarefa(id: number) {
    this.isModalActive = !this.isModalActive;
    this.subtarefaService.getSubtarefaPorId(id)
      .subscribe(data => {
        this.subtarefaService.subtarefa = data
      }, err => this.toastr.error(err.error.Message));
  }

  onConcluirSubtarefa(subtarefa: Subtarefa) {

    subtarefa.Concluida = true;

    this.subtarefaService.editSubtarefa(subtarefa)
      .subscribe(data => {
        this.subtarefaService.getSubtarefasPorIdTarefa(this.tarefaService.tarefa.Id)
          .subscribe(data => {
            this.tarefaService.tarefa.Subtarefas = data;
          });
      }, err => this.toastr.error(err.error.Message));
  }

  onDeleteSubtarefa(id: number) {
    this.subtarefaService.deleteSubtarefa(id)
      .subscribe(data => {
        this.toastr.success("Subtarefa excluída!");
        this.subtarefaService.getSubtarefasPorIdTarefa(this.tarefaService.tarefa.Id)
          .subscribe(data => {
            this.tarefaService.tarefa.Subtarefas = data;
          });
      }, err => this.toastr.error(err.error.Message));
  }

  //#endregion
}
