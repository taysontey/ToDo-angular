import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TarefaComponent } from './tarefas/tarefa/tarefa.component';
import { TarefaListComponent } from './tarefas/tarefa-list/tarefa-list.component';
import { ToastrModule } from 'ngx-toastr';
import { RouteModule } from './route/route.module';
import { TarefaService } from './tarefas/shared/tarefa.service';

@NgModule({
  declarations: [
    AppComponent,
    TarefaComponent,
    TarefaListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouteModule
  ],
  providers: [TarefaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
