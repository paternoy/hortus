package com.coopnex.hortus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.coopnex.hortus.data.entity.Plant;
import com.coopnex.hortus.data.repository.PlantRepository;
import com.coopnex.scrab.data.repository.Content;
import com.coopnex.scrab.data.repository.IContentRepository;
import com.coopnex.scrab.service.CrudService;

@Service
public class PlantService extends CrudService<Plant, Long>{
	
	@Autowired
	PlantRepository plantRepository;
	
	@Autowired
	IContentRepository contentRepository;
	
	
	@Override
	protected JpaRepository<Plant, Long> getRepository() {
		return plantRepository;
	}

	public Content getPictureFor(long id) {
		Content result = contentRepository.readContent("picture", Long.toString(id));
		return result;
//		return new File("/home/xum/development/workspace/hortus/hortus-web/src/main/webapp/img/thumbnails/cucumber.jpg");
	}

}
