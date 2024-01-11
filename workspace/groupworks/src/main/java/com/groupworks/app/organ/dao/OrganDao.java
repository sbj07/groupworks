package com.groupworks.app.organ.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.organ.vo.OrganVo;

@Repository
public class OrganDao {

	//����
	public int insert(SqlSessionTemplate sst, OrganVo vo) {

		return sst.insert("OrganMapper.insert", vo);
	}

	//��ü ��� ��ȸ(��ȣ)
	public List<OrganVo> list(SqlSessionTemplate sst) {
		
		return sst.selectList("OrganMapper.list");
	
	}

	
	//�� ��ȸ
	public OrganVo detail(SqlSessionTemplate sst, OrganVo vo) {

		return sst.selectOne("OrganMapper.detail", vo);
	}
	
	
	//����
	public int edit(SqlSessionTemplate sst, OrganVo vo) {

		return sst.update("OrganMapper.edit", vo);
	}

	
	//����
	public int delete(SqlSessionTemplate sst, OrganVo vo) {

		return sst.delete("OrganMapper.delete", vo);
	}


}//class

















