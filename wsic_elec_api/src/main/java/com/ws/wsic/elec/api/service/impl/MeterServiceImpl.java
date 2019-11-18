package com.ws.wsic.elec.api.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ws.wsic.elec.api.mapper.MeterMapper;
import com.ws.wsic.elec.api.model.Meter;
import com.ws.wsic.elec.api.service.MeterService;

@Service
public class MeterServiceImpl implements MeterService{
	
	@Autowired
	MeterMapper meterMapper;
	
	/**
	 * @Description 查询电表列表
	 * @param apikey 数据权限
	 * @return
	 * @throws Exception
	 * @Time: 2019年11月16日
	 * @Author hxl
	 */
	public List<Meter> getList(String apikey){
		return meterMapper.selectList(apikey);
	}
}