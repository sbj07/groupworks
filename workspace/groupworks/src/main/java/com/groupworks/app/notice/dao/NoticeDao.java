package com.groupworks.app.notice.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.notice.vo.NoticeVo;

@Repository
public class NoticeDao {
	
	//작성
	public int insert(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.insert("NoticeMapper.write", vo);
	}

	//전체 목록 조회(번호)
	public List<NoticeVo> list(SqlSessionTemplate sst) {

		return sst.selectList("NoticeMapper.list");
	}

	//상세 조회(번호)
	public NoticeVo detail(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.selectOne("NoticeMapper.detail", vo);
	}
	
	//수정
	public int edit(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.update("NoticeMapper.edit", vo);
	}
	
	//삭제
	public int delete(SqlSessionTemplate sst, NoticeVo vo) {

		return sst.delete("NoticeMapper.delete", vo);
	}

}//class












