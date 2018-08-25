import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import {Tarefa} from './tarefa.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TarefaService {

  selectedTarefa : Tarefa;
  tarefas : Tarefa[];
  baseUrl: string = "http://localhost:58468/api/tarefa";
  
  constructor(private http : HttpClient) { }

  addTarefa(tarefa: Tarefa) {
    return this.http.post(this.baseUrl, tarefa);
  }

  getTarefas() {
    return this.http.get<Tarefa[]>(this.baseUrl);
  }
}
