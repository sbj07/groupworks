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
    public Map<String, String> editBusinessTrip(@RequestBody BusinessTripVo businessTripVo) {
        int result = service.editBusinessTrip(businessTripVo);
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
        int result = service.insertOutsideWork(outSideWorkVo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 외근 수정
    @PutMapping("outside-work")
    public Map<String, String> editOutsideWork(@RequestBody OutsideWorkVo outSideWorkVo) {
        int result = service.editOutsideWork(outSideWorkVo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 외근 삭제
    @DeleteMapping("outside-work/{eventNo}")
    public Map<String, String> deleteOutsideWork(@PathVariable String eventNo) {
        int result = service.deleteOutsideWork(eventNo);
        Map<String, String> map = new HashMap<String,String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 휴가 등록
    @PostMapping("vacation")
    public Map<String, String> insertVacation(@RequestBody VacationVo vacationVo) {
        int result = service.insertVacation(vacationVo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 휴가 수정
    @PutMapping("vacation")
    public Map<String, String> editVacation(@RequestBody VacationVo vacationVo) {
        int result = service.editVacation(vacationVo);
        Map<String, String> map = new HashMap<>();
        map.put("msg","okay");
        if(result != 1) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 휴가 삭제
    @DeleteMapping("vacation/{eventNo}")
    public Map<String, String> deleteVacation(@PathVariable String eventNo) {
        int result = service.deleteVacation(eventNo);
        Map<String, String> map = new HashMap<>();
        map.put("msg", "okay");
        if(result != 1) {
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

    // 사용자별 사용연차일
    @GetMapping("vacation/total/{no}")
    public Map<String, String> getUsedAnnualDays(@PathVariable String no) {
        VacationVo vo = service.getUsedAnnualDays(no);
        Map<String, String> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("totalDays",vo.getUsedDays());
        if(vo.getUsedDays() == null){
            map.put("totalDays", "0");
        }
        return map;
    }
}
