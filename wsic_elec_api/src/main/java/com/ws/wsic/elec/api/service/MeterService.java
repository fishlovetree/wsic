package com.ws.wsic.elec.api.service;

import java.util.List;

import com.ws.wsic.elec.api.model.Meter;

public interface MeterService {

	/**
	 * @Description 查询电表列表
	 * @param apikey 数据权限
	 * @return
	 * @throws Exception
	 * @Time: 2019年11月16日
	 * @Author hxl
	 */
	public List<Meter> getList(String apikey);
}
