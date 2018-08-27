import { Subtarefa } from "./subtarefa.model";

export class Tarefa {
    Id: number;
    Nome: string;
    Descricao: string;
    Concluida: boolean;
    Subtarefas: Subtarefa[];
}