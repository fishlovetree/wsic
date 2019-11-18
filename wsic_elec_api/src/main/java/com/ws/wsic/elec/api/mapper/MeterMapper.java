package com.ws.wsic.elec.api.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ws.wsic.elec.api.model.Meter;

public interface MeterMapper {
	
	Meter selectByPrimaryKey(Integer id);

	List<Meter> selectList(@Param("apikey")String apikey);
}