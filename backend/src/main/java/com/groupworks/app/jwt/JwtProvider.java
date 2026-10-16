package com.groupworks.app.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.groupworks.app.member.vo.MemberVo;
import com.groupworks.app.security.LoginUser;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {
    private final SecretKey key;
    private final long accessTokenMillis;

    public JwtProvider(@Value("${app.jwt.secret}") String secret,
                       @Value("${app.jwt.access-token-hours:8}") long accessTokenHours) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.accessTokenMillis = accessTokenHours * 60 * 60 * 1000;
    }

    // 로그인한 회원으로 액세스 토큰 발급
    public String createAccessToken(MemberVo member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("companyNo", member.getCompanyNo());
        claims.put("authNo", member.getAuthNo());
        claims.put("name", member.getName());
        return Jwts.builder()
                .subject(member.getNo())
                .claims(claims)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + accessTokenMillis))
                .signWith(key)
                .compact();
    }

    // 토큰 검증 후 로그인 사용자 정보. 잘못되었거나 만료되면 JwtException
    public LoginUser parse(String token) throws JwtException {
        Claims claims = getClaims(token);
        return new LoginUser(
                claims.getSubject(),
                claims.get("companyNo", String.class),
                claims.get("authNo", String.class),
                claims.get("name", String.class));
    }

    // 클레임
    public Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public long getAccessTokenMillis() {
        return accessTokenMillis;
    }
}
