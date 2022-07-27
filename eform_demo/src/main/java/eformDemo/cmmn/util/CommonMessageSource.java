package eformDemo.cmmn.util;

import java.util.Locale;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.MessageSource;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.dao.*;
import org.springframework.jdbc.*;

public class CommonMessageSource extends ReloadableResourceBundleMessageSource implements MessageSource {
	private Logger log = LogManager.getLogger(this.getClass());
	
    private ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource;

    /**
     * getReloadableResourceBundleMessageSource()
     * 
     * @param reloadableResourceBundleMessageSource - resource MessageSource
     * @return ReloadableResourceBundleMessageSource
     */
    public void setReloadableResourceBundleMessageSource(ReloadableResourceBundleMessageSource reloadableResourceBundleMessageSource) {
    	this.reloadableResourceBundleMessageSource = reloadableResourceBundleMessageSource;
    }

    /**
     * getReloadableResourceBundleMessageSource()
     * 
     * @return ReloadableResourceBundleMessageSource
     */
    public ReloadableResourceBundleMessageSource getReloadableResourceBundleMessageSource() {
    	return reloadableResourceBundleMessageSource;
    }

    /**
     * 정의된 메세지 조회
     * 
     * @param code - 메세지 코드
     * @return String
     */
    public String getMessage(String code) {
    	return getReloadableResourceBundleMessageSource().getMessage(code, null, Locale.getDefault());
    }
    

    /**
     * 정의된 추가 메세지 조회
     * 
     * @param code - 메세지 코드
     * @return String
     */
    public String getMessage(String code, String arg) {
		String[] args = new String[1];
		args[0] =  arg;
		return getReloadableResourceBundleMessageSource().getMessage(code, args, Locale.getDefault());
    }
    
    /**
     * 정의된 추가 메세지 조회
     * 
     * @param code - 메세지 코드
     * @return String
     */
    public String getMessage(String code, String[] args) {
    	return getReloadableResourceBundleMessageSource().getMessage(code, args, Locale.getDefault());
    }

    /**
     * 정의된 Exception 메세지 조회
     * 
     * @param code - 메세지 코드
     * @return String
     */
    public String getExceptionMessage(Exception e) {
    	
    	log.debug("Validation = " + e.getMessage());
    	
	    if (e instanceof com.ibatis.sqlmap.client.SqlMapException) {
	    	return this.getMessage("SqlMapException")+"\n\n"+e.getMessage();
	    } else {
	    	return e.getMessage();
	    }   
    }
    
    /**
     * 정의된 DataAccessException 메세지 조회
     * 
     * @param code - 메세지 코드
     * @return String
     */
    public String getDataAccessExceptionMessage(org.springframework.dao.DataAccessException e) {
    	System.out.println("getDataAccessExceptionMessage==========================type===========================" + e.getClass().getName());
    	
	    if (e instanceof UncategorizedSQLException) {
	    	return this.getMessage("UncategorizedSQLException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof BadSqlGrammarException) {
	    	return this.getMessage("BadSqlGrammarException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof DataIntegrityViolationException) {
	    	return this.getMessage("DataIntegrityViolationException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof DataAccessResourceFailureException) {
	    	return this.getMessage("DataAccessResourceFailureException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof TypeMismatchDataAccessException) {
	    	return this.getMessage("TypeMismatchDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof CannotAcquireLockException) {
	    	return this.getMessage("CannotAcquireLockException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof CannotSerializeTransactionException) {
	    	return this.getMessage("CannotSerializeTransactionException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof CleanupFailureDataAccessException) {
	    	return this.getMessage("CleanupFailureDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof ConcurrencyFailureException) {
	    	return this.getMessage("ConcurrencyFailureException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof DataRetrievalFailureException) {
	    	return this.getMessage("DataRetrievalFailureException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof DeadlockLoserDataAccessException) {
	    	return this.getMessage("DeadlockLoserDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof EmptyResultDataAccessException) {
	    	return this.getMessage("EmptyResultDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof IncorrectResultSizeDataAccessException) {
	    	return this.getMessage("IncorrectResultSizeDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof IncorrectUpdateSemanticsDataAccessException) {
	    	return this.getMessage("IncorrectUpdateSemanticsDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof InvalidDataAccessApiUsageException) {
	    	return this.getMessage("InvalidDataAccessApiUsageException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof InvalidDataAccessResourceUsageException) {
	    	return this.getMessage("InvalidDataAccessResourceUsageException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof PermissionDeniedDataAccessException) {
	    	return this.getMessage("PermissionDeniedDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof PessimisticLockingFailureException) {
	    	return this.getMessage("PessimisticLockingFailureException")+"\n\n"+e.getMessage();
	    	
	    } else if (e instanceof UncategorizedDataAccessException) {
	    	return this.getMessage("UncategorizedDataAccessException")+"\n\n"+e.getMessage();
	    	
	    } else {
	    	return e.getMessage();
	    }
    }
}
