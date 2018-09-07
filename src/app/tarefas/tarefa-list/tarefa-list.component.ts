import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { TarefaService } from '../shared/tarefa.service'
import { Tarefa } from '../shared/tarefa.model';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})

export class TarefaListComponent implements OnInit {

  constructor(
    private tarefaService: TarefaService,
    private toastr: ToastrService,
    private router: Router) {
    this.recarregar();
  }

  ngOnInit() {
  }

  recarregar() {
    this.carregarTarefas();
    this.carregarProgressoTarefas();
  }

  carregarTarefas() {
    this.tarefaService.getTarefas()
      .subscribe(data => {
        this.tarefaService.tarefas = data;
      }, err => this.toastr.error(err.error.Message));
  }

  carregarProgressoTarefas() {
    this.tarefaService.getProgressoTarefaConcluida()
      .subscribe(data => {
        this.tarefaService.progressoTarefaConcluida = data;
      }, err => this.toastr.error(err.error.Message));
  }

  newTarefa() {
    this.tarefaService.tarefa = {
      Id: null,
      Nome: '',
      Descricao: '',
      Concluida: false,
      Subtarefas: []
    };
  }

  onFilterTarefa(filtro: string) {
    this.tarefaService.getTarefaPorFiltro(filtro)
      .subscribe(data => {
        this.tarefaService.tarefas = data;
      }, err => this.toastr.error(err.error.Message));
  }

  onAddTarefa() {
    this.newTarefa();
    this.router.navigate(['tarefa']);
  }

  onEditTarefa(id: number) {
    this.tarefaService.getTarefaPorId(id)
      .subscribe(data => {
        this.tarefaService.tarefa = data
        this.router.navigate(['tarefa']);
      }, err => this.toastr.error(err.error.Message));
  }

  onConcluirTarefa(tarefa: Tarefa) {
    tarefa.Concluida = true;

    this.tarefaService.editTarefa(tarefa)
      .subscribe(data => {
        this.recarregar();
      }, err => this.toastr.error(err.error.Message));
  }

  onDeleteTarefa(id: number) {
    this.tarefaService.deleteTarefa(id)
      .subscribe(data => {
        this.recarregar();
        this.toastr.success("Tarefa excluída!");
      }, err => this.toastr.error(err.error.Message));
  }
}
