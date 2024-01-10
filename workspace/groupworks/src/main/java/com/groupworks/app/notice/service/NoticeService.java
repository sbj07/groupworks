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

	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	
	//�ۼ�	
	public int insert(NoticeVo vo) {
		
//		String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
//		vo.setFilePath(str);
		
		if(vo.getTitle().length() < 1) {
			throw new IllegalStateException();
		}
		
		return dao.insert(sst, vo);
	}

	//��ü ��� ��ȸ
	public List<NoticeVo> list() {

		return dao.list(sst);
	}

	//�� ��ȸ(+��ȸ�� ����)
	public NoticeVo detail(NoticeVo vo) {

		int result = dao.increaseHit(sst, vo);
		if(result != 1) {
			throw new IllegalStateException();
		}
		return dao.detail(sst, vo);
	}

	//����
	public int edit(NoticeVo vo) {
		
		if(vo == null) {
			throw new IllegalStateException("vo�� ��� ������Ʈ �Ұ���");
		}
		if(vo.getTitle() != null && vo.getTitle().length() < 1) {
			throw new IllegalStateException();
		}

		return dao.edit(sst, vo);
	}

	//����
	public int delete(NoticeVo vo) {

		return dao.delete(sst, vo);
	}

}//class


















