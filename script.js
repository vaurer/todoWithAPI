loadAllTodos();
document.getElementById("addTask").addEventListener("click", function () {
  addNewTask();
  loadAllTodos();
});

function loadAllTodos() {
  fetch("http://localhost:8080/todos")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      html = "";
      data.forEach((element) => {
        html +=
          "<li><input onclick='changeIsDone("+element.id+")' name='checkbox' data-indexOf='" +
          element.taskDone +
          "' type='checkbox'" +
          checked +
          "/> " +
          "  " +
          element.name +
          "  " +
          element.responsible +
          " " +
          "<button onClick='removeTask(" +
          element.id +
          ")'>Remove Task</button></li>";
    
      });
      document.getElementById("todos").innerHTML = html;
    });
}

function addNewTask(name, responsible) {
  var newTask = new Object();
  newTask.name = document.getElementById("newTaskInput").value;
  newTask.responsible = document.getElementById("responsible").value;
  newTask.taskDone = false;
  var jsonString = JSON.stringify(newTask);
  //let newTask ='{"name": "'+taskName+'","responsible:"Vedran"}'

  console.log(newTask);

  fetch("http://localhost:8080/todos/post", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: jsonString,
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
  loadAllTodos();
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
    })
    .catch(function (res) {
      console.log(res);
    });
    loadAllTodos();
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
      console.log(res);
    })
    .catch(function (res) {
      console.log(res);
    });
    loadAllTodos();
}
