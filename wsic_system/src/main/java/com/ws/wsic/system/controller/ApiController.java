package com.ws.wsic.system.controller;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
import com.ws.wsic.system.model.SysErrorlog;
import com.ws.wsic.system.model.SysLog;
import com.ws.wsic.system.model.User;
import com.ws.wsic.system.service.ErrorLogService;
import com.ws.wsic.system.service.LogService;
import com.ws.wsic.system.service.UserService;
import com.ws.wsic.system.util.ResponseData;
import com.ws.wsic.system.util.ResponseEnum;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/api")
@Api(tags = "服务接口类")
public class ApiController {
	
	@Autowired
	UserService userService;

	@Autowired
	LogService logService;

	@Autowired
	ErrorLogService errorLogService;
	
	/**
	 * @Description 根据账户名获取apikey
	 * @return
	 * @Time 2019年11月18日
	 * @Author hxl
	 */
	@ApiOperation(value = "根据账户名获取apikey", httpMethod = "GET")
	@ApiImplicitParams({
			@ApiImplicitParam(name = "username", value = "账户名", dataType = "String") })
	@ApiResponses({ @ApiResponse(code = 1, message = "获取成功"), @ApiResponse(code = 0, message = "获取失败") })
	@GetMapping("/getApikey")
	public ResponseData getApikey(String username) {
		User user = userService.getUserByName(username);
		if (null == user){
			return new ResponseData(ResponseEnum.NOTFOUND.getCode(), "获取失败", null);
		}
		else{
			return new ResponseData(ResponseEnum.SUCCESS.getCode(), "获取成功", user.getApikey());
		}
	}

	/**
	 * @Description 记录日志
	 * @return
	 * @throws Exception
	 * @Time 2019年11月16日
	 * @Author hxl
	 */
	@ApiOperation(value = "记录日志", httpMethod = "POST")
	@ApiImplicitParams({ @ApiImplicitParam(name = "title", value = "标题", dataType = "String"),
			@ApiImplicitParam(name = "content", value = "内容", dataType = "String"),
			@ApiImplicitParam(name = "type", value = "操作类型", dataType = "Integer") })
	@ApiResponses({ @ApiResponse(code = 1, message = "记录成功"), @ApiResponse(code = 0, message = "记录失败") })
	@PostMapping("/addLog")
	public ResponseData addLog(String title, String content, Integer type) {
		try {
			// 创建日志对象
			SysLog mLog = new SysLog();
			// 从session获取用户
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder
					.getRequestAttributes()).getRequest();
			HttpSession session = request.getSession();
			String json = (String) session.getAttribute("ws_admin_user");
			User user = JSON.parseObject(json, User.class);
			// 获取IP
			String ip = getIpAddr(request);

			mLog.setUserid(user.getId().intValue());
			mLog.setIp(ip);
			mLog.setTitle(title);
			mLog.setContent(content);
			mLog.setOpertype(type);
			mLog.setIntime(new Date());

			// 将日志存入数据库
			boolean result = logService.insert(mLog);
			if (result) {
				return new ResponseData(ResponseEnum.SUCCESS.getCode(), "记录成功", null);
			} else {
				return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
			}
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
		} catch (SecurityException e) {
			e.printStackTrace();
			return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
		}
	}

	/**
	 * @Description 记录异常
	 * @return
	 * @throws Exception
	 * @Time 2019年11月16日
	 * @Author hxl
	 */
	@ApiOperation(value = "记录异常", httpMethod = "POST")
	@ApiResponses({ @ApiResponse(code = 1, message = "记录成功"), @ApiResponse(code = 0, message = "记录失败") })
	@PostMapping("/addException")
	public ResponseData addException(Exception ex) {
		try {
			// 创建日志对象
			SysErrorlog merrorlog = new SysErrorlog();
			// 获取系统时间
			@SuppressWarnings("unused")
			SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");// 设置日期格式
			// 从session获取用户
			HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes())
					.getRequest();
			HttpSession session = request.getSession();
			String json = (String) session.getAttribute("ws_admin_user");
			User user = JSON.parseObject(json, User.class);

			// 获取IP
			String ip = getIpAddr(request);
			merrorlog.setUserid(user.getId().intValue());
			merrorlog.setIp(ip);
			String Agent = getRequestBrowserInfo(request);
			merrorlog.setBrowser(Agent);
			if (null != ex.getMessage() && ex.getMessage().length() > 1800) {
				merrorlog.setMessage(ex.getMessage().substring(0, 1800));// 异常消息
			} else {
				merrorlog.setMessage(ex.getMessage());// 异常消息
			}
			merrorlog.setStacktrace(getStackTrace(ex));// 异常堆栈
			merrorlog.setErrorclass(ex.getClass().toString());// 异常类
			merrorlog.setIntime(new Date());
			// 将日志存入数据库
			boolean result = errorLogService.insert(merrorlog);
			if (result) {
				return new ResponseData(ResponseEnum.SUCCESS.getCode(), "记录成功", null);
			} else {
				return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
			}
		} catch (NoSuchMethodException e) {
			e.printStackTrace();
			return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
		} catch (SecurityException e) {
			e.printStackTrace();
			return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseData(ResponseEnum.ERROR.getCode(), "记录失败", null);
		}
	}

	/**
	 * 获取当前网络ip(可以获取通过了Apache，Squid等反向代理软件的客户端的真实IP地址)
	 * 
	 * @param request
	 * @return
	 */
	private String getIpAddr(HttpServletRequest request) {
		String ipAddress = request.getHeader("x-forwarded-for");
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
			ipAddress = request.getRemoteAddr();
			if (ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1")) {
				// 根据网卡取本机配置的IP
				InetAddress inet = null;
				try {
					inet = InetAddress.getLocalHost();
				} catch (UnknownHostException e) {
					e.printStackTrace();
				}
				ipAddress = inet.getHostAddress();
			}
		}
		// 对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
		if (ipAddress != null && ipAddress.length() > 15) { // "***.***.***.***".length()
															// = 15
			if (ipAddress.indexOf(",") > 0) {
				ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
			}
		}
		return ipAddress;
	}

	/**
	 * 获取来访者的浏览器版本
	 * 
	 * @param request
	 * @return
	 */
	private String getRequestBrowserInfo(HttpServletRequest request) {
		String browserVersion = null;
		String agent = request.getHeader("User-Agent").toLowerCase();
		if (agent == null || agent.equals("")) {
			return "";
		}
		// System.out.print(agent);
		if (agent.indexOf("msie 7") > 0) {
			browserVersion = "IE7";
		} else if (agent.indexOf("msie 8") > 0) {
			browserVersion = "IE8";
		} else if (agent.indexOf("msie 9") > 0) {
			browserVersion = "IE9";
		} else if (agent.indexOf("msie 10") > 0) {
			browserVersion = "IE10";
		} else if (agent.indexOf("gecko") > 0 && agent.indexOf("rv:11") > 0) {
			browserVersion = "IE11";
		} else if (agent.indexOf("opera") > 0) {
			browserVersion = "Opera";
		} else if (agent.indexOf("firefox") > 0) {
			browserVersion = "Firefox";
		} else if (agent.indexOf("chrome") > 0) {
			browserVersion = "Chrome";
		} else if (agent.indexOf("webkit") > 0) {
			browserVersion = "Webkit";
		} else if (agent.indexOf("safari") > 0) {
			browserVersion = "Safari";
		} else if (agent.indexOf("camino") > 0) {
			browserVersion = "Camino";
		} else if (agent.indexOf("konqueror") > 0) {
			browserVersion = "Konqueror";
		} else {
			browserVersion = "Others";
		}
		return browserVersion;
	}

	private String getStackTrace(Throwable throwable) {
		StringWriter sw = new StringWriter();
		PrintWriter pw = new PrintWriter(sw);

		try {
			throwable.printStackTrace(pw);
			return sw.toString();
		} finally {
			pw.close();
		}
	}
}
