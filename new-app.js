// Declare variable and grab elements
const title = $('#title');
const by_task = $('#by_task');
const add_task = $('#add-task'); 
const flip = $('#show-template');
const panel = $('#task-section');
const all_tasks = $('#all_tasks');
const importance = $('#importance');
const description = $('#description');
const search_tasks = $('#search-tasks')
const by_importance = $('#by_importance');
var tasks = [];
var tasks_key = [];
var id;

// Get localstorage tasks 
for (let i=0; i<localStorage.length; i++){
  let key = localStorage.key(i);
  tasks_key.push(key);
  tasks.push(JSON.parse(localStorage.getItem(key)));
};


$(document).ready( ()=> {
  display_tasks(tasks);
   // Added slide animation to add task button click
  flip.click( ()=> {
    panel.slideToggle("slow");
    })
});

// Add task 
add_task.click(push_to_localstorage);

function push_to_localstorage(){
  let title_value = title.val();
  if(title_value == ''){
    alert('Please a give your task a title');
    return;
  }
  let description_value = description.val();
  let importance_value = importance.val();
  let isDone = false;
  let time = new Date().toUTCString();
  var id = Math.floor(Math.random()*10000000);
  let task = JSON.stringify({'id': id, 'name': title_value,'description': description_value,
                            'importance': importance_value,'isDone': isDone,'time': time});
  localStorage.setItem(id, task);
  location.reload()
};



//Function to populate tasks from localstorage
function display_tasks(array){
  all_tasks[0].innerHTML = '';
  //check if empty
  if(localStorage.length == 0){
    return;
  }
  // If not empty
  array.forEach(task => {
    var a;
    if(task.isDone){
      a = `<div class='task finished' id='${task.id}'>`;
    }else{
      a = `<div class='task' id='${task.id}'>`;
    }
    let html = 
        `${a}
          <h3>${task.name}:</h3>
          <p class="description"> ${task.description} <span>${task.importance}</span> ${task.time}</p> 
          <i data-id='${task.id}' class="fa-solid fa-pen"></i><i data-id='${task.id}' class="done fas fa-check"'></i><i data-id='${task.id}' class="trash fas fa-trash"></i>
        </div>
        <div class="hidden-div" data-id='0'>
          <span>Title : </span> 
          <input class='hidden-text' id='hidden-title' type="textarea" placeholder="change title">
          <span>Description : </span>
          <input class='hidden-text' id='hidden-description' type="textarea" placeholder="change description">
          <input class="button" type="button" data-id='${task.id}' value='Update'>
        </div>`;
    all_tasks.append(html);
        // ================================== revieww sectionnnnnn ==================================
  })

    // When the user click on delete task icon
  $('.task .trash').click((e)=> {
    let clicked = e.currentTarget;
    let id = clicked.getAttribute("data-id");
    $(`#${id}`).fadeOut('slow', 'swing');
    localStorage.removeItem(id);
  });
  
  // When the user click on task Done icon
  $('.task .done').click((e)=> {
    let clicked = e.currentTarget;
    id = clicked.getAttribute('data-id');
    let updated_task = JSON.parse(localStorage.getItem(id));
    if(updated_task.isDone == false){
      updated_task.isDone = true;
    }else{
      updated_task.isDone = false;
    }
    localStorage.setItem(id, JSON.stringify(updated_task));
    location.reload();
  });

  //Update Task
  $('.task .fa-solid').click((e)=> {
    let clicked = e.currentTarget;
    let id = clicked.getAttribute('data-id');
    let child = $(`#${id} + div`);
    let hidden_title = child.children('input#hidden-title')
    let hidden_text = child.children('input#hidden-description')
    let button = child.children('input.button')
    let hidden = child[0].getAttribute('data-id');
    button.click(()=> {
      if(hidden_title.val()==''){
        alert('Please give your task a name')
        return;
      }else{
        child.fadeOut();
        let task = JSON.parse(localStorage.getItem(id))
        task.name = hidden_title.val();
        task.description = hidden_text.val();
        task = JSON.stringify(task);
        localStorage.setItem(id, task);
        child.attr('data-id', '0');
        setTimeout(() => {
          location.reload();
        },500 ); 
      }
    })
    if(hidden == 0){
      child.fadeIn();
      child.attr('data-id', '1');
      child.css('display','flex')
    } else{
      child.fadeOut();
      child.attr('data-id', '0');
    }
  });
}

// Display tasks by order of importance
by_importance.click(()=>{
  let order1 = [];
  let order2 = [];
  let order3 = [];
  let order4 = [];
  let order5 = [];
  tasks.forEach(task => {
    switch(task.importance) {
      case '5':
        order5.push(task)
        break;
      case '4':
        order4.push(task)
        break;
      case '3':
        order3.push(task)
        break;
      case '2':
        order2.push(task)
        break;
      case '1':
        order1.push(task)
    }
  })
  let result = [...order5,...order4,...order3,...order2,...order1]
  display_tasks(result)
})

// Show tasks by date of creation
by_task.click(()=>{
  display_tasks(tasks);
});


//Search tasks functionality
const search_text = search_tasks[0];
search_text.addEventListener("input", (e)=>{
  let search = e.currentTarget.value
  search = search.toLowerCase()
  tasks.forEach(task => {
    let name = task.name.toLowerCase();
    let description = task.description.toLowerCase();
    var visible = name.includes(search) || description.includes(search);
    let parent = $(`#${task.id}`) 
    if(!visible){
      parent.fadeOut();
    }else{
      parent.fadeIn();
    }
  })
})





