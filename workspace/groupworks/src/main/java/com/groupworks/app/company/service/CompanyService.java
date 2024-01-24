package com.groupworks.app.company.service;

import com.groupworks.app.company.dao.CompanyDao;
import com.groupworks.app.company.vo.CompanyVo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {
    private final CompanyDao dao;
    private final SqlSessionTemplate sessionTemplate;
    // 회사 추가
    public String insertCompany(CompanyVo vo){
        return dao.insertCompany(sessionTemplate, vo);
    }

}
