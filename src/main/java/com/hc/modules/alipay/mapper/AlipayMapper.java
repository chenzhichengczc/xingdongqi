package com.hc.modules.alipay.mapper;

import com.baomidou.mybatisplus.mapper.BaseMapper;
import com.hc.modules.alipay.entity.ResponseEntity;
import com.hc.modules.information.entity.InformationEntity;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 资讯信息表
 *
 * @author fenghuang
 * @email 
 * @date 2020-01-09 18:07:05
 */
public interface AlipayMapper extends BaseMapper<ResponseEntity> {


    Integer insertAlipayResponseEntity(ResponseEntity responseEntity);


}
