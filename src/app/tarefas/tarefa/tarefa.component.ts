import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { TarefaService } from '../shared/tarefa.service';
import { ToastrService } from 'ngx-toastr'
import { Subtarefa } from '../shared/subtarefa.model';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  constructor(
    private tarefaService: TarefaService,
    private toastr: ToastrService) { }

  isModalActive: boolean = false;

  ngOnInit() {
    this.resetForm();
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.tarefaService.selectedTarefa = {
      Id: null,
      Nome: '',
      Descricao: '',
      Concluida: false,
      Subtarefas: []
    }
  }

  onSave(form: NgForm, concluida: boolean) {

    if (concluida)
      form.value.Concluida = concluida;

    if (form.value.Id == null) {
      this.tarefaService.addTarefa(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.tarefaService.getTarefas();
          this.tarefaService.getProgressoTarefaConcluida();
          this.toastr.success('Tarefa adicionada com sucesso.');
        }, err => this.toastr.error('Erro ao adicionar tarefa.'));
    }
    else {
      this.tarefaService.editTarefa(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.tarefaService.getTarefas();
          this.tarefaService.getProgressoTarefaConcluida();
          this.toastr.success('Tarefa atualizada com sucesso.');
        }, err => this.toastr.error('Erro ao atualizar tarefa.'));
    }
  }
}
