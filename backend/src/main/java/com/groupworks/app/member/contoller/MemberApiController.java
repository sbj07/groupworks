package com.groupworks.app.member.contoller;

import com.groupworks.app.company.vo.CompanyVo;
import com.groupworks.app.jwt.JwtProvider;
import com.groupworks.app.member.service.MemberService;
import com.groupworks.app.member.vo.*;
import com.groupworks.app.security.CurrentUser;
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
public class MemberApiController {
    private final MemberService service;
    private final JwtProvider jwtProvider;

    private static Map<String, Object> okay() {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", "okay");
        return map;
    }

    // 관리자 회원가입 (로그인 없이)
    @PostMapping("sign-up")
    public Map<String, Object> signup(@RequestBody MemberVo vo){
        service.signup(vo);
        return okay();
    }

    // 구성원 추가 (관리자)
    @PostMapping("add")
    public Map<String, Object> addMember(@RequestBody MemberVo vo) {
        service.addMember(vo);
        return okay();
    }

    // 아이디 중복 확인: 이미 있으면 okay, 없으면 nope (기존 화면 규칙 유지)
    @GetMapping("check-id")
    public Map<String, Object> checkDuplicateId(@RequestParam String id){
        MemberVo rs = service.checkDuplicateId(id);
        Map<String, Object> map = okay();
        if(rs == null){
            map.put("msg", "nope");
        }
        return map;
    }

    // 로그인: 토큰 발급
    @PostMapping
    public Map<String, Object> login(@RequestBody MemberVo vo) {
        MemberVo loginMember = service.login(vo);
        Map<String, Object> map = okay();
        map.put("loginMemberNo", loginMember.getNo());
        map.put("accessToken", jwtProvider.createAccessToken(loginMember));
        map.put("expiresIn", jwtProvider.getAccessTokenMillis() / 1000);
        return map;
    }

    // 회원 정보 (같은 회사만)
    @GetMapping("{memberNo}")
    public Map<String, Object> userInfo(@PathVariable String memberNo) {
        MemberVo memberVo = service.requireSameCompanyMember(memberNo);
        Map<String, Object> map = okay();
        map.put("loginMemberVo", memberVo);
        return map;
    }

    // 회원정보 수정 (본인 또는 관리자)
    @PutMapping
    public Map<String, Object> edit(@RequestBody MemberVo editVo) {
        service.edit(editVo);
        return okay();
    }

    // 인원관리: 부서/직책/권한 한 번에 변경 (관리자)
    @PutMapping("{memberNo}/hr")
    public Map<String, Object> updateHr(@PathVariable String memberNo, @RequestBody MemberVo vo) {
        service.updateHr(memberNo, vo);
        Map<String, Object> map = okay();
        map.put("message", "구성원 정보를 변경했습니다.");
        return map;
    }

    // 회원 탈퇴/삭제 (본인 또는 관리자)
    @DeleteMapping("{memberNo}")
    public Map<String, Object> deleteMember(@PathVariable String memberNo){
        service.deleteMember(memberNo);
        return okay();
    }

    // ---------------- 목록조회 ------------------

    // 우리 회사 사용자 (주소의 번호와 상관없이 로그인한 회사 기준)
    @GetMapping("list/{loginMemberNo}")
    public Map<String, Object> getMemberList(@PathVariable String loginMemberNo) {
        List<MemberVo> voList = service.getMemberList(CurrentUser.companyNo());
        Map<String, Object> map = okay();
        map.put("list", voList);
        return map;
    }

    // 권한
    @GetMapping("list/auth")
    public Map<String, Object> getAuthList(){
        Map<String, Object> map = okay();
        map.put("authList", service.getAuthList());
        return map;
    }

    // 부서
    @GetMapping("list/depart")
    public Map<String, Object> getDepartList(){
        Map<String, Object> map = okay();
        map.put("departList", service.getDepartList());
        return map;
    }

    // 회사
    @GetMapping("company")
    public Map<String, Object> getCompanyList(){
        List<CompanyVo> companyList = service.getCompanyList();
        Map<String, Object> map = okay();
        map.put("list", companyList);
        return map;
    }

    // 직책
    @GetMapping("list/position")
    public Map<String, Object> getPositionList(){
        Map<String, Object> map = okay();
        map.put("positionList", service.getPositionList());
        return map;
    }

    // 근무상태
    @GetMapping("work-stat")
    public Map<String, Object> getWorkStatusList(){
        Map<String, Object> map = okay();
        map.put("workStatusList", service.getWorkStatList());
        return map;
    }

    // ----------------- 변경 -------------------

    // 근무상태 (본인)
    @PutMapping("work-stat")
    public Map<String, Object> editWorkStat(@RequestBody MemberVo vo){
        service.editWorkStatus(vo);
        return okay();
    }

}
