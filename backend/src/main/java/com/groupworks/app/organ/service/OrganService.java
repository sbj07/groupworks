package com.groupworks.app.organ.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.groupworks.app.organ.dao.OrganDao;
import com.groupworks.app.organ.vo.OrganVo;
import com.groupworks.app.security.CurrentUser;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrganService {

	private final OrganDao dao;

	// 로그인한 회사의 구성원
	public List<OrganVo> list() {
		return dao.list(CurrentUser.companyNo());
	}

}
