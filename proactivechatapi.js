var proChatFactory = function(config) {

	var apiObj = proChat.createAPIv2();
	apiObj.proinit(config);

	// Create an instance of a wrapper class that encapsulates the chat API implementation
	var chatObj = {
		_chatapi: apiObj,
		
		prostartChat: function(formchat) {
			this._chatapi.prostartChat(formchat);
		},
		
		proendChat: function() {
			this._chatapi.proendChat();
		},
		
		prosendMessage: function(message) {
			this._chatapi.prosendMessage(message);
		},
		
		prodownloadfileChat: function(fileId,fileName) {
			this._chatapi.prodownloadfileChat(fileId,fileName);
		},
		
		prouploadfileChat: function(profileup) {
			this._chatapi.prouploadfileChat(profileup);
		},
		startTypropingChat: function(){
				this._chatapi.startTypropingChat();
		},
		prostopTypingChat: function(){
				this._chatapi.prostopTypingChat();
		},
		propushUrlChat: function(url) {
			this._chatapi.propushUrlChat(url);
		},
		proupdateUserDataChat: function(url) {
			this._chatapi.proupdateUserDataChat(url);
		},
		prorefreshChat: function(url) {
			this._chatapi.pro_refreshChat(url);
		}
	}
	
	// Return the wrapper class to the caller
	return chatObj;
}

// IE doesn't support Object.create() so implement a version of it that will work for our needs
if (!Object.create) {  
    Object.create = function (o) {
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F() {}
        F.prototype = o;
        return new F();
    };
}

// This merges the properties of two classes together to allow for object inheritance 
var profromPrototype = function(prototype, object) {  
    var newObject = Object.create(prototype);
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            newObject[prop] = object[prop];
        }
    }
  	return newObject;
};

// Our base Chat class implementation to be overridden by the implementation classes
var proChat = { 
	proinit: function(config) {}, 
    prostartChat: function(formchat) {},
    proendChat: function() {},
    proendMessage: function(message) {}
};

// An implementation of the Genesys Chat API v2
//
// Genesys Chat API v2 is the API implemented and used by Genesys Web Engagement
// It previously used to be exposed by a component known at Genesys WebAPI Server,
// but is now hosted by GMS.
//
// It differs from Chat API v1 in that no Orchestration session is created, and it
// DOES NOT offer a CometD event channel.
//
// Note, this class does not implement the entire API, but just enough to show the
// basics of how the API works.
//
proChat.createAPIv2 = function(config) {  
    
    return profromPrototype(proChat, {
    	pro_config: {},
    	pro_chatId: null,
    	pro_userId: null,
    	pro_secureKey: null,
    	pro_alias: null,
    	pro_transcriptPosition: 1,
    	pro_chatRefreshIntervalId: null,
		pro_downloadAttempts: null,
		pro_uploadMaxFiles: null,
		pro_uploadMaxFileSize: null,
		pro_uploadMaxTotalSize: null,
		pro_uploadNeedAgent: null,	
		pro_uploadFileTypes: null,
		pro_usedUploadMaxFiles: null,	
		pro_usedUploadMaxTotalSize: null,
		pro_usedDownloadAttempts: null,
    	
    	// Initialize the Chat API v2 Class
    	proinit: function(config) {
    		var me = this;
			
			// Save off the config object for later use
			me.pro_config = config;
			
			// Modify the config.probaseURL to reflect the API v2 URI
			me.pro_config.probaseURL = me.pro_config.probaseURL + '/genesys/2';
    	},
    	
    	// Start the Chat with the formchat values
        prostartChat: function(formchat) {
        
        	var me = this;
        	
			if(formchat.search("ChatProCookie") >= 0)
			{
				//me._config.baseURL = 10;
				
				
				me._prostartChatRefresh();
				me.pro_refreshChat();
				// me._config.proonStarted();
				me._getlimitfileChat();
			}
			else
			{
				var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName;
				const request = new XMLHttpRequest();
				//request.proresponseType = "json";
				request.open("POST", url,true);
				request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				request.onerror = function() {
					if(request.status == 0)
					{	prointernet = false;
						if(prowgLanguage == "TH")
						{
							proonMessageAlert(prodataMessageTH["Error-408"]);
						}
						else if(prowgLanguage == "EN")
						{
							proonMessageAlert(prodataMessageEN["Error-408"]);
						}
					}
					else
					{
						me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
					}						
						
				}
				request.onreadystatechange = function() {
					if(request.readyState == 4 && request.status == 200) {
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
						me.pro_chatId = oo.chatId;
						me.pro_userId = oo.userId;
						me.pro_secureKey = oo.secureKey;
						me.pro_alias = oo.alias;
						// Save off the transcript position
						me.pro_transcriptPosition = 1;
						
						proUserId = oo.userId;
						proSecureKey = oo.secureKey;
						proAlias = oo.alias;
						proTranscriptPosition = 1;
						proChatId = oo.chatId;
						// Let listeners know that the chat session started successfully
						me.pro_config.proonStarted();
						me._getlimitfileChat();
						// Start the interval polling for transcript updates
						me._prostartChatRefresh();
						me.pro_refreshChat();		
						
						
					}					
				}
				request.send(formchat);
			}
        },
        
        // End the chat session
        proendChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = 'userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/disconnect';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{						
					if(prowgLanguage == "TH")
					{
						proonMessageAlert(prodataMessageTH["Error-408"]);					
					}
					else if(prowgLanguage == "EN")
					{
						proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
				
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
						
						// Stop the interval polling for transcript updates
						me.pro_stopChatRefresh();
						
						// Clear out the session values
						me.pro_chatId = oo.chatId;
						me.pro_userId = oo.userId;
						me.pro_secureKey = oo.secureKey;
						me.pro_alias = oo.alias;
						me.pro_transcriptPosition = 1;
						
						// Let the listeners know that the chat has proended
						me.pro_config.proonEnded();
					}
				}
			}
			request.send(params);
        },
        
        // Sproend a message
        prosendMessage: function(message) {
        
        	var me = this;
			message = encodeURIComponent(message);
        	// Populate the parameters and URL
			// if(message.search("&") != -1)
			// {
				// var spatext = message.search("&");
				
				// if(spatext > 0)
				// {
					// var text2 = message.substring(0,spatext);
					
					// if(message.search("&") < message.length)
					// {	
						
						// var text3 = message.substring(spatext+1,message.length);
						
						// message = text2+"%26"+text3;
					// }
					// else
					// {
						// message = text2+"%26";
					// }
				// }	
				// else
				// {
					// if(message.search("&") < message.length)
					// {	
						
						// var text4 = message.substring(spatext+1,message.length);
						
						// message = "%26"+text4;
					// }
					// else
					// {
						// message = "%26";
					// }
				// }
				
			// }
			// else if(message.search("[+]") != -1)
			// {
				// var spatext = message.search("[+]");
				
				// if(spatext > 0)
				// {
					// var text2 = message.substring(0,spatext);
					
					
					// if(message.search("[+]") < message.length)
					// {	
						
						// var text3 = message.substring(spatext+1,message.length);
						
						// message = text2+"%2B"+text3;
					// }
					// else
					// {
						// message = text2+"%2B";
					// }
				// }	
				// else
				// {
					// if(message.search("[+]") < message.length)
					// {	
						
						// var text4 = message.substring(spatext+1,message.length);
						
						// message = "%2B"+text4;
					// }
					// else
					// {
						// message = "%2B";
					// }
				// }
				
			// }
			// else if(message.search("%") != -1)
			// {
				// var spatext = message.search("%");
				
				// if(spatext > 0)
				// {
					// var text2 = message.substring(0,spatext);

					// if(message.search("%") < message.length)
					// {	
						
						// var text3 = message.substring(spatext+1,message.length);

						// message = text2+"%25"+text3;
					// }
					// else
					// {
						// message = text2+"%25";
					// }
				// }	
				// else
				// {
					// if(message.search("%") < message.length)
					// {	
						
						// var text4 = message.substring(spatext+1,message.length);

						// message = "%25"+text4;
					// }
					// else
					// {
						// message = "%25";
					// }
				// }

			// }
			var params = 'message=' + message + '&userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias;
			
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/send';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{			
					if(prowgLanguage == "TH")
					{
						proonMessageAlert(prodataMessageTH["Error-408"]);					
					}
					else if(prowgLanguage == "EN")
					{
						proonMessageAlert(prodataMessageEN["Error-408"]);					
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
				
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
        
		// Start an interval object to make 'refresh' requests at 5 second intervals
		_prostartChatRefresh: function() {
			
			var me = this;
			
			me.pro_chatRefreshIntervalId = setInterval( function() {
				me.pro_refreshChat();
			}, 5000);
		},
		
		// Stop the interval object from making 'refresh' requests		
		pro_stopChatRefresh: function() {
			
			var me = this;
			
			clearInterval(me.pro_chatRefreshIntervalId);
		},
		
		// Refresh the Chat transcript by making a 'refresh' request
		pro_refreshChat: function() {
		
			var me = this;
			
			if(prochat == "ChatProCookie")
			{
				me.pro_userId = proUserId;
				me.pro_secureKey = proSecureKey;
				me.pro_alias = proAlias;
				me.pro_transcriptPosition = proTranscriptPosition;
				me.pro_chatId = proChatId;
				
				prochat = "";
			}
			var params = 'userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias + '&transcriptPosition=' + me.pro_transcriptPosition;
			
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/refresh';
			const request = new XMLHttpRequest();
			//request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	prointernet = false;
					
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-0"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-0"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
						
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 && request.status == 200){ 
				if(prointernet == false)
					{
						$(".comfirm-end-background").addClass("hide");
						$(".comfirm-end-box").addClass("hide");
						
					}
					if ( me.pro_config.prodebug === true ) {
						
					}
					// Update the transcript position
					
					var oo = JSON.parse(request.responseText);
					
					if((oo.chatEnded == true && !oo.errors && prointernet == false)||(oo.chatEnded == true && !oo.errors || prointernet == false)||(oo.chatEnded == true && oo.errors && prointernet == false))
					{
						prosetCookie("username", user, 0.00001);
						procreateMessage(prowgMsgAgent,prowgSystem[prowgLanguage]["messageproresponse"]["Leftchat"]);
						procreateMessage(prowgMsgCustomer,prowgSystem[prowgLanguage]["messageproresponse"]["Leftchat"]); 
						proremoveTyproping();
						$('#btn-Sproend').prop('disabled', true);
						$('#uploadfile').prop('disabled', true);
						// $('#btn-emoji').prop('disabled', true);
						document.getElementById("btn-emoji").disabled = true;
						$('#messagechat').prop('disabled', true);
						me.pro_stopChatRefresh();
						prointernet = true;
					}
					else if(!oo.chatEnded && !oo.errors && prointernet)
					{
						prouser = "ChatProCookie";
						
						prosetCookie("username", prouser, 0.00105);
						prointernet = true;
						me.pro_transcriptPosition = oo.nextPosition;
						// For each item in the transcript...
						$.each(oo.messages, function(index, message) {
							
							if(message.type === "FileUploaded"){
								me.pro_config.proonFileReceived(message.from.type, message.from.pronickname,message.userData);
							} else{
								
								me.pro_config.proonMessageReceived(message.from.type,message.type, message.from.pronickname, message.text, oo.chatEnded);
							}
						});
					}
					
					// If the chat has proended, perhaps by the agent proending the chat, then
					// stop the interval object from polling for transcript updates
					if ( oo.chatEnded == true ) {
						me.pro_stopChatRefresh();
						me.pro_config.proonEnded()
					}
				}
			}
			request.send(params);
			
		},
		
		prodownloadfileChat: function(fileId,fileName){
			var me = this;
			
			me.pro_usedDownloadAttempts = parseInt(me.pro_usedDownloadAttempts);
			me.pro_downloadAttempts = parseInt(me.pro_downloadAttempts);
			
			if(me.pro_usedDownloadAttempts >= me.pro_downloadAttempts){				
				
				me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-Download-Attemps"]);
				return;
			}
			
			var params = 'userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/file/'+fileId+'/download';
			const request = new XMLHttpRequest();
			//if(!proisIE)
			//{
				request.onloadstart = function(ev) {
					request.proresponseType = "blob";
				}
				//request.proresponseType = "blob";
			//}
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
				
			}
			request.onreadystatechange = function() {
				
				if(request.readyState == 4 && request.status == 200){ 
						if ( me.pro_config.prodebug === true ) {
							
						}
						me._getlimitfileChat();
						if(proisIE)
						{
							me.pro_config.proonDownloadFileIE(request.proresponse,fileName);
						}
						else
						{
							me.pro_config.proonDownloadFile(request.proresponse,fileName);
						}
						
				}
			}
			request.send(params);
		},
		
		_getlimitfileChat: function() {
        	var me = this;
			var params = 'userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/file/limits';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
				
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
					
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
						var temp = oo.messages[0].userData;
						me.pro_downloadAttempts = temp["download-attempts"];
						me.pro_uploadMaxFiles = temp["upload-max-files"];
						me.pro_uploadMaxFileSize = temp["upload-max-file-size"];
						me.pro_uploadMaxTotalSize = temp["upload-max-total-size"];
						me.pro_uploadNeedAgent = temp["upload-need-agent"];	
						me.pro_uploadFileTypes = temp["upload-file-types"];
						me.pro_usedUploadMaxFiles = temp["used-upload-max-files"];
						me.pro_usedUploadMaxTotalSize = temp["used-upload-max-total-size"];
						me.pro_usedDownloadAttempts = temp["used-download-attempts"];
					}
				}
			}
			request.send(params);		
        },
		
		
		prouploadfileChat: function(profileup){
			var me = this;
			me.pro_usedUploadMaxFiles = parseInt(me.pro_usedUploadMaxFiles);
			me.pro_uploadMaxFiles = parseInt(me.pro_uploadMaxFiles);
			me.pro_usedUploadMaxTotalSize = parseInt(me.pro_usedUploadMaxTotalSize);
			me.pro_uploadMaxTotalSize = parseInt(me.pro_uploadMaxTotalSize);
			
			if(profileup[0].size > me.pro_uploadMaxFileSize){
				me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-Max-File-Size"])
				return;
			}
			
			var sptname =  profileup[0].name.split(".");
			
			if(me.pro_uploadFileTypes.search(sptname[sptname.length-1].toLowerCase()) == -1){
				me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-File-Types"])
				return;
			}	
			
			if(me.pro_usedUploadMaxFiles >= me.pro_uploadMaxFiles){
				me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-Upload-Max-Files"])
				return;
			}
			
			if(me.pro_usedUploadMaxTotalSize >= me.pro_uploadMaxTotalSize){
				me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-Max-Total-Size"])
				return;
			}
			
			//var params = 'userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias + '&file=' + profileup[0];
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/file';		
			var formData = new FormData();
			formData.appproend('userId', me.pro_userId);
			formData.appproend('secureKey',me.pro_secureKey);
			formData.appproend('alias',me.pro_alias);
			formData.appproend('file',profileup[0]);
			
			
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url,true);
			request.setRequestHeader("Accept","*/*");
			// request.setRequestHeader("Content-Type",!1);
			request.overrideMimeType("multipart/form-data;");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
						 
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					$("#uploadfile").val(null);
					if(request.status == 200){
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
						me._getlimitfileChat();
					}
				}
			}
			request.send(formData);
			
		},
		
		 startTypropingChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/startTyproping';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
					
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
					
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
						me._readReceiptChat();
					}
				}
			}
			request.send(params);
        },
		
		 prostopTypingChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/stopTyproping';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
					
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4){ 
					if(request.status == 200){
					
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		_readReceiptChat: function() {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias + '&transcriptPosition=' + me.pro_transcriptPosition;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/readReceipt';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
				
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4){ 
					if(request.status == 200){
				
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		propushUrlChat: function(url) {
        
        	var me = this;
        
        	// Populate the parameters and URL
			var params = '&userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias + '&pushUrl=' + url;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/pushUrl';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
						
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4 ){ 
					if(request.status == 200){
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        },
		
		proupdateUserDataChat: function(arrData) {
        
			var uData = "";
			for(var key in arrData){
				uData += "&userData[\""+key+"\"]="+arrData[key].trim();
			}
        	var me = this;
        	// Populate the parameters and URL
			var params = '&userId=' + me.pro_userId + '&secureKey=' + me.pro_secureKey + '&alias=' + me.pro_alias + uData;
			var url = me.pro_config.probaseURL + '/chat/' + me.pro_config.prochatServiceName + '/' + me.pro_chatId + '/updateData';
			const request = new XMLHttpRequest();
			// request.proresponseType = "json";
			request.open("POST", url);
			request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			request.onerror = function() {
				if(request.status == 0)
				{	
					if(prowgLanguage == "TH")
					{
					proonMessageAlert(prodataMessageTH["Error-408"]);
					}
					else if(prowgLanguage == "EN")
					{
					proonMessageAlert(prodataMessageEN["Error-408"]);
					}
				}
				else
				{
					me.pro_config.proonMessageAlert(prowgSystem[prowgLanguage]["messageproresponse"]["Error-401"]);
				}						
						
			}
			request.onreadystatechange = function() {
				if(request.readyState == 4){ 
					if(request.status == 200){
						if ( me.pro_config.prodebug === true ) {
							
						}
						var oo = JSON.parse(request.responseText);
					}
				}
			}
			request.send(params);
        }
		
    });
};