<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">
<title>Insert title here</title>
<%-- <title><spring:message code="title.sample" /></title> --%>
<link type="text/css" rel="stylesheet" href="<c:url value='/css/egovframework/sample.css'/>"/>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/fn.common.js"></script>



<script type="text/javaScript">
var RightTechPath = "<c:out value='${pageContext.request.contextPath}' />/js/";
</script>

<script type="text/javascript" src="${pageContext.request.contextPath}/js/QCELL/qcell.js"></script>
<link type="text/css" rel="stylesheet" href="<c:url value='/js/QCELL/css/qcell.css'/>"/>


<script type="text/javaScript">
	function fn_pageMove() {
		var serviceURL =  "${pageContext.request.contextPath}/pageMove.do";
		
		var pObject = new Object();
		pObject.QCELL_ALL_DATA = qcell.getData();
		pObject.QCELL_SELECT_DATA = qcell.getRowData(qcell.getIdx("row"));
		
		funtionModule.comAjax(serviceURL, pObject, fn_test_success);
	}
	
	function fn_test_success(){
		//alert("aa");
		
	}
	
	
	var qcell;
	var combo_data= [ {'label': 'Y', 'value': 'Y'},{'label': 'N', 'value': 'N'} ];
	var sampleData= [{"id":"FOOD-00001","date":"20190410","name":"라면류","description":"라면제품에대한카테고리입니다.","useYn":"Y","regUser":"홍길동"},{"id":"FOOD-00002", "date":"20190410", "name":"주류","description":"주류에대한카테고리입니다.","useYn":"N","regUser":"김길동"},{"id":"FOOD-00003","date":"20190410", "name":"우유류","description":"우유류와유제품에대한카테고리입니다.","useYn":"Y","regUser":"박길동"},{"id":"FOOD-00004", "date":"20190410", "name":"통조림류","description":"캔으로된통조림에대한카테고리입니다.","useYn":"Y","regUser":"최길동"}];
	
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
			, {key: 'date', width: '10%', title: ['등록날짜'], type: "datepicker", styleclassname: {"data": "align-center"}, move: true, options: { format: { type: "date", origin: "YYYYMMDD", rule: "YYYY-MM-DD" }}}
			, {key: "name", width:'20%',title: ['카테고리명'], type: "input", sort: true, styleclassname: {"data": "align-center"}}
			, {key: 'useYn', width: '5%', title: ['사용여부'], type: "input",type:'selectmenu', styleclassname: {"data": "align-center"}, 'options': {'input': combo_data}}
			, {key:"description", width:'40%', title:['설명'], tooltip: true, type: 'textarea', resize: true, styleclassname: {"data": "align-left"}}
			, {key:"regUser", width:'15%', title: ['등록자'], type: "input", sort: true, styleclassname: {"data": "align-center"}}
			]
		}
		QCELL.create(QCELLProp);
		qcell= QCELL.getInstance("qcell");
		qcell.bind('valuechanged', qcellChanged);
	});
	
	function qcellChanged(){
		//alert('값이변경되었습니다.');
	}
	
	
</script>

</head>
<body>
	<input type="button" onclick="javascript:fn_pageMove();" value="화면이동" />
	<div id="sheetarea" style="height: 240px; width: 100%;"></div>
</body>

</html>