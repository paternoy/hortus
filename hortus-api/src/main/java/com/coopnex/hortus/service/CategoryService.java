package com.coopnex.hortus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.coopnex.hortus.data.entity.Category;
import com.coopnex.hortus.data.repository.CategoryRepository;
import com.coopnex.scrab.service.CrudService;

@Service
public class CategoryService extends CrudService<Category, Long>{
	
	@Autowired
	CategoryRepository repository;
	
	@Override
	protected JpaRepository<Category, Long> getRepository() {
		return repository;
	}

}
