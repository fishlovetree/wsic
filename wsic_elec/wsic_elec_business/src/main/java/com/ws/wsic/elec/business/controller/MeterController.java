package com.ws.wsic.elec.business.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.ws.wsic.elec.business.config.FeignService;
import com.ws.wsic.elec.business.config.RequiredPermission;
import com.ws.wsic.elec.business.model.Meter;
import com.ws.wsic.elec.business.model.User;
import com.ws.wsic.elec.business.service.MeterService;
import com.ws.wsic.elec.business.util.ResponseData;
import com.ws.wsic.elec.business.util.ResponseEnum;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/meter")
@Api(tags="电表管理类")
public class MeterController {

	@Autowired
	MeterService meterService;
	
	//远程调用系统微服务记录日志
	@Autowired
	FeignService feignService;
	
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
	@GetMapping("/getList")
	@RequiredPermission("meter:view")
	public ResponseData getList(HttpServletRequest request){
		// 从session获取用户
		HttpSession session = request.getSession();
		String json = (String)session.getAttribute("ws_admin_user");
		User user = JSON.parseObject(json, User.class); 
		List<Meter> list = meterService.getList(user.getApikey());
		return new ResponseData(ResponseEnum.SUCCESS.getCode(), "查询成功", list);
	}
	
	
	
	/**
	 * @Description 测试feign
	 * @return
	 * @Time 2019年11月18日
	 * @Author hxl
	 */
	@ApiOperation(value = "测试feign", httpMethod = "GET")
	@ApiResponses({
	    @ApiResponse(code = 1, message="查询成功"),
	    @ApiResponse(code = 0, message="查询失败")
	})
	@GetMapping("/testFeign")
	@RequiredPermission("meter:view")
	public ResponseData testFeign(){
		return feignService.addLog("测试", "测试", 1);
	}
}
