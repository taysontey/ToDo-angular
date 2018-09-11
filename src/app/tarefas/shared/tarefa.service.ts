import { Injectable } from '@angular/core';
import { Tarefa } from './tarefa.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TarefaService {

  baseUrl: string = "http://localhost:58468/api/tarefa";

  tarefa: Tarefa;
  tarefas: Tarefa[] = [];
  filtro: string;
  progressoTarefaConcluida: number = 0;

  constructor(
    private http: HttpClient) { }

  addTarefa(tarefa: Tarefa) {
    return this.http.post<Tarefa>(this.baseUrl, tarefa);
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
    return this.http.get<Tarefa[]>(this.baseUrl + "?filtro=" + filtro);
  }

  getTarefas() {
    return this.http.get<Tarefa[]>(this.baseUrl);
  }

  getProgressoTarefaConcluida() {
    return this.http.get<number>(this.baseUrl + "?concluida=true");
  }
}
