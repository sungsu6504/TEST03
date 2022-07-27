package eformDemo.main.vo;

import java.io.Serializable;


public class LoginVo implements Serializable {
	
	private static final long serialVersionUID = 2022051600000000001L;
	 
	private String loginId; //로그인 아이디		
	
	public String getLoginId() {
		return loginId;
	}
	public void setLoginId(String loginId) {
		this.loginId = loginId;
	}
	
}
