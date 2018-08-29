import { Component, OnInit } from '@angular/core';

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
    private toastr: ToastrService) { }

  ngOnInit() {
    this.tarefaService.getTarefas();
  }

  onFilterTarefa(filtro: string) {
    this.tarefaService.getTarefaPorFiltro(filtro);
  }

  onEditTarefa(id: number) {
    this.tarefaService.getTarefaPorId(id);
  }

  onConcluirTarefa(tarefa: Tarefa) {
    tarefa.Concluida = true;
    this.tarefaService.editTarefa(tarefa);
  }

  onDeleteTarefa(id: number) {
    this.tarefaService.deleteTarefa(id);
  }
}
