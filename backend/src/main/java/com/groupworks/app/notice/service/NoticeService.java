package com.groupworks.app.notice.service;

import java.util.List;
import java.util.Objects;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.common.exception.BusinessException;
import com.groupworks.app.common.validation.Check;
import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.DepartVo;
import com.groupworks.app.notice.dao.NoticeDao;
import com.groupworks.app.notice.vo.CategoryVo;
import com.groupworks.app.notice.vo.NoticeSearchVo;
import com.groupworks.app.notice.vo.NoticeVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.security.CurrentUser;
import com.groupworks.app.security.LoginUser;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoticeService {

	private final NoticeDao dao;
	private final SqlSessionTemplate sst;
	private final MemberService memberService;

	private void validate(NoticeVo vo) {
		Check.requiredMax(vo.getTitle(), 100, "제목");
		Check.requiredMax(vo.getContent(), 4000, "내용");
		Check.required(vo.getCategory(), "카테고리");
		Check.required(vo.getOpenDepart(), "공개 부서");
		if (!Check.isBlank(vo.getEmergencyYn())) {
			Check.that(vo.getEmergencyYn().equals("Y") || vo.getEmergencyYn().equals("N"), "긴급 여부 값이 올바르지 않습니다.");
		}
	}

	//작성 (작성자는 로그인한 사람)
	public int insert(NoticeVo vo) {
		vo.setMemberNo(CurrentUser.memberNo());
		validate(vo);
	    return dao.insert(sst, vo);
	}

	//카테고리 가져오는 메소드
	public List<CategoryVo> getCategoryList() {
	    return dao.getCategoryList(sst);
	}

	//부서 가져오는 메소드
	public List<DepartVo> getDepartList() {
	    return dao.getDepartList(sst);
	}

	// 조회조건 + 페이징 목록 (로그인한 회사 공지만)
	public List<NoticeVo> listPaged(PageVo pageVo, NoticeSearchVo search) {
		search.setLoginMemberNo(CurrentUser.memberNo());
	    return dao.listPaged(sst, pageVo, search);
	}

	// 조회조건에 맞는 전체 갯수
	public int getListCount(NoticeSearchVo search) {
		search.setLoginMemberNo(CurrentUser.memberNo());
	    return dao.getListCount(sst, search);
	}

	// 같은 회사 공지인지 확인하고 가져온다
	private NoticeVo findAccessible(String noticeNo) {
		Check.required(noticeNo, "공지사항 번호");
		NoticeVo key = new NoticeVo();
		key.setNoticeNo(noticeNo);
		NoticeVo notice = dao.detail(sst, key);
		if (notice == null) {
			throw BusinessException.notFound("공지사항을 찾을 수 없습니다.");
		}
		memberService.requireSameCompanyMember(notice.getMemberNo());
		return notice;
	}

	//상세조회
	public NoticeVo detail(NoticeVo vo) {
		return findAccessible(vo.getNoticeNo());
	}

	//조회수 증가
	public NoticeVo clickNo(NoticeVo vo) {
		findAccessible(vo.getNoticeNo());
		dao.increaseHit(sst, vo);
		return dao.detail(sst, vo);
	}

	//수정 (작성자만)
	public int edit(NoticeVo vo) {
		NoticeVo origin = findAccessible(vo.getNoticeNo());
		if (!Objects.equals(origin.getMemberNo(), CurrentUser.memberNo())) {
			throw BusinessException.forbidden("작성자만 수정할 수 있습니다.");
		}
		validate(vo);
		int result = dao.edit(sst, vo);
		Check.affected(result, "수정할 공지사항을 찾을 수 없습니다.");
		return result;
	}

	//삭제 (작성자 또는 관리자)
	public int delete(NoticeVo vo) {
		NoticeVo origin = findAccessible(vo.getNoticeNo());
		LoginUser user = CurrentUser.get();
		if (!Objects.equals(origin.getMemberNo(), user.memberNo()) && !user.isAdmin()) {
			throw BusinessException.forbidden("작성자나 관리자만 삭제할 수 있습니다.");
		}
		int result = dao.delete(sst, vo);
		Check.affected(result, "삭제할 공지사항을 찾을 수 없습니다.");
		return result;
	}

}//class
