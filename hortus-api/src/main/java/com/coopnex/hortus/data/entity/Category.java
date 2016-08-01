package com.coopnex.hortus.data.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.coopnex.scrab.data.jpa.entity.AbstractEntity;



@Entity
public class Category extends AbstractEntity<Long> {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	
	String name;

	@Override
	public Long getId() {
		return id;
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
		return "Category [id=" + id + ", name=" + name + "]";
	}
}
