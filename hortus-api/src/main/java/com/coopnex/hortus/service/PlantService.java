package com.coopnex.hortus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.coopnex.hortus.data.entity.Plant;
import com.coopnex.hortus.data.repository.PlantRepository;
import com.coopnex.scrab.service.CrudService;

@Service
public class PlantService extends CrudService<Plant, Long>{
	
	@Autowired
	PlantRepository plantRepository;
	
	@Override
	protected JpaRepository<Plant, Long> getRepository() {
		return plantRepository;
	}

}
