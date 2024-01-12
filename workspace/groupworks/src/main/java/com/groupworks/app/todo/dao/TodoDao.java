package com.groupworks.app.todo.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.groupworks.app.todo.vo.TodoVo;

@Repository
public class TodoDao {

	//������ȸ
	public List<TodoVo> list(SqlSessionTemplate sst, String memberNo){
		return sst.selectList("TodoMapper.list", memberNo);
	}
	
	//�����ۼ�
	public int write(SqlSessionTemplate sst, TodoVo vo) {
		return sst.insert("TodoMapper.insert", vo);
	}
	
	//���ϼ���
	public int edit(SqlSessionTemplate sst, TodoVo vo) {
		return sst.update("TodoMapper.edit", vo);
	}
	
	//���ϻ���
	public int delete(SqlSessionTemplate sst, String no) {
		return sst.update("TodoMapper.delete", no);
	}
}
