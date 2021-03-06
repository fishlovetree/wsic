package com.ws.wsic.elec.api;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

@SpringBootApplication
@MapperScan(value= {"com.ws.wsic.elec.api.mapper"}) 
@EnableRedisHttpSession
@EnableEurekaClient
@EnableFeignClients
public class WsicApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsicApplication.class, args);
	}

}
