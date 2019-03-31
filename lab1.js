"use strict";
var dt;
var dtmain;
var ans;
var idmd;
var q=0;
var errormessages=[]
errormessages[1]="Критериев должно быть больше нуля!";
errormessages[2]="Название не должно быть пустым!";
errormessages[3]="Видов критерия должно быть больше нуля!";
errormessages[4]="Необходимо ввести число!";
errormessages[5]="Названия критериев не могут совпадать";
errormessages[6]="Названия видов одного критерия не могут совпадать";
errormessages[7]="Числовые оценки видов одного критерия не могут совпадать";
errormessages[8]="Не удалось считать фаил";
errormessages[9]="Фаил пуст";
errormessages[10]="Количестово критериев должно быть числом!";
errormessages[11]="Фаил недозаполнен";
errormessages[12]="Количество видов критерия должно быть числом";
var errormessage13_1="Числовые оценки вида критерия ";
var errormessage13_2=" должны быть числом";
var errormessage14_1="Альтернатива ";
var errormessage14_2=" задана некорректно";
errormessages[15]="Названия не должны содержать пробелы";
errormessages[16]="Количество альтернатив должно быть числом";
var strings=[]
strings[1]="Количество критериев оценки:";
strings[2]="Название критерия оценки";
strings[3]="Количество видов критерия";
strings[4]="Название вида критерия";
strings[5]="Числовая оценка вида критерия";
strings[6]="Количество альтернатив:";
var headnames=[]
headnames[1]="Альтернативы";
headnames[2]="Критерии оценки";
var buttonnames=[]
buttonnames[1]="Готово";
buttonnames[2]="Ввод из файла";
buttonnames[3]="Ввод при помощи интерефейса";
var names=new Array();
function drawanswer(){
	var md=document.getElementById(idmd);
	md.style.fontSize="350%";
	md.innerHTML="<strong>Ответ:</strong>Множество Эджворта-Парето — {";
	var n=names.length;
	for(var i=0;i<n;i++){
		md.innerHTML+=names[i];
		if(i!=(n-1))md.innerHTML+=", ";
	}
	md.innerHTML+="}.";
}
function edjpar(){
	for(var i=0;i<dtmain.length;i++)
		names.push("A"+(i+1));
	var n=dt.length;
	for(var i=0;i<dtmain.length-1;i++)
		for(var j=i+1;j<dtmain.length;j++){
			var sum=0;
			var alt=n;
			for(var k=0;k<n;k++){
				if((dtmain[i][k]-dtmain[j][k])>0)sum++;
					else if((dtmain[i][k]-dtmain[j][k])==0)alt--;
						else sum--;
			}
			if(sum==alt){
				dtmain.splice(j,1);
				names.splice(j,1);
				j--;
			}
			else if(sum==-alt){
					dtmain.splice(i,1);
					names.splice(i,1);
					i--;
					break;
				}
		}
}
function finalready(){
	edjpar();
	drawanswer();
}
function selev(i,j){
	var buf=document.getElementById(i+" "+j);
	var s=buf.value;
	if(dt.length>1){
		for(var i1=1;i<dt[j].length;i1++){
			if(dt[j][i1][0]==s){
				dtmain[i][j]=dt[j][i1][1];
				break;
			}
		}
	}
	else{
		for(var i1=1;i<dt[j].length;i1++){
			if(dt[j][i1][0]==s){
				dtmain[i]=dt[j][i1][1];
				break;
			}
		}
	}
}
var textFile = null;
function makeTextFile(text){
	var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
}
function save(){
    var link1 = document.getElementById('link');
	link1.innerHTML="скачать";
	var lasts=dt.length+"\r\n";
	for(var i=0;i<dt.length;i++){
		lasts=lasts+dt[i][0]+" "+(dt[i].length-1)+"\r\n";
		for(var j=1;j<dt[i].length;j++){
			lasts=lasts+dt[i][j][0]+" "+dt[i][j][1]+"\r\n";
		}
	}
	lasts=lasts+dtmain.length+"\r\n";
	for(var i=0;i<dtmain.length;i++){
		for(var j=0;j<dt.length;j++){
			var buf=document.getElementById(i+" "+j);
			lasts=lasts+buf.value;
			if(j!=dt.length-1)lasts=lasts+" ";
			else lasts=lasts+"\r\n"
		}
	}
    link1.href = makeTextFile(lasts);
}

function finalgui(){
	var dl1=dtmain.length;
	var dl2=dt.length;
	for(var i=0;i<dl1;i++){
		dtmain[i]=new Array(dl2);
		for(var j=0;j<dl2;j++)
			dtmain[i][j]=dt[j][1][1];
	}
	var md=document.getElementById(idmd);
	md.innerHTML="<div id="+"head"+"><div id="+"head1"+">"+headnames[1]+"</div><div id="+"head2"+"></div></div>";
	var buf=document.getElementById("head2");
	buf.innerHTML="<div id="+"head21"+">"+headnames[2]+"</div><div id="+"head22"+"></div>";
	buf=document.getElementById("head22");
	var n=dt.length;
	var w=100/n;
	for(var i=0;i<n;i++){
		var buf1=document.createElement("div");
		buf1.className="headcell";
		buf1.id="mda";
		buf1.style.width=w+"%";
		buf1.innerHTML=dt[i][0];
		buf.appendChild(buf1);
	}
	var n1=dtmain.length;
	for(var i=0;i<n1;i++){
		var b1=document.createElement("div");
		b1.className="altcoll";
		var bb1=document.getElementById("head");
		b1.style.width=bb1.offsetWidth+"px";
		md.appendChild(b1);
		var b2=document.createElement("div");
		b2.className="altnum";
		b2.innerHTML="A"+(i+1);
		var bb2=document.getElementById("head1");
		b2.style.width=bb2.offsetWidth+"px";
		b1.appendChild(b2);
		var b3=document.createElement("div");
		b3.className="altcollr";
		var bb3=document.getElementById("head2");
		b3.style.width=bb3.offsetWidth+"px";
		b1.appendChild(b3);
		for(var j=0;j<n;j++){
			var b4=document.createElement("div");
			b4.className="altcell";
			var bb4=document.getElementById("mda");
			b4.style.width=(bb4.offsetWidth-10)+"px";
			b4.style.height=bb4.offsetHeight+"px";
			b3.appendChild(b4);
			var ci=i+" "+j;
			b4.innerHTML="<select id=x class=sel onchange=selev("+i+","+j+")></select>";
			var b5=document.getElementById("x");
			b5.id=ci;
			b5.innerHTML="";
			var n2=dt[j].length;
			for(var k=1;k<n2;k++)b5.innerHTML+="<option value="+dt[j][k][0]+">"+dt[j][k][0]+"</option>";
		}
	}
	var gobutton=document.createElement("button");
	gobutton.className="gobutton";
	gobutton.innerHTML=buttonnames[1];
	gobutton.align="center";
	md.appendChild(gobutton);
	var dl=document.createElement("button");
	dl.id="outfile";
	dl.innerHTML="Сохранить введённые данные в фаил";
	md.appendChild(dl);
	dl.addEventListener("click",save);
	var link1=document.createElement("a");
	link1.id="link";
	link1.download="info.txt";
	md.appendChild(link1);
	gobutton.addEventListener("click",finalready);
	for(var i=0;i<n1;i++)
		for(var j=0;j<n;j++){
			var buf=document.getElementById(i+" "+j);
			buf.addEventListener("change",selev(i,j));
	}
}
function ready4(){
	var buf=document.getElementById("maintextinput");
	var lth=buf.value;
	lth=Number(lth,10);
	if((lth>0)&&(isNaN(lth)!=true)){ 
		dtmain=new Array(lth);
		var buf1=document.getElementById(idmd);
		buf1.innerHTML="";
		finalgui();
	}
	else{
		var buf1=document.getElementById("errordiv");
		buf1.innerHTML=errormessages[1];
	}
}
function lastgui(){
	var md=document.getElementById(idmd);
	md.innerHTML="<div id="+"divmaintextinput"+"><div id="+"lmaintextinput"+">"+strings[6]+"</div><input type="+"text "+"id="+"maintextinput"+"></div>";
	var gobutton=document.createElement('button');
	gobutton.className="gobutton";
	gobutton.innerHTML=buttonnames[1];
	gobutton.align="center";
	md.appendChild(gobutton);
	var errordiv=document.createElement('div');
	errordiv.id="errordiv";
	md.appendChild(errordiv);
	gobutton.addEventListener("click",ready4);
}
function ready3(){
	var lth=dt[q].length;
	for(var i=1;i<lth;i++){
		var lm=new Array(2);
		var str="tc1"+i;
		var buf=document.getElementById(str);
		var word=buf.value;
		var errordiv=document.getElementById("errordiv1");
		if(word.length==0){
			errordiv.innerHTML=errormessages[2];
			break;
		}
		if(word.indexOf(" ")!=-1){
			errordiv.innerHTML=errormessages[15];
			break;
		}
		lm[0]=word; 
		str="tc2"+i;
		buf=document.getElementById(str);
		word=buf.value;
		if(word==""){
			errordiv.innerHTML=errormessages[4];
			break;
		}
		word=Number(word,10);
		if(isNaN(word)==true){
			errordiv.innerHTML=errormessages[4];
			break;
		}
		lm[1]=word;
		var cos1=true;
		var cos2=true;
		for(var z=1;z<i;z++){
			if(dt[q][z][0]==lm[0]){
				cos1=false;
				break;
			}
			if(dt[q][z][1]==lm[1]){
				cos2=false;
				break;
			}
		}
		if(cos1==false){
			errordiv.innerHTML=errormessages[6];
			break;
		}
		if(cos2==false){
			errordiv.innerHTML=errormessages[7];
			break;
		}
		dt[q][i]=lm;
		if(i==(lth-1)){
			q++;
			if(q<dt.length){
				buf=document.getElementById(idmd);
				buf.innerHTML="";
				attrgui();
			}
			else lastgui();
		}
	}
}
function attrgui2(){
	var md=document.getElementById(idmd);
	var lth=dt[q].length;
	var h=100/lth;
	for(var i=0;i<lth;i++){
		var tc=document.createElement("div");
		tc.className="tc";
		tc.id="tc"+i;
		md.appendChild(tc);
		var tc1=document.createElement("div");
		tc1.className="tcc";
		tc.appendChild(tc1);
		if(i==0) tc1.innerHTML=strings[4]+" "+dt[q][0]+":";
		else{
			var buf=document.createElement("input");
			buf.type="text";
			buf.className="in";
			buf.id="tc1"+i;
			tc1.appendChild(buf);
		}
		var tc2=document.createElement("div");
		tc2.className="tcc";
		tc.appendChild(tc2);
		if(i==0) tc2.innerHTML=strings[5]+" "+dt[q][0]+":";
		else{
			var buf=document.createElement("input");
			buf.type="text";
			buf.id="tc2"+i;
			buf.className="in";
			tc2.appendChild(buf);
		}
	}
	var gobutton=document.createElement('button');
	gobutton.className="gobutton";
	gobutton.innerHTML=buttonnames[1];
	gobutton.align="center";
	md.appendChild(gobutton);
	var errordiv=document.createElement('div');
	errordiv.id="errordiv1";
	md.appendChild(errordiv);
	gobutton.addEventListener("click",ready3);
}
function ready2(){
	var buf=document.getElementById("a1");
	var lth0=buf.value;
	if(lth0.length==0){
		errordiv.innerHTML=errormessages[2];
		return;
	}
	if(buf.value.indexOf(" ")!=-1){
		errordiv.innerHTML=errormessages[15];
		return;
	}
	else{
		buf=document.getElementById("a2");
		var lth=buf.value;
		lth=Number(lth,10);
		if((lth!=0)&&(isNaN(lth)!=true)){
			var cos=true;
			for(var o=0;o<q;o++){
				if(dt[o][0]==lth0){cos=false;break;}
			}
			if(cos==true){
				dt[q]=new Array(lth+1);
				dt[q][0]=lth0;
				var buf1=document.getElementById(idmd);
				buf1.innerHTML="";
				attrgui2();		
			}
			else{
				var buf1=document.getElementById("errordiv");
				buf1.innerHTML=errormessages[5];
			}
		}
		else{
			var buf1=document.getElementById("errordiv");
			buf1.innerHTML=errormessages[1];
		}
	}
}
function attrgui(){
	var md=document.getElementById(idmd);
	md.innerHTML="<div class="+"ndiv"+"><div class="+"latr"+"><span>"+strings[2]+" "+(q+1)+":</span></div><input type="+"text"+" class="+"atrtextinput id="+"a1"+"></div>"
	md.innerHTML+="<div class="+"ndiv"+"><div class="+"latr"+"><span>"+strings[3]+" "+(q+1)+":</span></div><input type="+"text"+" class="+"atrtextinput id="+"a2"+"></div>"
	var errordiv=document.createElement('div');
	var gobutton=document.createElement('button');
	gobutton.className="gobutton";
	gobutton.innerHTML=buttonnames[1];
	gobutton.align="center";
	md.appendChild(gobutton);
	errordiv.id="errordiv";
	md.appendChild(errordiv);
	gobutton.addEventListener("click",ready2);
}
function ready1(){
	var buf=document.getElementById("maintextinput");
	var lth=buf.value;
	lth=Number(lth,10);
	if((lth>0)&&(isNaN(lth)!=true)){ 
		dt=new Array(lth);
		var buf1=document.getElementById(idmd);
		buf1.innerHTML="";
		attrgui();
	}
	else{
		var buf1=document.getElementById("errordiv");
		buf1.innerHTML=errormessages[1];
	}
}
function createfromgui(){
	var md=document.getElementById(idmd);
	md.innerHTML="<div id="+"divmaintextinput"+"><div id="+"lmaintextinput"+">"+strings[1]+"</div><input type="+"text "+"id="+"maintextinput"+"></div>";
	var gobutton=document.createElement('button');
	gobutton.className="gobutton";
	gobutton.innerHTML=buttonnames[1];
	gobutton.align="center";
	md.appendChild(gobutton);
	var errordiv=document.createElement('div');
	errordiv.id="errordiv";
	md.appendChild(errordiv);
	gobutton.addEventListener("click",ready1);
}
if ( ! (window.File && window.FileReader && window.FileList && window.Blob)) {//часть про считывание из фаила
  alert('The File APIs are not fully supported in this browser.');
}
function handleFileSelect(evt) {
    var file = evt.target.files[0];
    if (!file.type.match('text.*')) {
            return alert(file.name + " is not a valid text file.");
    }
    var reader = new FileReader();
    reader.readAsText(file);
	var words;
    reader.onload = function (e){
		var mas=new Array();
		words = reader.result.split('\n');
		for(var i=0;i<words.length;i++){
			var bk=words[i];
			bk=bk.trim();
			bk=bk.split(" ");
			for(var j=0;j<bk.length;j++){
				if(bk[j]!=="")mas.push(bk[j])	
			}
		}
		var len=mas.length;
		var pointer=0;
		var l=document.getElementById("errordiv");
		var reqlth=1;
		if(mas.length<reqlth){
			l.innerHTML=errormessages[9];
			return;
		}
		mas[pointer]=Number(mas[pointer],10);
		if(isNaN(mas[pointer])==true){
			l.innerHTML=errormessages[10];
			return;
		}
		if(mas[pointer]<=0){
			l.innerHTML=errormessages[3];
			return;
		}
		dt=new Array(mas[pointer]);
		reqlth=reqlth+dt.length*2;
		if(mas.length<reqlth){
			l.innerHTML=errormessages[11];
			return;
		}
		for(var i=0;i<dt.length;i++){
			pointer++;
			var str=mas[pointer];
			pointer++;
			mas[pointer]=Number(mas[pointer],10);
			if(isNaN(mas[pointer])==true){l.innerHTML=errormessages[12];return;}
			if(mas[pointer]<=0){l.innerHTML=errormessages[3];return;}
			dt[i]=new Array((mas[pointer])+1);
			reqlth=reqlth+(dt[i].length-1)*2;
			if(mas.length<reqlth){
				l.innerHTML=errormessages[11];
				return;
			}
			dt[i][0]=str;
			for(var kk=0;kk<i;kk++)if(dt[kk][0]==dt[i][0]){l.innerHTML=errormessages[5];return;}
			for(var j=1;j<dt[i].length;j++){
				var dti=new Array(2);
				pointer++;
				dti[0]=mas[pointer];
				pointer++;
				mas[pointer]=Number(mas[pointer],10);
				if(isNaN(mas[pointer])==true){l.innerHTML=errormessage13_1+dt[i][0]+errormessage13_2;return;}
				dti[1]=mas[pointer];
				dt[i][j]=dti;
				for(var kk=1;kk<j;kk++)if(dt[i][kk][0]==dt[i][j][0]){l.innerHTML=errormessages[6];return;}
				for(var kk=1;kk<j;kk++)if(dt[i][kk][1]==dt[i][j][1]){l.innerHTML=errormessages[7];return;}
			}
		}
		pointer++;
		mas[pointer]=Number(mas[pointer],10);
		if(isNaN(mas[pointer])==true){l.innerHTML=errormessages[16];return;}
		var lltthh=mas[pointer];
		pointer++;
		reqlth=reqlth+lltthh*dt.length+1;
		if(mas.length!=reqlth){
			l.innerHTML=errormessages[11];
			return;
		}
		dtmain=new Array(lltthh);
		for(var i=0;i<lltthh;i++){
			var dtmi=new Array(dt.length);
			for(var j=0;j<dt.length;j++){
				var cos=true;
				for(var k=1;k<dt[j].length;k++){
					if(mas[pointer]==dt[j][k][0]){
						dtmi[j]=dt[j][k][1];
						pointer++;
						cos=false;
						break;
					}
				}
				if(cos==true){l.innerHTML=errormessage14_1+"A"+(i+1)+errormessage14_2;return;}
			}
			dtmain[i]=dtmi;
		}
		edjpar();
		drawanswer();
	};
	var b=document.getElementById("fileinput");
	b.value="";
}
function createfromfile(){
	var md=document.getElementById(idmd);
	md.innerHTML="";
	var instdiv=document.createElement("div");
	instdiv.style.width="100%";
	instdiv.style.fontSize="250%";
	instdiv.innerHTML="<strong>Формат файла:</strong><br>Количество критериев<br>Имя критерия 1 &nbsp&nbspКоличество видов критерия 1<br>...<br>";
	instdiv.innerHTML+="Название первого вида критерия 1 &nbsp&nbspЧисловая характеристика вида критерия 1<br>...<br>Имя критерия 2 &nbsp&nbspКоличество видов критерия 2<br>...<br>";
	instdiv.innerHTML+="Количество альтернатив<br>Вид критерия 1 первой альтернативы ...<br>...<br><br>Для корректной работы: названия не должны содержать пробелов;";
	instdiv.innerHTML+="дробную часть числа отделять точкой.<br><br>";
	instdiv.innerHTML+="<strong>Пример файла:</strong><br>3<br>Цена 2<br>большая 1<br>низкая 10<br>Качество 3<br>высокое 100<br>среднее 50<br>низкое 10<br>";
	instdiv.innerHTML+="4<br>большая высокое<br>низкая низкое<br>большая низкое<br>большая среднее";
	md.appendChild(instdiv);
	var finput=document.createElement("input");
	finput.id="fileinput";
	finput.type="file";
	finput.style.fontSize="250%";
	md.appendChild(finput);
	var errordiv=document.createElement('div');
	errordiv.id="errordiv";
	md.appendChild(errordiv);
	finput.addEventListener('change', handleFileSelect);
}
function createfirst(){
	var md=document.getElementById(idmd);
	var gobutton=document.createElement('button');
	gobutton.className="gobutton";
	gobutton.innerHTML=buttonnames[2];
	gobutton.align="center";
	md.appendChild(gobutton);
	gobutton.addEventListener("click",createfromfile);
	var gobutton1=document.createElement('button');
	gobutton1.className="gobutton";
	gobutton1.innerHTML=buttonnames[3];
	gobutton1.align="center";
	md.appendChild(gobutton1);
	gobutton1.addEventListener("click",createfromgui);
}
function create(id){
	var md=document.getElementById(id);
	idmd=id;
	createfirst();
}
create(0);
/*TO DO
1.Переимнеовать кнопку "Скачать"
2.Проверка на дурака, если много одинакаовывх при вводе с помощью интерфейса
3.Шаги отсеивания альтернатив выводить
4. Читабельность файлов с альтернативами
*/