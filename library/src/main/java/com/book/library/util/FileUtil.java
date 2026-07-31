package com.book.library.util;

import com.book.library.exception.CustomBadRequestException;
import com.book.library.exception.CustomInternalServerError;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class FileUtil {
    @Value("${file.upload.dir}")
    private String uploadDir;

    public String  saveFile(MultipartFile file){
        if (file==null || file.isEmpty()){
            throw new CustomBadRequestException("File is null or empty");
        }
        try {
            String originalName = file.getOriginalFilename();
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }
            String extension=".";
            if (originalName!=null){
                extension=originalName.substring(originalName.lastIndexOf(extension));
            }
            String filename = UUID.randomUUID() + extension;
            Path path = uploadPath.resolve(filename);
            return path.toString();
        } catch (IOException exception){
            throw new CustomInternalServerError(exception.getMessage());
        }
    }
    public void removeFile(String filename){
        if (filename==null || filename.isEmpty()){
            throw new CustomBadRequestException("File is null or empty");
        }
        try {
            Path path=Paths.get(uploadDir,filename);
            Files.deleteIfExists(path);
        } catch (IOException exception){
            throw new CustomInternalServerError(exception.getMessage());
        }
    }
}
