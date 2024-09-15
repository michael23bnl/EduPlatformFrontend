import Modal from "antd/es/modal/Modal";
import { TaskRequest } from "../services/tasks";
import Input from "antd/es/input/Input";
import { theme } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";

interface Props {
    mode: Mode;
    values: Task;
    isModalOpen: boolean;
    handleCancel: () => void;
    handleCreate: (request: TaskRequest) => void;
    handleUpdate: (id: string, request: TaskRequest) => void;
}

export enum Mode {
    Create,
    Edit,
}

export const CreateUpdateTask = ({
    mode,
    values,
    isModalOpen,
    handleCancel,
    handleCreate,
    handleUpdate,
}: Props) => {
    const [taskTheme, setTaskTheme] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [answerOptions, setAnswerOptions] = useState<string[]>([]);
    const [rightAnswer, setRightAnswer] = useState<string>("");
    const [currentOption, setCurrentOption] = useState<string>("");

    useEffect(() => {
        setTaskTheme(values.theme);
        setContent(values.content);
        setAnswerOptions(values.answerOptions);
        setRightAnswer(values.rightAnswer);
    }, [values]);

    const handleOnOk = async () => {
        const taskRequest = { theme: taskTheme, content, answerOptions, rightAnswer };
        mode === Mode.Create ? handleCreate(taskRequest) : handleUpdate(values.id, taskRequest);
    };

    const handleAddOption = () => {
        if (currentOption.trim()) {
            setAnswerOptions([...answerOptions, currentOption.trim()]);
            setCurrentOption("");
        }
    };

    const handleDeleteOption = (index: number) => {
        setAnswerOptions(answerOptions.filter((_, i) => i !== index));
    };

    return (
        <Modal
            title={mode === Mode.Create ? "Добавить задачу" : "Редактировать задачу"}
            open={isModalOpen}
            cancelText={"Отмена"}
            onOk={handleOnOk}
            onCancel={handleCancel}
        >
            <div className="task__modal">
                <Input
                    value={taskTheme}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaskTheme(e.target.value)}
                    placeholder="Тема"
                />
                <TextArea
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 3 }}
                    placeholder="Текст задачи"
                />
                <div>
                    <Input
                        value={currentOption}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentOption(e.target.value)}
                        placeholder="Вариант ответа"
                    />
                    <Button onClick={handleAddOption}>Добавить</Button>
                </div>
                <ul>
                    {answerOptions.map((option, index) => (
                        <li key={index}>
                            {index + 1}) {option}
                            <Button onClick={() => handleDeleteOption(index)}>Удалить</Button>
                        </li>
                    ))}
                </ul>
                <Input
                    value={rightAnswer}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRightAnswer(e.target.value)}
                    placeholder="Правильный ответ"
                />
            </div>
        </Modal>
    );
};