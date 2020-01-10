package com.hc.modules.information.service;



import com.baomidou.mybatisplus.service.IService;
import com.hc.modules.information.entity.InformationEntity;

import java.util.List;


/**
 * 资讯信息表
 *
 * @author fenghuang
 * @email
 * @date 2020-01-09 18:07:05
 */
public interface InformationService extends IService<InformationEntity> {

    public List<InformationEntity> getInformationList();

    public void insertInformation(InformationEntity informationEntity);

    public InformationEntity getInformationById(Integer informationId);

    public void removeInformationById(Integer informationId);

    public void updateInformation(InformationEntity informationEntity);

}

