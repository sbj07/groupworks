package com.groupworks.app.book.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.book.dao.BookDao;
import com.groupworks.app.book.vo.BookVo;
import com.groupworks.app.common.exception.BusinessException;
import com.groupworks.app.common.validation.Check;
import com.groupworks.app.security.CurrentUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

	private static final DateTimeFormatter DATE_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

	private final BookDao dao;
	private final SqlSessionTemplate sst;

	// 입력 검사 + 날짜 형식 맞추기 + 같은 장소 시간 중복 확인
	private void validate(BookVo vo) {
		Check.requiredMax(vo.getBookPlace(), 50, "장소");
		Check.requiredMax(vo.getBookPurpose(), 200, "사용 목적");
		LocalDateTime start = Check.dateTime(vo.getStartDate(), "시작 일시");
		LocalDateTime end = Check.dateTime(vo.getEndDate(), "종료 일시");
		Check.dateTimeOrder(start, end);
		Check.that(start.toLocalDate().equals(end.toLocalDate()) || end.isBefore(start.plusDays(1)),
				"예약은 하루 이내로만 할 수 있습니다.");
		vo.setStartDate(start.format(DATE_TIME));
		vo.setEndDate(end.format(DATE_TIME));
		if (dao.countOverlap(sst, CurrentUser.companyNo(), vo) > 0) {
			throw new BusinessException("같은 장소에 이미 예약된 시간입니다. 다른 시간을 선택해주세요.");
		}
	}

	//예약 (예약자는 로그인한 사람)
	public int insert(BookVo vo) {
		vo.setMemberNo(CurrentUser.memberNo());
		vo.setBookNo(null);
		validate(vo);
		return dao.insert(sst, vo);
	}

	// 조회조건은 모두 선택 사항이며, 비어 있으면 우리 회사 전체 목록
	public List<BookVo> listByDateRange(String startDate, String endDate, String memberName, String bookPlace, String bookPurpose) {
		String start = toDate(startDate);
		String end = toDate(endDate);
		if (start != null && end != null) {
			Check.that(!LocalDate.parse(end).isBefore(LocalDate.parse(start)), "종료일이 시작일보다 빠를 수 없습니다.");
		}
		return dao.listByDateRange(sst, CurrentUser.companyNo(), start, end, memberName, bookPlace, bookPurpose);
	}//listByDateRange

	// yyyy-MM-dd 형식이 아니면 조건에서 뺀다
	private String toDate(String value) {
		if (value == null || value.isEmpty()) {
			return null;
		}
		try {
			return LocalDate.parse(value, DateTimeFormatter.ofPattern("yyyy-MM-dd")).toString();
		} catch (DateTimeParseException e) {
			return null;
		}
	}

	//상세 조회 (같은 회사만)
	public BookVo detail(String bookNo) {
		BookVo vo = dao.detail(sst, bookNo);
		if (vo == null) {
			throw BusinessException.notFound("예약을 찾을 수 없습니다.");
		}
		CurrentUser.requireSameCompany(dao.companyOfBook(sst, bookNo));
		return vo;
	}

	//수정 (본인 예약만)
	public int edit(BookVo vo) {
		Check.required(vo.getBookNo(), "예약 번호");
		BookVo origin = detail(vo.getBookNo());
		if (!origin.getMemberNo().equals(CurrentUser.memberNo())) {
			throw BusinessException.forbidden("본인 예약만 수정할 수 있습니다.");
		}
		vo.setMemberNo(CurrentUser.memberNo());
		validate(vo);
		int result = dao.edit(sst, vo);
		Check.affected(result, "수정할 예약을 찾을 수 없습니다.");
		return result;
	}

	//취소 (본인 예약만)
	public int delete(BookVo vo) {
		BookVo origin = detail(vo.getBookNo());
		if (!origin.getMemberNo().equals(CurrentUser.memberNo())) {
			throw BusinessException.forbidden("본인 예약만 취소할 수 있습니다.");
		}
		vo.setMemberNo(CurrentUser.memberNo());
		int result = dao.delete(sst, vo);
		Check.affected(result, "취소할 예약을 찾을 수 없습니다.");
		return result;
	}

}//class
