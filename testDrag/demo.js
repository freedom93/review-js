/* HTML 5 Web 存储 localStorage：存储的数据没有时间限制*/
localStorage.lastname="Freedom";
document.write(localStorage.lastname);
/* HTML 5 Web 存储 localStorage统计页面被访问数次*/
if (localStorage.pagecount)
  {
  localStorage.pagecount=Number(localStorage.pagecount) +1;
  }
else
  {
  localStorage.pagecount=1;
  }
document.write("<br/>Visits "+ localStorage.pagecount + " time(s).");

/* HTML 5 拖放*/
function allowDrop(ev){
ev.preventDefault();
}

function drag(ev){
ev.dataTransfer.setData("Text",ev.target.id);
}

function drop(ev){
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
ev.target.appendChild(document.getElementById(data));
}
/*html 5 web worker 是运行在后台的 JavaScript，不会影响页面的性能*/
var w;

function startWorker()
{
if(typeof(Worker)!=="undefined")
  {
  if(typeof(w)=="undefined")
  {
  w=new Worker("demo.js");
  }
  w.onmessage = function (event) {
    document.getElementById("result").innerHTML=event.data;
    };
  }
else
  {
  document.getElementById("result").innerHTML="Sorry, your browser does not support Web Workers...";
  }
}

function stopWorker()
{ 
w.terminate();
}