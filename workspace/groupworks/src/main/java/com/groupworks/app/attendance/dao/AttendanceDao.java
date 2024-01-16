package com.groupworks.app.attendance.dao;

import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AttendanceDao {

    // 출장등록
    public int insertBusinessTrip(SqlSessionTemplate sessionTemplate, BusinessTripVo vo) {
        return sessionTemplate.insert("AttendanceMapper.insertBusinessTrip", vo);
    }

    // 외근등록
    public int insertOutsideWork(SqlSessionTemplate sessionTemplate, OutsideWorkVo vo) {
        return sessionTemplate.insert("AttendanceMapper.insertOutsideWork", vo);
    }

    // 휴가등록
    public int insertVacation(SqlSessionTemplate sessionTemplate, VacationVo vo) {
        return sessionTemplate.insert("AttendanceMapper.insertVacation", vo);
    }

    // 출장 리스트
    public List<BusinessTripVo> getBusinessTripList(SqlSessionTemplate sessionTemplate, String loginMemberNo) {
        return sessionTemplate.selectList("AttendanceMapper.getBusinessTripList", loginMemberNo);
    }

    // 외근 리스트
    public List<OutsideWorkVo> getOutsideWorkList(SqlSessionTemplate sessionTemplate, String no) {
        return sessionTemplate.selectList("AttendanceMapper.getOutsideWorkList", no);
    }

    // 휴가 리스트
    public List<VacationVo> getVacationList(SqlSessionTemplate sessionTemplate, String no) {
        return sessionTemplate.selectList("AttendanceMapper.getVacationList", no);
    }
}
