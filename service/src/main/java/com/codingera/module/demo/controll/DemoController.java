package com.codingera.module.demo.controll;

import com.codingera.module.base.controll.ActionResult;
import com.codingera.module.demo.criteria.DemoQueryCriteria;
import com.codingera.module.demo.model.Demo;
import com.codingera.module.demo.service.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Demo
 */
@Controller
@RequestMapping("/api/demo")
public class DemoController{

	@Autowired
	private DemoService demoService;
	

	@RequestMapping
	@ResponseBody
	public ActionResult getDemo(Pageable pr){

		DemoQueryCriteria criteria = new DemoQueryCriteria();
		Page<Demo> pages =  demoService.findDemoByCriteria(pr,criteria);
		return new ActionResult(ActionResult.RESULT_SUCCESS,pages);
	}
	
	
	
	
}
