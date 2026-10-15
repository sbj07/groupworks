package com.groupworks.app.file;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * 업로드 파일을 app.upload-dir 아래에 저장하고, 웹에서 접근할 경로(/resources/upload/...)를 돌려준다.
 */
@Service
public class FileStorageService {

	private final Path root;

	public FileStorageService(@Value("${app.upload-dir}") String uploadDir) {
		this.root = Paths.get(uploadDir).toAbsolutePath().normalize();
	}

	/**
	 * @param file 업로드 파일
	 * @param subDir 저장 하위 폴더 (예: "notice/img")
	 * @return 웹 접근 경로, 파일이 없으면 null
	 */
	public String store(MultipartFile file, String subDir) throws IOException {
		if (file == null || file.isEmpty()) {
			return null;
		}
		String originName = StringUtils.getFilename(StringUtils.cleanPath(file.getOriginalFilename()));
		String storedName = UUID.randomUUID() + "_" + originName;

		Path dir = root.resolve(subDir).normalize();
		Path target = dir.resolve(storedName).normalize();
		if (!target.startsWith(root)) {
			throw new IOException("잘못된 파일 경로입니다.");
		}
		Files.createDirectories(dir);
		Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

		return "/resources/upload/" + subDir + "/" + storedName;
	}

}
