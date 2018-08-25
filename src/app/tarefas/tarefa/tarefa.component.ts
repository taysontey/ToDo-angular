import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { TarefaService } from '../shared/tarefa.service';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  constructor(private tarefaService: TarefaService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.tarefaService.selectedTarefa = {
      Id: 0,
      Nome: '',
      Descricao: ''
    }
  }

  onSubmit(form: NgForm){
    this.tarefaService.addTarefa(form.value)
      .subscribe(data =>{
        
      });
  }
}
