package com.ws.wsic.elec.api.config;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ws.wsic.elec.api.util.ResponseData;

@FeignClient(value = "wsic-system")
public interface FeignService {

	/**
	 * @Description 远程调用系统微服务记录异常
	 * @param ex 异常对象
	 * @return
	 * @Time 2019年11月16日
	 * @Author hxl
	 */
     @GetMapping("/api/getApikey")
     public ResponseData getApikey(@RequestParam(value = "username") String username);
	
	/**
	 * @Description 远程调用系统微服务记录日志
	 * @param title 标题
	 * @param content 内容
	 * @param type 操作类型：0-删除，1-添加，2-修改
	 * @return
	 * @Time 2019年11月16日
	 * @Author hxl
	 */
	 @PostMapping("/api/addLog")
	 public ResponseData addLog(@RequestParam(value = "title") String title, @RequestParam(value = "content") String content, 
			 @RequestParam(value = "type") Integer type);
	 
	 /**
		 * @Description 远程调用系统微服务记录异常
		 * @param ex 异常对象
		 * @return
		 * @Time 2019年11月16日
		 * @Author hxl
		 */
	 @PostMapping("/api/addException")
	 public ResponseData addException(@RequestParam(value = "ex") Exception ex);
}
