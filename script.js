loadAllTodos();

document.getElementById("addTask").addEventListener("click", function () {
  addNewTask();

});


function loadAllTodos() {
  var source = document.getElementById("todoList").innerHTML;
  var template = Handlebars.compile(source);

  fetch("http://localhost:8080/todos")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data, "OK");
  
      let htmlAllTodos = template(data);
     // console.log(template(data))

      document.getElementById("taskOutHandelbars").innerHTML = htmlAllTodos;
    });
}

function addNewTask() {
  var newTask = new Object();
  newTask.name = document.getElementById("newTaskInput").value;
  newTask.responsible = document.getElementById("responsible").value;
  newTask.taskDone = false;
  var jsonString = JSON.stringify(newTask);

  console.log(newTask);

  fetch("http://localhost:8080/todos/post", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:8080/"
    },
    method: "POST",
    body: jsonString,
  })
  .then(response => loadAllTodos())
  .then(document.getElementById("newTaskInput").value="")
  .then(document.getElementById("responsible").value="")
  .catch(error => alert('Error! ' + error.message))
    // .catch(function (res) {
    //   console.log(res);
    // });
}

function removeTask(id) {
  let url = "http://localhost:8080/todos/remove/" + id + "/";
  console.log(url);

  fetch(url, {
    headers: {
      Accept: "application/json",
    },
    method: "DELETE",
    
  })
    .then(function (res) {
      console.log(res);
      loadAllTodos();
    })
    .catch(function (res) {
      console.log(res);
    });

}

function changeIsDone(id){
    let url = "http://localhost:8080/todos/put/" + id + "/";
    console.log(url);

   
  fetch(url, {
    headers: {
      Accept: "application/json",
     
    },
    method: "PUT",
   
  })
    .then(function (res) {
      loadAllTodos();
      console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
    $("#myToast").toast('show');
}

