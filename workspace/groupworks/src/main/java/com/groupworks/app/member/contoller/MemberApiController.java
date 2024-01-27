package com.groupworks.app.member.contoller;

import com.groupworks.app.company.vo.CompanyVo;
import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/member")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin("*")
public class MemberApiController {
    private final MemberService service;

    // 관리자 화원가입
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

    // 구성원 추가
    @PostMapping("add")
    public Map<String, String> addMember(@RequestBody MemberVo vo) {
        int result = service.addMember(vo);
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
        if(loginMember == null) {
            map.put("msg", "nope");
            map.put("errorMsg", "NoData");
            return map;
        }
        map.put("msg", "okay");
        map.put("loginMemberNo", loginMember.getNo());
        log.info("vo : {}",vo);
        log.info("map : {}",map);
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
    @DeleteMapping("{loginMemberNo}")
    public Map<String, String> deleteMember(@PathVariable String loginMemberNo){
        int result = service.deleteMember(loginMemberNo);
        Map<String, String> map = new HashMap<String, String>();
        map.put("msg","okay");
        if(result != 1){
            map.put("msg", "nope");
        }
        return map;
    }

    // ---------------- 목록조회 ------------------

    // 회사별 사용자
    @GetMapping("list/{loginMemberNo}")
    public Map<String, Object> getMemberList(@PathVariable String loginMemberNo) {
        MemberVo loginMember = service.getLoginMember(loginMemberNo);
        List<MemberVo> voList = service.getMemberList(loginMember.getCompanyNo());
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("list", voList);
        if(voList == null){
            map.put("msg", "nope");
        }
        return map;
    }

    // 권한
    @GetMapping("list/auth")
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
    @GetMapping("list/depart")
    public Map<String, Object> getDepartList(){
        List<DepartVo> departList = service.getDepartList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("departList", departList);
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
    @GetMapping("list/position")
    public Map<String, Object> getPositionList(){
        List<PositionVo> positionList = service.getPositionList();
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        map.put("positionList", positionList);
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
