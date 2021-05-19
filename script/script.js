{
    const tasks =[
        {
            content: "pogłaskać kota",
            done: true,
        },
        {
            content: "stworzyć listę zadań", 
            done: false, 
        }, 
    ]

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1); 
        render();
    };

    const toggleTaskDone = (index) => {
        tasks[index].done = !tasks[index].done;
        render(); 
    }

    const render = () => {
        let taskContent = ""; 

        for (const task of tasks){
            taskContent += 
            `<li class="section__item js-tasksList">
            <button class="section__button section__button--done js-toggleDone">${task.done ? "✔" : ""}</button>
            <span class="section__span ${task.done ? "section__span--done" : ""}">${task.content}</span>
            <button class="section__button section__button--remove js-removeButton">🗑️</button>
            </li>`;
        }

        document.querySelector(".js-tasksList").innerHTML = taskContent;

        const removeButtons = document.querySelectorAll(".js-removeButton");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            }); 
        });
        
        const toggleButtons = document.querySelectorAll(".js-toggleDone"); 

        toggleButtons.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const onFormSubmit = (event) => {
        event.preventDefault(); 

        const newTaskContent = document.querySelector(".js-input"); 
        const newTask = newTaskContent.value.trim(); 
        
        if (newTask !== "") {
            addNewTask(newTask); 
            newTaskContent.value = ""; 
        }

        newTaskContent.focus();
    };

    const init = () => {
        const form = document.querySelector(".js-form"); 
        form.addEventListener("submit", onFormSubmit);
        render();
    }

    init(); 
}