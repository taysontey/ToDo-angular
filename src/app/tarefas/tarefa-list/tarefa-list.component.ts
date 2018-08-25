import { Component, OnInit } from '@angular/core';

import { TarefaService } from '../shared/tarefa.service'
import { Tarefa } from '../shared/tarefa.model'; 

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit {

  tarefas: Tarefa[];

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.tarefaService.getTarefas()
    .subscribe(data => {
    this.tarefas = data;
    });
  }  

}
