package com.groupworks.app.notice.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.notice.vo.NoticeVo;

@Repository
public class NoticeDao {
	
	//�ۼ�
	public int insert(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.insert("NoticeMapper.write", vo);
	}

	//��ü ��� ��ȸ(��ȣ)
	public List<NoticeVo> list(SqlSessionTemplate sst) {

		return sst.selectList("NoticeMapper.list");
	}

	//�� ��ȸ(��ȣ)
	public NoticeVo detail(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.selectOne("NoticeMapper.detail", vo);
	}
	
	//����
	public int edit(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.update("NoticeMapper.edit", vo);
	}
	
	//����
	public int delete(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.delete("NoticeMapper.delete", vo);
	}

}//class












