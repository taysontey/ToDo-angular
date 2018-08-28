import { Component, OnInit } from '@angular/core';

import { TarefaService } from '../shared/tarefa.service'
import { Tarefa } from '../shared/tarefa.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {

  constructor(
    private tarefaService: TarefaService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.tarefaService.getTarefas();
  }

  onEdit(id: number) {
    this.tarefaService.getTarefaPorId(id)
      .subscribe(data => {
        this.tarefaService.selectedTarefa = data
      }, err => this.toastr.error('Erro ao obter tarefa por id.'))
  }

  onFilter(filtro: string) {
    this.tarefaService.getTarefaPorFiltro(filtro);
  }

  onDelete(id: number) {
    this.tarefaService.deleteTarefa(id)
      .subscribe(data => {
        this.tarefaService.getTarefas();
        this.tarefaService.getProgressoTarefaConcluida();
        this.toastr.success("Tarefa excluída!");
      }, err => this.toastr.error('Erro ao excluir tarefa.'))
  }
}
