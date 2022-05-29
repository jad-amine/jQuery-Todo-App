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
   let time = new Date();
   let task = JSON.stringify({'name': title_value,'description': description_value,'importance': importance_value,'status': isDone,'time': time});
   var id = localStorage.length +1 ;
   localStorage.setItem(id,task);
}

