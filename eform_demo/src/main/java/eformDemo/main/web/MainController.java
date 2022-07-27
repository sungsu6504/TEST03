package eformDemo.main.web;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.egovframe.rte.fdl.cmmn.exception.EgovBizException;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springmodules.validation.commons.DefaultBeanValidator;

import eformDemo.cmmn.util.CommonMessageSource;
import eformDemo.main.service.MainService;
import eformDemo.main.vo.LoginVo;

/**
 * @Class Name : MainController.java
 * @Description : Main Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2022.04.12           최초생성
 *
 * @author 지원팀
 * @since 
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class MainController {
	private Logger log = LogManager.getLogger(this.getClass());
	
	/** EgovSampleService */
	@Resource(name = "mainService")
	private MainService mainService;

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;
	
	@Resource(name="commonMessageSource")
    CommonMessageSource commonMessageSource;
	
	/**
	 * 로그인 페이지 이동
	 */
	@ResponseBody
	@RequestMapping(value = "/loginMove.do")
	public ModelAndView loginMove() throws Exception {
		log.debug("*************** /loginMove.do START ***************");
		
		ModelAndView mnv = new ModelAndView("common/login");
				
		return mnv;
	}
	
	/**
	 * 로그인
	 */
	@ResponseBody	
	@RequestMapping(value = "/login.do")
	public ModelAndView login(HttpServletRequest request, @RequestBody HashMap<String, Object> requestMap) throws Exception {
		log.debug("*************** /login.do START ***************");
		
		ModelAndView mnv = new ModelAndView("jsonView");
		
		log.debug("USER_ID = "+requestMap.get("USER_ID"));
		log.debug("USER_PW = "+requestMap.get("USER_PW"));
		
		HttpSession session = request.getSession();
		
		LoginVo loginVo = new LoginVo();
		loginVo.setLoginId((String) requestMap.get("USER_ID"));
		
		session.setAttribute("loginVo", loginVo);	
		
		return mnv;
	}
	
	/**
	 * main
	 */
	@RequestMapping(value = "/main.do")
	public ModelAndView main() throws Exception {
		log.debug("*************** /main.do START ***************");
		
		ModelAndView mnv = new ModelAndView("common/main");
		
		return mnv;
	}
	
	/**
	 * Exception custom message
	 */
	@ResponseBody	
	@RequestMapping(value = "/validation.do")
	public ModelAndView validation(@RequestBody HashMap<String, Object> requestMap) throws Exception {
		log.debug("*************** /validation.do START ***************");
		
		ModelAndView mnv = new ModelAndView("jsonView");
		
		try {
			throw new EgovBizException("test Exception.");
		} catch (EgovBizException e) {
			mnv.addObject("ResultCode"	, "Validation");
			mnv.addObject("ResultMsg"	, commonMessageSource.getExceptionMessage(e));
		}
		
		return mnv;
	}
	
	/**
	 * Data Service
	 */
	@ResponseBody	
	@RequestMapping(value = "/sampleSelect.do")
	public ModelAndView sampleSelect(@RequestBody HashMap<String, Object> requestMap) throws Exception {
		log.debug("*************** /sampleSelect.do START ***************");
		
		ModelAndView mnv = new ModelAndView("jsonView");
		
		HashMap<String, Object> hm1 = new HashMap<String, Object>();
		
		
		try {
			hm1 = mainService.sampleSelect(requestMap);
			
			mnv.addObject("resultMap" ,hm1);
		} catch (EgovBizException e) {
			mnv.addObject("ResultCode"	, "Validation");
			mnv.addObject("ResultMsg"	, commonMessageSource.getExceptionMessage(e));
		}
		
		return mnv;
	}
	
	

}
