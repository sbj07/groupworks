package com.groupworks.app.attendance.controller;

import com.groupworks.app.attendance.service.AttendanceService;
import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.One;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/attendance")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class AttendanceApiController {
    private final AttendanceService service;

    // 출장 등록
    @PostMapping("business-trip")
    public Map<String, String> insertBusinessTrip(@RequestBody BusinessTripVo businessTripVo) {
        int result = service.insertBusinessTrip(businessTripVo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 출장 수정
    @PutMapping("business-trip")
    public Map<String, String> putBusinessTrip(@RequestBody BusinessTripVo businessTripVo) {
        log.info("vo : {}", businessTripVo);
        int result = service.putBusinessTrip(businessTripVo);
        log.info("result : {}", result);

        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 출장 삭제
    @DeleteMapping("business-trip/{eventNo}")
    public Map<String, String> deleteBusinessTrip(@PathVariable String eventNo){
        log.info("이벤트번호 : {}",eventNo);
        int result = service.deleteBusinessTrip(eventNo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }


    // 외근 등록
    @PostMapping("outside-work")
    public Map<String, String> insertOutsideWork(@RequestBody OutsideWorkVo outSideWorkVo) {
        log.info("외근 등록 : {}", outSideWorkVo);
        int result = service.insertOutsideWork(outSideWorkVo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 휴가 등록
    @PostMapping("vacation")
    public Map<String, String> insertVacation(@RequestBody VacationVo vacationVo) {
        log.info("휴가 등록 : {}", vacationVo);
        int result = service.insertVacation(vacationVo);
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
        return map;
    }

    // 외근 리스트
    @GetMapping("outside-work")
    public Map<String, Object> getOutsideWorkList(String loginMemberNo) {
        List<OutsideWorkVo> voList = service.getOutsideWorkList(loginMemberNo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("outsideWorkList", voList);
        if(voList == null) {
            map.put("msg", "nope");
        }
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
        return map;
    }

}
