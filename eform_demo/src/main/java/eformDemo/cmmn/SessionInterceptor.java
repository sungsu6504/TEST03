package eformDemo.cmmn;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.HandlerInterceptor;

import eformDemo.main.vo.LoginVo;

public class SessionInterceptor implements HandlerInterceptor {
	
	@Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		String reqUri = request.getRequestURI();
		
        LoginVo loginVo = (LoginVo)request.getSession().getAttribute("loginVo");
        
        if(reqUri.equals("/loginMove.do") || reqUri.equals("/login.do"))
        	return true;
        else {
        	if(loginVo == null || loginVo.getLoginId() == null) {
        		response.sendRedirect(request.getContextPath() + "/loginMove.do");
            	return false;
        	}else {
        		return true;
        	}
        }
    }

	//test
}