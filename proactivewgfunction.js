var protimeselecter;
var prowgDateMessage;
var prooAction = {
	proMsgTemplate: function(message) {}
}

function procreateMessage(promsgFrom,promsgText){
	prowgDateMessage = procreateWgDateMessage();
	var listChat  = prowgAction.createElement(protagList);
	listChat.id   = protagList + prowgAction.getElementById(prowgUlChatId).childNodes.length;;
	
	var template = "<div class='"+promsgFrom["headclass"]+"'>";
	if(promsgFrom["position"] == "right"){
		template+= "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				;
	} 
	else{
		template+= "	<img src='"+promsgFrom["img"]+"'>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				+  "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				;
	}
	// else if(promsgFrom["subject"] == "select"){
		// template+= "	<img src='"+promsgFrom["img"]+"'>"
				// +  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				// +  "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				// +  "	<button type='button' class='quick-reply' id='btn-SmsN' onclick='prosubmitSms();'></button>"
				// ;
	// } 
	if(promsgFrom["position"] == "load")
	{
	template += "</div>"
			 + "<div class='"+promsgFrom["bodyclass"]+"'>"+promsgText+" "+"<img src='https://survey.truecorp.co.th/web/img/loading.gif' width='30' height='8' style='display:inline-block;'></div>"
			 ;
	}
	else
	{
		
	template += "</div>"
	
			if(promsgpic != "" && profirstmessage == true && promsgFrom["name"] == "MARI")
			{
				listChat.id   = protagList + "promotion";
				template += "<div class='"+promsgFrom["bodyclass"]+"'><img id='picpromo' src='https://survey.truecorp.co.th/web/proactive/img/"+promsgpic+"' width='290' height='150' OnError='proremovepic()' style='display:inline-block;'>"

				if(promsgText != undefined)
				{
					template += promsgText+"</div>"
					//proremovetext();
				}
				;	
			}
			else
			{
			template += "<div class='"+promsgFrom["bodyclass"]+"'>"+promsgText+"</div>"
			 ;	
			}
	}
	
	listChat.innerHTML = template;				   
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);
	
	if(promsgText === undefined && $('#picpromo').length == 1 )
	{
		proremovetext();
	}
	profocusScrollwgChatbox();
	
}

$(document).on('keypress keyup','input[name=textsms]',function (e) {
		$(this).val($(this).val().replace(/[^0-9\.]/g,''));
		if ((e.which != 46 || $(this).val().indexOf('.') != -1) && (e.which < 48 || e.which > 57)) {
			e.preventDefault();
		}
		
		if($(this).val().length>9){	
		
			 // $('#btn-SmsY').prop('disabled', false);	
			document.getElementById("btn-SmsY").disabled = false;
		}
		if($(this).val().length<10){	
		
			 // $('#btn-SmsY').prop('disabled', true);
			document.getElementById("btn-SmsY").disabled = true;
			 
		}
	
    });

function procreateSms(promsgFrom,promsgText){
	prowgDateMessage = procreateWgDateMessage();
	var listChat  = prowgAction.createElement(protagList);
	listChat.id   = protagList + "-btn-sms";
	
	var template = "<div class='"+promsgFrom["headclass"]+"'>";
	if(promsgFrom["position"] == "right"){
		template+= "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				;
	} 
	else{
		template+= "	<img src='"+promsgFrom["img"]+"'>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				+  "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				;
	}
	template += "</div>"
			 + "<div class='messagesms'>"+promsgText+"<br>"
			 + "<center><input  id='sms' type='text' name='textsms' class='txtboxsms' placeholder='"+prowgSystem[prowgLanguage]["messageproresponse"]["AskSMSBox"]+"' title='' maxlength='10' required /><br>"
			 + "</center></div>"
			 + "<center><button type='button' class='btn-sms' id='btn-SmsN' value='cencel' onclick='procloseForm(this.value);' >"+prowgSystem[prowgLanguage]["messageproresponse"]["btn_cancel"]+"</button><button type='button' class='btn-sms' id='btn-SmsY' onclick='prosubmitSms() ;' >"+prowgSystem[prowgLanguage]["messageproresponse"]["SmsY"]+"</button></center>"
			 ;
	
	listChat.innerHTML = template;				   
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);
	profocusScrollwgChatbox();
	document.getElementById("btn-SmsY").disabled = true;
}

function prodisplayUserIntention(promsgFrom,promsgText){
	prowgDateMessage = procreateWgDateMessage();
	var listChat  = prowgAction.createElement(protagList);
	listChat.id   = protagList + prowgAction.getElementById(prowgUlChatId).childNodes.length;;
	
	var template = "<div class='"+promsgFrom["headclass"]+"'>";
	if(promsgFrom["position"] == "right"){
		template+= "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				;
	} else{
		template+= "	<img src='"+promsgFrom["img"]+"'>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				+  "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				;
	}
	
	template += promsgText;
			 
	listChat.innerHTML = template;				   
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);
	profocusScrollwgChatbox();
}

function procreateWgDateMessage(){
	var returnDate;
	var testtime;
	var today  = new Date();
	// returnDate = today.getDate()+"-"+(today.getMonth()+1)+"-"+today.getFullYear()+" "+ today.getHours()+":"+(today.getMinutes()<10?'0':'')+today.getMinutes();
	returnDate = ((today.getHours() < 13) ? today.getHours() : (today.getHours() - 12))+ ":" 
	+(((today.getMinutes() < 10)? "0" : "")+today.getMinutes()+" "+((today.getHours() < 12) ? "AM" : "PM"));
	testtime = ((today.getMinutes() < 10)? "0" : "");

	return returnDate;
}

function procreateBtnInChat(btnObj){ 
	var listChat  = prowgAction.createElement(protagList);
	listChat.id   = protagList+"-btn"+btnObj["id"];	
	var template = "<center>"
				 + "<button type='button' class='btn-in-chat' "
				 + "id='"+btnObj["id"]+"' "
				 + "value='"+btnObj["v"]+"' " 
				 + "onclick='"+btnObj["oc"]+"' "
				 + ">"+btnObj["t"]+"</button>"
				 + "</center>"
				 ;
	listChat.innerHTML = template;
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);     
	profocusScrollwgChatbox();
}

function procreateBtnSelect(probtnqObj,probtncanqObj,probtnEmObj){ 
	var listChat  = prowgAction.createElement(tagDiv);
	listChat.id   = protagList+"-btn-selecter";
	
	
	
	
	
	
	var template = ""
		if(probtn_Q == true)
		{		
				
				probtnqObj["t"] = prowgSystem[prowgLanguage]["messageproresponse"]["btn_q"];
				template += "<div class='btn-select' "
				+ "id='"+probtnqObj["id"]+"' "
				+ "value='"+probtnqObj["v"]+"' " 
				+ "onclick='"+probtnqObj["oc"]+"' "
				+ ">"+probtnqObj["t"]+"<span class='selec' >"+" >"+" </span></div>" 
				;
		}
		if(probtn_CancelQ == true){
				
				
				probtncanqObj["t"] = prowgSystem[prowgLanguage]["messageproresponse"]["btn_cancel"];
				template += "<div  class='btn-select' "
				+ "id='"+probtncanqObj["id"]+"' "
				+ "value='"+probtncanqObj["v"]+"' " 
				+ "onclick='"+probtncanqObj["oc"]+"' "
				+ ">"+probtncanqObj["t"]+"<span class='selec' >"+" >"+" </span></div>"
				;
		}
		if(probtn_Email == true){
				
				
				probtnEmObj["t"] = prowgSystem[prowgLanguage]["messageproresponse"]["btn_proemail"];
				template += "<div  class='btn-select' "
				+ "id='"+probtnEmObj["id"]+"' "
				+ "value='"+probtnEmObj["v"]+"' " 
				+ "onclick='"+probtnEmObj["oc"]+"' "
				+ ">"+probtnEmObj["t"]+"<span class='selec' >"+" >"+" </span></div>"
				;
		}
		template += "</center>";
	
	listChat.innerHTML = template;
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);     
	profocusScrollwgChatbox();
	
	protimeselecter = setTimeout(function(){ proendChat();}, protimeChSelect);
}

function proremoveBtnInChat(id){
	if(prowgAction.getElementById(id)){
		prowgAction.getElementById(id).parentNode.removeChild(prowgAction.getElementById(id));
	}
}

function profocusScrollwgChatbox(){
		$("#"+prowgDivChatId).animate({
			scrollTop: $("#"+prowgDivChatId).prop("scrollHeight")
		}, 'slow');
}

function proreadWgMessageClient(prolang,prowhat){
	
	prowgLanguage = prolang;
	
	$.ajax({
		type: "GET",  
		url: ""+prowgSystem[prolang][prowhat],
		dataType: "text",       
		success: function(proresponse){ 
			if(proresponse){
				if(prowhat == "userintention"){				
					processUserIntention(proresponse.split(/\r\n|\n/));
					
				} else{
					proprocessData(proresponse.split(/\r\n|\n/));
					
				}
			}
		}   
	});
}

function proreadWgproemoji(){
	
	$.ajax({
		type: "GET",  
		url: ""+prowgServer+"/"+prowgConfigPath+"/emoji.txt",
		dataType: "text",       
		success: function(proresponse){ 
			if(proresponse){
				
					proprocessproemoji(proresponse.split(/\r\n|\n/));
					
			}
		}   
	});
}

function proreadWgFunction(){
	
	$.ajax({
		type: "GET",  
		url: ""+prowgServer+"/"+prowgConfigPath+"/Function.txt",
		dataType: "text",       
		success: function(proresponse){ 
			if(proresponse){
				
					processFunction(proresponse.split(/\r\n|\n/));
					
			}
		}   
	});
}

function proprocessData(prodataArr){
	prodataArr.forEach(function(element) {
		var temp = element.split(",");
		prodataMessage[temp[0]] = temp[1]; 
	});

	document.getElementById("messagechat").placeholder = prowgSystem[prowgLanguage]["messageproresponse"]["Textsent"];
}

function processFunction(prodataArr){
	prodataArr.forEach(function(element) {
		var temp = element.split(",");
		prodataFunction[temp[0]] = temp[1]; 
	});
	
}
	
function processUserIntention(prodataArr){
	proprodIntention = [];
	var keyParam = prodataArr[0].split(",");
	var i=0;
	prodataArr.forEach(function(e) {
		var temp = e.split(",");
		var obj = {};
		for(var j=0;j<keyParam.length;j++){
			obj[keyParam[j]] = temp[j];
		}
		if(i!=0){
			proprodIntention.push(obj);
		}
		i++;
	});

}

function proprocessproemoji(prodataArr){
	proprodIntentione = [];
	var keyParame ;
	if(keyParame != "")
	{
		keyParame = prodataArr;
		
	}
	var h=0;
	
	
		var obje = [];
		
			
		for(var g=0;g<keyParame.length;g++){
			obje[keyParame[g]];
			var liObj = document.createElement('span');
			liObj.className = "proemoji-option" ;
			liObj.id = "proemoji-option"+g;
			//liObj.data-unicode = keyParame[g];
			liObj.styleSheets = "display:inline-block";
			liObj.innerHTML = keyParame[g];
			document.getElementById("wg-emoji").appendChild(liObj);  			
		// var liObj = document.createElement('span');
		// liObj.innerHTML = "<center><button type='button' class='btn-in-chat' id='btn-reqchat' onclick='prorequestChat();'>Request Chat</button></center>";
		// document.getElementById("ul-history").appendChild(liObj);   		
		}
		 
		if(h!=0){
			proprodIntentione.push(obje);
		}
		h++;
	
	 
	 
	  
}

function procreateUserIntention(pi,work){
	var styleProdIntention  = "<div class='dv-generic-carousel'>"
							+ "	<div id='prev-pro' class='sd sd-left'>"
							+ "	<img src='"+prowgServer+"/"+prowgproactive+"/"+proprowgImagePath+"/btn-left.png'>"
							//+ "		<i class='fa fa-angle-left fa-lg'></i>"
							+ "	</div>"	
							+ "	<div id='next-pro'  class='sd sd-right'>"
							+ "	<img src='"+prowgServer+"/"+prowgproactive+"/"+proprowgImagePath+"/btn-right.png'>"
							//+ "		<i class='fa fa-angle-right fa-lg'></i>"
							+ "	</div>"
							+ " <ul class='ul-gc'>"
							;
			
							var listIntent = "";
							for(var i=0;i<pi.length;i++){
								listIntent += "<li>"
											+ "	<div class='dv-thumb'> "
											+ "		<img src='"+prowgServer+"/"+prowgproactive+"/"+proprowgImagePath+"/"+pi[i]["picture"]+"'> "
											+ " </div> "
											+ "<div class='dv-title'>"	
											+ "	<p class='p-title'>"+pi[i]["titletext"]+"</p>";
											+ "	<p class='p-subtitle'></p>"
											+ "</div>"
											;
											for(var j=0;j<((Object.keys(pi[i]).length)-6)/2;j++){
									if(work)
									{
											listIntent += "<div id='"+pi[i]["titlevalue"]+"-"+pi[i]["choicevalue"+(j+1)]+"-"+(j+1)+"' class='dv-button-pro'>"
														+ pi[i]["choicetext"+(j+1)]
														+ "</div>"
										
									}else if(!work)
									{
											listIntent += "<div id='"+pi[i]["titlevalue"]+"-"+pi[i]["choicevaluetimeout"+(j+1)]+"' class='dv-button-pro'>"
														+ pi[i]["choicetext"+(j+1)]
														+ "</div>"
									}
								}
								listIntent += "</li>";
							}
							styleProdIntention += listIntent
												+ "</ul>"
												+ "<div class='bul-slide-img'>";
												for(var k=0;k<pi.length;k++){
													var act = "bulnone";
													if(k == 0)act = "bulact";
													
													styleProdIntention += "<span id='bul"+k+"'"
																	   + " class='bul-img "+act+" ' onclick='bulActive("+k+")'></span>"
												}
												styleProdIntention += "</div></div>";
	return styleProdIntention;
}



function protypropingMessage(promsgFrom,promsgText){
	prowgDateMessage = procreateWgDateMessage();
	var listChat  = prowgAction.createElement(protagList);
	listChat.id   = protagList + "Typroping";
	
	var template = "<div class='"+promsgFrom["headclass"]+"'>";
	if(promsgFrom["position"] == "right"){
		template+= "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				;
	} else{
		template+= "	<img src='"+promsgFrom["img"]+"'>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				+  "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				;
	}
	
	template += "</div>"
			 + "<div class='"+promsgFrom["bodyclass"]+"'>"+promsgText+"</div>"
			 ;
			 
	listChat.innerHTML = template;				   
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);
	profocusScrollwgChatbox();
}
  
function proremoveTyproping(){
	if(document.getElementById('liTyproping')){
		document.getElementById('liTyproping').parentNode.removeChild(document.getElementById('liTyproping'));
	}  
	profocusScrollwgChatbox();
}

function prosrvTime(){
		var xmlHttp;
		try {
		//FF, Opera, Safari, Chrome
		xmlHttp = new XMLHttpRequest();
		}
		catch (err1) {
		//IE
			try {
			xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
			}
			catch (err2) {
				try {
				xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
				}
				catch (eerr3) {
					//AJAX not supported, use CPU time.
					alert("AJAX not supported");
					}
				}
			}
		xmlHttp.open('HEAD',window.location.href.toString(),false);
		xmlHttp.setRequestHeader("Content-Type", "text/html");
		xmlHttp.send('');
		return xmlHttp.getResponseHeader("Date");
		}	
	  
	function  procheckedtimeworking(){
		var iswork = true;
		var servertime = prosrvTime();
        var today = new Date(servertime);
        var h = today.getHours();
		if(h<proWorkStartEng){
			iswork = false;
			
		}else if(h==proWorkStopEng){
			iswork = false;
		}
		
		return iswork;
	}

	function probulActive(n){
  
		var x = ($('.ul-gc').width()*n);
		$('.ul-gc').animate({
			scrollLeft: x
		}, 500, 'swing');
		 
		probuletActive(n);
 
	}
	
	function probuletActive(n){
		for(var i=0;i<$(".bul-img").length; i++){
			$("#bul"+i).attr("class", "bul-img bulnone");
		}
		$("#bul"+n).attr("class", "bul-img bulact");
		bul = n;
		
	}

function procreateEmail(promsgFrom){
	prowgDateMessage = createWgDateMessage();
	var subtext = $("input[name=Subject]").val();
	//var subtext = $("input[name=Subject]").val();
	var listChat  = prowgAction.createElement(tagList);
	listChat.id   = tagList + "-btn-sms";
	
	var template = "<div class='"+promsgFrom["headclass"]+"'>";
	if(promsgFrom["position"] == "right"){
		template+= "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				;
	} 
	else{
		template+= "	<img src='"+promsgFrom["img"]+"'>"
				+  "	<span class='"+promsgFrom["headnameclass"]+"'>"+promsgFrom["name"]+"</span>"
				+  "	<span class='"+promsgFrom["timeclass"]+"'>"+prowgDateMessage+"</span>"
				;
	}
	template += "</div>"
			 + "<div class='messagesms'><div class='exit' onclick='procloseForm(end)'>X</div>"
			 
			 + "<center><span class='txtemail'>"+prowgSystem[prowgLanguage]["messageresponse"]["HeadEmail"]+"</span></center><br><span class='txtemail'>"+prowgSystem[prowgLanguage]["messageresponse"]["Email"]+"</span><br><input  id='email' type='text' name='textemail' class='txtboxemail' placeholder='"+prowgSystem[prowgLanguage]["messageresponse"]["AskEmailBox"]+"' title='' maxlength='10' required /><br>"
			 + "<br><span class='txtemail'>"+prowgSystem[prowgLanguage]["messageresponse"]["ESubject"]+"<br></span><input  id='emailsubject' type='text' name='textemailsubject' class='txtboxemail' value='"+subtext+"' title='' maxlength='10' required /><br>"
			 // + "<br><span class='txtemail'>"+prowgSystem[prowgLanguage]["messageresponse"]["EProduct"]+"<br></span><input  id='emailproduct' type='text' name='textemailproduct' class='txtboxemail' placeholder='"+prowgSystem[prowgLanguage]["messageresponse"]["AskEmailProductBox"]+"' title='' maxlength='10' required /><br><br><br>"
			 +"<br><span class='txtemail'>"+prowgSystem[prowgLanguage]["messageresponse"]["EProduct"]+"<br></span><select name='cars' class='txtboxemail'><option value=''>"+prowgSystem[prowgLanguage]["messageresponse"]["AskEmailProductBox"]+"</option>"
			 +"<option value='saab'>Saab</option>"
			 +"<option value='fiat'>Fiat</option>"
		     +"<option value='audi'>Audi</option>"
			 +"</select>"
			 + "<input type='file' id='uploadfile1' onchange='attach(this.files);' style='display:none;'/>"
			 + "<center><div class='attachemail' onclick=$('#uploadfile1').click(); >"
			 + "<img src='"+prowgServer+"/"+prowgImagePath+"/attach.png' id='uploadfile' class='imgfile' style='cursor:pointer;' width='13' height='13'>&nbsp;Attach file</div> </center>"
			 + "</div>"
			 + "<center><button type='button' class='btn-sms' id='btn-SmsN' value='cencel' onclick='closeForm(this.value);' >"+prowgSystem[prowgLanguage]["messageresponse"]["btn_cancel"]+"</button><button type='button' class='btn-sms' id='btn-SmsY' onclick='submitSms() ;' >"+prowgSystem[prowgLanguage]["messageresponse"]["SmsY"]+"</button></center>"
			 ;

	listChat.innerHTML = template;				   
	prowgAction.getElementById(prowgUlChatId).appendChild(listChat);
	profocusScrollwgChatbox();
	//document.getElementById("btn-SmsY").disabled = true;
			
	
}

$(document).on('click touchend ','#prev-pro', function(e) { $('.ul-gc').animate({scrollLeft: "-="+$('.ul-gc').width()}, 500, 'swing');if(bul>0){probuletActive(bul-1);}});
$(document).on('click touchend','#next-pro',     function() { $('.ul-gc').animate({scrollLeft: "+="+$('.ul-gc').width()}, 500, 'swing');if(bul>=0 && bul < $(".bul-img").length-1 ){probuletActive(bul+1);}});
$(document).on('click','.dv-button-pro',function() { proselectProductService(this.id,$(this).text()); });
$(document).on('click touchend','.emoji-option-pro',function(e) { 
		proselectEmoji(this.id,$(this).text()); 
		proclickemoji();
			
});
$(document).on('click','#chat-history-pro','.dv-button-pro',function() { document.getElementById("emoji-chat-pro").style.display = "none";
proclick=false; });
 $(document).on('click','input[name=textsms]',function (e) {
  clearTimeout(proSmsTime);       
  proSmsTime = setTimeout(function() { 
		document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
		// for(var j=0;j<proSplashMes.length;j++){		
			procreateMessage(prowgMsgMariload,proSplashMes[0]);					
		// }		
		proisewt = false;		
		clearTimeout(protimeselecter); }, protimeSms);
	});
	 // document.getElementById("proemoji-option").onclick = alert("11111");
	
	







