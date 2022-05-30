// Declare variable and grab elements
const flip = $('#show-template');
const panel = $('#task-section');
const add_task = $('#add-task'); 
const title = $('#title');
const description = $('#description');
const importance = $('#importance');
const all_tasks = $('#all_tasks');
const by_importance = $('#by_importance');
const by_task = $('#by_task');
var id;

// Show add task panel by slide
$(document).ready( ()=> {
   flip.click( ()=> {
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
   var id = localStorage.length +1 ;
   let task = JSON.stringify({'id': id, 'name': title_value,'description': description_value,'importance': importance_value,'status': isDone,'time': time});
   localStorage.setItem(id,task);
   
}

// Show tasks by date
by_task.click(()=>{
   all_tasks.html('');
   for (let i = 1; i <= localStorage.length; i++){
   let task = localStorage.getItem(i);
   task = JSON.parse(task);
   let html = `<div class="task"><input type="radio" class = status"><h3>${task.name}</h3>: ${task.description}, ${task.importance}, ${task.time} <i class="fas fa-check"><i class="fas fa-trash"></i></div>`;
   all_tasks.append(html);
}
})


// Show tasks by importance 
by_importance.click( ()=>{
   all_tasks.html('');
   for (let i = localStorage.length; i >= 1; i--){
      let task = localStorage.getItem(i);
      task = JSON.parse(task);
      let html = `<div class="task"><input    type="radio" class = status"><h3>${task.name}</h3>: ${task.description}, ${task.importance}, ${task.time} <i class="fas fa-check"></i><i class="fas fa-trash"></i></div>`;
      all_tasks.append(html);
   }
})
console.log(by_importance, by_task)

// Delete Tasks