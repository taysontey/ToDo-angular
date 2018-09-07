import { Injectable } from '@angular/core';
import { Subtarefa } from './subtarefa.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubtarefaService {

  baseUrl: string = "http://localhost:58468/api/subtarefa";

  subtarefa: Subtarefa;
  subtarefas: Subtarefa[];

  constructor(
    private http: HttpClient) { }

  addSubtarefa(subtarefa: Subtarefa) {
    return this.http.post(this.baseUrl, subtarefa);
  }

  editSubtarefa(subtarefa: Subtarefa) {
    return this.http.put(this.baseUrl, subtarefa);
  }

  deleteSubtarefa(id: number) {
    return this.http.delete(this.baseUrl + "?id=" + id);
  }

  getSubtarefaPorId(id: number) {
    return this.http.get<Subtarefa>(this.baseUrl + "?id=" + id);
  }

  getSubtarefaPorFiltro(filtro: string) {
    return this.http.get<Subtarefa[]>(this.baseUrl + "?filtro=" + filtro);
  }

  getSubtarefasPorIdTarefa(idTarefa: number){
    return this.http.get<Subtarefa[]>(this.baseUrl + "?idTarefa=" + idTarefa);
  }
}
