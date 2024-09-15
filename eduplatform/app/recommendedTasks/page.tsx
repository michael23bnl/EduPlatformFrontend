"use client";

import Button from "antd/es/button/button";
import { useEffect, useState } from "react";
import { GetIncorrectlySolvedTasksByTheme, submitAnswer, SubmitAnswerRequest } from "../services/tasks";
import Title from "antd/es/typography/Title";
import { IncorrectlySolvedTasks } from "../components/IncorrectlySolvedTasks";
import { useSearchParams } from 'next/navigation'; 

export default function RecommendedTasksPage() {
    const searchParams = useSearchParams();
    const themeParam = searchParams.get('theme'); // получаем параметр theme из URL

    const defaultValues = {
        id: "",
        theme: "",
        content: "",
        answerOptions: [],
        rightAnswer: "",
    } as Task;

    const [values, setValues] = useState<Task>(defaultValues);
    const [incorrectlySolvedTasks, setIncorrectlySolvedTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [answer, setAnswer] = useState<string>("");
    const [theme, setTheme] = useState<string>(themeParam || "");

    useEffect(() => {
        const getIncorrectlySolvedTasks = async (theme: string) => {
            const incorrectlySolvedTasks = await GetIncorrectlySolvedTasksByTheme(theme);
            setLoading(false);
            setIncorrectlySolvedTasks(incorrectlySolvedTasks);
        }

        if (theme) {
            getIncorrectlySolvedTasks(theme);
        }

    }, [theme]);

    const handleSubmitAnswer = async (id: string, request: SubmitAnswerRequest) => {
        await submitAnswer(id, request);

        const incorrectlySolvedTasks = await GetIncorrectlySolvedTasksByTheme(theme);
        setIncorrectlySolvedTasks(incorrectlySolvedTasks);
    }

    return (
        <div>                      
            {loading ? (
                <Title>Loading...</Title> ) 
                : (
                <IncorrectlySolvedTasks incorrectlySolvedTasks={incorrectlySolvedTasks} handleSumbitAnswer={handleSubmitAnswer}/>
                )}
        </div>
    )
}