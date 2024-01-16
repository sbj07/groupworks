package com.groupworks.app.attendance.controller;

import com.groupworks.app.attendance.service.AttendanceService;
import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.One;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/attendance")
@RequiredArgsConstructor
public class AttendanceApiController {
    private final AttendanceService service;

    // 출장 등록
    @PostMapping("businesstrip")
    public Map<String, String> insertBusinessTrip(BusinessTripVo vo) {
        int result = service.insertBusinessTrip(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }


    // 외근 등록
    @PostMapping("outsidework")
    public Map<String, String> insertOutsideWork(OutsideWorkVo vo) {
        int result = service.insertOutsideWork(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 휴가 등록
    @PostMapping("vacation")
    public Map<String, String> insertVacation(VacationVo vo) {
        int result = service.insertVacation(vo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 출장 리스트
    @GetMapping("business-trip")
    public Map<String, Object> getBusinessTripList(String loginMemberNo) {
        List<BusinessTripVo> voList = service.getBusinessTripList(loginMemberNo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("bTripList", voList);
        if(voList == null) {
            map.put("msg", "nope");
        }
        System.out.println("출장 호출"+ voList);
        return map;
    }

    // 외근 리스트
    @GetMapping("outside-work")
    public Map<String, Object> getOutsideWorkList(String loginMemberNo) {
        System.out.println(loginMemberNo);
        List<OutsideWorkVo> voList = service.getOutsideWorkList(loginMemberNo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("outsideWorkList", voList);
        if(voList == null) {
            map.put("msg", "nope");
        }
        System.out.println("외근 호출" + voList);
        return map;
    }

    // 휴가 리스트
    @GetMapping("vacation")
    public Map<String, Object> getVacationList(String loginMemberNo) {

        List<VacationVo> voList = service.getVacationList(loginMemberNo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("vacationList", voList);
        if(voList == null) {
            map.put("msg", "nope");
        }
        System.out.println("휴가 호출" + voList);
        return map;
    }

}
