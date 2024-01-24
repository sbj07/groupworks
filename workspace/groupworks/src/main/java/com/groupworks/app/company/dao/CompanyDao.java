package com.groupworks.app.company.dao;

import com.groupworks.app.company.vo.CompanyVo;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class CompanyDao {
    // 회사 추가
    public String insertCompany(SqlSessionTemplate sessionTemplate, CompanyVo vo){
        sessionTemplate.insert("CompanyMapper.insertCompany", vo);
        return vo.getNo();
    }

}
