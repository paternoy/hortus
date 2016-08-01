package com.coopnex.hortus.rest.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.coopnex.hortus.data.entity.Category;
import com.coopnex.hortus.service.CategoryService;
import com.coopnex.scrab.rest.controller.CrudController;

@Controller
@RequestMapping("/api/categories")
public class CategoryRestController extends CrudController<Category, Long> {
	private static Logger log = LoggerFactory
			.getLogger(CategoryRestController.class);
	
	@Autowired
	private CategoryService service;
	
	@Override
	protected CategoryService getService() {
		return service;
	}
}
