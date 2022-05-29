// Declare variable and grab elements
const flip = $('#show-template');
const panel = $('#task-section');
const add_task = $('#add-task'); 
const title = $('title');
const description = $('description');
const importance = $('importance');
const all_tasks = $('all_tasks');
var id = 0;

// Show add task panel by slide
$(document).ready(function(){
   flip.click(function(){
   panel.slideToggle("slow");
   });
});

// Add task 

// Show tasks by date

// Show tasks by importance 
