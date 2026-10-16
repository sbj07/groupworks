package com.groupworks.app.member.service;

import com.groupworks.app.common.exception.BusinessException;
import com.groupworks.app.common.validation.Check;
import com.groupworks.app.company.vo.CompanyVo;
import com.groupworks.app.member.dao.MemberDao;
import com.groupworks.app.member.vo.*;
import com.groupworks.app.security.CurrentUser;
import com.groupworks.app.security.LoginUser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {
    private final MemberDao dao;
    private final SqlSessionTemplate sessionTemplate;
    private final PasswordEncoder passwordEncoder;

    // 관리자 회원가입 (회사 등록 후 첫 계정)
    public int signup(MemberVo vo){
        validateNewMember(vo);
        Check.required(vo.getCompanyNo(), "회사");
        vo.setPwd(pwdEncoding(vo.getPwd()));
        return dao.signup(sessionTemplate, vo);
    }

    // 구성원 추가 (관리자만, 관리자와 같은 회사로)
    public int addMember(MemberVo vo) {
        CurrentUser.requireAdmin();
        vo.setCompanyNo(CurrentUser.companyNo());
        validateNewMember(vo);
        vo.setPwd(pwdEncoding(vo.getPwd()));
        return dao.addMember(sessionTemplate, vo);
    }

    private void validateNewMember(MemberVo vo) {
        Check.that(vo != null, "가입 정보가 없습니다.");
        Check.requiredMax(vo.getName(), 30, "이름");
        Check.memberId(vo.getId());
        Check.password(vo.getPwd());
        Check.emailIfPresent(vo.getEmail());
        Check.telIfPresent(vo.getTel());
        Check.maxLength(vo.getAddress(), 200, "주소");
        Check.required(vo.getDepartNo(), "부서");
        Check.required(vo.getPositionNo(), "직책");
        Check.that(dao.checkDuplicateId(sessionTemplate, vo.getId()) == null, "이미 사용 중인 아이디입니다.");
    }

    // 비밀번호 암호화
    public String  pwdEncoding(String pwd){
        return passwordEncoder.encode(pwd);
    }

    // 아이디 중복 확인
    public MemberVo checkDuplicateId(String id) {
        return dao.checkDuplicateId(sessionTemplate, id);
    }

    // 로그인: 아이디가 없거나 비밀번호가 틀리면 같은 문구로 401
    public MemberVo login(MemberVo vo){
        Check.required(vo == null ? null : vo.getId(), "아이디");
        Check.required(vo.getPwd(), "비밀번호");
        MemberVo loginMember = dao.login(sessionTemplate, vo);
        if (loginMember == null || !passwordMatches(vo.getPwd(), loginMember.getPwd())) {
            throw new BusinessException(HttpStatus.UNAUTHORIZED, "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        return loginMember;
    }

    // 예전에 평문으로 넣은 계정은 BCrypt 형식이 아니므로 비교에 실패한다
    private boolean passwordMatches(String rawPwd, String encodedPwd) {
        if (encodedPwd == null || !encodedPwd.startsWith("$2")) {
            return false;
        }
        return passwordEncoder.matches(rawPwd, encodedPwd);
    }

    // 정보 수정: 본인은 개인정보, 관리자는 같은 회사 구성원의 부서/직책/권한까지
    public int edit(MemberVo editVo) {
        Check.required(editVo.getNo(), "회원번호");
        LoginUser user = CurrentUser.get();
        boolean self = Objects.equals(user.memberNo(), editVo.getNo());
        if (!self) {
            CurrentUser.requireAdmin();
            requireSameCompanyMember(editVo.getNo());
        }
        if (!user.isAdmin()) {
            // 일반 사용자는 부서/직책/권한/연차를 스스로 바꿀 수 없다
            editVo.setDepartNo(null);
            editVo.setPositionNo(null);
            editVo.setAuthNo(null);
            editVo.setAnnual(null);
        }
        if (!Check.isBlank(editVo.getName())) Check.maxLength(editVo.getName(), 30, "이름");
        if (!Check.isBlank(editVo.getId())) {
            Check.memberId(editVo.getId());
            MemberVo same = dao.checkDuplicateId(sessionTemplate, editVo.getId());
            Check.that(same == null || Objects.equals(same.getNo(), editVo.getNo()), "이미 사용 중인 아이디입니다.");
        }
        Check.emailIfPresent(editVo.getEmail());
        Check.telIfPresent(editVo.getTel());
        if (!Check.isBlank(editVo.getAnnual())) {
            Check.that(editVo.getAnnual().matches("\\d{1,3}"), "연차는 0~999 사이 숫자로 입력해주세요.");
        }

        // 비밀번호는 입력했을 때만 암호화해서 바꾼다
        if (editVo.getPwd() != null && !editVo.getPwd().isBlank()) {
            Check.password(editVo.getPwd());
            editVo.setPwd(pwdEncoding(editVo.getPwd()));
        } else {
            editVo.setPwd(null);
        }
        int result = dao.editMember(sessionTemplate, editVo);
        Check.affected(result, "수정할 회원을 찾을 수 없습니다.");
        return result;
    }

    // 회원 탈퇴/삭제: 본인 또는 같은 회사 관리자
    public int deleteMember(String no){
        CurrentUser.requireSelfOrAdmin(no);
        requireSameCompanyMember(no);
        int result = dao.deleteMember(sessionTemplate, no);
        Check.affected(result, "삭제할 회원을 찾을 수 없습니다.");
        return result;
    }

    // 다른 회사 구성원은 조회/수정할 수 없다
    public MemberVo requireSameCompanyMember(String no) {
        MemberVo target = dao.getLoginMember(sessionTemplate, no);
        if (target == null) {
            throw BusinessException.notFound("회원을 찾을 수 없습니다.");
        }
        CurrentUser.requireSameCompany(target.getCompanyNo());
        return target;
    }

    // 회사별 유저 조회
    public List<MemberVo> getMemberList(String companyNo) {
        return dao.getMemberList(sessionTemplate, companyNo);
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

    // 인원관리: 부서, 직책, 권한을 UPDATE 한 번으로 변경 (관리자, 같은 회사)
    public int updateHr(String no, MemberVo vo) {
        CurrentUser.requireAdmin();
        MemberVo target = requireSameCompanyMember(no);
        Check.required(vo.getDepartNo(), "부서");
        Check.required(vo.getPositionNo(), "직책");
        Check.required(vo.getAuthNo(), "권한");
        Check.that(vo.getAuthNo().matches("[123]"), "권한 값이 올바르지 않습니다.");
        if (Objects.equals(no, CurrentUser.memberNo())) {
            Check.that(Objects.equals(vo.getAuthNo(), target.getAuthNo()), "본인 권한은 바꿀 수 없습니다. 다른 관리자에게 요청해주세요.");
        }
        vo.setNo(no);
        vo.setCompanyNo(CurrentUser.companyNo());
        int result = dao.updateHr(sessionTemplate, vo);
        Check.affected(result, "변경할 구성원을 찾을 수 없습니다.");
        return result;
    }

    // 권한 변경 (관리자, 같은 회사)
    public int editAuth(MemberVo vo){
        CurrentUser.requireAdmin();
        requireSameCompanyMember(vo.getNo());
        return dao.editAuth(sessionTemplate,vo);
    }

    // 근무 상태 변경 (본인)
    public int editWorkStatus(MemberVo vo){
        vo.setNo(CurrentUser.memberNo());
        Check.required(vo.getWorkStatusNo(), "근무 상태");
        int result = dao.editWorkStatus(sessionTemplate,vo);
        Check.affected(result, "없는 근무 상태입니다.");
        return result;
    }

    // 로그인 유저 정보
    public MemberVo getLoginMember(String no) {
        return dao.getLoginMember(sessionTemplate, no);
    }

}
