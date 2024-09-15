import { CardTheme } from "./CardTheme"
import Card from "antd/es/card/Card";
import Button from "antd/es/button/button";
import Input from "antd/es/input/Input";
import {  SubmitAnswerRequest } from "../services/tasks";
import { useEffect, useState } from "react";


interface Props {
    incorrectlySolvedTasks: Task[]
    handleSumbitAnswer: (id: string, request: SubmitAnswerRequest) => void;
}

export const IncorrectlySolvedTasks = ({incorrectlySolvedTasks, handleSumbitAnswer}: Props) => {

    const [answer, setAnswer] = useState<string>("");

    const handleOnOk = async (id: string) => {
        const submitAnswerRequest = { selectedAnswer: answer };
        handleSumbitAnswer(id, submitAnswerRequest);
    };

    return (

        <div className="card__section">
            <div className="card__container">
                {incorrectlySolvedTasks.map((task: Task) => (
                    <div key={task.id} className="card">

                        <div className="card__theme">
                            <p>Тема: {task.theme}</p>
                        </div>

                        <div className="card__content">
                            <p>{task.content}</p>
                        </div>

                        <div className="card__answer__options">
                            {task.answerOptions.map((option, index) => (
                                <p key={index}>{index + 1}) {option}</p>
                            ))}
                        </div>

                        <div className="card__inputs__buttons">

                            <input className="card__answer__input"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                                placeholder="Введите ответ"
                            />
                        
                            <button className="card__submit__answer_btn"
                                onClick={() => handleOnOk(task.id)} 
                                style={{ flex: 1 }}
                            >
                                Отправить
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>

        /*
        <div className="cards">
            {incorrectlySolvedTasks.map((task : Task) => (
                <Card 
                    key={task.id} 
                    theme={<CardTheme theme={task.theme} content={task.content} />}
                    bordered={false}
                >
                    <p>{task.content}</p>

                    <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
                    placeholder="Введите ответ"
                />   

                    <div className="card__buttons">
                        <Button 
                            onClick={() => handleOnOk(task.id)} 
                            style={{ flex: 1 }}
                        >
                            Отправить
                        </Button>
                       
                    </div>
                </Card>
            ))}
        </div>
        */
    )
};