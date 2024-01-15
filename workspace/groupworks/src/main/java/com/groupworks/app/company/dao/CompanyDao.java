package com.groupworks.app.company.dao;

import com.groupworks.app.company.vo.CompanyVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CompanyDao {
    // 회사 추가
    public int insertCompany(SqlSessionTemplate sessionTemplate, CompanyVo vo){
        return sessionTemplate.insert("CompanyMapper.insertCompany", vo);
    }

}
