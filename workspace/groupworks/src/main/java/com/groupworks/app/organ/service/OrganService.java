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

	private final SqlSessionTemplate sst;
	private final OrganDao dao;
	
	//����
	public int insert(OrganVo vo) {
		
//		String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
//		vo.setFilePath(str);

		return dao.insert(sst, vo);
	}

	
	//��ü ��� ��ȸ(��ȣ)
	public List<OrganVo> list() {
	
		return dao.list(sst);
	}

	
	//�� ��ȸ
	public OrganVo detail(OrganVo vo) {

		return dao.detail(sst, vo);
	}
	
	
	//����
	public int edit(OrganVo vo) {
		
		if(vo == null) {
			throw new IllegalStateException("vo�� ��� ������Ʈ �Ұ���");
		}

		return dao.edit(sst, vo);
	}


	//����
	public int delete(OrganVo vo) {

		return dao.delete(sst, vo);
	}

	
	
	
}//class





