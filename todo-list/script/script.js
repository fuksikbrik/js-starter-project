                        // Обьявление переменных витянутых из HTML 
let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');
                        // Создание масива для хранения заметок 
let todoList = [];
                        // скрипт который не даёт исчезнуть данным  из локального хранилища 
if(localStorage.getItem('todo')){
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
};
                        // Отслеживание события клик на кнопку "Добавить" и в нём имеется:
                        // todo:считывает строку с input и передаёт в переменую newTodo которая потом отобразит заметку из масива todoList ;
                        // checked:передаёт значениия checkbox выполнено / не выполнено;
    addButton.addEventListener('click', function(){
        let newTodo = {
            todo: addMessage.value,
            checked: false,
        };
                        // Добавление в todoList, newTodo затем запускает функцию displayMessages  и далее заносит её в локаьное хранилище 
        todoList.push(newTodo);
        displayMessages();
        localStorage.setItem('todo', JSON.stringify(todoList));
    });
                        // выводит на екран заметку которая была написана в addMessage и генерирует елемент списка и присваивает каждому елементу списка уникальнный идентификатор
    function displayMessages(){
        let displayMessage = '';
        todoList.forEach(function(item, i){
           displayMessage += `
           <li>
                <input type='checkbox' id='item_${i}' ${item.checked ?  'checked' : ''}>
                <label for='item_${i}'>${item.todo}</label>
           </li>
           `; 
           todo.innerHTML = displayMessage;
        });
    }
                        // функция которая считывает и записывает значение checkbox и передаёт её в localStorage
    todo.addEventListener('change', function(event){
        let valueLabel = todo.querySelector('[for='+ event.target.getAttribute('id') +']').innerHTML;

        todoList.forEach(function(item){
            if (item.todo === valueLabel){
                item.checked = !item.checked;
                localStorage.setItem('todo', JSON.stringify(todoList));
            }
        });
    });