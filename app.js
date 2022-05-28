const flip = $('#show-template');
const panel = $('#task-section');

$(document).ready(function(){
   flip.click(function(){
   panel.slideToggle("slow");
   });
});