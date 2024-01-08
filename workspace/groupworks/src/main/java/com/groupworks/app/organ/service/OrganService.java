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
	//����

	private final SqlSessionTemplate sst;
	private final OrganDao dao;
	
	//����
	public int insert(OrganVo vo) {

		return dao.insert(sst, vo);
	}

	//��ü ��� ��ȸ(��ȣ)
	public List<OrganVo> list() {
	
		return dao.list(sst);
	}

	//����
	public int edit(OrganVo vo) {

		return dao.edit(sst, vo);
	}


	//����
	public int delete(OrganVo vo) {

		return dao.delete(sst, vo);
	}
	
	
	
}





