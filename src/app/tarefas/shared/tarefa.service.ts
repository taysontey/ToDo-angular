import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Tarefa } from './tarefa.model';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr'

@Injectable()
export class TarefaService {

  baseUrl: string = "http://localhost:58468/api/tarefa";

  selectedTarefa: Tarefa;
  tarefas: Tarefa[];
  filtro: string;
  progressoTarefaConcluida: number = 0;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService) { }

  addTarefa(tarefa: Tarefa) {
    return this.http.post(this.baseUrl, tarefa);
  }

  editTarefa(tarefa: Tarefa) {
    return this.http.put(this.baseUrl, tarefa);
  }

  deleteTarefa(id: number) {
    return this.http.delete(this.baseUrl + "?id=" + id);
  }

  getTarefaPorId(id: number) {
    return this.http.get<Tarefa>(this.baseUrl + "?id=" + id);
  }

  getTarefaPorFiltro(filtro: string) {
    return this.http.get<Tarefa[]>(this.baseUrl + "?filtro=" + filtro)
      .subscribe(data => {
        this.tarefas = data;
      }, err => this.toastr.error('Erro ao obter tarefa por filtro.'));
  }

  getTarefas() {
    return this.http.get<Tarefa[]>(this.baseUrl)
      .subscribe(data => {
        this.tarefas = data;
      }, err => this.toastr.error('Erro ao obter tarefas.'));
  }

  getProgressoTarefaConcluida() {
    var valor = this.http.get<number>(this.baseUrl + "?concluida=true")
      .subscribe(data => {
        this.progressoTarefaConcluida = data;
      }, err => this.toastr.error('Erro ao obter progresso das tarefas'));
  }
}
