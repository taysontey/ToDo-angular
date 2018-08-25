import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../tarefas/shared/tarefa.service";

@Component({
  selector: 'app-tarefas',
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.css'],
  providers:[TarefaService]
})
export class TarefasComponent implements OnInit {

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {   
  }
  
}
