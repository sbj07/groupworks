package com.groupworks.app.member.contoller;

import com.groupworks.app.company.vo.CompanyVo;
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

    // 관리자 화원가입 || 구성원 추가
    @PostMapping("sign-up")
    public Map<String, String> signup(@RequestBody MemberVo vo){
        int result = service.signup(vo);
        Map<String, String> map = new HashMap<String,String>();
        map.put("msg","okay");
        if(result != 1) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 아이디 중복 확인
    @GetMapping("check-id")
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
    public Map<String, Object> login(@RequestBody MemberVo vo) {
        MemberVo loginMember = service.login(vo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("loginMemberNo", loginMember.getNo());
        if(loginMember == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    @GetMapping("{loginMemberNo}")
    public Map<String, Object>  userInfo(@PathVariable String loginMemberNo) {
        MemberVo loginMemberVo = service.getLoginMember(loginMemberNo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("loginMemberVo", loginMemberVo);
        if(loginMemberVo == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 회원정보수정
    @PutMapping
    public Map<String, Object> edit(@RequestBody MemberVo editVo) {
        int result = service.edit(editVo);
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // 회원탈퇴
    @DeleteMapping
    public Map<String, String> deleteMember(@RequestBody String no){
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
        map.put("list", authList);
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
        map.put("list", departList);
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
        map.put("list", companyList);
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
        map.put("list", positionList);
        if(positionList == null) {
            map.put("msg", "nope");
        }
        return map;
    }

    // 근무싱태
    @GetMapping("work-stat")
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
    @PutMapping("work-stat")
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

}
