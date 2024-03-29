package com.groupworks.app.member.dao;

import com.groupworks.app.company.vo.CompanyVo;
import com.groupworks.app.member.vo.*;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Slf4j
public class MemberDao {

    // 관리자 화원가입
    public int signup(SqlSessionTemplate sessionTemplate, MemberVo vo){
        return sessionTemplate.insert("MemberMapper.signup",vo);
    }

    // 구성원 추가
    public int addMember(SqlSessionTemplate sessionTemplate, MemberVo vo) {
        return sessionTemplate.insert("MemberMapper.addMember", vo);
    }

    // 아이디 중복확인
    public MemberVo checkDuplicateId(SqlSessionTemplate sessionTemplate, String id) {
        return sessionTemplate.selectOne("MemberMapper.checkDuplicateId", id);
    }

    // 로그인
    public MemberVo login(SqlSessionTemplate sessionTemplate, MemberVo vo){
        return sessionTemplate.selectOne("MemberMapper.login", vo);
    }

    // 회원정보수정
    public int editMember(SqlSessionTemplate sessionTemplate, MemberVo editVo) {
        return sessionTemplate.update("MemberMapper.editMember", editVo);
    }

    // 회원탈퇴
    public int deleteMember(SqlSessionTemplate sessionTemplate, String no){
        return sessionTemplate.update("MemberMapper.deleteMember", no);
    }

    // 회사별 사용자 리스트
    public List<MemberVo> getMemberList(SqlSessionTemplate sessionTemplate, String companyNo) {
        return sessionTemplate.selectList("MemberMapper.getMemberList", companyNo);
    }

    // 권한 목록 조회
    public List<AuthVo> getAuthList(SqlSessionTemplate sessionTemplate){
        return sessionTemplate.selectList("MemberMapper.getAuthList");
    }

    // 부서 목록 조회
    public List<DepartVo> getDepartList(SqlSessionTemplate sessionTemplate){
        return sessionTemplate.selectList("MemberMapper.getDepartList");
    }

    // 회사 목록 조회
    public List<CompanyVo> getCompanyList(SqlSessionTemplate sessionTemplate){
        return sessionTemplate.selectList("MemberMapper.getCompanyList");
    }

    // 직책 목록 조회
    public List<PositionVo> getPositionList(SqlSessionTemplate sessionTemplate){
        return sessionTemplate.selectList("MemberMapper.getPositionList");
    }

    // 근무 상태 목록 조회
    public List<WorkStatusVo> getWorkStatList(SqlSessionTemplate sessionTemplate){
        return sessionTemplate.selectList("MemberMapper.getWorkStatList");
    }

    // 권한 변경
    public int editAuth(SqlSessionTemplate sessionTemplate, MemberVo vo){
        return sessionTemplate.update("MemberMapper.editAuth", vo);
    }

    // 근무 상태 변경
    public int editWorkStatus(SqlSessionTemplate sessionTemplate, MemberVo vo){
        return sessionTemplate.update("MemberMapper.editWorkStatus", vo);
    }

    // 로그인 유저 정보
    public MemberVo getLoginMember(SqlSessionTemplate sessionTemplate, String no) {
        return sessionTemplate.selectOne("MemberMapper.getLoginMember", no);
    }


}
