package com.groupworks.app.approval;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.groupworks.app.common.exception.BusinessException;
import com.groupworks.app.common.validation.Check;
import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.page.vo.PageVo;
import com.groupworks.app.security.CurrentUser;
import com.groupworks.app.security.LoginUser;

import lombok.RequiredArgsConstructor;

/**
 * 전자결재 (휴가신청서, 출장신청서 공통)
 * - 작성자는 본인 문서만, 승인자는 자기 칸만 처리할 수 있다.
 * - 세 명이 모두 승인하면 문서가 승인, 한 명이라도 반려하면 문서가 반려된다.
 */
@Service
@RequiredArgsConstructor
public class ApprovalService {

	public static final int APPROVED = 2;
	public static final int REJECTED = 3;

	private static final int CONTENT_MAX = 300;
	private static final int REJECTION_MAX = 300;
	private static final Set<String> VACATION_KINDS = Set.of("1", "2", "3", "4"); // 연차, 반차, 병가, 육아

	private final ApprovalDao dao;

	// 승인자로 고를 수 있는 같은 회사 사람
	public List<MemberVo> approvers() {
		LoginUser user = CurrentUser.get();
		return dao.approvers(user.companyNo(), user.memberNo());
	}

	// 작성
	public void write(DocType type, ApprovalDocVo doc) {
		LoginUser user = CurrentUser.get();
		doc.setWriterNo(user.memberNo());

		Check.required(doc.getFirstApplyNo(), "최초 승인자");
		Check.required(doc.getMidApplyNo(), "중간 승인자");
		Check.required(doc.getLastApplyNo(), "최종 승인자");
		Set<String> approvers = new HashSet<>(List.of(doc.getFirstApplyNo(), doc.getMidApplyNo(), doc.getLastApplyNo()));
		Check.that(approvers.size() == 3, "승인자 3명은 서로 다른 사람으로 지정해주세요.");
		Check.that(!approvers.contains(user.memberNo()), "본인은 승인자로 지정할 수 없습니다.");
		Set<String> allowed = approvers().stream().map(MemberVo::getNo).collect(Collectors.toSet());
		Check.that(allowed.containsAll(approvers), "승인자는 같은 회사의 승인 권한이 있는 사람만 지정할 수 있습니다.");

		LocalDate start = Check.date(doc.getStartTime(), "시작일");
		LocalDate end = Check.date(doc.getFinishTime(), "종료일");
		Check.dateOrder(start, end);
		doc.setStartTime(start.toString());
		doc.setFinishTime(end.toString());

		Check.requiredMax(doc.getContent(), CONTENT_MAX, "세부사항");

		if (type == DocType.VACATION) {
			Check.that(doc.getVacationNo() != null && VACATION_KINDS.contains(doc.getVacationNo()), "휴가 구분을 선택해주세요.");
			if ("2".equals(doc.getVacationNo())) {
				Check.that(start.isEqual(end), "반차는 하루만 선택할 수 있습니다.");
			}
		} else {
			doc.setVacationNo(null);
		}
		dao.insert(type, doc);
	}

	// 문서 한 건: 작성자나 승인자만 볼 수 있다
	public ApprovalDocVo detail(DocType type, String no) {
		ApprovalDocVo doc = dao.detail(type, no);
		if (doc == null) {
			throw BusinessException.notFound("결재 문서를 찾을 수 없습니다.");
		}
		String me = CurrentUser.memberNo();
		boolean related = Objects.equals(doc.getWriterNo(), me) || Objects.equals(doc.getFirstApplyNo(), me)
				|| Objects.equals(doc.getMidApplyNo(), me) || Objects.equals(doc.getLastApplyNo(), me);
		if (!related) {
			throw BusinessException.forbidden("작성자나 승인자만 볼 수 있는 문서입니다.");
		}
		return doc;
	}

	private ApprovalSearchVo search(String docType, String categoryNo) {
		ApprovalSearchVo search = new ApprovalSearchVo();
		search.setMemberNo(CurrentUser.memberNo());
		search.setDocType(Check.isBlank(docType) ? null : DocType.of(docType).name());
		if (!Check.isBlank(categoryNo)) {
			Check.that(Set.of("1", "2", "3").contains(categoryNo), "결재 상태 값이 올바르지 않습니다.");
			search.setCategoryNo(categoryNo);
		}
		return search;
	}

	private Map<String, Object> page(int listCount, int currentPage, int limit, List<ApprovalDocVo> list) {
		Map<String, Object> map = new HashMap<>();
		PageVo pageVo = new PageVo(listCount, currentPage, 10, limit);
		map.put("list", list);
		map.put("pageInfo", pageVo);
		map.put("totalCount", listCount);
		return map;
	}

	// 내가 작성한 문서
	public Map<String, Object> listMine(String docType, String categoryNo, int currentPage, int limit) {
		ApprovalSearchVo search = search(docType, categoryNo);
		int count = dao.countMine(search);
		PageVo pageVo = new PageVo(count, currentPage, 10, limit);
		search.setStartRow(pageVo.getStartRow());
		search.setLastRow(pageVo.getLastRow());
		return page(count, currentPage, limit, dao.listMine(search));
	}

	// 내가 승인할 문서
	public Map<String, Object> listPending(String docType, int currentPage, int limit) {
		ApprovalSearchVo search = search(docType, null);
		int count = dao.countPending(search);
		PageVo pageVo = new PageVo(count, currentPage, 10, limit);
		search.setStartRow(pageVo.getStartRow());
		search.setLastRow(pageVo.getLastRow());
		return page(count, currentPage, limit, dao.listPending(search));
	}

	// 대시보드 건수
	public Map<String, Object> summary() {
		Map<String, Object> result = new HashMap<>();
		int total = 0;
		int inProgress = 0;
		int approved = 0;
		int rejected = 0;
		for (Map<String, Object> row : dao.countMineByCategory(CurrentUser.memberNo())) {
			int count = ((Number) row.get("count")).intValue();
			String category = String.valueOf(row.get("categoryNo"));
			total += count;
			switch (category) {
				case "1" -> inProgress += count;
				case "2" -> approved += count;
				case "3" -> rejected += count;
				default -> { }
			}
		}
		result.put("myTotal", total);
		result.put("myInProgress", inProgress);
		result.put("myApproved", approved);
		result.put("myRejected", rejected);
		result.put("pendingForMe", dao.countPending(search(null, null)));
		return result;
	}

	// 지금 내가 처리할 수 있는 문서인지 확인
	private ApprovalDocVo requireMyTurn(DocType type, String no) {
		ApprovalDocVo doc = detail(type, no);
		Check.that("1".equals(doc.getCategoryNo()), "이미 처리가 끝난 문서입니다.");
		String me = CurrentUser.memberNo();
		boolean pending = (Objects.equals(doc.getFirstApplyNo(), me) && "1".equals(doc.getFirstStatus()))
				|| (Objects.equals(doc.getMidApplyNo(), me) && "1".equals(doc.getMidStatus()))
				|| (Objects.equals(doc.getLastApplyNo(), me) && "1".equals(doc.getLastStatus()));
		if (!pending) {
			throw new BusinessException(HttpStatus.FORBIDDEN, "이 문서를 승인하거나 반려할 차례가 아닙니다.");
		}
		return doc;
	}

	// 승인: 세 명 모두 승인하면 true
	@Transactional
	public boolean approve(DocType type, String no) {
		requireMyTurn(type, no);
		dao.updateMyStatus(type, no, CurrentUser.memberNo(), APPROVED);
		return dao.completeIfAllApproved(type, no) == 1;
	}

	// 반려
	@Transactional
	public void reject(DocType type, String no, String rejection) {
		requireMyTurn(type, no);
		Check.requiredMax(rejection, REJECTION_MAX, "반려 사유");
		dao.updateMyStatus(type, no, CurrentUser.memberNo(), REJECTED);
		dao.reject(type, no, rejection.trim());
	}

	// 삭제 (작성자만)
	public void delete(DocType type, String no) {
		ApprovalDocVo doc = detail(type, no);
		if (!Objects.equals(doc.getWriterNo(), CurrentUser.memberNo())) {
			throw BusinessException.forbidden("작성자만 삭제할 수 있습니다.");
		}
		Check.affected(dao.delete(type, no, CurrentUser.memberNo()), "삭제할 문서를 찾을 수 없습니다.");
	}

}
