window.qcellpath = '';
window.bUseRightTechJQuery = true;
try{
	if (RightTechPath){
		window.qcellpath = RightTechPath + 'QCELL/';
	}
} catch(e){
	window.qcellpath = './';
}
try{
	if(useRightTechJQuery === true){
		window.bUseRightTechJQuery = true;
	}else {
		window.bUseRightTechJQuery = false;
	}
} catch(e){
	window.bUseRightTechJQuery = true;
}

try{
	if(RightUseEuckr === true){
		window.bUseEuckr = true;
	}else {
		window.bUseEuckr = false;
	}
} catch(e){
	window.bUseEuckr = false;
}


_CheckMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (_CheckMobile.Android() || _CheckMobile.BlackBerry() || _CheckMobile.iOS() || _CheckMobile.Opera() || _CheckMobile.Windows());
		}
	};



this.strScriptHead = '<script src="';
this.strScriptTail = '" type="text/javascript"></script>';
this.strLinkHead = '<link href="';
this.strLinkTail = '" rel="stylesheet" type="text/css">';
this.strScript = '';
this.strCharset = window.bUseEuckr === true ? '-euc-kr' : '';
this.strResource = this.strScriptHead + window.qcellpath + 'lib/resource/resource'+this.strCharset+'.js'+this.strScriptTail;

this.strMobile = _CheckMobile.any() ? this.strScriptHead + window.qcellpath + 'lib/jquery/plugins/'	+ 'jquery.touchSwipe.min.js'	+	this.strScriptTail : '';
this.strScript +=
	
this.strLinkHead + window.qcellpath + 'css/'					+ 'qcell_layout.css'		+	this.strLinkTail +
this.strLinkHead + window.qcellpath + 'css/'					+ 'qcell.css'				+	this.strLinkTail +
this.strLinkHead + window.qcellpath + 'css/'					+ 'qcell_scrollbar.css'				+	this.strLinkTail;

if(window.bUseRightTechJQuery === true)
	this.strScript += this.strScriptHead + window.qcellpath + 'lib/jquery/' 			+ 'jquery-1.12.4.min.js'	+	this.strScriptTail;

this.strScript += this.strLinkHead + window.qcellpath + 'lib/jquery/plugins/jqueryUI/' + 'jquery-ui.css'	+ this.strLinkTail +
this.strLinkHead + window.qcellpath + 'lib/timepicker/' + 'jquery-ui-timepicker-addon.css'	+ this.strLinkTail +
this.strScriptHead + window.qcellpath + 'lib/' 					+ 'qcell_lib.js' 		+	this.strScriptTail +

this.strScriptHead + window.qcellpath + 'lib/xlsx/' + 'shim.js'	+ this.strScriptTail +
this.strScriptHead + window.qcellpath + 'lib/xlsx/' + 'jszip.js'	+ this.strScriptTail +
this.strScriptHead + window.qcellpath + 'lib/xlsx/' + 'FileSaver.js'	+ this.strScriptTail +
this.strScriptHead + window.qcellpath + 'lib/xlsx/' + 'xlsx.js'	+ this.strScriptTail +
this.strScriptHead + window.qcellpath + 'lib/xlsx/' + 'jquery.fileDownload.js'	+ this.strScriptTail +
this.strMobile +

this.strScriptHead + window.qcellpath + 'js/'	+ 'qcell.min.js'	+ this.strScriptTail+
this.strResource;
document.write(this.strScript);
