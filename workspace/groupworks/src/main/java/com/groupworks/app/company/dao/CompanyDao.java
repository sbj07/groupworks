package com.groupworks.app.company.dao;

import com.groupworks.app.company.vo.CompanyVo;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class CompanyDao {
    // 회사 추가
    public int insertCompany(SqlSessionTemplate sessionTemplate, CompanyVo vo){
        log.info("vo : {}",vo);
        return sessionTemplate.insert("CompanyMapper.insertCompany", vo);
    }

}
