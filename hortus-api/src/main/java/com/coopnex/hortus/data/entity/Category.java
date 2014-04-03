package com.coopnex.hortus.data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.coopnex.scrab.data.entity.AbstractEntity;

@Entity
@Table(name="category")
public class Category extends AbstractEntity<Long> {

	@Id
	@Column
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long id;
	
	@Column
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
