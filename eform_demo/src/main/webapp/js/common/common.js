/**
 * 메시지에 대치어 적용 후 alert
 */
$.gfn_alert = function(pMsg, pArgs) {
	for(var i in pArgs) {
		pMsg = pMsg.replace(/@/, pArgs[i]);
	}
	
	alert(pMsg);
};

/**
 * table tr row click effect(toggle)
 */
$.gfn_toggle = function() {
	var objTr = $(event.srcElement).closest("tr");

	$(objTr).toggleClass("selected");
	$(objTr).siblings().removeClass("selected");
};

/**
 * table tr row click effect(selected)
 */
$.gfn_select = function() {
	var objTr = $(event.srcElement).closest("tr");

	$(objTr).addClass("selected");
	$(objTr).siblings().removeClass("selected");
};

/**
 * form 내의 객체들이 ajax통신 후 동적으로 생성되었을 때
 * serialize() 메서드로 획득이 안 되는 경우 파라미터 쿼리스트링 생성/리턴
 * @param pFormNm : form name
 */
$.gfn_getFormParams = function(pFormNm) {
	var strParams = "";
	var inputs = $("form[name="+pFormNm+"]").find("input,select").get();
	$.each(inputs, function() {
		strParams += "&" + $(this).attr("name") + "=" + encodeURIComponent($(this).val());
	});
	
	return strParams;
};

/**
 * form 내의 객체들이 ajax통신 후 동적으로 생성되었을 때
 * map에 form내 객체의 값을 id별로 세팅, map 리턴
 * @param pFormNm : form name
 */
$.gfn_getFormParamsId = function(pFormNm) {
	var map = new Map();
	var inputs = $("form[name="+pFormNm+"]").find("input,select").get();
	$.each(inputs, function() {
		map.put( $(this).attr("id"), encodeURIComponent($(this).val()));
	});
	
	return map;
};


/**
 * 세션체크를 무시해야 하는 화면에서
 * 필요한 파라미터가 없는 경우 파라미터 쿼리스트링 리턴
 * @param pStr : 기존 쿼리스트링
 */
$.gfn_rtnSsIgnore = function(pStr) {
	if(-1 == pStr.indexOf("_SS_CHECK_")) {
		if("" == pStr) {
			return pStr + "_SS_CHECK_=N";
		} else {
			return pStr + "&_SS_CHECK_=N";
		}
	} else {
		return pStr;
	}
};

/**
 * ajax request 에 대한 세션 체크 결과 대응
 */
$.gfn_forceLogin = function() {
	hide_loading();
	fn_sessionExpire();
};

/**
 * 화면 상의 버튼 초기화 및 권한에 따른 표현 제어
 * usage : $.gfn_initButton(["btn_search", "btn_save"], ["R", "C"]);
 * @param pObjs : 버튼 객체의 id 보관 Array
 * @param pArgs : 버튼 객체의 권한값(R,C,U,D,P) 보관 Array
 */
$.gfn_initButton = function(pObjs, pArgs) {
	$.each(pObjs, function(idx, obj) {
		$("#"+obj).button().addClass("btn-mini");
		
		if(null == pArgs) return;

		if("C" == pArgs[idx]) {
			if(!g_bCAuthYn) $("#"+obj).hide();
		} else if("U" == pArgs[idx]) {
			if(!g_bUAuthYn) $("#"+obj).hide();
		} else if("D" == pArgs[idx]) {
			if(!g_bDAuthYn) $("#"+obj).hide();
		} else if("P" == pArgs[idx]) {
			if(!g_bPAuthYn) $("#"+obj).hide();
		} else {
		}
	});
	
};

/**
 * 달력 기본 설정
 */
//$.datepicker.setDefaults({
//	dateFormat: "yy-mm-dd",
////	showOn: "button",
////	buttonImage:"/images/calendar.gif",
//	buttonText:'달력',
//	changeMonth: true,
//	changeYear: true,
//	yearRange: '-10:+0',
//	showMonthAfterYear: true,
//	monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
//	dayNamesMin: ['일','월','화','수','목','금','토'],
//	onSelect: function(dateText, obj) {
//		$(obj).val(dateText);
//	}
//});

/* 숫자만 입력되게 체크 */
function chkNumMode(obj) {
	for (var i = 0; i < obj.value.length ; i++){
		
		chr = obj.value.substr(i,1);  
		chr = escape(chr);
		key_eg = chr.charAt(1);
		
		if (key_eg == "u"){
			
		   key_num = chr.substr(i,(chr.length-1));  
		   
		   if((key_num < "AC00") || (key_num > "D7A3")) { 
		    event.returnValue = false;
		   }    
		}
	}
	
	if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) || event.keyCode == 8 || event.keyCode == 9) {
	} else {
		event.returnValue = false;
	}
}

//숫자만 입력받게 (파이어폭스 포함)
//<input type="text" style="ime-mode:disabled;" onKeyPress="return numbersonly(event, false)">
function numbersonly(e, decimal, dateForm) { 
    var key; 
    var keychar; 

    if (window.event) { 
       // IE에서 이벤트를 확인하기 위한 설정 
        key = window.event.keyCode; 
    } else if (e) { 
      // FireFox에서 이벤트를 확인하기 위한 설정 
        key = e.which; 
    } else { 
        return true; 
    } 

    keychar = String.fromCharCode(key); 
    if ((key == null) || (key == 0) || (key == 8) || (key == 9) || (key == 13) 
            || (key == 27)) { 
        return true; 
    } else if ((("0123456789").indexOf(keychar) > -1)) { 
        return true; 
    } else if (decimal && (keychar == ".")) {
        return true; 
    } else if ( dateForm && (keychar == "-")) { 
        return true; 
    } else 
        return false; 
}

/**
 * 숫자만 입력 가능 처리
 * onkeydown이벤트에서 처리
 */
$.gfn_onlyNum = function(pObj) {
	// Allow: backspace, delete, tab, escape, and enter
	if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 || 
        // Allow: Ctrl+A
       (event.keyCode == 65 && event.ctrlKey === true) || 
        // Allow: home, end, left, right
       (event.keyCode >= 35 && event.keyCode <= 39) ) {
            // let it happen, don't do anything
            return;
	}
	
	var vKeyCode = event.keyCode;
	if(event.keyCode >= 96 && event.keyCode <= 105) {
		vKeyCode -= 48;
	}
	
	var regexp = /^[0-9]*$/;
	var curText = String.fromCharCode(vKeyCode);

	if( !regexp.test(curText) ) {
		if(event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
};

/**
 * 입력문자 대문자로 변환
 * onkeypress이벤트에서 처리
 */
$.gfn_toUpperCase = function(pObj) {
	pObj.value = pObj.value.toUpperCase();
};

/**
 * 폼 엘리먼트의 특정 문자를 선택 
 * -> hello beautiful world
 * usage : $(input).selectRange(0,5)
 * result : hello 가 선택됨.
 */
$.fn.selectRange = function(start, end) {
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

/**
* HTML 컨트롤의 ReadOnly에서 BackSpace key 방지
*/
window.document.onkeydown = function() {
    var objEmt = window.event.srcElement;

    if( objEmt.tagName == "INPUT" && event.keyCode == 8 ) {
        if(objEmt.type.toUpperCase() == "TEXT" && objEmt.readOnly) {
           event.returnValue = false;
           return false;
        }
    }
};

/**
 * String prototype function
 */
String.prototype.trimAll = function() {
    return this.replace(/\s/g, "");
};


/**
 * 파일다운로드
 */
$.gfn_download = function(file_nm) {
	
	var method = "post";
	var downExeUrl = "/comm/filedownload.jsp";
	var target = "iframe_file";
	
    if( downExeUrl && file_nm ){ 
    	file_nm = typeof file_nm == 'string' ? file_nm : jQuery.param(file_nm);

    	// 파라미터를 form의  input으로 만든다.
        var inputs ='<input type="hidden" name="FILENAME" value="'+ file_nm +'" />'; 

        // request를 보낸다.
        $('<form name="frm_filedown" target="' + target + '" action="'+ downExeUrl +'" method="'+ (method||'post') +'">'+inputs+'</form>')
        .appendTo('body').submit().remove();

    }
};

$.gfn_chkInit = function(){
	$('input:checkbox[name="CHK"]').each (function(){
		if(this.checked) {
			this.checked = false;
		}
	});
};

//좌우 스크롤
$.gScrollX = function (objId, pObjPid) {
	if(objId == "undefined" || objId == null){
		objId = "titleTbl";
	}
	if(pObjPid == "undefined" || pObjPid == null){
		pObjPid = "dataTbl";
	}
	$("#"+objId).scrollLeft($("#"+pObjPid).scrollLeft());
};


 /*$(function(){
	  $.datepicker.regional['ko'] = {
	  closeText: '닫기',
	  prevText: '이전달',
	  nextText: '다음달',
	  currentText: '오늘',
	  monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
	  '7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
	  monthNamesShort: ['1월','2월','3월','4월','5월','6월',
	  '7월','8월','9월','10월','11월','12월'],
	  dayNames: ['일','월','화','수','목','금','토'],
	  dayNamesShort: ['일','월','화','수','목','금','토'],
	  dayNamesMin: ['일','월','화','수','목','금','토'],
	  weekHeader: 'Wk',
	  dateFormat: 'yy-mm-dd',
	  firstDay: 0,
	  isRTL: false,
	  showMonthAfterYear: true,
	  yearSuffix: ''};
	  $.datepicker.setDefaults($.datepicker.regional['ko']);

//	  $('#datepicker').datepicker({ 
//		   changeMonth: true,
//		   changeYear: true,
//		   showButtonPanel: true
//		  });
//
//	  $('#datepicker').datepicker({ 
//		   changeMonth: true,
//		   changeYear: true,
//		   showButtonPanel: true
//		  });
	 }
 
 );
 */
 /**
  * css class 에 따라 mask 포맷을 정의한다.
  */
 $.gfn_mask = function() {
	    //$("input.dateMask").inputmask("yyyy-mm-dd");
	    
	    //$("input.timeMask").inputmask("hh:mm:ss");
	    
//	    $("input.numberMask").inputmask("decimal",{
//            radixPoint:".", 
//            groupSeparator: ",", 
//            digits: 0,
//            autoGroup: true
//            //prefix: '$'
//        });
	    
//	    $("input.numberNoMaskCenter").inputmask("decimal", {
//	    	rightAlign: false
//	    });
	    
//	    $(".currencyMask").inputmask("decimal",{
//            radixPoint:".", 
//            groupSeparator: ",", 
//            digits: 0,
//            autoGroup: true,
//           prefix: "₩"
//        });
 };
 
 /**
  * css class 에 따라 mask 포맷을 정의한다.
  */
 $.gfn_addRowMask = function(stCls) {

	   // $("."+stCls+" .dateMask").inputmask("yyyy-mm-dd");
	    
	    
	    //$("input.timeMask").inputmask("hh:mm:ss");
	    
//	    $("."+stCls+" .numberMask").inputmask("decimal",{
//            radixPoint:".", 
//            groupSeparator: ",", 
//            digits: 0,
//            autoGroup: true
//            //prefix: '$'
//        });
	    
//	    $("."+stCls+" .numberNoMaskCenter").inputmask("decimal", {
//	    	rightAlign: false
//	    });
	    
//	    $(".currencyMask").inputmask("decimal",{
//            radixPoint:".", 
//            groupSeparator: ",", 
//            digits: 0,
//            autoGroup: true,
//           prefix: "₩"
//        });
 };

 function dateFormat(dt,  fmt) {
	 if(fmt == null || fmt == undefined) return "date format error!";

	 //년,월,일
	 if(dt != null || dt != undefined) {
	  dt = dt.replace(/[\s\-\/]/g, "");
	     if(dt.length >= 8) {
	      fmt = fmt.replace(/yyyy/g, dt.substring(0, 4));
	      fmt = fmt.replace(/MM/g, dt.substring(4, 6));
	      fmt = fmt.replace(/dd/g, dt.substring(6, 8));
	     }else if(dt.length == 6) {
	            fmt = fmt.replace(/yyyy/g, dt.substring(0, 2));
	            fmt = fmt.replace(/MM/g, dt.substring(2, 4));
	            fmt = fmt.replace(/dd/g, dt.substring(4, 6));
	        }
	 }
	 return fmt;
} 

function fnGetCalculateDate(addDays, yyyymmdd){ // addDays : 차감할 일 수, yyyymmdd : 기준일자
    var oneDate = 1000 * 3600 * 24; // 하루
    
    var oToday = new Date(yyyymmdd.substring(0, 4), parseInt(yyyymmdd.substring(4, 6))-1, yyyymmdd.substring(6, 8));
     
    var newDate = new Date(oToday.getTime() + (oneDate * addDays));
    
    var sYear = newDate.getFullYear();
    var sMonth = newDate.getMonth() + 1;
    var sDay = newDate.getDate();
    
    sMonth = "" + sMonth;
    sMonth = (sMonth.length == 1) ? "0"+sMonth : sMonth
    sDay = "" + sDay;
    sDay = (sDay.length == 1) ? "0"+sDay : sDay
    
    return sYear +"" + sMonth + "" + sDay;
}

Date.dayFormat = function (newDate) { 
    return newDate.getFullYear() +"-"+ ((newDate.getMonth() + 1)+"").lpad('0',2)+ "-"+(newDate.getDate()+"").lpad('0',2); 
};

Date.prototype.dayFormat = function () { 
    return Date.dayFormat (this); 
};


Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
   
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    
    var sYear = this.getFullYear();
    var sMonth = this.getMonth() + 1;
    var sDay = this.getDate();
    
    sMonth = "" + sMonth;
    sMonth = (sMonth.length == 1) ? "0"+sMonth : sMonth
    sDay = "" + sDay;
    sDay = (sDay.length == 1) ? "0"+sDay : sDay
    
    return sYear +"" + sMonth + "" + sDay;
};

String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}

function exportExcel(title){

	var tbl = 'tblExport';
	var dt = new Date();
    var year =  dt.getFullYear().toString();
    var month = (dt.getMonth() + 1).toString().lpad("0",2);
    var day =   dt.getDate().toString().lpad("0",2);
    var hour =  dt.getHours().toString().lpad("0",2);
    var mins =  dt.getMinutes().toString().lpad("0",2);

    var postfix = year + month + day +  hour + mins;
    var fileName = title + "_"+ postfix + ".xls";

    var a = document.createElement('a');
    var data_type = 'data:application/vnd.ms-excel';
    var table_div = document.getElementById( tbl );
    var table_html = table_div.outerHTML.replace(/ /g, '%20');

    a.href = data_type + ', ' + table_html;
    a.download = fileName;
    a.click();
}

$.gfn_chkAll = function(obj){
	$('input:checkbox[name="CHK"]').each (function(){				
		if(!this.disabled)	this.checked = obj.checked;	
	});
	
	$('input:checkbox[name="SCOS_CHK"]').each (function(){				
		if(!this.disabled)	this.checked = obj.checked;	
	});
	
	$('input:checkbox[name="BEMS_CHK"]').each (function(){				
		if(!this.disabled)	this.checked = obj.checked;	
	});
}


//숫자형 데이타 포맷 (3자리수마타 ',')
function getNumFormat(num){
    var len, comma, str;  
    var point = "";
    num = num + "";  
    
    var arrPoint = num.split('.');
    num = arrPoint[0];
    if(arrPoint.length>1){
    	point =arrPoint[1]; 
    }
    comma = num.length % 3 ;
    len = num.length;  
   
    str = num.substring(0, comma);  
    while (comma < len) {  
        if (str != "") str += ",";  
        str += num.substring(comma, comma + 3);  
        comma += 3;  
    }  
    if(point.length>0){
    	str = str + "." + point;
    }
    return str; 
}

//전화번호 체크 함수
var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
//01로 시작하는 핸드폰 및 지역번호와 050, 070 검증
//원래 050은 0505 평생번호인가 그런데 보편적으로 050-5xxx-xxxx 로 인식함
//0505-xxx-xxxx 라는 식으로 넣으면 통과할 수 없음. 그래서 경고창 띄울때 예시 넣는것이 좋음.
//-(하이픈)은 넣어도 되고 생략해도 되나 넣을 때에는 정확한 위치에 넣어야 함.

function gfn_checktelno(val) {
if (!regExp.test(val)) {    
     return false
     }
 return true;
}

// Form 초기화.
//$('#editForm').clearForm();
$.fn.clearForm = function() {
    return this.each(function() {
        var type = this.type, tag = this.tagName.toLowerCase();
        if (tag === 'form'){
            return $(':input',this).clearForm();
        }
        if (type === 'text' || type === 'password' || type === 'hidden' || tag === 'textarea'){
            this.value = '';
        }else if (type === 'checkbox' || type === 'radio'){
            this.checked = false;
        }else if (tag === 'select'){
            this.selectedIndex = -1;
        }
    });
};

//Form Data Json String 변환.
//$('#lrmDtlsForm').serializeJSONString()
$.fn.serializeJSONString = function() {
    var jsonObj = {};
    var jsonArr = this.serializeArray();
    $.each(jsonArr, function() {
        if (jsonObj[this.name] != undefined) {
            if (!jsonObj[this.name].push) {
            	jsonObj[this.name] = [jsonObj[this.name]];
            }
            jsonObj[this.name].push(this.value || "");
        } else {
        	jsonObj[this.name] = this.value || "";
        }
    });
    //return jsonObj;
    return JSON.stringify(jsonObj);
};

//Form Data Json Object 변환.
$.fn.serializeJSONObject = function() {
    var jsonObj = {};
    var jsonArr = this.serializeArray();
    $.each(jsonArr, function() {
        if (jsonObj[this.name] != undefined) {
            if (!jsonObj[this.name].push) {
            	jsonObj[this.name] = [jsonObj[this.name]];
            }
            jsonObj[this.name].push(this.value || "");
        } else {
        	jsonObj[this.name] = this.value || "";
        }
    });
    //return jsonObj;
    return jsonObj;
};


//###################### 공통 메시지 관련 함수 #######################
	function alertBox(txt, callbackMethod, jsonData){
	    modal({
	        type: 'alert',
	        title: '알림',
	        text: txt,
	        size: 'small',
	        callback: function(result){
	            if(callbackMethod){
	                callbackMethod(jsonData);
	            }
	        }
	    });
	}
	 
	function alertBoxFocus(txt, obj){
	    modal({
	        type: 'alert',
	        title: '알림',
	        text: txt,
	        size: 'small',
	        callback: function(result){
	            obj.focus();
	        }
	    });
	}
	 
	    
	function confirmBox(txt, callbackMethod, jsonData){
	    modal({
	        type: 'confirm',
	        title: '확인',
	        text: txt,
	        size: 'small',
	        callback: function(result) {
	            if(result){
	                callbackMethod(jsonData);
	            }
	        }
	    });
	}
	 
	function promptBox(txt, callbackMethod, jsonData){
	    modal({
	        type: 'prompt',
	        title: 'Prompt',
	        text: txt,
	        size: 'small',
	        callback: function(result) {
	            if(result){
	                callbackMethod(jsonData);
	            }
	        }
	    });
	}
	 
	function successBox(txt){
	    modal({
	        type: 'success',
	        title: 'Success',
	        text: txt,
	        size: 'small'
	    });
	}
	 
	function warningBox(txt){
	    modal({
	        type: 'warning',
	        title: 'Warning',
	        text: txt,
	        size: 'small',
	        center: false
	    });
	}
	 
	function infoBox(txt){
	    modal({
	        type: 'info',
	        title: 'Info',
	        text: txt,
	        size: 'small',
	        autoclose: true
	    });
	}
	 
	function errorBox(txt){
	    modal({
	        type: 'error',
	        title: 'Error',
	        size: 'small',
	        text: txt
	    });
	}
	 
	function invertedBox(txt){
	    modal({
	        type: 'inverted',
	        title: 'Inverted',
	        text: txt
	    });
	}
	 
	function primaryBox(txt){
	    modal({
	        type: 'primary',
	        title: 'Primary',
	        size: 'small',
	        text: txt
	    });
	}

	/* 로딩 */
	function show_loading() {		
	    //$(".loadingBar").fadeIn();
	}
	function hide_loading() {
	    //$(".loadingBar").fadeOut();
	}
	function gfn_setCookie(cookieName, value, exdays){
	    var exdate = new Date();
	    exdate.setDate(exdate.getDate() + exdays);
	    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
	    document.cookie = cookieName + "=" + cookieValue;
	}
	 
	function gfn_deleteCookie(cookieName){
	    var expireDate = new Date();
	    expireDate.setDate(expireDate.getDate() - 1);
	    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
	}
	function gfn_getCookie(cookieName) {
	    cookieName = cookieName + '=';
	    var cookieData = document.cookie;
	    var start = cookieData.indexOf(cookieName);
	    var cookieValue = '';
	    if(start != -1){
	        start += cookieName.length;
	        var end = cookieData.indexOf(';', start);
	        if(end == -1)end = cookieData.length;
	        cookieValue = cookieData.substring(start, end);
	    }
	    return unescape(cookieValue);
	}
	
	 window.addEventListener("message", receiveMessage, false);

	 function receiveMessage(e)
	{
		if(e.data.gubun == "editSave"){
			
		    //외부에서 editor의 작성완료 버튼 클릭 : editSave
	        editorModule.editSave(saveUEJFcallbackSuccess, saveUEJFcallbackFail);
		
	    }else if(e.data.gubun == "saveUVJF"){

	        //외부에서 viewer의 제출 버튼 클릭 : viewer
			viewerModule.viewerSaveAppcall(saveUVJFcallbackSuccess, saveUVJFcallbackFail);
	    
	    }else if(e.data.gubun == "changeDOC"){

	        //Application에서 전달받은 PDF 파일로 전환한 BASE64
	        var strDoc = e.data.STR_DOC;

	        //외부에서 editor의 문서 변환 함수 호출
	        editorModule.changePdf(strDoc);
	    }else if (e.data.gubun == "saveUEJF Call Back Succes"){
	    	// /popup/contract.jsp에서 작성 완료 버튼 클릭 - userscript.js의 callback에서 postMessage에 의해 동작
	    	// 작성 완료 시
	    	closePopup("pop_openEformPlusCommonPopup");
	    	alertBox('계약서 작성을 완료하였습니다.',fn_getContractInfoList);
	    	
	    }else if (e.data.gubun == "saveUEJF Call Back Fail"){
	    	// /popup/contract.jsp에서 작성 완료 버튼 클릭 - userscript.js의 callback에서 postMessage에 의해 동작
	    	// 작성 실패시
	    	alertBox('계약서 작성을 실패하였습니다.\n잠시 후 다시 시도 해주세요.');
	    	
	    }else if (e.data.gubun == "saveUVJF Call Back Succes"){
	    	// status.jsp 에서 제출 버튼 클릭 - userscript.js의 callback에서 postMessage에 의해 동작
	    	// 작성 실패시
	    	alertBox('계약서 제출 완료하였습니다.', fn_getContractInfoList);
	    	
	    }else if (e.data.gubun == "saveUVJF Call Back Fail"){
	    	// status.jsp 에서 제출 버튼 클릭 - userscript.js의 callback에서 postMessage에 의해 동작
	    	// 작성 실패시
	    	alertBox('계약서 제출 실패하였습니다.\n잠시 후 다시 시도 해주세요.');
	    	
	    }
	}
	