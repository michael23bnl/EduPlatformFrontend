import { CardTheme } from "./CardTheme"
import Card from "antd/es/card/Card";
import Button from "antd/es/button/button";

interface Props {
    tasks: Task[]
    handleDelete: (id: string) => void;
    handleOpen: (task: Task) => void;
}

export const EditTasks = ({tasks, handleDelete, handleOpen}: Props) => {
    return (
        <div className="cards">
            {tasks.map((task : Task) => (
                <Card 
                    key={task.id} 
                    theme={<CardTheme theme={task.theme} content={task.content} />}
                    bordered={false}
                >
                    <p>{task.content}</p>
                    <div className="card__buttons">
                        <Button 
                            onClick={() => handleOpen(task)} 
                            style={{ flex: 1 }}
                        >
                            Редактировать
                        </Button>
                        </div>
                        <div>
                        <Button 
                            onClick={() => handleDelete(task.id)}
                            danger
                            style={{ flex: 1 }}
                        >
                            Удалить
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    )
};