package com.groupworks.app.message.service;

import java.util.List;
import java.util.Objects;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.groupworks.app.common.validation.Check;
import com.groupworks.app.message.dao.MessageDao;
import com.groupworks.app.message.vo.MessageVo;
import com.groupworks.app.security.CurrentUser;
import com.groupworks.app.security.LoginUser;

import lombok.RequiredArgsConstructor;

/**
 * 쪽지: 같은 회사 사람에게만 보낼 수 있고, 본인 쪽지함의 쪽지만 보고 지울 수 있다.
 */
@Service
@RequiredArgsConstructor
public class MessageService {

	private static final int CONTENT_MAX = 1000;

	private final MessageDao dao;

	public List<MessageVo> list(String box) {
		Check.that("inbox".equals(box) || "sent".equals(box), "쪽지함 구분이 올바르지 않습니다.");
		return dao.list(CurrentUser.memberNo(), box);
	}

	@Transactional
	public void send(MessageVo vo) {
		LoginUser user = CurrentUser.get();
		Check.required(vo.getRecieveNo(), "받는 사람");
		Check.that(!Objects.equals(vo.getRecieveNo(), user.memberNo()), "본인에게는 쪽지를 보낼 수 없습니다.");
		Check.that(dao.countSameCompanyMember(vo.getRecieveNo(), user.companyNo()) == 1, "같은 회사 구성원에게만 쪽지를 보낼 수 있습니다.");
		Check.requiredMax(vo.getContent() == null ? null : vo.getContent().strip(), CONTENT_MAX, "내용");

		vo.setSendNo(user.memberNo());
		vo.setContent(vo.getContent().strip());
		dao.insert(vo, user.memberNo());
		dao.insert(vo, vo.getRecieveNo());
	}

	public void delete(String no) {
		Check.affected(dao.delete(no, CurrentUser.memberNo()), "삭제할 쪽지를 찾을 수 없습니다.");
	}

}
