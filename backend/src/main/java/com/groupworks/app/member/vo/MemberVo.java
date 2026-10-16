package com.groupworks.app.member.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MemberVo {
    private String no;
    private String name;
    private String id;
    // 받기만 하고 응답에는 내보내지 않는다
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String pwd;
    private String email;
    private String tel;
    private String address;
    private String annual;
    private String authNo;
    private String authName;
    private String departNo;
    private String departName;
    private String positionNo;
    private String positionName;
    private String companyNo;
    private String companyName;
    private String workStatusNo;
    private String workStatusName;
    private String delYn;

    @JsonIgnore
    private String refreshToken;
}
