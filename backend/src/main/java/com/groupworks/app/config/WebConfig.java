package com.groupworks.app.config;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS, 비밀번호 암호화는 security/SecurityConfig 에서 설정한다
@Configuration
public class WebConfig implements WebMvcConfigurer {

	@Value("${app.upload-dir}")
	private String uploadDir;

	// 업로드 파일: 기존과 같은 /resources/upload/** 주소로 제공
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		Path root = Paths.get(uploadDir).toAbsolutePath().normalize();
		registry.addResourceHandler("/resources/upload/**")
				.addResourceLocations(root.toUri().toString());
	}

}
