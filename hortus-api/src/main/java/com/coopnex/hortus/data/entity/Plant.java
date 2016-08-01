package com.coopnex.hortus.data.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import com.coopnex.scrab.data.jpa.entity.AbstractEntity;

@Entity
public class Plant extends AbstractEntity<Long>{

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;

	String name;

	String description;

	String species;

	String picture;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "plant_category", joinColumns = {
			@JoinColumn(name = "plant_id", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "category_id", nullable = false, updatable = false) })
	Set<Category> categories;

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSpecies() {
		return species;
	}

	public void setSpecies(String species) {
		this.species = species;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "Plant [id=" + id + ", name=" + name + "]";
	}
	@Override
	public Long getId() {
		return id;
	}

}
