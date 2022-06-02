let text = document.querySelector("p");
let button = document.querySelector("#add");
let btn = document.querySelector("#retrieve");
var a = 1;
var b =10;
var c = 10;
button.onclick = push;

function push(){
  localStorage.setItem(a, JSON.stringify({'name':b,'age': c}));
  b--;
  c++;
  console.log(localStorage);
}

btn.onclick = get;

function get(){
  for (let i=1; i<=localStorage.length; i++){
    let task = JSON.parse(localStorage.getItem(i));
    // console.log(localStorage.getItem(i));
    let f='name';
    console.log(task['name']);
    console.log(task.name);
  }
}