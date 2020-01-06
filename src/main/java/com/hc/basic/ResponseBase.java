package com.hc.basic;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.Data;

/**
 * @author ：fenghuang
 * @date ：Created in 2019/8/16 17:44
 * @description：过滤器返回类
 * @modified By：
 * @version:
 */
@Data
public class ResponseBase {

    /**
     * 状态码
     */
    Integer code;

    /**
     * 返回信息
     */
    String msg;

    public static void main(String[] args) {
        JSONArray jsonObject = JSON.parseArray("[{\"goodsId\":115780,\"number\":1,\"propertyChildIds\":\"10529:4,\",\"logisticsType\":0, \"inviter_id\":0},{\"goodsId\":115780,\"number\":2,\"propertyChildIds\":\"10529:3,\",\"logisticsType\":0, \"inviter_id\":0}]");
        for(int i=0;i<jsonObject.size();i++){
            JSONObject jsonObject1 = jsonObject.getJSONObject(i);
            Integer goodsId = (Integer)jsonObject1.get("goodsId");
            String propertyChildIds = (String)jsonObject1.get("propertyChildIds");
            System.out.println("goodsId = " + goodsId);
            System.out.println("propertyChildIds = " + propertyChildIds);
        }
        System.out.println("jsonObject = " + jsonObject);
    }
}
