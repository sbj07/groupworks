package com.groupworks.app.todo.service;

import java.util.List;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import com.groupworks.app.todo.dao.TodoDao;
import com.groupworks.app.todo.vo.TodoVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoService {
	
	private final TodoDao dao;
	private final SqlSessionTemplate sst;
	
	//������ȸ
	public List<TodoVo> list() {
		return dao.list(sst);
	}
	
	//�����ۼ�
	public int write(TodoVo vo) {
		return dao.write(sst, vo);
	}
	
	//���ϼ���
	public int edit(TodoVo vo) {
		return dao.edit(sst, vo);
	}
	
	//���ϻ���
	public int delete(String no) {
		return dao.delete(sst, no);
	}
	
}
