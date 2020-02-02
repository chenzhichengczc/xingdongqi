package com.hc.common.utils;

import com.alibaba.fastjson.JSON;
import org.apache.commons.io.FileUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class FileUploadUtils {

    public static Object uploadApk(MultipartFile myfiles, HttpServletRequest request, HttpServletResponse response) {

        Map<String, Object> resMap = new HashMap<String, Object>();
        if(myfiles.getSize()>1024*1024*5){
            resMap.put("code", 500);
            resMap.put("msg", "文件过大，请上传5M以内的图片");
            System.out.println("文件上传失败");
            return resMap;
        }
        String path = request.getContextPath();
        String basePath =  "http://" + request.getServerName() + ":80"  + path;
        Date dt = new Date();
        Long time = dt.getTime();
        if (myfiles != null) {
            String realPath ="/usr/local/application/file/img/upload"; // 获取保存的路径，本地磁盘中的一个文件夹
            if (myfiles.isEmpty()) {
                // 未选择文件
                resMap.put("code", 400);
                resMap.put("msg", "未选择文件");
            } else {
                // 文件原名称
                String originFileName = "";
                // 上传文件重命名
//                String originalFilename = time.toString().substring(time.toString().length() - 8,
//                        time.toString().length());
//                originalFilename = originalFilename.concat(".");
//                originalFilename = originalFilename.concat(myfiles.getOriginalFilename().toString()
//                        .substring(myfiles.getOriginalFilename().toString().indexOf(".") + 1));

                String originalFilename = myfiles.getOriginalFilename();

                String[] split = myfiles.getOriginalFilename().split("\\.");

                //获取后缀
                String suffix = split[split.length-1];

                originalFilename = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date()).concat(".").concat(suffix).toString();

                try {
                    // 这里使用Apache的FileUtils方法来进行保存
                    FileUtils.copyInputStreamToFile(myfiles.getInputStream(), new File(realPath, originalFilename));
                    resMap.put("code", 200);
                    resMap.put("msg", "上传成功");
                    resMap.put("filename", originalFilename);
                    resMap.put("path", basePath + "/upload/"+originalFilename );

                } catch (IOException e) {
                    resMap.put("code", 500);
                    System.out.println("文件上传失败");
                    resMap.put("msg", "文件上传失败");
                    e.printStackTrace();
                }
            }

        }

        String param= JSON.toJSONString(resMap);
        System.out.println(param);
        return resMap;
    }

}
