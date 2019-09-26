//var domainName = "https://survey.truecorp.co.th/webgenesys/"
var prowgServer 	 = "https://survey.truecorp.co.th/web";
var prowgproactive   = "proactive";   
var proprowgImagePath  = "img";
var prowgConfigPath = "config";
var proprowgScriptPath = "scripts";
var prowgStylePath = "styles";
var prowgLanguage = "TH";
var proUserId ="";
var proChatId = "" ;
var proSecureKey = "" ;
var proAlias = "" ;
var proTranscriptPosition ;
var prochat ;
var prouser;
var prowgScript = [
	{type:"script",	id:"proactivechatapi",		path:prowgServer+"/"+prowgproactive+"/"+"proactivechatapi.js"},
	{type:"script",	id:"proactivewgfunction",	path:prowgServer+"/"+prowgproactive+"/"+"proactivewgfunction.js"},
	{type:"link",	id:"proactivetruewebchat_widget1" ,	path:prowgServer+"/"+prowgproactive+"/"+"proactivetruewebchat_widget1.css"}
];
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

// Internet Explorer 6-11
var proisIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !proisIE && !!window.StyleMedia;

// Chrome 1 - 71
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Blink engine detection
var proisBlink = (isChrome || isOpera) && !!window.CSS;
var prodataMessageTH={"Greeting":"สวัสดีค่ะ True Digital Sale ยินดีให้บริการค่ะ พิมพ์หรือคลิกเรื่องที่ต้องการขอรับบริการได้เลยค่ะ ",
"startchat":"คุณสามารถเลือกเมนูลัดด้านล่าง หรือหากต้องการติดต่อเรื่องนอกเหนือจากนี้ กรุณาพิมพ์เรื่องที่ต้องการ",
"TypeIntention":"พิมพ์เรื่องที่ต้องการขอรับบริการได้เลยค่ะ เช่น สอบถามยอดค้าง มือถือ เบอร์ 0912345678",
"Outofwork":"Our operating hours are from 8 am to 11 pm. Please contact us again during operating hours. Sorry for the inconvenience this may have caused.",
"queueparttern1":"คุณเป็นคนที่ ",
"queueparttern2":"มีคิวก่อนหน้าคุณ",
"queueparttern3":"คิว กรุณากดปุ่มจองคิว หากต้องการสนทนากับเจ้าหน้าที่",
"SystemMessageinformEWT":"รอสักครู่นะคะ เวลารอโดยประมาณคือ 15 นาทีค่ะ",
"AskSMS":"กรุณาระบุหมายเลขโทรศัพท์เพื่อแจ้งการเตือนเมื่อถึงคิวของท่านค่ะ",
"ConfirmSMSnumber":"เมื่อใกล้ถึงคิวของคุณ ระบบจะส่ง SMS แจ้งเตือนไปที่เบอร์ ",
"ChatStarted":" ระบบกำลังส่งข้อมูลไปยังเจ้าหน้าที่นะคะ",
// "ChatStarted":"เพื่อความรวดเร็ว คุณสามารถตรวจสอบข้อมูลต่างๆ ด้วยตัวเองได้ง่ายๆ โดยการใช้งานระบบอัตโนมัติ ผ่าน <a href='https://iservice.truecorp.co.th/' target='_blank'>www.TrueiService.com </a> หรือ Application TrueiService ซึ่ง download ได้จาก App Store สำหรับ ios หรือ Play Store สำหรับ Android ระบบกำลังส่งข้อมูลไปยังเจ้าหน้าที่ค่ะ",
"proendchat":"ขอบคุณที่ใช้บริการทรู แคร์ แชทค่ะ",
"startchat1":"พิมพ์ข้อความที่นี",
"btn_q":"ตกลงจองคิว",
"btn_ok":"ตกลง",
"btn_end":"สิ้นสุดการสนทนา",
"btn_cancel":"ยกเลิกจองคิว",
"btn_proemail":"ส่งอีเมล",
"btn_procallback":"Callback",
"SmsY":"ส่ง",
"SmsN":"ยกเลิก",
"AskSMSBox":" 089XXXXXXX",
"Textsent":"พิมพ์ข้อความที่นี่...",
"typroping":"กำลังพิมพ์ ...",
"Joinedchat":"เข้าสู่การสนทนา ",
"DownloadButton":"ดาวน์โหลด ",
"Leftchat":"ออกจากการสนทนา",
"EWT":"คุณจะได้รับบริการใน _X_ นาที  หากต้องการรับบริการต่อกรุณาเลือก จองคิว หรือ สามารถเลือกทำรายการอื่นๆ ได้ค่ะ ",
"ChatEndQuestion":"ต้องการสิ้นสุดการสนทนาหรือไม่?",
"CancelChatEnd":"ต้องการสิ้นสุดรายการสนทนาหรือไม่?",
"EmailChatEnd":"ต้องการส่งอีเมลหรือไม่?",
"Error-Download-Attemps":"ไม่สามารถดาวน์โหลดไฟล์ได้เนื่องจากคุณดาวน์โหลดเกินจำนวครั้งที่กำหนดไว้",
"Error-Max-File-Size":"ไฟล์มีขนาดใหญ่เกินกว่าที่กำหนด",
"Error-File-Types":"นามสกุลไฟล์ของคุณไม่ตรงตามที่กำหนดไว้",
"Error-Upload-Max-Files":"จำนวนไฟล์ทั้งหมดเกินที่กำหนดไว้",
"Error-Max-Total-Size":"ขนาดของไฟล์ทั้งหมดเกินที่กำหนดไว้",
"Error-102":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-103":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-161":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-204":"ขออภัย ไม่สามารถส่งข้อความนี้ได้เนื่องจากข้อความยาวเกินไป กรุณาปรับข้อความให้สั้นลง",
"Error-401":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-403":"ไม่สามารถเข้าสู่ระบบสนทนาได้ กรุณาลองใหม่อีกครั้ง",
"Error-404":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-405":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-0":"การเชื่อมต่อขัดข้อง กรุณาตรวจสอบอินเทอร์เน็ต ระบบจะนำท่านกลับสู่การสนทนาอัตโนมัติ",
"Error-408":"การเชื่อมต่อขัดข้อง กรุณาตรวจสอบอินเทอร์เน็ตและลองใหม่อีกครั้ง",
"Error-500":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-502":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"Error-504":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"CriticalFault":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"StartFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"MessageFailed":"ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
"RestoreFailed":"ขออภัย ระบบขาดการเชื่อมต่อ ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่อีกครั้ง",
"TransferFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"FileTransferSizeError":"ขออภัย ไม่สามารถส่งไฟล์ได้เนื่องจากไฟล์มีขนาดใหญ่เกินไป",
"InviteFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"ChatServerWentOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"RestoredOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
"Disconnected":"<div style='text-align:center'>การเชื่อมต่อขัดข้อง</div>",
"Reconnected":"<div style='text-align:center'>กำลังกลับเข้าสู่การสนทนา</div>",
"FileSproendFailed":"ขออภัย ไม่สามารถส่งไฟล์ได้ กรุณาลองใหม่อีกครั้ง",
"Generic":"<div style='text-align:center'>ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง</div>",
"promoTMH-TELESALES-1":"ไกลกว่าความเร็ว มากกว่าความแรงพร้อมทุกการเชื่อมต่อ สำหรับวันนี้และวันพรุ่งนี้ ทรูทุ่มเทและไม่หยุดพัฒนาเครือข่าย เพื่อรองรับทุกการเชื่อมต่อ อีกก้าวของเราทุกคน ก้าวที่ไกลกว่าใครจะจินตนาการ ด้วยเครือข่าย 4G+,NB-IoT และ CAT-M",
"promoTMH-TELESALES-2":"ไกลกว่าความเร็ว มากกว่าความแรงพร้อมทุกการเชื่อมต่อ สำหรับวันนี้และวันพรุ่งนี้ ทรูทุ่มเทและไม่หยุดพัฒนาเครือข่าย เพื่อรองรับทุกการเชื่อมต่อ อีกก้าวของเราทุกคน ก้าวที่ไกลกว่าใครจะจินตนาการ ด้วยเครือข่าย 4G+,NB-IoT และ CAT-M"
}; 
 var prodataMessageEN={
"Greeting":"สวัสดีค่ะ ทรูแคร์แชทยินดีให้บริการค่ะ . Hello welcome to True Care Chat service. ",
"startchat":"Please select the service you need from the options below. You may scroll left/right to view or select a specific product. If you cannot find the service that you require on the menu, please type in your request." ,
"TypeIntention":"Please type in your service request or question e.g. balance enquiry of mobile no. 0912345678. ",
"Outofwork":"Our operating hours are from 8 am to 11 pm. Please contact us again during operating hours. Sorry for the inconvenience this may have caused. ",
"queueparttern1":"Your queue is ",
"queueparttern2":"Have queue before you is ",
"queueparttern3":"Please proclick button if you wanna be chat with Agent. ",
"SystemMessageinformEWT":"Estimate wait time to chat is 15 minutes. ",
"AskSMS":"Please identify TrueMove H mobile number to receive an SMS alert when you are first in the queue. ",
"ConfirmSMSnumber":"SMS alert will be sent to ",
"Textsent":"Type your message... ",
//"ChatStarted":"The system will transfer your information to an agent, please wait for a moment. ",
"ChatStarted":"For speedy service,  you can check various information by yourself easily by using automated systems via <a src='www.TrueiService.com'>www.TrueiService.com </a> or Application TrueiService which can be downloaded from App Store for ios or Play Store for Android. Information is being transferred to one of our customer representatives.",
"btn_q":"OK",
"btn_ok":"OK",
"btn_end":"End Chat",
"btn_cancel":"Cancel",
"btn_proemail":"Sproend Email",
"SmsY":"Sproend",
"SmsN":"Cancel",
"AskSMSBox":"089XXXXXXX",
"typroping":"typroping...",
"Joinedchat":"Joined In Chat",
"DownloadButton":"Download",
"Leftchat":"Left the chat",
"EWT":"Your request chat will be responded in_X_ mins. Choose 'OK' to continue waiting in the line, or proend proemail instead",
"ChatEndQuestion":"To proend the conversation?",
"CancelChatEnd":"To continue waiting in the line?",
"EmailChatEnd":"To send email?",
"Error-Download-Attemps":"Unable to download file, Downloaded more than limit Session",
"Error-Max-File-Size":"The file is exceeded the designation size",
"Error-File-Types":"Incorrect file type",
"Error-Upload-Max-Files":"The files are exceeded the designation amounts",
"Error-Max-Total-Size":"Oversize file",
"Error-102":"Cannot start joined in chat, please try again later",
"Error-103":"Cannot start joined in chat, please try again later",
"Error-161":"Cannot start joined in chat, please try again later",
"Error-204":"Sorry, this message cannot be sent because the message is too long. Please shorten the text.",
"Error-401":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-403":"Cannot start joined in chat, please try again later",
"Error-404":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-405":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-0":"Sorry, there seems to have a connection issue, please check your prointernet connection. The system will takes you back to the chat conversation when the connection is ready. ",
"Error-408":"Sorry, there seems to have a connection issue, please check your prointernet and try again later.",
"Error-500":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-502":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"Error-504":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"CriticalFault":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"StartFailed":"Sorry, your request cannot be fulfilled at this time, please try again later.",
"MessageFailed":"ส่งข้อความไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
"RestoreFailed":"ขออภัย ระบบขาดการเชื่อมต่อ ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่อีกครั้ง",
"TransferFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"FileTransferSizeError":"ขออภัย ไม่สามารถส่งไฟล์ได้เนื่องจากไฟล์มีขนาดใหญ่เกินไป",
"InviteFailed":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่ภายหลัง",
"ChatServerWentOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง",
"RestoredOffline":"ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง",
"Disconnected":"<div style='text-align:center'>การเชื่อมต่อขัดข้อง</div>",
"Reconnected":"<div style='text-align:center'>กำลังกลับเข้าสู่การสนทนา</div>",
"FileSproendFailed":"ขออภัย ไม่สามารถส่งไฟล์ได้ กรุณาลองใหม่อีกครั้ง",
"Generic":"<div style='text-align:center'>ขออภัย ไม่สามารถทำรายการได้ในขณะนี้ กรุณาทำรายการใหม่ภายหลัง</div>"
 };
 
var proUserIntentionTH = [
	{	"picture":"TMH-Main.png",
		"titlevalue":"TMH",
		"titletext":"โปรโมชั่นสำหรับลูกค้าใหม่",
		"choicevalue1":"TELESALES",
		// "choicevalue1":"BILL",
		"choicevaluetimeout1":"SALE",
		"choicetext1":"โปรโมชั่นสำหรับลูกค้าเติมเงินย้ายเป็นรายเดือน",
		"choicevalue2":"TELESALES",
		// "choicevalue2":"TECH",
		"choicevaluetimeout2":"SALE",
		"choicetext2":"โปรโมชั่นสำหรับย้ายค่าย",
		"choicevalue3":"TELESALES",
		// "choicevalue3":"PROMO",
		"choicevaluetimeout3":"SALE",
		"choicetext3":"โปรโมชั่นลูกค้าปัจจุบันต้องการเพิ่มค่าโทรและเพิ่มเน็ต"
	},
	{	"picture":"TOL-Main.png",
		"titlevalue":"TOL",
		"titletext":"โปรโมชั่นติดตั้งใหม่",
		"choicevalue1":"TELESALES",
		"choicevaluetimeout1":"SALE",
		"choicetext1":"โปรโมชั่นสำหรับลูกค้าย้ายค่าย",
		"choicevalue2":"TELESALES",
		"choicevaluetimeout2":"SALE",
		"choicetext2":"ลูกค้าปัจจุบันต้องการ up speed",
		"choicevalue3":"TELESALES",
		"choicevaluetimeout3":"SALE",
		"choicetext3":"ต้องการสนทนากับเจ้าหน้าที่"
	},
	{	"picture":"TVS-Main.png",
		"titlevalue":"TVS",
		"titletext":"โปรโมชั่นติดตั้งใหม่",
		"choicevalue1":"TELESALES",
		"choicevaluetimeout1":"SALE",
		"choicetext1":"ต้องการ Upgrade Package",
		"choicevalue2":"TELESALES",
		"choicevaluetimeout2":"SALE",
		"choicetext2":"ต้องการซื้อ Package เสริม",
		"choicevalue3":"TELESALES",
		"choicevaluetimeout3":"SALE",
		"choicetext3":"ต้องการติดตั้งจุดเสริม"
	}
];

var proUserIntentionEN = [
	{	"picture":"TMH-Main.png",
		"titlevalue":"TMH",
		"titletext":"Mobile Service",
		"choicevalue1":"BILL",
		"choicetext1":"Billing and payment",
		"choicevalue2":"TECH",
		"choicetext2":"Technical difficulties or network",
		"choicevalue3":"PROMO",
		"choicetext3":"Promotion Enquiry"
	},
	{	"picture":"TOL-Main.png",
		"titlevalue":"TOL",
		"titletext":"Internet",
		"choicevalue1":"BILL",
		"choicetext1":"Billing and payment",
		"choicevalue2":"TECH",
		"choicetext2":"Technical difficulties or network",
		"choicevalue3":"PROMO",
		"choicetext3":"Promotion Enquiry"
	},
	{	"picture":"TVS-Main.png",
		"titlevalue":"TVS",
		"titletext":"Cable TV",
		"choicevalue1":"BILL",
		"choicetext1":"Billing and payment",
		"choicevalue2":"TECH",
		"choicetext2":"Technical difficulties or network",
		"choicevalue3":"PROMO",
		"choicetext3":"Promotion Enquiry"
	}
];

var proemail = "http://www3.truecorp.co.th/contact_us/cm?ln=";
var proemoji = ["😁","😂","😃","😄","😆","😊","😍","😘","😚","😩","😫","😭","😷","😺","😻"];
var probtn_Q = true;
var probtn_CancelQ = true;
var probtn_Email = false;
var proWorkStartEng = 8;
var proWorkStopEng = 21;	
var prowgBtnEng = {id:"btn-eng-pro",t:"english",v:"EN",oc:"proclearTimeEng();proreadConfig(this.value);proafterSelectLanguage();" };
// var wgBtnRequestChat = {id:"btn-reqchat",t:"Request Chat",v:"",oc:"prorequestChat();" };
var prowgBtnQ = {id:"btn-q",t:"",v:"q",oc:"proselectq();clearTimeout(protimeselecter);" };
var prowgBtnCancelQ = {id:"btn-canq",t:"",v:"cancel",oc:"procloseForm(this.val);" };
var prowgBtnEmail = {id:"btn-proemail",t:"",v:"proemail",oc:"proopenproemail();clearTimeout(protimeselecter);" };
var prowgImage = {agent:"agent.png",customer:"",external:"",mari:"agent.png"}
var prowgAction = document;
var prowgChatboxId = "wgChatbox";
var prowgDivChatId = "chat-history-pro";
var prowgUlChatId = "ul-history";
var prowgSystem = {
	TH:	{
		agent:"Agent",customer:"You",external:"System",mari:"MARI",messageproresponse:prodataMessageTH,userintention:proUserIntentionTH
	},
	EN: {
		agent:"Agent",customer:"You",external:"System",mari:"MARI",messageproresponse:prodataMessageEN,userintention:proUserIntentionEN
	}
	};
var prowgMimeType = {
	protxt:"text/plain",htm:"text/html",html:"text/html",js:"text/javascript",css:"text/css",csv:"text/csv",
	jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",gif:"image/gif",bmp:"text/bmp",ico:"image/vnd.microsoft.icon",svg:"image/svg+xml",
	mp3:"audio/mpeg",wav:"audio/wav",acc:"audio/aac",mid:"audio/midi",midi:"audio/x-midi",mpeg:"audio/mpeg",
	mp4:"video/mp4",avi:"video/x-msvideo",avi:"video/x-msvideo",
	bin:"application/octet-stream",pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",xls:"application/vnd.ms-excel",
	doc:"application/msword",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",pdf:"application/pdf",
	jar:"application/java-archive",json:"application/json",ppt:"application/vnd.ms-powerpoint",
	rar:"application/x-rar-compressed",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	xml:"application/xml",zip:"application/zip",z7:"application/x-7z-compressed"
	};
var prowgMsgMari = {
	position : "",
	headclass : "message-data",
	img : prowgServer+"/"+prowgproactive+"/"+proprowgImagePath +"/"+ prowgImage["mari"],
	name : prowgSystem[prowgLanguage]["mari"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message my-message"
};
var prowgMsgAgent = {
	position : "",
	headclass : "message-data",
	img : prowgServer+"/"+prowgproactive+"/"+proprowgImagePath +"/"+ prowgImage["agent"],
	name : prowgSystem[prowgLanguage]["agent"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message my-message"
};
var prowgMsgCustomer = {
	position : "right",
	headclass : "message-data  align-right",
	img : prowgServer+"/"+prowgproactive+"/"+proprowgImagePath +"/"+ prowgImage["customer"],
	name : prowgSystem[prowgLanguage]["customer"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message other-message float-right" 
};
var prowgMsgMariload = {
	position : "load",
	headclass : "message-data",
	img : prowgServer+"/"+prowgproactive+"/"+proprowgImagePath +"/"+ prowgImage["mari"],
	name : prowgSystem[prowgLanguage]["mari"],
	headnameclass : "message-data-name",
	timeclass : "message-data-time",
	bodyclass : "message my-message"
};
var protagList = "li",tagDiv = "div",tagImg = "img",tagSpan = "span";
var protimeoutEng  = 4500;
var protimeReadCsv = 500;
var protimeChSelect = 180000;
var proprodIntention = [];
var prowebSystax = ["http://","https://",".co",".com",".th"];
var proewttime = 0;
var protimeSms = 30000;
var prolistproduct = [{id:"TMH",	value:"TrueMoveH"},
	{id:"TVS",	value:"TrueVision"},
	{id:"TOL",	value:"TrueOnline"},
	{id:"CVG",	value:"TrueConvergent"},
	];
var prointernet = true;
var timecheckcookie= 1000;
var promsgpic = "";
var promo = "";
var prosubmitername = "";
var prodefalutproduct = "ALL";
var prodefalutintention = "TELESALES";