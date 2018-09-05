import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TarefaService } from '../shared/tarefa.service'
import { ToastrService } from 'ngx-toastr';
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
    private router: Router) { }

  ngOnInit() {
    this.tarefaService.getTarefas();
    this.tarefaService.getProgressoTarefaConcluida();
  }

  onFilterTarefa(filtro: string) {
    this.tarefaService.getTarefaPorFiltro(filtro);
  }

  onAddTarefa(){
    this.router.navigate(['tarefa']);
  }

  onEditTarefa(id: number) {
    this.tarefaService.getTarefaPorId(id);
    this.router.navigate(['tarefa']);
  }

  onConcluirTarefa(tarefa: Tarefa) {
    tarefa.Concluida = true;
    this.tarefaService.editTarefa(tarefa);
  }

  onDeleteTarefa(id: number) {
    this.tarefaService.deleteTarefa(id);
  }
}
