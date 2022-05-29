// Declare variable and grab elements
const flip = $('#show-template');
const panel = $('#task-section');
const add_task = $('#add-task'); 
const title = $('#title');
const description = $('#description');
const importance = $('#importance');
const all_tasks = $('#all_tasks');


// Show add task panel by slide
$(document).ready(function(){
   flip.click(function(){
   panel.slideToggle("slow");
   });
});

// Add task 
add_task.click(push_to_localstorage);

function push_to_localstorage(){
   let title_value = title.val();
   let description_value = description.val();
   let importance_value = importance.val();
   let isDone = false;
   let time = new Date().toUTCString();
   let task = JSON.stringify({'name': title_value,'description': description_value,'importance': importance_value,'status': isDone,'time': time});
   var id = localStorage.length +1 ;
   localStorage.setItem(id,task);
   
}

// Show tasks by date
for (let i = 1; i <= localStorage.length; i++){
   let task = localStorage.getItem(i);
   console.log(task);
   task = JSON.parse(task);
   console.log(task);
   let html = `<div class="task"><input type="radio" class = status"><h3>${task.name}</h3>: ${task.description}, ${task.importance}, ${task.time}</div>`;
   all_tasks.append(html);
}

// Delete Tasks 
