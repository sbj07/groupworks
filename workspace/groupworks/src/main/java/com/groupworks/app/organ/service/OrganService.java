package com.groupworks.app.organ.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.organ.dao.OrganDao;
import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrganService {
	//ㄴㄴ

	private final SqlSessionTemplate sst;
	private final OrganDao dao;
	
	//생성
	public int insert(OrganVo vo) {

		return dao.insert(sst, vo);
	}

	//전체 목록 조회(번호)
	public List<OrganVo> list() {
	
		return dao.list(sst);
	}

	//수정
	public int edit(OrganVo vo) {

		return dao.edit(sst, vo);
	}


	//삭제
	public int delete(OrganVo vo) {

		return dao.delete(sst, vo);
	}
	
	
	
}





