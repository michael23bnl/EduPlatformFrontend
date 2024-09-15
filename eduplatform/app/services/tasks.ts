export interface TaskRequest {
    theme: string;
    content: string;
    answerOptions: string[];
    rightAnswer: string;
}

export interface SubmitAnswerRequest {
    selectedAnswer: string;
}

export const getAllTasks = async () => {
    const response = await fetch("http://localhost:5137/Tasks/GetTasks", {
        method: 'GET',
        credentials: 'include'
    });

    return response.json();
}

export const createTask = async (taskRequest: TaskRequest) => {
    await fetch("http://localhost:5137/Tasks/CreateTask", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(taskRequest),
        credentials: 'include',
    })
}

export const updateTask = async (id: string, taskRequest: TaskRequest) => {
    await fetch(`http://localhost:5137/Tasks/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(taskRequest),
        credentials: 'include',
    })
}

export const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5137/Tasks/${id}`, {
        method: "DELETE",
        credentials: 'include',
    })
}

export const submitAnswer = async (id: string, submitAnswerRequest: SubmitAnswerRequest) => {

        const response = await fetch(`http://localhost:5137/Tasks/${id}`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(submitAnswerRequest),
            credentials: 'include',
        });

        if (!response.ok) {
            if (response.status === 404) {
                alert('Ошибка! Задача не найдена.');
            } else if (response.status === 401) {
                alert('Войдите в систему, прежде чем решать задачи.');
            } else if (response.status === 400) {
                alert('Введите ответ на задание.');
            } 
            return;
        }

        const result = await response.json();
        console.log(result.isCorrect ? 'Ответ правильный' : 'Ответ неправильный');
        return result; 
    
};

export const GetTasksByTheme = async (theme: string) => {
    const response = await fetch(`http://localhost:5137/Tasks/GetTasksByTheme?theme=${theme}`, {
        method: 'GET',
        credentials: 'include'
    });

    return response.json();
}

export const GetIncorrectlySolvedTasksByTheme = async (theme: string) => {
    const response = await fetch(`http://localhost:5137/Tasks/GetIncorrectlySolvedTasksByTheme?theme=${theme}`, {
        method: 'GET',
        credentials: 'include'
    });

    return response.json();
}



