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