package eformDemo.cmmn.dataaccess;

import java.util.ArrayList;

import org.egovframe.rte.psl.dataaccess.EgovAbstractMapper;
import org.egovframe.rte.psl.dataaccess.mapper.Mapper;

/**
 * sample에 관한 데이터처리 매퍼 클래스
 *
 * @author  
 * @since 2022.04.19
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *          수정일          수정자           수정내용
 *  ----------------    ------------    ---------------------------
 *   2022.04.19        지원팀
 *
 * </pre>
 */
@Mapper("commonMapper")
public class CommonMapper extends EgovAbstractMapper {
	
	@Override
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ArrayList selectList(String queryId, Object parameterObject) {
		return (ArrayList) super.selectList(queryId, parameterObject);
	}
	
	@Override
	public int update(String queryId, Object parameterObject) {
		return super.update(queryId, parameterObject);
	}
	
	@Override
	public int delete(String queryId, Object parameterObject) {
		return super.delete(queryId, parameterObject);
	}

}
