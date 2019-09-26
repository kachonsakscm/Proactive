	var proparamUrl = {};
    var prolangweb ;
	var prodateMsg = "";
	var prodataMessage = {};
	var prodataFunction = {};
	var prooChat;
	var prooChatStart = false;
	var protimeEng;
	var proclick = false;	
	var proSplashMes = [];
	var proisewt = false;
	var proend = false;
	var proselecInten = false;
	var proSmsTime;
	var profirstmessage = true;
	var prochanelselect = true;
	var provalcookie = {};
	var aa;
	
	setTimeout(function(){
			for(var proi=0;proi<prowgScript.length;proi++){
				var prooScript = prowgScript[proi],prooTag;
				if(prowgAction.getElementById(prooScript.id)) return;
				prooTag = prowgAction.createElement(prooScript.type); prooTag.id = prooScript.id;
				if(prooScript.type == "script"){
					prooTag.src = prooScript.path;
				} else if(prooScript.type == "link"){
					prooTag.type = 'text/css';prooTag.rel = 'stylesheet';prooTag.href = prooScript.path; 
				}
				
				prowgAction.head.appendChild(prooTag);	
			}
			
		},10);
		
		setTimeout(function(){
			prosubmitername = $('input[id=SubmitterSourceName]').val();
			procheckCookie();
		},timecheckcookie);
		
	window.onload = function() {		
		// document.getElementById("formchat").style.display = "none";
		// $("#formchat").fadeIn();
		// $(".Livepro").fadeIn();
		// for(var proi=0;proi<prowgScript.length;proi++){
			// var prooScript = prowgScript[proi],prooTag;
			// if(prowgAction.getElementById(prooScript.id)) return;
			// prooTag = prowgAction.createElement(prooScript.type); prooTag.id = prooScript.id;
			// if(prooScript.type == "script"){
				// prooTag.src = prooScript.path;
			// } else if(prooScript.type == "link"){
				// prooTag.type = 'text/css';prooTag.rel = 'stylesheet';prooTag.href = prooScript.path; 
			// }
			
			// prowgAction.head.appendChild(prooTag);	
		// }
			// setTimeout(function(){
			// proreadConfig(prowgLanguage);
			// proprocessproemoji(proemoji);
			// // procheckCookie();
		// },protimeReadCsv);
				
	}
	
	function proClearCookie() {
		  var prod = new Date();
		  var prob = new Date();
		  prod.setTime();
		  prob.setTime(prob.getTime() );
		  var proexpires = "expires=" + prod.toGMTString();
		  var proexpiresb = "expires=" + prob.toGMTString();
		  console.log("expires : "+proexpires);
		  console.log("expiresb : "+proexpiresb);
		  document.cookie = proexpires + ";path=/";
	}
	
	function prosetCookie(procname,procvalue,proexdays) {
		  var prod = new Date();
		  var prob = new Date();
		  prod.setTime(prod.getTime() + (proexdays*24*60*60*1000));
		  prob.setTime(prob.getTime() );
		  var proexpires = "expires=" + prod.toGMTString();
		  var proexpiresb = "expires=" + prob.toGMTString();
		  console.log("expires : "+proexpires);
		  console.log("expiresb : "+proexpiresb);
		  console.log(proUserId);
		  console.log(proChatId);
		  console.log(proSecureKey);
		  console.log(proAlias);
		  console.log(proTranscriptPosition);	
		  console.log(aa);
		  document.cookie = "UserId" + "=" + proUserId + "," +"ChatId" + "=" + proChatId + "," +"SecureKey" + "=" + proSecureKey+ "," +"Alias" + "=" + proAlias + "," +"TranscriptPosition" + "=" + proTranscriptPosition +"," +"SumiterSouceName" + "=" + prosubmitername + "," +procname + "=" + procvalue + ";" + proexpires + ";path=/";
		  console.log(document.cookie);
	}

	function progetCookie(procname) {
		  var proname = procname + "=";
		  // console.log("name : "+name);
		  var decodedCookie = decodeURIComponent(document.cookie);
		  var proca = decodedCookie.split(';');
		  console.log(proca);
		  var proc = "";
		  for(var i = 0; i < proca.length; i++) {
			  // console.log(ca[5]);
			   // console.log("ca["+i+"] :"+ca[i].search("UserId"));
			  if(proca[i].search("UserId")>=0)
			  {
				  proc = proca[i];
				  proc = proc.substring(1);
			  }
			// while (c.charAt(0) == ' ') {
			  // c = c.substring(1);
			  // console.log(c);
			// }
			if (proc.indexOf(proname) == 0) {
				console.log(proc.substring(proname.length, proc.length));
			  return proc.substring(proname.length, proc.length);
			}
		}
		  if(proc.search("UserId") >= 0)
		  {
			  console.log("C : "+proc);
			  return proc;
		  }else
		  {	
			  console.log("C : ");
			  return "";
		  }
		  
		}
	
	function procheckCookie() {
		  prouser=progetCookie("username");
		   console.log("user1 : "+prouser.search("ChatProCookie"));
			
		    if (prouser.search("ChatProCookie") >= 0) {
				prouser = prouser.split(',');
				console.log("usersplit : "+prouser);
				for(var j=0;j<prouser.length; j++)
				{
					var promark = 0;
					promark = prouser[j].search("=");
					// console.log("mark : "+mark);
					console.log(prouser[j].substring(promark+1));
					provalcookie[j]=prouser[j].substring(promark+1);
				}
				
				proUserId = provalcookie[0];
				proChatId = provalcookie[1] ;
				proSecureKey = provalcookie[2] ;
				proAlias = provalcookie[3] ;
				proTranscriptPosition = provalcookie[4] ;
				prosubmitername = provalcookie[5]
				console.log(provalcookie[0]);
				console.log(provalcookie[1]);
				console.log(provalcookie[2]);
				console.log(provalcookie[3]);
				console.log(provalcookie[4]);	
				console.log(provalcookie[5]);
				prochat = "ChatProCookie";
				prooChatStart = true;
				proopenForm();
			}else {
				 // user = "ChatProCookie";
				 // console.log("user2 : "+user);
				 // setCookie("username", user, 0.00105);
			 }
	}
	
	function progetpara(){
		var url=decodeURIComponent(window.location.href).replace( /\+/g, ' ' );
		var urlStep1 = url.split("?");
		if(urlStep1.length > 1){
			var urlStep2 = urlStep1[1].split("&");
			urlStep2.forEach(function(e) {
			var temp = e.split("=");
			proparamUrl[temp[0]] = temp[1]; 
			}); 
		}
		prolangweb  = proparamUrl["ln"];
		if(prolangweb != null)
		{
			
			prolangweb = prolangweb.toUpperCase()
			console.log(prolangweb);
			prowgLanguage = prolangweb;
		}
	}
	
	function proreadConfig(prolang){
		console.log("prolang : "+prolang);
		prowgLanguage = prolang;
		document.getElementById("messagechat").placeholder = prowgSystem[prowgLanguage]["messageproresponse"]["Textsent"];
		// proreadWgMessageClient(prolang,"messageproresponse");
		// proreadWgMessageClient(prolang,"userintention");
		
		//proreadWgFunction();
	}
	function proopenForm(){
		$("#messagechat").prop('name', 'messagechat-pro');				
		$(".emoji-chat").prop('id', 'emoji-chat-pro');		
		$(".emoji-option").prop('class', 'emoji-option-pro');		
		$(".chat-history").prop("id","chat-history-pro");		
		$(".span3-1").attr("onclick","procloseForm('end')");		
		$("#btn-emoji").attr("onclick","proclickemoji()");		
		$("#btn-end").attr("onclick","proendChat()");		
		$("#btn-Send").attr("onclick","prosendMsg()");		
		$("#uploadfile").attr("onchange","proattach(this.files)");		
		progetpara();
		console.log(proisIE);
		if(proisIE)
		{
			console.log("เข้าจากIE");
		}
		profirstmessage = true;
		$("#Product").val("");
		$("#user_intent").val("");
		$("input[name=Subject]").val("");
		$("#GCTI_LanguageCode").val("");
		document.getElementById("formchat").style.display = "block";
		proselecInten = false;
		$('#uploadfile').prop('disabled', true);
		$('#messagechat').prop('disabled', false);	
		$('#btn-Send').prop('disabled', false);		
		// $("#btn-Send").prop('id', 'proactive');
		// $('#btn-emoji').prop('disabled', false);
		document.getElementById("btn-emoji").disabled = false;
		if(!$("#"+prowgChatboxId).hasClass("hide")){
			return;	
		}
		 console.log(proemoji);		
		document.getElementById("messagechat").placeholder = prowgSystem[prowgLanguage]["messageproresponse"]["Textsent"];
		$("#"+prowgChatboxId).removeClass("hide");
		if(prochat != "ChatProCookie")
		{
			procreateMessage(prowgMsgMari,prowgSystem[prowgLanguage]["messageproresponse"]["Greeting"]);
			if(prowgLanguage == 'TH')
			{
				proafterSelectLanguage();
				// procreateBtnInChat(prowgBtnEng);
				// protimeEng = setTimeout(function(){ proafterSelectLanguage();}, protimeoutEng);
			}
			else
			{
				 proafterSelectLanguage();
			}
			console.log("prochat: "+prochat);
		}else if(prochat == "ChatProCookie")
		{
			prorequestChat();
		}
		
		
	}
	
	function proafterSelectLanguage(){
		proremoveBtnInChat(prowgBtnEng["id"]);
		var isWork = procheckedtimeworking();
		// if(!isWork && prowgLanguage == "EN"){
			// procreateMessage(prowgMsgMari,prowgSystem[prowgLanguage]["messageproresponse"]["Outofwork"]);
			// $('#btn-Send').prop('disabled', true);
			// $('#uploadfile').prop('disabled', true);
			// document.getElementById("btn-emoji").disabled = true;
			// $('#messagechat').prop('disabled', true);
			// return false;
		// }		
		// else{
			setTimeout(function(){
				var userIntent = procreateUserIntention(prowgSystem[prowgLanguage]["userintention"],isWork);
				prodisplayUserIntention(prowgMsgMari,userIntent);
				// procreateBtnInChat(wgBtnRequestChat);
				// procreateBtnSelect(prowgBtnQ,prowgBtnCancelQ,prowgBtnEmail);
			},protimeReadCsv);
		// }
		
	}
	
	function procreateMessageExternal(promsgFrom,promsgText){
      procreateDateMsg();
      var liObj = document.createElement('li');
      liObj.id = "li"+document.getElementById("ul-history").childNodes.length;
      liObj.innerHTML = "</div><center><div class='message-smallbox'><div class='message-smallbox-head'>"+promsgFrom+"  |  "+prodateMsg+"</div><div class='message-smallbox-body'>"+promsgText+"</div></div></center>";
      document.getElementById("ul-history").appendChild(liObj);     
      profocusScroll();
	}
	
	
	
	function proclearTimeEng(){
		clearTimeout(protimeEng);
	}
	
	function procloseForm(data){
		proend = true;
		console.log("กดติด");		
		console.log(prooChatStart);		
		console.log(data);
		if(prooChatStart){
			proopenConfirmEnd(data);
		} else{
			proclearChatbox();
			document.getElementById("emoji-chat-pro").style.display = "none";
			$(".emoji-option-pro").prop('class', 'emoji-option');	
			$("#messagechat").prop('name', 'messagechat');		
			$(".emoji-option-pro").prop('class', 'emoji-option');		
			$("#emoji-chat-pro").prop('id', 'emoji-chat');
			proclick=false;
		}
	}
	
	function proclearChatbox(){
		$("#wgChatbox").addClass("hide");
		$("#ul-history").empty();
		proclearTimeEng();
		if(prointernet == true)
		{
			procloseConfirmEnd();
		}
		prowgLanguage = "TH";
		proreadConfig(prowgLanguage);
		proisewt = false;
	}
	
	function proclickemoji(){
		if(proclick == false){
			document.getElementById("emoji-chat-pro").style.display = "block";
			proclick=true;
		}
		else{
			document.getElementById("emoji-chat-pro").style.display = "none";
			proclick=false;
		}
		
	}
	
	function proopenConfirmEnd(data){
		$(".comfirm-end-background").removeClass("hide");
		$(".comfirm-end-box").removeClass("hide");
		console.log(data);
		if(data == "end")
		{	
			
			$('.comfirm-end-inside span').text(prowgSystem[prowgLanguage]["messageproresponse"]["ChatEndQuestion"]);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(prowgSystem[prowgLanguage]["messageproresponse"]["btn_cancel"]);
			$('.comfirm-end-inside button[name="btn-end"]').text(prowgSystem[prowgLanguage]["messageproresponse"]["btn_end"]);
			$('#btn-email').hide();
			$('#btn-end').show();
			//$('#btn-cancel').show();
			$('#btn-cancel').css('display', 'inline-block');
			
		}
		else {
			
			$('.comfirm-end-inside span').text(prowgSystem[prowgLanguage]["messageproresponse"]["CancelChatEnd"]);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(prowgSystem[prowgLanguage]["messageproresponse"]["btn_cancel"]);
			$('.comfirm-end-inside button[name="btn-end"]').text(prowgSystem[prowgLanguage]["messageproresponse"]["btn_end"]);
			$('#btn-end').show();
			$('#btn-cancel').css('display', 'inline-block');
			//$('#btn-cancel').show();
		}
		// else{
			// $('.comfirm-end-inside span').text(prodataMessage["EmailChatEnd"]);	
			// $('.comfirm-end-inside button[name="btn-cancel"]').text("Cancel");
			// $('.comfirm-end-inside button[name="btn-proemail"]').text("Sproend Email");
			
		// }
		
		
	}
	
	function proonMessageAlert(data){
		console.log("prointernet : "+prointernet);
		console.log("profirstmessage : "+profirstmessage);
		if(prointernet || profirstmessage)
		{	$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(prowgSystem[prowgLanguage]["messageproresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "block";
		}
		else if(!prointernet)
		{
			$(".comfirm-end-background").removeClass("hide");
			$(".comfirm-end-box").removeClass("hide");
			$('.comfirm-end-inside span').text(data);
			$('.comfirm-end-inside button[name="btn-cancel"]').text(prowgSystem[prowgLanguage]["messageproresponse"]["btn_ok"]);
			document.getElementById("btn-end").style.display = "none";
			document.getElementById("btn-cancel").style.display = "none";
		}
		//$('#btn-cancel').show();
		
	}
	
	function procloseConfirmEnd(){
		$(".comfirm-end-background").addClass("hide");
		$(".comfirm-end-box").addClass("hide");
		
	}
	
	function procreateBtnReqChat(){
		var liObj = document.createElement('li');
		liObj.id = "li"+document.getElementById("ul-history").childNodes.length;
		liObj.innerHTML = "<center><button type='button' class='btn-in-chat' id='btn-reqchat' onproclick='prorequestChat();'>Request Chat</button></center>";
		document.getElementById("ul-history").appendChild(liObj);     
		profocusScroll();
	}
	
	function prosendMsg(){
		
		clearTimeout(protimeEng);
		proremoveBtnInChat(prowgBtnEng["id"]);
		//proafterSelectLanguage();
		var text = $('textarea[name=messagechat-pro]').val().replace(/\n/g, "");
		$('textarea[name=messagechat-pro]').val("");
		if(text.trim() == ""){
			return false;
		}
		setTimeout(function(){	
			console.log("prooChatStart: "+prooChatStart);
			if(!prooChatStart){
				$("input[name=Subject]").val(text);
				 if(profirstmessage == true)
				 {
					 procreateMessage(prowgMsgCustomer,text);
					 
				 }
				 else
				 {
					
				 }
				$("#Product").val(prodefalutproduct);
				$("#user_intent").val(prodefalutintention);
				$("#GCTI_LanguageCode").val(prowgLanguage);
				prorequestChat();
			} else{
				// prooChat.proendMessage(text);
				var isUrl = false;
				prowebSystax.forEach(function(x){
					if(text.search(x) != -1){
						isUrl = true;
						return;
					}
				});
				
				if(isUrl){
					console.log("เข้าurl");
					console.log("test url http : "+text.search("http"));
					if(text.search("http://") == -1){
						text = "http://"+text;
						
					} 
						//else if(text.search("https://") == -1){
						//text = "https://"+text;
					//}
					console.log("test url : "+text);
					if(text.search(" ") < text.length)
					{
						var url = text.substring(0, text.search(" "));
						var subtext = text.substring(text.search(" "), text.length)
						console.log("test url : "+url);
						console.log("test subtext : "+subtext);
						console.log("test text url : "+text);
						
						console.log("test lenght : "+text.length);
						
						console.log("test search : "+text.search(" "));
						prooChat.propushUrlChat(url);
						prooChat.prosendMessage(subtext);
					}
					else
					{
						prooChat.propushUrlChat(text);
					}
				} else{
					console.log("เข้าข้อความธรรมดา");
					prooChat.prosendMessage(text);
				}
			}
		},protimeReadCsv);
		
	}
	
	function proisBlankSetAnonymous(val){
		var ret = val;
		if( ret == "") ret = "Anonymous";
		return ret;
	}
	
	
	
	function proselectProductService(propin,protxt){
		console.log(proselecInten);
		if(proselecInten == false)
		{
			var v = propin.split("-");
			promsgpic = propin+".png";
			promo = "promo"+propin;
			procreateMessage(prowgMsgCustomer,protxt);
			$("#Product").val(prodefalutproduct);
			$("#user_intent").val(prodefalutintention);
			$("input[name=Subject]").val(protxt);
			$("#GCTI_LanguageCode").val(prowgLanguage);
			profirstmessage = true;
			prorequestChat();
			proselecInten = true;			
			//prooChat.proendMessage(protxt);
		}
		
	}
	
	function proselectEmoji(propin,protxt){
		// var x = document.getElementById("messagechat").val();
		var x = $("textarea[name=messagechat-pro]").val();	
		// var x = document.getElementById("messagechat").value
		 // document.getElementById("messagechat").value = x+protxt;
		 $("textarea[name=messagechat-pro]").val(x+protxt);	
		 
		// $("#messagechat").val(x+protxt);
		// document.frmMain.messagechat.focus();		
		$("#messagechat").focus();
	}

	function prorequestChat(){
		if(prochat != "ChatProCookie")
		{
			$("input[name=firstName]").val(proisBlankSetAnonymous($('input[name=firstName]').val()));
			$("input[name=lastName]").val(proisBlankSetAnonymous($('input[name=lastName]').val()));
			$("input[id=SubmitterSourceName]").val(prosubmitername+"_proactive");
			var formchat = $('#formchat').serialize();
			prooChat = new proChatFactory({
				<!--probaseURL: "https://galb.truecorp.co.th", -->
				<!-- prochatServiceName: "gms-chat", -->
				<!-- probaseURL: "https://172.30.181.15:8443",-->  //DEV URL
				probaseURL: "https://172.16.56.134:8443",   //UAT URL
				prochatServiceName: "gms-chat",
				prouseCometD: false,
				proverbose: true,
				prodebug:true,
				proonStarted: proonStarted,
				proonEnded: proonEnded,
				<!-- proonFileSent: proonFileSent, -->
				proonMessageReceived: proonMessageReceived,
				proonFileReceived: proonFileReceived,
				proonError: proonError,
				proonDownloadFile:proonDownloadFile,
				proonDownloadFileIE:proonDownloadFileIE,
				proonMessageAlert:proonMessageAlert
			});
			// Start the chat using the variable in form.
			prooChat.prostartChat(formchat);
			console.log(formchat);
			if(promsgpic != "")
			{
				procreateMessage(prowgMsgMari,prowgSystem[prowgLanguage]["messageproresponse"][promo]);
				promsgpic = "";
			}
			procreateMessage(prowgMsgMari,prowgSystem[prowgLanguage]["messageproresponse"]["ChatStarted"]);
			console.log("ยังไม่ส่งข้อความแรก");
			console.log(profirstmessage);
			setTimeout(function(){
				if(profirstmessage == true)
			{
				console.log("เข้าข้อความแรก");
				console.log($("input[name=Subject]").val());
				prooChat.prosendMessage($("input[name=Subject]").val());
				
			}
			}, 2000);  
			
		}else if(prochat == "ChatProCookie")
		{
			
			$("input[name=firstName]").val(proisBlankSetAnonymous($('input[name=firstName]').val()));
			$("input[name=lastName]").val(proisBlankSetAnonymous($('input[name=lastName]').val()));
			var formchat = "ChatProCookie";
			prooChat = new proChatFactory({
				<!--probaseURL: "https://galb.truecorp.co.th", --> //PRODUCTION URL
				<!-- prochatServiceName: "gms-chat", -->
				<!-- probaseURL: "https://172.30.181.15:8443",-->  //DEV URL
				probaseURL: "https://172.16.56.134:8443",   //UAT URL
				prochatServiceName: "gms-chat",
				prouseCometD: false,
				proverbose: true,
				prodebug:true,
				proonStarted: proonStarted,
				proonEnded: proonEnded,
				<!-- proonFileSent: proonFileSent, -->
				proonMessageReceived: proonMessageReceived,
				proonFileReceived: proonFileReceived,
				proonError: proonError,
				proonDownloadFile:proonDownloadFile,
				proonDownloadFileIE:proonDownloadFileIE,
				proonMessageAlert:proonMessageAlert
			});
			// Start the chat using the variable in form.
			prooChat.prostartChat(formchat);
			// $('textarea[name=messagechat]').val($("input[name=Subject]").val());
			// console.log("test subject : "+$('textarea[name=messagechat]').val());
			// var text = $('textarea[name=messagechat]').val();
			// console.log("test text subject : "+text);
			// prooChat.proendMessage(text);
			// profirstmessage = true;
			// proendMsg();
		}
		
	}
	
	// The Chat class will call proonStarted when the chat session has been successfully created
	function proonStarted() {
		prooChatStart = true;
	}
	
	// The Chat class will call proonEnded when the chat session has proended
	function proonEnded() {
		prooChatStart = false;
	}
  
  function proonMessageReceived(protypeFrom,protypeMsg,pronickname,protextMsg,prochatproend) {
		
		var msg = "";
		console.log(protypeFrom);
		console.log(protypeMsg);
		console.log(pronickname);
		console.log(protextMsg);
		console.log(prochatproend);
		if ( protypeMsg === 'Message' || protypeMsg === 'Message.Text' ) {
			var n = protextMsg.search("http");
			console.log("N : "+n);
			if(n>1)
			{
				var	texth = protextMsg.substring(0, n)
				var urlweb = protextMsg.substring(n,protextMsg.length);	
				var m = urlweb.search(" ");
				var textn = urlweb.substring(m,protextMsg.length)
				console.log("textn : "+textn);
				if(m > 0)
				{
					urlweb = urlweb.substring(0, m);
					msg = ""+texth+"<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>"+textn+"";
				}
				else
				{
					urlweb = urlweb.substring(0, protextMsg.length);
					msg = ""+texth+"<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>";
				}
				console.log("M : "+m);
				console.log("protextMsg.length : "+protextMsg.length);
				console.log("urlweb : "+urlweb);
				// msg = textt+" "+urlweb;
			}
			else if(n>=0 && n<2){
			var urlweb = protextMsg.substring(n,protextMsg.length);	
				var m = urlweb.search(" ");
				var textn = urlweb.substring(m,protextMsg.length)
				console.log("textn : "+textn);
				if(m > 0)
				{
					urlweb = urlweb.substring(0, m);
					msg = "<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>"+textn+"";	
				}
				else
				{
					urlweb = urlweb.substring(0, protextMsg.length);
					msg = "<a href='"+urlweb+"' target='_blank' >"+urlweb+"</a>";	
				}
				console.log("M : "+m);
				console.log("protextMsg.length : "+protextMsg.length);
				console.log("urlweb : "+urlweb); 
			}
			else{
			msg = protextMsg;
			}
		} else if ( protypeMsg === 'ParticipantJoined' || protypeMsg === 'Notice.Joined') {
			msg = prowgSystem[prowgLanguage]["messageproresponse"]["Joinedchat"];
			$('#uploadfile').prop('disabled', false);
		} else if ( protypeMsg === 'ParticipantLeft' || protypeMsg === 'Notice.Left') {
			msg = prowgSystem[prowgLanguage]["messageproresponse"]["Leftchat"];
		} else if ( protypeMsg === 'PushUrl' || protypeMsg === 'PushUrl.Text' ) {
			// msg = "<a href='"+protextMsg+"'>"+protextMsg+"</a>";
			msg = "<a href='http://"+protextMsg+"' target='_blank' >"+protextMsg+"</a>";
		} else if ( protypeMsg === 'Notice' || protypeMsg === 'Notice.Text' ) {
			msg = protextMsg;
		}
		// msg.length
		if(protypeFrom === "Client" && protypeMsg === "TypropingStarted") return;
		if(protypeFrom === "Client" && protypeMsg === "TypropingStopped") return;
		if(protypeFrom === "Client" && msg === "read-confirm") return;
    
    if(protypeFrom === "Agent" && protypeMsg === "TypingStarted"){
		console.log("เข้าtyproping");
		if(!document.getElementById('liTyproping')){
			
			protypropingMessage(prowgMsgAgent,prowgSystem[prowgLanguage]["messageproresponse"]["typroping"]);
		}
      return false;
    }
    
    if(protypeFrom === "Agent" && protypeMsg === "TypingStopped"){
		console.log("ไม่เข้าtyproping");
		proremoveTyproping();
		// $('#li-btn-selecter').empty();
		return false;
    }
    
		if(protypeFrom === "Client"){
			if(msg == prowgSystem[prowgLanguage]["messageproresponse"]["Joinedchat"]  )
				{
					$('#uploadfile').prop('disabled', false);
				 	return;
				}
				if(profirstmessage == true)
				{
					profirstmessage = false;
				}
			 else if(profirstmessage == false)
				 {
					procreateMessage(prowgMsgCustomer,msg); 
				 }
			
		} else if(protypeFrom === "Agent"){
			if(msg == prowgSystem[prowgLanguage]["messageproresponse"]["Leftchat"] && prochatproend == true){
				console.log("ไม่เข้าtyproping");
				proremoveTyproping();
				$('#btn-Send').prop('disabled', true);
				$('#uploadfile').prop('disabled', true);
				// $('#btn-emoji').prop('disabled', true);
				document.getElementById("btn-emoji").disabled = true;
				$('#messagechat').prop('disabled', true);
				procreateMessage(prowgMsgAgent,msg);
				prowgLanguage = "TH";
				proreadConfig(prowgLanguage);
				setCookie("username", prouser, 0.00001);
				return;
				
			}
			if(proisewt == true)
			{	console.log("ไม่เข้าtyproping");	
				console.log("proisewt : "+proisewt);
				console.log("เข้าewtเงื่อนไข");
				clearTimeout(protimeselecter);
				if(document.getElementById('li-btn-selecter') != null && prochanelselect == true )
				{
					document.getElementById('li-btn-selecter').parentNode.removeChild(document.getElementById('li-btn-selecter'));
					procreateMessage(prowgMsgAgent,msg);
					proisewt = false;
					prochanelselect = false;
				}else if($("#li-btn-sms") && proisewt && prochanelselect == false){
					console.log("เข้าทุกเงื่อนไข");
					clearTimeout(proSmsTime);
					if(document.getElementById('li-btn-sms') != null){
					document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
					}					
					procreateMessage(prowgMsgAgent,msg);
					proisewt = false;
					
				}				
			}
			
			else if(msg != prowgSystem[prowgLanguage]["messageproresponse"]["Leftchat"] && prochatproend == false)
			{
				proremoveTyproping();
				procreateMessage(prowgMsgAgent,msg);
			}
			// $('#li-btn-selecter').empty();
			
		} else if(protypeFrom === "External"){
			
			if(msg.search("VQ_")>=0)
			{	var obj= {};
				obj = msg.split(",");
				console.log("EWT : "+obj[1]);
				 if(obj[1] > proewttime)   //proewttime
				 {
					protimefilter(msg);
					proisewt = true;
				 }
			}else if(msg == prowgSystem[prowgLanguage]["messageproresponse"]["Joinedchat"]){
				return;
			}else{
				if(!proisewt && msg != "")
				{
					procreateMessage(prowgMsgMariload,msg);
				}
				else
				{
					proSplashMes.push(msg);
				}
			}
			
			
			
			 
		}
	}
  
	function proonFileReceived(protypeFrom,pronickname,udata) {
		
		var msg = "";
		var filesize = (parseInt(udata["file-size"])/1024).toFixed(2);
		//message : {"from":{"pronickname":"agent","participantId":2,"type":"Agent"},"index":10,"text":"00D25C4FD5580141","type":"FileUploaded","utcTime":1548735832000,"userData":{"file-document-id":"0002KaE4JJ9Y00BX","file-source":"ucs","file-upload-path":"C:\\Users\\Administrator\\Desktop\\New Text Document.protxt","file-id":"00D25C4FD5580141","file-upload-type":"file-system","file-size":"438","file-name":"New Text Document.protxt"}}
		msg = udata["file-name"]
			+ "<br/>"
			+ filesize+" KB"
			+ "<br/>"
			+ "<center>"
			+ "<button type='button' class='btn-in-chat-download' "
			+ "value='"+udata["file-id"]+"' "
			+ "onproclick='downloadfile(this.value,\""+udata["file-name"]+"\")' "
			+ ">"+prowgSystem[prowgLanguage]["messageproresponse"]["DownloadButton"]+"</button>"
			+ "</center>"
			;
		
		if(protypeFrom === "Client"){
			procreateMessage(prowgMsgCustomer,msg); 
		} else if(protypeFrom === "Agent"){
			proremoveTyproping();
			procreateMessage(prowgMsgAgent,msg);
		} else if(protypeFrom === "External"){
			procreateMessage(prowgMsgMari,msg);
		}
	}
	
	function downloadfile(fileid,filename){
		prooChat.prodownloadfileChat(fileid,filename);
	}
	
	function proonDownloadFile(data,filename){
		var ev = document.createEvent("MouseEvents");
		ev.proinitMouseEvent("proclick", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		var a = document.createElement('a');
		var spt = filename.split(".");
		var blob = data;
		var url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = filename;
		a.dispatchEvent(ev);
		setTimeout(function(){
			window.URL.revokeObjectURL(url);
		}, 2000);  
		
	}
	
	function proonDownloadFileIE(data,filename){
		console.log("โหลดไฟล์จากIE");
		// // var ev = document.createEvent("MouseEvents");
		// // ev.proinitMouseEvent("proclick", true, false, self, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		// var a = document.createElement('a');
		// var spt = filename.split(".");
		// var blob = new Blob([data],{type: prowgMimeType[spt[1]]});
		// var url = window.URL.createObjectURL(blob);
		// a.href = url;
		// a.download = filename;
		// a.proclick();
		// console.log(url);
		// console.log(filename);
		// console.log(data);
		// // a.dispatchEvent(ev);
		// // setTimeout(function(){
		// window.URL.revokeObjectURL(url);
		// // }, 2000);  
		window.navigator.msSaveBlob(data, filename);
		
	}
	// The chat class will call proonError when an error occurs for any reason
	function proonError(err) {
		alert(err);
	}
	
	function proendChat(){
		console.log(proend);
		if(proend == true)
		{
			var val={DisconnectReason:"Chat_UserEnd"};
			console.log(val);
			console.log("proend : "+proend);
			prooChat.proupdateUserDataChat(val);
			proend = false;
		}
		else{
			var val={DisconnectReason:"Chat_ChannelSelectorTimeout"};
			console.log(val);
			console.log("proend : "+proend);
			prooChat.proupdateUserDataChat(val);
			
		}
		prooChat.proendChat();
		proclearChatbox();
		prooChatStart = false;
		prowgLanguage = "TH";
		proreadConfig(prowgLanguage);
		setCookie("username", prouser, 0.00001);
		document.getElementById("emoji-chat-pro").style.display = "none";
		proclick=false;
		$("#messagechat").prop('name', 'messagechat');		
		$(".emoji-option-pro").prop('class', 'emoji-option');		
		$("#emoji-chat-pro").prop('id', 'emoji-chat');
		// document.getElementById("wg-emoji").innerHTML=""; 
	}
	
	$(document).on('keypress','textarea[name=messagechat-pro]',function(e) { 
		if ( e.which == 13 ) {
			
			console.log(e.which);
			e.preventDefault();prosendMsg();
		} 
	});
	
	function protimefilter(prodataArr) {
		// procreateMessage(wgSelect,text); 
		// console.log(prodataMessage["btn_cancel"]);
		// procreateBtnInChat("chselect");
		
		var obj = {};
		var x ;
		obj = prodataArr.split(",");
		 if(obj[1] > 0)
		 {	
			x = obj[1]/60;
			x = Math.round(x);
			console.log(x);
			var messageewt = prowgSystem[prowgLanguage]["messageproresponse"]["EWT"].replace("_X_",x);
			console.log(prowgMsgMari);
			procreateMessage(prowgMsgMari,messageewt);	
			procreateBtnSelect(prowgBtnQ,prowgBtnCancelQ,prowgBtnEmail);
			
			
		 }
		// else
		// {
			// procreateMessage(prowgMsgMari,msg);
		// }
	}
	function proopenproemail() {
		procreateEmail(prowgMsgMari,prowgSystem[prowgLanguage]["messageproresponse"]["AskSMS"]);
		
	}
	function proselectq() {
		// $('#li-btn-selecter').empty();
		prochanelselect = false;
		document.getElementById('li-btn-selecter').parentNode.removeChild(document.getElementById('li-btn-selecter'));
		
		// proisewt = false;
		procreateSms(prowgMsgMari,prowgSystem[prowgLanguage]["messageproresponse"]["AskSMS"]);
		 proSmsTime = setTimeout(function(){
				document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
				for(var j=0;j<proSplashMes.length;j++){		
					procreateMessage(prowgMsgMariload,proSplashMes[j]);					
				}		
						
				clearTimeout(protimeselecter);
				
			},protimeSms);
	}
	
	$(document).on('keydown','textarea[name=messagechat-pro]',function(e) { 
		if(prooChatStart){
			prooChat.startTypropingChat();
		}
	});
	
	// $(document).on('keyup','textarea[name=messagechat]',function(e) { 
		// if(prooChatStart){
			// prooChat.stopTypropingChat();
		// }
	// });
	
	function proattach(profileup){	
		prooChat.prouploadfileChat(profileup);
	}
	
	function proSelectewt() {
		var str = "Visit W3Schools!"; 
		var n = str.search("W3Schools");
		document.getElementById("demo").innerHTML = n;
	}
	
	function proremovepic() {
		document.getElementById('picpromo').parentNode.removeChild(document.getElementById('picpromo'));
	}
	
	function proremovetext() {
		console.log("เข้าเคสไม่มีข้อความ");
		document.getElementById('lipromotion').parentNode.removeChild(document.getElementById('lipromotion'));
	}
	
	function prosubmitSms(){
		proisewt = false;
		var smsval={SMSContactNumber:$('#sms').val().trim()};
		console.log(smsval);
		prooChat.proupdateUserDataChat(smsval);
		document.getElementById('li-btn-sms').parentNode.removeChild(document.getElementById('li-btn-sms'));
		console.log("proSplashMes : "+proSplashMes.length);
		for(var j=0;j<1;j++){		//proSplashMes.length
			procreateMessage(prowgMsgMariload,proSplashMes[j]);					}		
			proisewt = false;		
			clearTimeout(protimeselecter);
			clearTimeout(proSmsTime);
	}
	
	