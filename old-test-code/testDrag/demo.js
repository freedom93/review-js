/* HTML 5 Web �洢 localStorage���洢������û��ʱ������*/
localStorage.lastname="Freedom";
document.write(localStorage.lastname);
/* HTML 5 Web �洢 localStorageͳ��ҳ�汻��������*/
if (localStorage.pagecount)
  {
  localStorage.pagecount=Number(localStorage.pagecount) +1;
  }
else
  {
  localStorage.pagecount=1;
  }
document.write("<br/>Visits "+ localStorage.pagecount + " time(s).");

/* HTML 5 �Ϸ�*/
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
/*html 5 web worker �������ں�̨�� JavaScript������Ӱ��ҳ�������*/
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