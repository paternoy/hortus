package com.coopnex.hortus.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;

@SpringBootApplication
public class HortusWebApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(HortusWebApplication.class, args);
	}
}
