package com.groupworks.app.attendance.service;

import com.groupworks.app.attendance.dao.AttendanceDao;
import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceDao dao;
    private final SqlSessionTemplate sessionTemplate;

    // 출장등록
    public int insertBusinessTrip(BusinessTripVo vo){
        return dao.insertBusinessTrip(sessionTemplate, vo);
    }

    // 외근등록
    public int insertOutsideWork(OutsideWorkVo vo){
        return dao.insertOutsideWork(sessionTemplate, vo);
    }

    // 휴가등록
    public int insertVacation(VacationVo vo){
        return dao.insertVacation(sessionTemplate, vo);
    }

    // 출장 리스트
    public List<BusinessTripVo> getBusinessTripList(String no) {
        return dao.getBusinessTripList(sessionTemplate, no);
    }

    // 외근 리스트
    public List<OutsideWorkVo> getOutsideWorkList(String no) {
        return dao.getOutsideWorkList(sessionTemplate, no);
    }

    // 휴가 리스트
    public List<VacationVo> getVacationList(String no) {
        return dao.getVacationList(sessionTemplate, no);
    }
}
