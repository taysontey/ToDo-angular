import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { TarefaService } from '../shared/tarefa.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrls: ['./tarefa.component.css']
})
export class TarefaComponent implements OnInit {

  constructor(
    private tarefaService: TarefaService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.tarefaService.selectedTarefa = {
      Id: 0,
      Nome: '',
      Descricao: '',
      Concluida: false
    }
  }

  onSubmit(form: NgForm){
    if(form.value.Id == 0)
    {
      this.tarefaService.addTarefa(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.tarefaService.getTarefas();
        this.toastr.success('Tarefa adicionada com sucesso.');
      });
    }
    else
    {
      this.tarefaService.editTarefa(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.tarefaService.getTarefas();
        this.toastr.success('Tarefa atualizada com sucesso.');
      });
    }  
  }
}
