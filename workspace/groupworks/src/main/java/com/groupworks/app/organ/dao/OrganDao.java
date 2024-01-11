package com.groupworks.app.organ.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.organ.vo.OrganVo;

@Repository
public class OrganDao {

	//생성
	public int insert(SqlSessionTemplate sst, OrganVo vo) {

		return sst.insert("OrganMapper.insert", vo);
	}

	//전체 목록 조회(번호)
	public List<OrganVo> list(SqlSessionTemplate sst) {
		
		return sst.selectList("OrganMapper.list");
	
	}

	
	//상세 조회
	public OrganVo detail(SqlSessionTemplate sst, OrganVo vo) {

		return sst.selectOne("OrganMapper.detail", vo);
	}
	
	
	//수정
	public int edit(SqlSessionTemplate sst, OrganVo vo) {

		return sst.update("OrganMapper.edit", vo);
	}

	
	//삭제
	public int delete(SqlSessionTemplate sst, OrganVo vo) {

		return sst.delete("OrganMapper.delete", vo);
	}


}//class

















