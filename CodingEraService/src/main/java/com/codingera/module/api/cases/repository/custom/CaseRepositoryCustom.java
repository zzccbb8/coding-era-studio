package com.codingera.module.api.cases.repository.custom;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.codingera.module.api.cases.criteria.CaseQueryCriteria;
import com.codingera.module.api.cases.model.Case;

public interface CaseRepositoryCustom {

	public Page<Case> findCaseByCriteria(Pageable pg, CaseQueryCriteria criteria);
}
