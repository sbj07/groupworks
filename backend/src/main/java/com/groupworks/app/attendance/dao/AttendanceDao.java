package com.groupworks.app.attendance.dao;

import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class AttendanceDao {

    private static Map<String, String> key(String no, String memberNo) {
        return Map.of("no", no, "memberNo", memberNo);
    }

    // 출장등록
    public int insertBusinessTrip(SqlSessionTemplate sessionTemplate, BusinessTripVo vo) {
        return sessionTemplate.insert("AttendanceMapper.insertBusinessTrip", vo);
    }

    // 출장수정
    public int editBusinessTrip(SqlSessionTemplate sessionTemplate, BusinessTripVo vo) {
        return sessionTemplate.update("AttendanceMapper.editBusinessTrip", vo);
    }

    // 출장삭제
    public int deleteBusinessTrip(SqlSessionTemplate sessionTemplate, String no, String memberNo) {
        return sessionTemplate.update("AttendanceMapper.deleteBusinessTrip", key(no, memberNo));
    }

    // 외근등록
    public int insertOutsideWork(SqlSessionTemplate sessionTemplate, OutsideWorkVo vo) {
        return sessionTemplate.insert("AttendanceMapper.insertOutsideWork", vo);
    }

    // 외근수정
    public int editOutsideWork(SqlSessionTemplate sessionTemplate, OutsideWorkVo vo) {
        return sessionTemplate.update("AttendanceMapper.editOutsideWork", vo);
    }

    // 외근삭제
    public int deleteOutsideWork(SqlSessionTemplate sessionTemplate, String no, String memberNo) {
        return sessionTemplate.update("AttendanceMapper.deleteOutsideWork", key(no, memberNo));
    }

    // 휴가등록
    public int insertVacation(SqlSessionTemplate sessionTemplate, VacationVo vo) {
        return sessionTemplate.insert("AttendanceMapper.insertVacation", vo);
    }

    // 연차 차감 (usedDays 가 음수면 복구)
    public int cutAnnual(SqlSessionTemplate sessionTemplate, String memberNo, String usedDays) {
        return sessionTemplate.update("AttendanceMapper.cutAnnual", Map.of("memberNo", memberNo, "usedDays", usedDays));
    }

    // 휴가 한 건
    public VacationVo getVacation(SqlSessionTemplate sessionTemplate, String no, String memberNo) {
        return sessionTemplate.selectOne("AttendanceMapper.getVacation", key(no, memberNo));
    }

    // 휴가수정
    public int editVacation(SqlSessionTemplate sessionTemplate, VacationVo vo) {
        return sessionTemplate.update("AttendanceMapper.editVacation", vo);
    }

    // 휴가삭제
    public int deleteVacation(SqlSessionTemplate sessionTemplate, String no, String memberNo) {
        return sessionTemplate.update("AttendanceMapper.deleteVacation", key(no, memberNo));
    }

    // 출장 리스트
    public List<BusinessTripVo> getBusinessTripList(SqlSessionTemplate sessionTemplate, String no) {
        return sessionTemplate.selectList("AttendanceMapper.getBusinessTripList", no);
    }

    // 외근 리스트
    public List<OutsideWorkVo> getOutsideWorkList(SqlSessionTemplate sessionTemplate, String no) {
        return sessionTemplate.selectList("AttendanceMapper.getOutsideWorkList", no);
    }

    // 휴가 리스트
    public List<VacationVo> getVacationList(SqlSessionTemplate sessionTemplate, String no) {
        return sessionTemplate.selectList("AttendanceMapper.getVacationList", no);
    }

    // 사용 연차일
    public VacationVo getUsedAnnualDays(SqlSessionTemplate sessionTemplate, String no){
        return sessionTemplate.selectOne("AttendanceMapper.getUsedAnnualDays", no);
    }
}
