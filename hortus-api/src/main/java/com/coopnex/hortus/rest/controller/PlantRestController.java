package com.coopnex.hortus.rest.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.coopnex.hortus.data.entity.Plant;
import com.coopnex.hortus.service.PlantService;
import com.coopnex.scrab.data.blob.domain.BlobPayload;
import com.coopnex.scrab.rest.controller.CrudController;
import com.coopnex.scrab.rest.exception.ResourceNotFoundException;

@Controller
@RequestMapping("/api/plants")
public class PlantRestController extends CrudController<Plant, Long> {
	private static Logger log = LoggerFactory.getLogger(PlantRestController.class);

	@Autowired
	private PlantService service;

	@Override
	protected PlantService getService() {
		return service;
	}

	@RequestMapping(value = "/{id}/picture", method = RequestMethod.GET, produces = MediaType.IMAGE_PNG_VALUE)
	@ResponseBody
	public ResponseEntity<Resource> getPicture(@PathVariable long id) {
		BlobPayload picture = getService().getPictureFor(id);
		if (picture == null) {
			throw new ResourceNotFoundException();
		}
		HttpHeaders httpHeaders = new HttpHeaders();
		InputStreamResource inputStreamResource = new InputStreamResource(picture.getInputStream());
		httpHeaders.setContentLength(picture.getContentLength());
		return new ResponseEntity<Resource>(inputStreamResource, httpHeaders, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}/picture", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	@ResponseBody
	public ResponseEntity<String> uploadPicture(@PathVariable Long id, @RequestParam MultipartFile file) {
		try {
			final InputStream inputStream = file.getInputStream();

			BlobPayload content = new BlobPayload(inputStream, MediaType.IMAGE_PNG_VALUE, "UTF-8");
			getService().savePictureFor(id, content);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@Override
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<Plant> getById(@PathVariable Long id) {
		ResponseEntity<Plant> result = super.getById(id);
		result.getBody().setPicture(buildPictureUrl(id));
		return result;
	}

	@Deprecated
	private static String buildPictureUrl(Long id) {
		return "/api/plants/" + id + "/picture";
	}

	@Override
	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Plant> getAll() {
		List<Plant> result = super.getAll();
		for (Plant plant : result) {
			plant.setPicture(buildPictureUrl(plant.getId()));
		}
		return result;
	}

}
