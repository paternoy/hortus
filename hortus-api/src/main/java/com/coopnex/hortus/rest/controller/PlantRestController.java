package com.coopnex.hortus.rest.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.coopnex.hortus.data.entity.Plant;
import com.coopnex.hortus.service.PlantService;
import com.coopnex.scrab.rest.controller.CrudController;

@Controller
@RequestMapping("/plants")
public class PlantRestController extends CrudController<Plant, Long> {
	private static Logger log = LoggerFactory
			.getLogger(PlantRestController.class);
	
	@Autowired
	private PlantService service;
	
	@Override
	protected PlantService getService() {
		return service;
	}
}
