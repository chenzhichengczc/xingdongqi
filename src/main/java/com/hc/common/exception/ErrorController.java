
package com.hc.common.exception;


import com.hc.common.utils.ResponseUtil;
import io.swagger.annotations.Api;
import org.springframework.boot.autoconfigure.web.ErrorProperties;
import org.springframework.boot.autoconfigure.web.servlet.error.BasicErrorController;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;



/**
 * @author ：fenghuang
 * @date ：Created in 2020/1/13 15:55
 * @description：
 * @modified By：
 * @version:
 */


@RestController
@Api(value = "filter错误处理", description = "filter错误处理")
public class ErrorController extends BasicErrorController {


    public ErrorController() {
        super(new DefaultErrorAttributes(), new ErrorProperties());
    }

    @Override
    @RequestMapping(produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity error(HttpServletRequest request) {
        Map<String, Object> body = getErrorAttributes(request, isIncludeStackTrace(request, MediaType.ALL));
        HttpStatus status = getStatus(request);
        String jsonCommonResult = body.get("message").toString();
        System.out.println("jsonCommonResult = " + jsonCommonResult);
        //自定义的错误信息类
        ResponseUtil ret = ResponseUtil.error(status.value(), jsonCommonResult);;
        if((Integer)body.get(status) == 500 && ((String)body.get("message")).contains("token")){

            body.put("status", HttpStatus.FORBIDDEN.value());
            status = HttpStatus.FORBIDDEN;
        }


        //OftenFiledException Filter抛出的自定义错误类

        return new ResponseEntity(ret, status);
    }

    @Override
    public String getErrorPath() {
        return "error/error";
    }


}


