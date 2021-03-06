package com.codingera.module.api.article.model;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.codingera.module.base.model.IdEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
@Table(name = "ce_article")
// @JsonIgnoreProperties(ignoreUnknown = true)
public class Article extends IdEntity {

	/**
	 * 
	 */
	private static final long serialVersionUID = 2167007833436749963L;

	public enum Status {
		PUBLISHED, // 已发布
		SKETCH, // 草稿
		DELETED// 删除

	}

	@Column(name = "TITLE", length = 50)
	private String title;

	// 暂时用key标记文章(下个版本,做成可配置)
	@Column(name = "TARGET", length = 20)
	private String target;

	@Lob
	@Basic(fetch = FetchType.LAZY)
	@Column(name = "CONTENT")
	private String content;

	@Enumerated(EnumType.STRING)
	private Status status;

	@Transient
	public String htmlContent;

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Status getStatus() {
		return status;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getHtmlContent() {
		return htmlContent;
	}

	public void setHtmlContent(String htmlContent) {
		this.htmlContent = htmlContent;
	}

}
