package com.groupworks.app.todo.service;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.groupworks.app.common.validation.Check;
import com.groupworks.app.security.CurrentUser;
import com.groupworks.app.todo.dao.TodoDao;
import com.groupworks.app.todo.vo.TodoVo;
import lombok.RequiredArgsConstructor;

/**
 * 할 일. 모두 로그인한 본인 것만 다룬다.
 */
@Service
@RequiredArgsConstructor
public class TodoService {

	private static final int MAX_TODO = 5;

	private final TodoDao dao;
	private final SqlSessionTemplate sst;

	//할일 조회
	public List<TodoVo> list(String memberNo) {
		return dao.list(sst, CurrentUser.memberNo());
	}

	//할일 작성 (최대 5개)
	public int write(TodoVo vo) {
		vo.setMemberNo(CurrentUser.memberNo());
		Check.requiredMax(vo.getContent(), 100, "할 일");
		Check.that(dao.list(sst, vo.getMemberNo()).size() < MAX_TODO, "할 일은 최대 " + MAX_TODO + "개까지 등록할 수 있습니다.");
		return dao.write(sst, vo);
	}

	//할일 수정
	public int edit(TodoVo vo) {
		vo.setMemberNo(CurrentUser.memberNo());
		Check.required(vo.getNo(), "할 일 번호");
		Check.requiredMax(vo.getContent(), 100, "할 일");
		int result = dao.edit(sst, vo);
		Check.affected(result, "수정할 할 일을 찾을 수 없습니다.");
		return result;
	}

	//할일 삭제
	public int delete(TodoVo vo) {
		vo.setMemberNo(CurrentUser.memberNo());
		int result = dao.delete(sst, vo);
		Check.affected(result, "삭제할 할 일을 찾을 수 없습니다.");
		return result;
	}

}
