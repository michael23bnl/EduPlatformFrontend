"use client";
import { Tasks } from "../components/Tasks";
import { useEffect, useState } from "react";
import { getAllTasks, submitAnswer, SubmitAnswerRequest } from "../services/tasks";
import { useRouter } from 'next/navigation';  
import { message, notification, Button, Typography } from "antd";

const { Title } = Typography;

export default function TasksPage() {
    const router = useRouter();  

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
    const [answer, setAnswer] = useState<string>("");

    useEffect(() => {
        const getTasks = async () => {
            const tasks = await getAllTasks();
            setLoading(false);
            setTasks(tasks);
        };

        getTasks();
    }, []);

    const showNotification = (theme: string) => {
        notification.info({
            message: 'Подсказка',
            description: (
                <div>
                    <p>Похоже, у вас трудности с заданиями по теме "{theme}". Перейдите по ссылке, чтобы решить их заново.</p>
                    <Button 
                        type="link" 
                        onClick={() => window.open(`/recommendedTasks?theme=${theme}`, '_blank')}
                    >
                        Перейти
                    </Button>
                </div>
            ),
            duration: 5, 
        });
    };

    const handleSubmitAnswer = async (id: string, request: SubmitAnswerRequest) => {
        const result = await submitAnswer(id, request);
        if (result.isCorrect) {
            message.success('Ответ правильный!');
        }
        else {
            message.error('Ответ неправильный.');
            if (result.showRecommendations) {
                showNotification(result.theme);               
            }
        }
            const tasks = await getAllTasks();
            setTasks(tasks);        
    };

    return (
        <div>
            {loading ? (
                <Title>Loading...</Title>
            ) : (
                <Tasks tasks={tasks} handleSumbitAnswer={handleSubmitAnswer} />
            )}
        </div>
    );
}