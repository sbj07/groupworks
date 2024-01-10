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
	
	//생성
	public int insert(OrganVo vo) {
		
//		String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
//		vo.setFilePath(str);

		return dao.insert(sst, vo);
	}

	
	//전체 목록 조회(번호)
	public List<OrganVo> list() {
	
		return dao.list(sst);
	}

	
	//상세 조회
	public OrganVo detail(OrganVo vo) {

		return dao.detail(sst, vo);
	}
	
	
	//수정
	public int edit(OrganVo vo) {
		
		if(vo == null) {
			throw new IllegalStateException("vo가 없어서 업데이트 불가능");
		}

		return dao.edit(sst, vo);
	}


	//삭제
	public int delete(OrganVo vo) {

		return dao.delete(sst, vo);
	}

	
	
	
}//class





