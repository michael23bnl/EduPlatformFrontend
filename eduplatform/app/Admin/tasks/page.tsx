"use client";

import Button from "antd/es/button/button";
import { EditTasks } from "@/app/components/EditTasks";
import { useEffect, useState } from "react";
import { createTask, deleteTask, getAllTasks, TaskRequest, updateTask } from "@/app/services/tasks";
import Title from "antd/es/typography/Title";
import { CreateUpdateTask, Mode } from "@/app/components/CreateUpdateTask";
import "@/app/globals.css";

export default function AdminTasksPage() {

    const defaultValues = {
        id: "",
        theme: "",
        content: "",
        answerOptions: [],
        rightAnswer: "",
    } as Task;

    const [values, setValues] = useState<Task>(defaultValues);

    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mode, setMode] = useState(Mode.Create);

    useEffect(() => {
        const getTasks = async () => {
            const tasks = await getAllTasks();
            setLoading(false);
            setTasks(tasks);
        }

        getTasks();

    }, [])

    const handleCreateTask = async (request: TaskRequest) => {
        await createTask(request);
        closeModal();

        const tasks = await getAllTasks();
        setTasks(tasks);
    }

    const handleUpdateTask = async (id: string, request: TaskRequest) => {
        await updateTask(id, request);
        closeModal();

        const tasks = await getAllTasks();
        setTasks(tasks);
    }

    const handleDeleteTask = async (id: string) => {
        await deleteTask(id);
        closeModal();

        const tasks = await getAllTasks();
        setTasks(tasks);
    }

    const openModal = () => {
        setMode(Mode.Create);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setValues(defaultValues);
        setIsModalOpen(false);
    }

    const openEditModal = (task: Task) => {
        setMode(Mode.Edit);
        setValues(task);
        setIsModalOpen(true);
    }

    
    
    return (
        <div>
            <Button
            type="primary"
            style={{marginTop: "30px"}}
            size="large"
            onClick={openModal}
            >
                Добавить задачу
            </Button>

            <CreateUpdateTask 
                mode={mode} 
                values={values} 
                isModalOpen={isModalOpen} 
                handleCreate={handleCreateTask}
                handleUpdate={handleUpdateTask}
                handleCancel={closeModal}
            />

            {loading ? (
                <Title>Loading...</Title> ) 
                : (
                <EditTasks tasks={tasks} handleOpen={openEditModal} handleDelete={handleDeleteTask}/>
                )}

        </div>
    )

}


    
