package com.groupworks.app.organ.vo;

import lombok.Data;

// 조직도에 보여줄 구성원 정보
@Data
public class OrganVo {

	private String no;
	private String name;
	private String tel;
	private String email;
	private String departName;
	private String positionName;
	private String workStatusNo;
	private String workStatusName;

}
