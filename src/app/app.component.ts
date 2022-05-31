import { Component } from '@angular/core';
import { Todo } from './Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todoArray: Todo[] = [ // We use this as the storage of all our todos.
    {task: "mow grass", completed: false},
    {task: "get gas", completed: true},
    {task: "wash dishes", completed: false},
    {task: "fold laundry", completed: true},
    {task: "cook dinner", completed: true}
  ];
  searchedArray: Todo[] = this.todoArray; // This is used when we display todos and changes constantly based on what is being searched.

  newTask: Todo = {task: "", completed: false}; // Used to create and add a new todo. We start with it being uncompleted.
  searchArrayByString: string = ""; // Is updated to whatever the user entered to search.
  todoArrayIndex: number = -1; // Used for converting index of searchedArray element to index of that same element in todoArray.
  

  addTodo() {
    let task = Object.assign({}, this.newTask);
    this.todoArray.push(task);

    this.searchArray(); // To show the newest change if it currently matches search parameter.
    this.newTask.task = ""; // To blank out the add todo box after being used.
  }

  completeTask(index: number) {
    this.getTodoArrayIndex(index);

    this.todoArray[this.todoArrayIndex].completed = true;
  }

  removeTask(index: number) {
    
    this.getTodoArrayIndex(index);
    
    this.todoArray.splice(this.todoArrayIndex, 1);

    this.searchArray();
  }

  searchArray() {
    this.searchedArray = this.todoArray;

    this.searchedArray = this.todoArray.filter((todo) => {
      
      return todo.task.includes(this.searchArrayByString);
    });
  }

  getTodoArrayIndex(index: number) {  // Converts index of an element of searchedArray to index of that same element in todoArray
    this.todoArrayIndex = this.todoArray.findIndex((todo) => { 
      return this.searchedArray[index] === todo;
    });
  }
  
  ngOnInit(): void {
  }
}
