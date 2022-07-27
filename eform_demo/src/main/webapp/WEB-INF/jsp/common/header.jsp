<%@ page contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib prefix="c"      uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"   uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="ui"     uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<!DOCTYPE html>
<html>

<head>
<link rel="short icon" href="<c:url value='/images/favicon.ico'/>">

<!-- jquery -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/jquery-3.6.0.min.js"></script>

<!-- QCELL -->
<script type="text/javaScript"> var RightTechPath = "<c:out value='${pageContext.request.contextPath}' />/js/"; </script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/QCELL/qcell.js"></script>
<link type="text/css" rel="stylesheet" href="<c:url value='/js/QCELL/css/qcell.css'/>"/>

<!-- DEMO Common -->
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/common/fn.common.js"></script>




</head>

</html>