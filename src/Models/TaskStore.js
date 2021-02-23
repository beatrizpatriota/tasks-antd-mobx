import { types } from 'mobx-state-tree'

export const Tag = types.model({
    nome: types.string,
    color: types.string
})

export const Task = types
    .model("Task", {
        key: types.identifier,
        tarefa: types.string, 
        documento: types.string,
        status: types.string,
        responsavel: types.string,
        dataCriacao: types.string,
        dataPrevisao: types.string,
        dataConclusao: types.string,
        tags: types.array(Tag),
        opcoes: types.string
    })
    .actions(self => {
        return {
            finishTask() {
                self.status = 'Finalizada'
            }
        }
    })

export const TaskStore = types
    .model("TaskStore", {
        tasks: types.array(Task),
    })
    .views(self => {
        return {
            getEmBreveTasks() {
                return self.tasks.filter(t => t.status === 'Em breve')
            },
            getAguardandoTasks() {
                return self.tasks.filter(t => t.status === 'Aguardando execução' || t.status === 'Em execução')
            },
            getFinalizadaTasks() {
                return self.tasks.filter(t => t.status === 'Finalizada')
            },
            getFilterColumn(column){
       return self.tasks.filter(t => t[column])
            }
        }
    })
    .actions(self => {
        return {
            // getColor(){
            //     switch (self.tags.nome) {
            //         case 'Confidencialidade':
            //           self.color = 'purple'
            //           break
            //         case 'Não concluído':
            //           self.color = 'red'
            //           break
            //         case 'Trabalhista':
            //           self.color = 'blue'
            //           break
            //         case 'Concluído':
            //           self.color = 'green'
            //           break
            //         case 'Bancária':
            //           self.color = 'gold'
            //           break
            //         default:
            //           self.color = 'blue'
            //       }
            // }
        }
    })

