package com.groupworks.app.organ.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class OrganDao {

	private final SqlSessionTemplate sst;

	public List<OrganVo> list(String companyNo) {
		return sst.selectList("OrganMapper.list", companyNo);
	}

}
