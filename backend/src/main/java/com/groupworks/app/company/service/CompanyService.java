package com.groupworks.app.company.service;

import com.groupworks.app.common.validation.Check;

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
        Check.requiredMax(vo == null ? null : vo.getName(), 50, "회사명");
        return dao.insertCompany(sessionTemplate, vo);
    }

}
