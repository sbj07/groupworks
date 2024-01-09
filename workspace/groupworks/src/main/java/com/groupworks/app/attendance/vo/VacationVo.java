package com.groupworks.app.attendance.vo;

import lombok.Data;

@Data
public class VacationVo {
    private String no;
    private String memberNo;
    private String startDate;
    private String endDate;
    private String usedDays;
    private String halfDayType;
}
