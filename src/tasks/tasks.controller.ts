import { Controller, Get, Post, Param, Body, Delete, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService){};

    @Get()
    async getTasks(){
        const tasks = await this.tasksService.getTasks();
        return tasks;
    }

    @Get(':taskId')
    async getTask(@Param('taskId') taskId: string){
        const task = await this.tasksService.getTask(taskId);
        return task;
    }

    @Post()
    async addTask(@Body() CreateTaskDto: CreateTaskDto){
        const task = await this.tasksService.addTask(CreateTaskDto);
        return task;
    }

    @Put(':id')
    async updateTask(@Param('id') id: string ,@Body() UpdateTaskDto: UpdateTaskDto){
        const task = await this.tasksService.updateTask(id, UpdateTaskDto);
        return task;
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string ){
        console.log('Id :',id);
        const task = await this.tasksService.deleteTask(id);
        return task;
    }
}
