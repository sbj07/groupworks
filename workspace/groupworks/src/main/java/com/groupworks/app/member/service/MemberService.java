package com.groupworks.app.member.service;

import com.groupworks.app.member.dao.MemberDao;
import com.groupworks.app.member.vo.*;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberDao dao;
    private final SqlSessionTemplate sessionTemplate;
    private final PasswordEncoder passwordEncoder;

    // 화원가입
    public int signup(MemberVo vo){
        if (vo != null && vo.getId() != null && vo.getId().length() < 4){
            throw new IllegalStateException("아이디가 너무 짧음");
        }

        if (vo != null && vo.getTel() != null && vo.getTel().length() != 11){
            throw new IllegalStateException("연락처가 잘못 입력됨");
        }

        // 비밀번호 암호화
        if (vo != null && vo.getPwd() != null ) {
             String encodedPwd = pwdEncoding(vo.getPwd());
             vo.setPwd(encodedPwd);
        }

        return dao.signup(sessionTemplate, vo);
    }

    // 비밀번호 암호화
    public String  pwdEncoding(String pwd){
        return passwordEncoder.encode(pwd);
    }

    //아이디 중복 확인
    public MemberVo checkDuplicateId(String id) {
        return dao.checkDuplicateId(sessionTemplate, id);
    }

    // 로그인
    public MemberVo login(MemberVo vo){
        MemberVo loginMember = dao.login(sessionTemplate, vo);
        String rawPwd = vo.getPwd();
        String encodedPwd = loginMember.getPwd();
        if(! passwordEncoder.matches(rawPwd, encodedPwd)){
            throw new IllegalStateException("비밀번호 틀림");
        };
        return loginMember;
    }

    // 회원 탈퇴
    public int deleteMember(String no){
        return dao.deleteMember(sessionTemplate, no);
    }

    // 권한 목록 조회
    public List<AuthVo> getAuthList(){
        return dao.getAuthList(sessionTemplate);
    }

    // 부서 목록 조회
    public List<DepartVo> getDepartList(){
        return dao.getDepartList(sessionTemplate);
    }

    // 회사 목록 조회
    public List<CompanyVo> getCompanyList(){
        return dao.getCompanyList(sessionTemplate);
    }

    // 직책 목록 조회
    public List<PositionVo> getPositionList(){
        return dao.getPositionList(sessionTemplate);
    }

    // 근무 상태 목록 조회
    public List<WorkStatusVo> getWorkStatList(){
        return dao.getWorkStatList(sessionTemplate);
    }

    // 권한 변경
    public int editAuth(MemberVo vo){
        return dao.editAuth(sessionTemplate,vo);
    }

    // 근무 상태 변경
    public int editWorkStatus(MemberVo vo){
        return dao.editWorkStatus(sessionTemplate,vo);
    }

    // 회사 추가
    public int insertCompany(CompanyVo vo){
        return dao.insertCompany(sessionTemplate, vo);
    }


}
