package com.groupworks.app.member.contoller;

import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/member")
@RequiredArgsConstructor
public class MemberApiController {
    private final MemberService service;

    // 회원가입
    @PostMapping("signUp")
    public Map<String, String> signup(MemberVo vo){
        int result = service.signup(vo);
        Map<String, String> map = new HashMap<String,String>();
        map.put("msg","okay");
        if(result != 1) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 아이디 중복 확인
    @GetMapping("checkId")
    public Map<String, String> checkDuplicateId(String id){
        MemberVo rs = service.checkDuplicateId(id);
        Map<String, String> map = new HashMap<String,String>();
        map.put("msg", "okay");
        if(rs == null){
            map.put("msg", "nope");
        }
        return map;
    }

    // 로그인
    @PostMapping
    public Map<String, Object> login(MemberVo vo) {
        MemberVo loginMember = service.login(vo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("loginMember", loginMember);
        if(loginMember == null){
            map.put("msg", "nope");
        }
        return map;
    }

    // 회원탈퇴
    @DeleteMapping
    public Map<String, String> deleteMember(String no){
        int result = service.deleteMember(no);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg","okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // ---------------- 목록조회 ------------------

    // 권한
    @GetMapping("auth")
    public Map<String, Object> getAuthList(){
        List<AuthVo> authList = service.getAuthList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("authList", authList);
        if(authList == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 부서
    @GetMapping("depart")
    public Map<String, Object> getDepartList(){
        List<DepartVo> departList = service.getDepartList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("authList", departList);
        if(departList == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 회사
    @GetMapping("company")
    public Map<String, Object> getCompanyList(){
        List<CompanyVo> companyList = service.getCompanyList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("authList", companyList);
        if(companyList == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 직책
    @GetMapping("position")
    public Map<String, Object> getPositionList(){
        List<PositionVo> positionList = service.getPositionList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("authList", positionList);
        if(positionList == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 근무싱태
    @GetMapping("workStat")
    public Map<String, Object> getWorkStatusList(){
        List<WorkStatusVo> workStatList = service.getWorkStatList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("authList", workStatList);
        if(workStatList == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // ----------------- 변경 -------------------

    // 근무상태
    @PutMapping("workStat")
    public Map<String, String> editWorkStat(MemberVo vo){
        int result = service.editWorkStatus(vo);
        Map<String, String > map = new HashMap<String, String>();
        map.put("msg", "okay");

        if(result != 1) {
            map.put("msg","nope");
        }
        return map;
    }
    // 권한

    // 연차

    // 회사추가

}
