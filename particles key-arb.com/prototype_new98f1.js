function sl(id) { return document.getElementById(id); }
var input=sl("area");
function schreib(item){
	var input=sl("area");
	input.focus();
	if (input.setSelectionRange) {
         var srt = input.selectionStart;
         var len = input.selectionEnd;
        if (srt < len) srt++;
         input.value = input.value.substr(0, srt) + item + 
		 input.value.substr(len);
         input.setSelectionRange(srt+1 , srt+1);
		 input.focus();
	}
	else{
	var range=document.selection.createRange();
	range.text=item;
	}
	input.focus();
	input.scrollTop = input.scrollHeight;	
	if(input.value.length<20){
		onesug();
	}
	else{
		sl('help').style.display = 'none';	
	}
}
	
function toss(){
	
	sl("area").value =sl('sug_key').innerHTML ;
	sl('help').style.display = 'none';	
	sl('area').focus(); 

} 
function ajaxpost(op){
		var input = sl("area").value;
		var para = 'text=' + encodeURIComponent(input);
		var http = null;
		if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
		http = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (http != null) {
		http.open("POST", "save.php", true);
		http.setRequestHeader(
		"Content-Type",
		"application/x-www-form-urlencoded");
		http.send(para);
		}

		
}

function OnSubmitForm()
{
  if(document.pressed == '1')
  {  sl('send').action ="/save.php"; }
  else if(document.pressed == '2') {
    sl('send').action ="/print.php";
  }
  	sl('send').submit();
  return true;
} 


function onesug(){
		var input = sl("area").value;
		var para = 'q=' +input;
		var http = null;
		if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
		http = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (http != null) {
		http.open("GET", "/function/onesug_new.php?"+encodeURI(para), true);  
		http.send(null);
		}		  
		
		http.onreadystatechange = handleResponse;

		function handleResponse(){		
			
			if(http.readyState<4){
				
				sl('sug').style.display = 'block';	
				sl('word').innerHTML = '<img src="/i/ajax.gif" alt="" >';
			}
			else if(http.responseText==''){	 
				sl('help').style.display = 'none';				
			}			
			else if (http.readyState == 4 && http.responseText!='' && http.responseText.length<80 && http.responseText!='error setting' ) {
				
				sl('help').style.display = 'block'; 
				var msg = http.responseText.split('POSTID');
				sl('word').innerHTML = '';
				sl('word').innerHTML = '<div id="sug_key" onclick="_gaq.push([\'_trackEvent\', \'suggest\', \'klick\', \'word\']); toss()">'+msg[0]+' </div>'+'	<div id="magnifier"  onclick="_gaq.push([\'_trackEvent\', \'google\', \'search\', \'magnifier\']); suggest_google(sl(\'sug_key\').innerHTML)"></div>	<div style="clear:both"></div>';	
				if( msg[1]!= 0 ){
					//extra_suggest(msg[1]);	
	  
				}
				else{
					sl('extra_sug').style.display = 'none';	
					sl('fasel').style.display = 'none';		
				}
		
			}
			
		}
	
}

function extra_suggest(postid){
	var para = 'postid=' +postid;
		var http = null;
		if (window.XMLHttpRequest) {
		http = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
		http = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (http != null) {
		http.open("GET", "/function/extra_suggest.php?"+encodeURI(para), true);  
		http.send(null);
		}		  
		
		http.onreadystatechange = handleResponse;

		function handleResponse(){		
			
			if(http.readyState<4){
				sl('extra_sug').style.display = 'block';	
				sl('extra_post').innerHTML = '<img src="/i/ajax.gif" alt="" >';
			}
			else if(http.responseText==''){
				sl('extra_sug').style.display = 'none';	
				sl('fasel').style.display = 'none';					
			}			 
			else if (http.readyState == 4 && http.responseText!='') {
				var msg = http.responseText;
				
				sl('fasel').style.display = 'block';	
				sl('extra_post').innerHTML = '';
				sl('extra_post').innerHTML = msg+'<div style="clear:both"></div>';
			}
			
		}
}

function suggest_google(el){
	var encode = encodeURI(el); 
	MeinFenster = window.open("https://www.google.co.ma/#hl=fr&q="+encode);		
}

var isFirstMouseOver = true;

function insertTOsuggest(){
	 if (isFirstMouseOver){
		var input = sl("area").value;
		var para = 'q=' +input;
		
		var http = null;
		if (window.XMLHttpRequest) {
		   http = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
		   http = new ActiveXObject("Microsoft.XMLHTTP");
		}
		if (http != null) {
		   http.open("POST", "/function/suggest.php", true);
		   http.setRequestHeader(
			  "Content-Type",
			  "application/x-www-form-urlencoded");
		   http.send(para);
		}
		isFirstMouseOver = false;
	}
}


function openYoutube() {
	var input=sl("area").value;
	var encode = encodeURI(input);
	MeinFenster = window.open("https://www.youtube.com/results?search_type=&search_query="+encode);
  }
function openGoogle() {
	var input=sl("area").value;
	var encode = encodeURI(input); 
	MeinFenster = window.open("https://www.google.co.ma/search?q="+encode);
 }

function im7i() 
	{    
		var target = sl("area");
		target.focus();
		//gecko
        if (target.setSelectionRange) {
         var srt = target.selectionStart;
         var len = target.selectionEnd;
        if (srt < len) srt++;
         target.value = target.value.substr(0, srt - 1) + 
		 target.value.substr(len);
         target.setSelectionRange(srt - 1, srt - 1);
		 target.focus();
        } else 
		// Ex
		if (target.createTextRange) {
		 self.VKI_range = document.selection.createRange();
         try { self.VKI_range.select(); } 
		catch(e) {}
		  self.VKI_range = document.selection.createRange();
          if (!self.VKI_range.text.length) 
		  self.VKI_range.moveStart('character', -1);
          self.VKI_range.text = "";
		  target.focus();
          }	
		else target.value = target.value.substr(0, target.value.length - 1);
		     target.focus();
			return true;
		
		if(input.value.length<20){
			onesug();
		}
		else{
			sl('help').style.display = 'none';	 
		}
}

function FontSize(n) {
   var p = sl("area");
      if(p.style.fontSize) {
         var s = parseInt(p.style.fontSize.replace("px",""));
      } else {
         var s = 24;
      }
      s=s-n;
      p.style.fontSize = s+"px";
      sl("font-display").style.display ='block';	
      sl("font-display").innerHTML=s;
	  window.setTimeout(function()
	  {sl("font-display").style.display ='none';},4000);		
      sl("area").focus();

}
	
		

var ok=0;
function umw(){
if(ok==0){
sl("actif").style.background ='url(/i/actif.png) 0px -51px';
sl("off").firstChild.nodeValue ='(فعال)';
ok=1;

}
else if(ok==1){	
sl("actif").style.background ='url(/i/actif.png) 0px 0px';
sl("off").firstChild.nodeValue ='(غير فعال)';
ok=0;
}
}



function setSelectionRange(input, selectionStart, selectionEnd) 
{
    if (input.setSelectionRange) 
    {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) 
    {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd("character", selectionEnd);
        range.moveStart("character", selectionStart);
        range.select();
    }
}

function setCaretToPos(input, pos) 
{
    setSelectionRange(input, pos, pos);
}


//cursor position + /r/n				
function getCaret(el) {
	//is firefox set selection start
  if (el.selectionStart) { 
	return el.selectionStart; 
	
  } else if (document.selection) { 
	
	el.focus(); 
	var r = document.selection.createRange(); 
	
	if (r == null) { 
	  return 0; 
	} 
		
	var re = el.createTextRange(), 
	rc = re.duplicate(); 
	//move to the selected area
	re.moveToBookmark(r.getBookmark()); 
	rc.setEndPoint("EndToStart", re); 

	var add_newlines = 0;
	for (var i=0; i<rc.text.length; i++) {
	  if (rc.text.substr(i, 2) == "\r\n") {
		add_newlines += 2;
		i++;
	  }
	}

	return rc.text.length + add_newlines; 
  }  
  return 0; 
}	


function Ersetzung(){
	if(ok==1){
	
	var obj=sl("area");	
	var cursor_position = getCaret(obj);
   
	br=obj.value;	
	br=br.replace(/3/g,"ع");
	br=br.replace(/a/g,"ا");  
	br=br.replace(/b/g,"ب");br=br.replace(/p/g,"ب");  
	br=br.replace(/t/g,"ت");
	br=br.replace(/7/g,"ح");
	br=br.replace(/c/g,"ث");br=br.replace(/سس/g,"ث");br=br.replace(/ت'/g,"ث");  
	br=br.replace(/j/g,"ج");
	br=br.replace(/ح'/g,"خ");br=br.replace(/x/g,"خ");br=br.replace(/5/g,"خ");
	br=br.replace(/k/g,"ك");  
	br=br.replace(/d/g,"د");  
	br=br.replace(/د'/g,"ذ"); 
	br=br.replace(/r/g,"ر");  
	br=br.replace(/z/g,"ز");br=br.replace(/ر'/g,"ز");  br=br.replace(/R/g,"ز");
	br=br.replace(/s/g,"س"); 
	br=br.replace(/ثه/g,"ش");br=br.replace(/س'/g,"ش");
	br=br.replace(/S/g,"ص");br=br.replace(/9/g,"ص");
	br=br.replace(/ص'/g,"ض");br=br.replace(/D/g,"ض");br=br.replace(/9'/g,"ض");
	br=br.replace(/T/g,"ط");br=br.replace(/6/g,"ط");
	br=br.replace(/ط'/g,"ظ");br=br.replace(/Z/g,"ظ");
	br=br.replace(/ع'/g,"غ");br=br.replace(/gه/g,"غ");br=br.replace(/ع'/g,"غ");br=br.replace(/gه/g,"غ");
	br=br.replace(/f/g,"ف");br=br.replace(/v/g,"ف");
	br=br.replace(/ك'/g,"ق");br=br.replace(/K/g,"ق");br=br.replace(/q/g,"ق"); 
	br=br.replace(/l/g,"ل");
	br=br.replace(/m/g,"م");
	br=br.replace(/n/g,"ن");
	br=br.replace(/h/g,"ه");
	br=br.replace(/w/g,"و");br=br.replace(/o/g,"و");br=br.replace(/u/g,"و");
	br=br.replace(/y/g,"ي");br=br.replace(/i/g,"ي");
	br=br.replace(/e/g,"آ");
	br=br.replace(/و'/g,"ؤ");br=br.replace(/وء/g,"ؤ");
	br=br.replace(/ءي/g,"ئ");br=br.replace(/ء#/g,"ئ"); br=br.replace(/ي'/g,"ئ");
	br=br.replace(/#/g,"ى"); br=br.replace(/آآ/g,"ى"); 
	br=br.replace(/اءء/g,"إ");br=br.replace(/I/g,"إ");br=br.replace(/A/g,"إ");
	br=br.replace(/ءا/g,"أ");br=br.replace(/ا'/g,"أ");
	br=br.replace(/_/g,"ـ");
	br=br.replace(/2/g,"ء");br=br.replace(/-/g,"ء"); 
	br=br.replace(/ه'/g,"ة"); br=br.replace(/H/g,"ة");
	//7arakat
	br=br.replace(/ا=/g,"َ");
	br=br.replace(/و=/g,"ُ");
	br=br.replace(/ي=/g,"ِ");
	br=br.replace(/ون=/g,"ٌ");
	br=br.replace(/ين=/g,"ٍ");
	br=br.replace(/ان=/g,"ً");
	br=br.replace(/1/g,"أ");


	obj.scrollTop=obj.scrollHeight;
	sl("area").value=br;
	setCaretToPos(obj, cursor_position); 
	}
	
	if(sl("area").value.length<20){
		onesug();
	}
	
}
