package com.groupworks.app.attendance.controller;

import com.groupworks.app.attendance.service.AttendanceService;
import com.groupworks.app.attendance.vo.BusinessTripVo;
import com.groupworks.app.attendance.vo.OutsideWorkVo;
import com.groupworks.app.attendance.vo.VacationVo;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
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


}
