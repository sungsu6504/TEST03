package eformDemo.main.service;

import java.util.ArrayList;
import java.util.HashMap;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.cmmn.exception.EgovBizException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import eformDemo.cmmn.dataaccess.CommonMapper;

/**
 * @Class Name : MainService.java
 * @Description : Main Service Class
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

@Service("mainService")
public class MainServiceImpl extends EgovAbstractServiceImpl implements MainService {

	private static final Logger log = LoggerFactory.getLogger(MainServiceImpl.class);

	// TODO mybatis 사용
	@Resource(name="commonMapper")
	private CommonMapper commonMapper;
	
	/**
     * sampleSelect
     */
	@SuppressWarnings({ "rawtypes" })
	public HashMap<String, Object> sampleSelect(HashMap<String, Object> hMap) throws Exception {
		log.debug("===== 로그 sample =====");
		HashMap<String, Object> returnMap = new HashMap<String, Object>();    	
				
		ArrayList listDS  = null; 
		
		HashMap paramMap = new HashMap();    	
		paramMap = (HashMap) hMap.get("QCELL_SELECT_DATA");
		
    	try {
    		// 저장
    		commonMapper.insert("main.insertSample", paramMap);
    		
    		// 조회
    		listDS = commonMapper.selectList("main.selectSample", paramMap);
    		returnMap.put("sampleList", listDS);
    		
    		if(paramMap.get("id").equals("FOOD-00004"))
    			throw new EgovBizException("FOOD-00004 는 선택할 수 없습니다.");
    		
    	} catch (Exception e) {
    		log.debug(e.toString());
    		throw e;
    	}
    	
		return returnMap;
	}
	

}
