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

    const onFormSubmit = (event) => {
        event.preventDefault(); 
        
    }

    const render = () => {
        let taskContent = ""; 

        for (const task of tasks){
            taskContent += 
            `<li class="section__item js-tasksList">
            <button class="section__button section__button--done js-toggleDone">${task.done ? "✔" : ""}</button>
            <span class="section__span ${task.done ? "section__span--done" : ""}">${task.content}</span>
            <button class="section__button section__button--remove">🗑️</button>
            </li>`;
        }

        document.querySelector(".js-tasksList").innerHTML = taskContent;
    }

    const init = () => {
        const form = document.querySelector(".js-form"); 
        form.addEventListener("submit", onFormSubmit);
        render();
    }

    init(); 
}