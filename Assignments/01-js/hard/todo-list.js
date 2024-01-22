/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
      this.todosList = [];
  }

  add(todo) {
      this.todosList.push(todo);
  }

  remove(indexOfTodo) {
      if (indexOfTodo >= this.todosList.length || indexOfTodo < 0) {
        console.log("Enter a valid index!");
      } else {
          this.todosList.splice(indexOfTodo, 1);
      }
  }

  update(index, updatedTodo) {
      if (index >= this.todosList.length || index < 0) {
        console.log("Enter a valid index!");
      } else {
          this.todosList[index] = updatedTodo;
      }
  }

  getAll() {
      return this.todosList;
  }

  get(indexOfTodo) {
      if (indexOfTodo >= 0 && indexOfTodo < this.todosList.length) {
          return this.todosList[indexOfTodo];
      } else {
          return null
      }
  }

  clear() {
      return this.todosList = [];
  }
}

module.exports = Todo;

