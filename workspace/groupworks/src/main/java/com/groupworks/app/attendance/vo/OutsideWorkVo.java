package com.groupworks.app.attendance.vo;

import lombok.Data;

@Data
public class OutsideWorkVo {
    private String no;
    private String memberNo;
    private String startTime;
    private String endTime;
    private String onsiteStart;
    private String onsiteEnd;
}
