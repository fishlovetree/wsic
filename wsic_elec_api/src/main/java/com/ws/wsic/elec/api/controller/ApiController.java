package com.ws.wsic.elec.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ws.wsic.elec.api.config.FeignService;
import com.ws.wsic.elec.api.model.Meter;
import com.ws.wsic.elec.api.service.MeterService;
import com.ws.wsic.elec.api.util.JWTUtil;
import com.ws.wsic.elec.api.util.ResponseData;
import com.ws.wsic.elec.api.util.ResponseEnum;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api")
@Api(tags="API接口类")
public class ApiController {
	
	@Autowired
	MeterService meterService;
	
	@Autowired
	FeignService feignService;
	
	/**
	 * @Description 获取token
	 * @return
	 * @Time 2019年11月18日
	 * @Author hxl
	 */
	@ApiOperation(value = "获取token", httpMethod = "GET")
	@ApiResponses({
	    @ApiResponse(code = 1, message="获取成功"),
	    @ApiResponse(code = 0, message="获取失败")
	})
	@GetMapping("/getToken")
	public ResponseData getToken(String username, String apikey){
		String token = JWTUtil.sign(username, apikey);
		return new ResponseData(ResponseEnum.SUCCESS.getCode(), "查询成功", token);
	}
	
	/**
	 * @Description 获取电表列表
	 * @return
	 * @Time 2019年11月18日
	 * @Author hxl
	 */
	@ApiOperation(value = "获取电表列表", httpMethod = "GET")
	@ApiResponses({
	    @ApiResponse(code = 1, message="查询成功"),
	    @ApiResponse(code = 0, message="查询失败")
	})
	@GetMapping("/getMeterList")
	public ResponseData getList(String token){
		String username = JWTUtil.getUsername(token);
		if (null == username){
			return new ResponseData(ResponseEnum.UNAUTH.getCode(), "非法的token", token);
		}
		ResponseData result = feignService.getApikey(username);
		if (null == result){
			return new ResponseData(ResponseEnum.ERROR.getCode(), "账号服务已下线", null);
		}
		String apikey = result.getData().toString();
		if (!JWTUtil.verify(token, username, apikey)){
			return new ResponseData(ResponseEnum.UNAUTH.getCode(), "非法的token", token);
		}
		List<Meter> list = meterService.getList(apikey);
		return new ResponseData(ResponseEnum.SUCCESS.getCode(), "查询成功", list);
	}
}
