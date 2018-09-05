import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TarefaComponent } from '../tarefas/tarefa/tarefa.component';
import { TarefaListComponent } from '../tarefas/tarefa-list/tarefa-list.component';

const routes: Routes = [
  {
    path: '', component: TarefaListComponent
  },
  {
    path: 'tarefa', component: TarefaComponent
  },
  {
    path: 'tarefaList', component: TarefaListComponent
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class RouteModule { }
