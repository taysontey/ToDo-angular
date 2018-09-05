import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import {Router} from '@angular/router';

import { TarefaService } from '../shared/tarefa.service';
import { ToastrService } from 'ngx-toastr'
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
    this.resetForm();
    this.resetSelectedTarefa();
    this.resetSelectedSubtarefa();
  }

  onToggleModal() {
    if (this.tarefaService.selectedTarefa.Id == null)
      this.toastr.error('Primeiro salve a tarefa.');
    else
      this.isModalActive = !this.isModalActive;
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
  }

  resetSelectedTarefa() {
    this.tarefaService.selectedTarefa = {
      Id: null,
      Nome: '',
      Descricao: '',
      Concluida: false,
      Subtarefas: []
    };
  }

  resetSelectedSubtarefa() {
    this.subtarefaService.selectedsubtarefa = {
      Id: null,
      Nome: '',
      Concluida: false,
      IdTarefa: null
    };
  }

  onSaveTarefa(form: NgForm) {

    if (form.value.Id == null) {
      this.tarefaService.addTarefa(form.value)
        .add(tearDown => {
          this.resetForm();
          this.resetSelectedTarefa();
        });
    }
    else {
      this.tarefaService.editTarefa(form.value)
        .add(tearDown => {
          this.resetForm();
          this.resetSelectedTarefa();
        });
    }

    this.router.navigate(['tarefaList']);
  }

  onAddSubtarefa() {
    this.onToggleModal();
    this.resetSelectedSubtarefa();
  }

  onSaveSubtarefa(subtarefa: Subtarefa) {

    subtarefa.IdTarefa = this.tarefaService.selectedTarefa.Id;

    if (subtarefa.Id == null) {
      this.subtarefaService.addSubtarefa(subtarefa)
        .add(tearDown => {
          this.resetSelectedSubtarefa();
          this.tarefaService.getTarefaPorId(this.tarefaService.selectedTarefa.Id);
        })
    }
    else {
      this.subtarefaService.editSubtarefa(subtarefa)
        .add(tearDown => {
          this.resetSelectedSubtarefa();
          this.tarefaService.getTarefaPorId(this.tarefaService.selectedTarefa.Id);
        })
    }

    this.isModalActive = !this.isModalActive;
  }

  onEditSubtarefa(id: number) {
    this.isModalActive = !this.isModalActive;
    this.subtarefaService.getSubtarefaPorId(id);
  }

  onConcluirSubtarefa(subtarefa: Subtarefa) {

    subtarefa.Concluida = true;

    this.subtarefaService.editSubtarefa(subtarefa)
      .add(tearDown => {
        this.tarefaService.getTarefaPorId(this.tarefaService.selectedTarefa.Id);
      })
  }

  onDeleteSubtarefa(id: number) {
    this.subtarefaService.deleteSubtarefa(id)
      .add(tearDown => {
        this.tarefaService.getTarefaPorId(this.tarefaService.selectedTarefa.Id);
      })
  }
}
