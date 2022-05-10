import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
    tasksList = [
        { id: 1, taskname: "Wake up", status: false },
        { id: 2, taskname: "Tooth your teeth", status: false },
        { id: 3, taskname: "Eat breakfast", status: false },
        { id: 4, taskname: "Go to work", status: false },
    ];

    getTasks(): Promise<any> {
        return new Promise((resolve) => {
            resolve(this.tasksList);
        })
    }

    getTask(taskId): Promise<any> {
        let id = Number(taskId);
        return new Promise((resolve) => {
            const task = this.tasksList.find(item => item.id == id);
            console.log(task);
            if (!task) {
                throw new HttpException('Task not found', 404);
            }
            resolve(task);
        })
    }

    addTask(task): Promise<any> {
        return new Promise((resolve) => {
            console.log("Task conver", task);
            this.tasksList.push({id: (this.tasksList[this.tasksList.length - 1]?.id + 1), taskname: task.taskname, status: task.status });
            resolve(this.tasksList);
        });
    }

    updateTask(id, task): Promise<any> {
        return new Promise((resolve) => {
            let cloneTasks = [...this.tasksList];
            let updateList = cloneTasks.map((item) => {
                if(item.id == Number(id)){
                    return {...item, taskname: task.taskname, status: task.status}
                } else {
                    return item;
                }
            })
            this.tasksList = updateList;
            resolve(this.tasksList);
        })
    }

    deleteTask(taskId): Promise<any> {
        let id = Number(taskId);
        return new Promise((resolve) => {
            let taskIndex = this.tasksList.findIndex(item => item.id == id);
            
            if (taskIndex === -1) {
                throw new HttpException(`Task not found${id}, ${taskId}`, 404);
            }
            this.tasksList.splice(taskIndex, 1);
            resolve(taskIndex);
        });
    }

}
