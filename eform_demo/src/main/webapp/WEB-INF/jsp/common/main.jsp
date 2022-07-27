<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<jsp:include page="./header.jsp"></jsp:include>

<head>
<meta charset="UTF-8">
<title>메인</title>

<script type="text/javascript">
/* ******************** QCELL START ********************  */
var qcell;
var combo_data= [ {'label': 'Y', 'value': 'Y'},{'label': 'N', 'value': 'N'} ];
var sampleData= [{"id":"FOOD-00001","date":"20190410","name":"라면류","description":"라면제품에대한카테고리입니다.","useYn":"Y","regUser":"홍길동"},{"id":"FOOD-00002", "date":"20190410", "name":"주류","description":"주류에대한카테고리입니다.","useYn":"N","regUser":"김길동"},{"id":"FOOD-00003","date":"20190410", "name":"우유류","description":"우유류와유제품에대한카테고리입니다.","useYn":"Y","regUser":"박길동"},{"id":"FOOD-00004", "date":"20190410", "name":"통조림류","description":"캔으로된통조림에대한카테고리입니다.","useYn":"Y","regUser":"최길동"}];

var qcell2;
var qcell3;

$(document).ready(function(){
	var QCELLProp= {
		id: 'qcell',
		parentid: 'sheetarea',
		statetype: 'later',
		rowheight: {'header': 30,'data' : 25},
		data: {'input': sampleData},
		copy: true,
		paste: true,
		rowheader: 'checkbox',
		selectmode: 'row',
		highlightrepeat: 2,
		frozencols: 1,
		frozenrows: 0,
		frozenbottomrows: 0,
		columns: [
		  {key: 'id', width: '10%', title: ['카테고리ID'], type: "input", styleclassname: {"data": "align-center"}, move: true, sort: true}
		 ,{key: 'date', width: '10%', title: ['등록날짜'], type: "datepicker", styleclassname: {"data": "align-center"}, move: true, options: { format: { type: "date", origin: "YYYYMMDD", rule: "YYYY-MM-DD" }}}
		 ,{key: "name", width:'20%',title: ['카테고리명'], type: "input", sort: true, styleclassname: {"data": "align-center"}}
		 ,{key: 'useYn', width: '5%', title: ['사용여부'], type: "input",type:'selectmenu', styleclassname: {"data": "align-center"}, 'options': {'input': combo_data}}
		 ,{key:"description", width:'40%', title:['설명'], tooltip: true, type: 'textarea', resize: true, styleclassname: {"data": "align-left"}}
		 ,{key:"regUser", width:'15%', title: ['등록자'], type: "input", sort: true, styleclassname: {"data": "align-center"}}
		]
	}
	QCELL.create(QCELLProp);
	qcell= QCELL.getInstance("qcell");
	
	var QCELLProp2= {
			id: 'qcell2',
			parentid: 'sheetarea2',
			statetype: 'later',
			rowheight: {'header': 30,'data' : 25},
			data: {'input': sampleData},
			copy: true,
			paste: true,
			rowheader: 'checkbox',
			selectmode: 'row',
			highlightrepeat: 2,
			frozencols: 1,
			frozenrows: 0,
			frozenbottomrows: 0,
			columns: [
			  {key: 'TEST1'   ,width: '10%' ,title: ['카테고리ID'], type: "input", styleclassname: {"data": "align-center"}, move: true, sort: true}
			 ,{key: "TEST2"   ,width:'20%'  ,title: ['카테고리명'], type: "input", sort: true, styleclassname: {"data": "align-center"}}
			]
		}
		QCELL.create(QCELLProp2);
		qcell2= QCELL.getInstance("qcell2");
		
		var QCELLProp3= {
			id: 'qcell3',
			parentid: 'sheetarea3',
			statetype: 'later',
			rowheight: {'header': 30,'data' : 25},
			data: {'input': sampleData},
			copy: true,
			paste: true,
			rowheader: 'checkbox',
			selectmode: 'row',
			highlightrepeat: 2,
			frozencols: 1,
			frozenrows: 0,
			frozenbottomrows: 0,
			columns: [
			  {key: 'TEST1'   ,width: '10%' ,title: ['카테고리ID'], type: "input", styleclassname: {"data": "align-center"}, move: true, sort: true}
			 ,{key: "TEST2"   ,width:'20%'  ,title: ['카테고리명'], type: "input", sort: true, styleclassname: {"data": "align-center"}}
			]
		}
		QCELL.create(QCELLProp3);
		qcell3= QCELL.getInstance("qcell3");
		
});
/* ******************** QCELL END ******************** */

// JAVA Validation
function fn_validationSample () {
	var serviceURL =  "${pageContext.request.contextPath}/validation.do";
	
	var pObject = new Object();
	
	funtionModule.comAjax("fn_validationSample", serviceURL, pObject, fn_service_callback);
}

function fn_sampleSelect () {
	var serviceURL =  "${pageContext.request.contextPath}/sampleSelect.do";
	
	var pObject = new Object();
	pObject.QCELL_ALL_DATA = qcell.getData();
	pObject.QCELL_SELECT_DATA = qcell.getRowData(qcell.getIdx("row"));
	
	funtionModule.comAjax("fn_sampleSelect", serviceURL, pObject, fn_service_callback);
}

function fn_service_callback(_service, _status, _result) {
	// _status : success , error
	if(_service == "fn_validationSample") {
		if(_status == "success") {
			alert("fn_validationSample = " + _status);
		}
	}
	if(_service == "fn_sampleSelect") {
		debugger
		if(_status == "success") {
			qcell2.setData(_result.resultMap.sampleList);
		}
	}
}
</script>

</head>
<body>
	<input type="button" value="java validation test" onclick="javascript:fn_validationSample();"/>
	<input type="button" value="qCell select" onclick="javascript:fn_sampleSelect ();"/>
	<div id="sheetarea" style="height: 240px; width: 100%;"></div>
	<div id="sheetarea2" style="height: 240px; width: 100%;"></div>
	<div id="sheetarea3" style="height: 240px; width: 100%;"></div>
</body>

</html>