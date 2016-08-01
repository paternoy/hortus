package com.coopnex.hortus.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.coopnex.hortus.data.entity.Plant;
import com.coopnex.hortus.data.repository.PlantRepository;
import com.coopnex.scrab.data.blob.domain.BlobPayload;
import com.coopnex.scrab.data.blob.repository.IBlobRepository;
import com.coopnex.scrab.service.CrudService;

@Service
public class PlantService extends CrudService<Plant, Long> {

	@Autowired
	PlantRepository plantRepository;

	@Autowired
	IBlobRepository blobRepository;

	@Override
	protected JpaRepository<Plant, Long> getRepository() {
		return plantRepository;
	}

	public BlobPayload getPictureFor(long id) {
		BlobPayload result = blobRepository.retrieveBlobPayload("pictures", String.valueOf(id));
		return result;
	}

	public void savePictureFor(long id, BlobPayload content) {
		blobRepository.storeBlobPayload("pictures", String.valueOf(id), content);
	}

}
