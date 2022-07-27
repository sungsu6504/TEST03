<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<jsp:include page="./header.jsp"></jsp:include>

<head>
<meta charset="UTF-8">
<title>로그인</title>

<script type="text/javascript">

function fn_login () {
	var serviceURL =  "${pageContext.request.contextPath}/login.do";
	
	var pObject = new Object();
	pObject.USER_ID = $("#USER_ID").val();
	pObject.USER_PW = $("#USER_PW").val();
	
	funtionModule.comAjax("fn_login", serviceURL, pObject, fn_service_callback);
}

function fn_service_callback(_service, _status, _result) {
	if(_service == "fn_login") {
		if(_status == "success") {
			$(location).attr('href', '${pageContext.request.contextPath}/main.do');
		}else if(_status == "error") {
			
		}
	}
}
</script>

</head>
<body>
	<input type="text" name="USER_ID" id="USER_ID" required="required" value="admin" onkeypress="if(event.keyCode==13) {fn_login();}">
	<input type="password" id="USER_PW" name="USER_PW"  required="required" value="1234" onkeypress="if(event.keyCode==13) {fn_login();}">
	<input type="button" value="Login" onclick="javascript:fn_login ();"/>
</body>

</html>