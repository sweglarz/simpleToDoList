{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {
                content: newTaskContent,
            },
        ];
        render();
    };

    const removeTask = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const bindButtonEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllTasksDone");
        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", markAllTasksDone);
        };

        const toggleHideDoneButton = document.querySelector(".js-toggleHideDoneTasks");
        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
        };
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeTask");
        removeButtons.forEach((removeButtons, index) => {
            removeButtons.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-toggleDone");
        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderButtons = () => {
        const buttons = document.querySelector(".js-buttons");
        if (!tasks.length) {
            buttons.innerHTML = "";
            return;
        };

        buttons.innerHTML = `
            <button class="buttons__button js-toggleHideDoneTasks" ${tasks.some(({done}) => done) ? "" : "disabled"}>${tasks.some(({done}) => done) && hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone</button>

            <button class="buttons__button js-markAllTasksDone" ${tasks.every(({ done }) => done) ? "disabled" : ""}>Ukończ wszystkie</button>`
    };

    const renderTasks = () => {
        const taskToHTML = task => `
        <li class ="section__item ${task.done && hideDoneTasks ? "section__item--hidden" : ""} js-tasksList">
            <button class ="section__button section__button--done js-toggleDone">${task.done ? "✔" : ""}</button>
            <span class ="section__span
            ${task.done ? "section__span--done" : ""}">${task.content}</span>
            <button class ="section__button section__button--remove js-removeTask">🗑️</button>
            </li>`;

        const taskElement = document.querySelector(".js-tasksList");
        taskElement.innerHTML = tasks.map(taskToHTML).join("");
    }

    const render = () => {
        renderTasks();
        renderButtons();
        bindButtonEvents();

        bindRemoveEvents();
        bindToggleDoneEvents();
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
        const formElement = document.querySelector(".js-form");
        formElement.addEventListener("submit", onFormSubmit);
    };
    init();
}