package com.groupworks.app.attendance.service;

import com.groupworks.app.attendance.dao.AttendanceDao;
import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
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
        LocalDate startDate = LocalDate.parse(vo.getStartDate());
        LocalDate endDate = LocalDate.parse(vo.getEndDate());
        long days = 0;

        // 반차 체크
        if (vo.getHalfDayType().equals("Y") && startDate.isEqual(endDate)){
            vo.setUsedDays("0.5");
            return dao.insertVacation(sessionTemplate, vo);
        }

        // 주말 제거
        while (!startDate.isAfter(endDate)){
            DayOfWeek dayOfWeek = startDate.getDayOfWeek();
            if(dayOfWeek != DayOfWeek.SATURDAY && dayOfWeek != DayOfWeek.SUNDAY) {
                days ++;
            }
            startDate = startDate.plusDays(1);
        }
        float floatDays = (float) days;
        String usedDays = Float.toString(floatDays);
        vo.setUsedDays(String.valueOf(usedDays));
        log.info("사용일수 체크 : {}", vo);
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
