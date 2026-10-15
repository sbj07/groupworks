package com.groupworks.app.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtProvider {
    private final SecretKey key;

    public JwtProvider(@Value("${app.jwt.secret}") String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public Jwt createJwt(Map<String, Object> claims) {
        String accessToken = createToken(claims, getExpireDateAccessToken());
        String refreshToken = createToken(new HashMap<>(), getExpireDateRefreshToken());
        return Jwt.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    // 토큰 생성
    public String createToken(Map<String, Object> claims, Date expiteDate) {
        return Jwts.builder()
                .claims(claims)
                .expiration(expiteDate)
                .signWith(key)
                .compact();
    }

    // 클레임
    public Claims getClaims(String token){
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // 만료기한
    public Date getExpireDateAccessToken() {
        long expireTimeMils = 1000 * 60 * 60;
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }

    // 리프레쉬 토큰
    public Date getExpireDateRefreshToken() {
        long expireTimeMils = 1000L * 60 * 60 * 24 * 60;
        return new Date(System.currentTimeMillis() + expireTimeMils);
    }
}
