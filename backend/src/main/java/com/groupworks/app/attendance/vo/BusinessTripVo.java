package com.groupworks.app.attendance.vo;

import lombok.Data;

@Data
public class BusinessTripVo {
    private String no;
    private String memberNo;
    private String startDate;
    private String endDate;
    private String memo;
    private String delYn;
}
