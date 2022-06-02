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
var id = 0;


$(document).ready( ()=> {
   // Added slide animation to add task button click
   flip.click( ()=> {
      panel.slideToggle("slow");
      });

   // Retrieve tasks and display them
   display_tasks_by_date();
});

// Add task 
add_task.click(push_to_localstorage);

function push_to_localstorage(){
   //check if title is left empty
   let title_value = title.val();
   if(title_value == ''){
      alert('Please Enter your task title !');
      return;
   }
   let description_value = description.val();
   let importance_value = importance.val();
   let isDone = false;
   let time = new Date().toUTCString();
   var id = localStorage.length + 1;
   let task = JSON.stringify({'id': id, 'name': title_value,'description': description_value,
                              'importance': importance_value,'status': isDone,'time': time});
   localStorage.setItem(id,task);
}

// Show tasks by creation date
by_task.click(() => {
   all_tasks.html('');
   display_tasks_by_date();
})


// Show tasks by importance 
by_importance.click( ()=>{
   all_tasks.html('');
   // Add code here
})

// Delete Tasks
// $(".fas").on("click", ()=>{
//    console.log('hi');
//    $(this).hide();
// })

function delete_me(){
   alert('deleting');
   // let id= $(this).parent().attr("id");
   // localStorage.removeItem(id);
   // location.reload();
}



//Utilities
function display_tasks_by_date(){
   //check if empty
   if(localStorage.length == 0){
      return;
   }
   for (let i = localStorage.length; i >= 0; i--){
      let task = localStorage.getItem(i);
      task = JSON.parse(task);
      console.log(task.id)
      let html = 
         `<div class='task' id='${task.id}'>
            <h3>${task.name}</h3>: 
            ${task.description}, ${task.importance}, ${task.time} 
            <i class="fas fa-check"></i><i class="fas fa-trash"></i>
         </div>`;
         // /====================================== revieww sectionnnnnn ==================================
      all_tasks.append(html);
      $(".fa-trash").on("click", delete_me);
   }
}