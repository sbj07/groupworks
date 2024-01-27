package com.groupworks.app.notice.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.notice.dao.NoticeDao;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {

	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	private final MemberService memberService;
	
	//작성	
	public int insert(NoticeVo vo) {
		
//		String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
//		vo.setFilePath(str);
//		
//		if(vo.getTitle().length() < 1) {
//			throw new IllegalStateException();
//		}
//		
//		return dao.insert(sst, vo);
		
		
	    if (vo.getFilePath() != null) {
//	        String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "http://127.0.0.1:8888/app");
	    	String str = vo.getFilePath().replace("C:\\dev\\finalPrj\\workspace\\groupworks\\src\\main\\webapp", "");
	        vo.setFilePath(str);
	    }
	    
	    if (vo.getTitle().length() < 1) {
	        throw new IllegalStateException();
	    }
	    
	    return dao.insert(sst, vo);
	}

	//목록 조회
//	public List<NoticeVo> list(String memberNo) {
//
//		return dao.list(sst, memberNo);
//	}

	//	public List<NoticeVo> list(String loginMember) {
//
//		return dao.list(sst, loginMember);
//	}
	
//	//전체 목록 조회(기존)
//	public List<NoticeVo> list() {
//
//		return dao.list(sst);
//	}
	//전체 목록 조회(기존)
	public List<NoticeVo> list() {

		return dao.list(sst);
	}
	
//	페이징 처리(기존)
	public List<NoticeVo> listPaged(PageVo pageVo) {
	    return dao.listPaged(sst, pageVo);
	}
//	전체 갯수 조회(기존)
	public int getListCount() {
	    return dao.getListCount(sst);
	}
	

	//상세조회 + 조회수 증가
	public NoticeVo detail(NoticeVo vo) {

//		int result = dao.increaseHit(sst, vo);
//		if(result != 1) {
//			throw new IllegalStateException();
//		}
		return dao.detail(sst, vo);
	}
	
	//조회수 증가
	public NoticeVo clickNo(NoticeVo vo) {

		int result = dao.increaseHit(sst, vo);
		log.info("{}" + result);
		if(result != 1) {
			throw new IllegalStateException();
		}
		return dao.detail(sst, vo);
	}

	//수정
//	public int edit(NoticeVo vo) {
//		
//		if(vo == null) {
//			throw new IllegalStateException("vo가 없어서 업데이트 불가능");
//		}
////		if(vo.getTitle() != null && vo.getTitle().length() < 1) {
////			throw new IllegalStateException();
////		}
//	    if ((vo.getTitle() == null || vo.getTitle().isEmpty()) && 
//            (vo.getContent() == null || vo.getContent().isEmpty()) && 
//            (vo.getFilePath() == null || vo.getFilePath().isEmpty()) && 
//            (vo.getCategory() == null || vo.getCategory().isEmpty()) &&
//            (vo.getOpenDepart() == null))
//	    {
//        throw new IllegalStateException("수정할 내용이 없습니다.");
//        }
//
//		return dao.edit(sst, vo);
//	}
	//수정(지피티 수정본)
	public int edit(NoticeVo vo) {
	    if (vo == null) {
	        throw new IllegalStateException("수정할 공지사항이 없습니다.");
	    }

	    // 수정할 내용이 없는 경우를 체크하는 로직을 변경합니다.
	    boolean isAnyFieldToUpdate = (vo.getTitle() != null && !vo.getTitle().trim().isEmpty()) ||
                (vo.getContent() != null && !vo.getContent().trim().isEmpty()) ||
                (vo.getFilePath() != null && !vo.getFilePath().trim().isEmpty()) ||
                (vo.getCategory() != null && !vo.getCategory().trim().isEmpty()) ||
                (vo.getOpenDepart() != null && !vo.getOpenDepart().trim().isEmpty());

	    if (!isAnyFieldToUpdate) {
	        throw new IllegalStateException("수정할 내용이 없습니다.");
	    }

	    return dao.edit(sst, vo);
	}

	//삭제
	public int delete(NoticeVo vo) {


		return dao.delete(sst, vo);
	}

}//class

















