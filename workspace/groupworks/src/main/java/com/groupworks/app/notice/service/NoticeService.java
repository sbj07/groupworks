package com.groupworks.app.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.notice.dao.NoticeDao;
import com.groupworks.app.notice.vo.NoticeVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NoticeService {
	//����

	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	
	//�ۼ�
	public int insert(NoticeVo vo) {
		
		return dao.insert(sst, vo);
	}

	//��ü ��� ��ȸ
	public List<NoticeVo> list() {

		return dao.list(sst);
	}

	//�� ��ȸ
	public NoticeVo detail(NoticeVo vo) {

		return dao.detail(sst, vo);
	}

	//����
	public int edit(NoticeVo vo) {

		return dao.edit(sst, vo);
	}

	//����
	public int delete(NoticeVo vo) {

		return dao.delete(sst, vo);
	}

	
	
	//����

}//class


















