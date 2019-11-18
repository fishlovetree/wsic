package com.ws.wsic.register;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class WsicRegisterApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsicRegisterApplication.class, args);
	}

}
