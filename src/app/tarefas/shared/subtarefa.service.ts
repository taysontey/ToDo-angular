import { Injectable } from '@angular/core';
import { Subtarefa } from './subtarefa.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class SubtarefaService {

  baseUrl: string = "http://localhost:58468/api/subtarefa";

  selectedsubtarefa: Subtarefa;
  subtarefas: Subtarefa[];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService) { }

  addSubtarefa(subtarefa: Subtarefa) {
    return this.http.post(this.baseUrl, subtarefa)
      .subscribe(data => {
        this.toastr.success('Subtarefa adicionada com sucesso.');
      }, err => this.toastr.error('Erro ao adicionar subtarefa.'));
  }

  editSubtarefa(subtarefa: Subtarefa) {
    return this.http.put(this.baseUrl, subtarefa)
      .subscribe(data => {
        this.toastr.success('Tarefa atualizada com sucesso.');
      }, err => this.toastr.error('Erro ao atualizar tarefa.'));
  }

  deleteSubtarefa(id: number) {
    return this.http.delete(this.baseUrl + "?id=" + id)
      .subscribe(data => {
        this.toastr.success("Subtarefa excluída!");
      }, err => this.toastr.error('Erro ao excluir subtarefa.'));
  }

  getSubtarefaPorId(id: number) {
    return this.http.get<Subtarefa>(this.baseUrl + "?id=" + id)
      .subscribe(data => {
        this.selectedsubtarefa = data
      }, err => this.toastr.error('Erro ao obter subtarefa por id.'));
  }

  getSubtarefas() {
    return this.http.get<Subtarefa[]>(this.baseUrl)
      .subscribe(data => {
        this.subtarefas = data;
      }, err => this.toastr.error('Erro ao obter subtarefas.'));
  }
}
