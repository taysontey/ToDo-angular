import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Tarefa } from './tarefa.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TarefaService {

  selectedTarefa: Tarefa;
  tarefas: Tarefa[];
  baseUrl: string = "http://localhost:58468/api/tarefa/";

  constructor(private http: HttpClient) { }

  addTarefa(tarefa: Tarefa) {
    return this.http.post(this.baseUrl, tarefa);
  }

  editTarefa(tarefa: Tarefa) {
    return this.http.put(this.baseUrl, tarefa);
  }

  deleteTarefa(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  getTarefas() {
    return this.http.get<Tarefa[]>(this.baseUrl)
      .subscribe(data => {
        this.tarefas = data;
      });;
  }
}
