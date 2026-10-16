package com.groupworks.app.attendance.service;

import com.groupworks.app.attendance.dao.AttendanceDao;
import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import com.groupworks.app.common.exception.BusinessException;
import com.groupworks.app.common.validation.Check;
import com.groupworks.app.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * 출장/외근/휴가 일정. 등록·수정·삭제는 모두 로그인한 본인 일정만 다룬다.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AttendanceService {
    private static final DateTimeFormatter DATE_TIME = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

    private final AttendanceDao dao;
    private final SqlSessionTemplate sessionTemplate;

    // ---------- 출장 ----------

    private void validate(BusinessTripVo vo) {
        LocalDate start = Check.date(vo.getStartDate(), "출장 시작일");
        LocalDate end = Check.date(vo.getEndDate(), "출장 종료일");
        Check.dateOrder(start, end);
        Check.maxLength(vo.getMemo(), 100, "메모");
        vo.setStartDate(start.toString());
        vo.setEndDate(end.toString());
    }

    public int insertBusinessTrip(BusinessTripVo vo){
        vo.setMemberNo(CurrentUser.memberNo());
        validate(vo);
        return dao.insertBusinessTrip(sessionTemplate, vo);
    }

    public int editBusinessTrip(BusinessTripVo vo){
        Check.required(vo.getNo(), "출장 번호");
        vo.setMemberNo(CurrentUser.memberNo());
        validate(vo);
        int result = dao.editBusinessTrip(sessionTemplate, vo);
        Check.affected(result, "수정할 출장 일정을 찾을 수 없습니다.");
        return result;
    }

    public int deleteBusinessTrip(String eventNo) {
        int result = dao.deleteBusinessTrip(sessionTemplate, eventNo, CurrentUser.memberNo());
        Check.affected(result, "삭제할 출장 일정을 찾을 수 없습니다.");
        return result;
    }

    // ---------- 외근 ----------

    private void validate(OutsideWorkVo vo) {
        LocalDateTime start = Check.dateTime(vo.getStartTime(), "외근 시작 시간");
        LocalDateTime end = Check.dateTime(vo.getEndTime(), "외근 종료 시간");
        Check.dateTimeOrder(start, end);
        vo.setStartTime(start.format(DATE_TIME));
        vo.setEndTime(end.format(DATE_TIME));
        vo.setOnsiteStart("Y".equals(vo.getOnsiteStart()) ? "Y" : "N");
        vo.setOnsiteEnd("Y".equals(vo.getOnsiteEnd()) ? "Y" : "N");
    }

    public int insertOutsideWork(OutsideWorkVo vo){
        vo.setMemberNo(CurrentUser.memberNo());
        validate(vo);
        return dao.insertOutsideWork(sessionTemplate, vo);
    }

    public int editOutsideWork(OutsideWorkVo vo) {
        Check.required(vo.getNo(), "외근 번호");
        vo.setMemberNo(CurrentUser.memberNo());
        validate(vo);
        int result = dao.editOutsideWork(sessionTemplate, vo);
        Check.affected(result, "수정할 외근 일정을 찾을 수 없습니다.");
        return result;
    }

    public int deleteOutsideWork(String eventNo) {
        int result = dao.deleteOutsideWork(sessionTemplate, eventNo, CurrentUser.memberNo());
        Check.affected(result, "삭제할 외근 일정을 찾을 수 없습니다.");
        return result;
    }

    // ---------- 휴가 (연차 차감) ----------

    // 사용 일수: 반차는 하루짜리만 0.5일, 그 외에는 주말을 뺀 일수
    private String usedDays(VacationVo vo) {
        LocalDate start = Check.date(vo.getStartDate(), "휴가 시작일");
        LocalDate end = Check.date(vo.getEndDate(), "휴가 종료일");
        Check.dateOrder(start, end);
        vo.setStartDate(start.toString());
        vo.setEndDate(end.toString());
        boolean half = "Y".equals(vo.getHalfDayType());
        vo.setHalfDayType(half ? "Y" : "N");
        if (half) {
            Check.that(start.isEqual(end), "반차는 하루만 선택할 수 있습니다.");
            return "0.5";
        }
        long days = start.datesUntil(end.plusDays(1))
                .filter(d -> d.getDayOfWeek() != DayOfWeek.SATURDAY && d.getDayOfWeek() != DayOfWeek.SUNDAY)
                .count();
        Check.that(days > 0, "선택한 기간이 모두 주말입니다.");
        return String.valueOf((float) days);
    }

    @Transactional
    public int insertVacation(VacationVo vo){
        vo.setMemberNo(CurrentUser.memberNo());
        vo.setUsedDays(usedDays(vo));
        dao.cutAnnual(sessionTemplate, vo.getMemberNo(), vo.getUsedDays());
        return dao.insertVacation(sessionTemplate, vo);
    }

    // 수정하면 기존 사용 일수와의 차이만큼 연차를 다시 계산한다
    @Transactional
    public int editVacation(VacationVo vo) {
        Check.required(vo.getNo(), "휴가 번호");
        String memberNo = CurrentUser.memberNo();
        VacationVo origin = dao.getVacation(sessionTemplate, vo.getNo(), memberNo);
        if (origin == null) {
            throw BusinessException.notFound("수정할 휴가 일정을 찾을 수 없습니다.");
        }
        vo.setMemberNo(memberNo);
        vo.setUsedDays(usedDays(vo));
        float diff = Float.parseFloat(vo.getUsedDays()) - Float.parseFloat(origin.getUsedDays());
        if (diff != 0) {
            dao.cutAnnual(sessionTemplate, memberNo, String.valueOf(diff));
        }
        return dao.editVacation(sessionTemplate, vo);
    }

    // 삭제하면 사용한 연차를 돌려준다
    @Transactional
    public int deleteVacation(String eventNo) {
        String memberNo = CurrentUser.memberNo();
        VacationVo origin = dao.getVacation(sessionTemplate, eventNo, memberNo);
        if (origin == null) {
            throw BusinessException.notFound("삭제할 휴가 일정을 찾을 수 없습니다.");
        }
        dao.cutAnnual(sessionTemplate, memberNo, String.valueOf(-Float.parseFloat(origin.getUsedDays())));
        return dao.deleteVacation(sessionTemplate, eventNo, memberNo);
    }

    // ---------- 조회 (본인) ----------

    public List<BusinessTripVo> getBusinessTripList(String no) {
        return dao.getBusinessTripList(sessionTemplate, CurrentUser.memberNo());
    }

    public List<OutsideWorkVo> getOutsideWorkList(String no) {
        return dao.getOutsideWorkList(sessionTemplate, CurrentUser.memberNo());
    }

    public List<VacationVo> getVacationList(String no) {
        return dao.getVacationList(sessionTemplate, CurrentUser.memberNo());
    }

    public VacationVo getUsedAnnualDays(String no) {
        return dao.getUsedAnnualDays(sessionTemplate, CurrentUser.memberNo());
    }
}
