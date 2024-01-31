package com.groupworks.app.organ.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.organ.dao.OrganDao;
import com.groupworks.app.organ.vo.OrganVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class OrganService {

	private final SqlSessionTemplate sst;
	private final OrganDao dao;
	
	//생성
	public int insert(OrganVo vo) {
		
		//기존
//		String str = vo.getProfile().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
//		vo.setProfile(str);

	    if (vo.getProfile() != null) {
	        String str = vo.getProfile().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
	        vo.setProfile(str);
	    }
	    
		return dao.insert(sst, vo);
	}

	
	//전체 목록 조회(번호)
	public List<OrganVo> list(String loginMemberNo) {
	
		return dao.list(sst, loginMemberNo);
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
//	public int delete(OrganVo vo) {
//
//		return dao.delete(sst, vo);
//	}

	public int delete(String no) {
	    return dao.delete(sst, no);
	}

	
	
}//class





