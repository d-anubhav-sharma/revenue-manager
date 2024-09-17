package com.revenue.report.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.revenue.report.config.entities.RevenueData;
import com.revenue.report.services.RevenueDataService;

@RestController
@RequestMapping("/revenue")
public class RevenueDataController {

	private RevenueDataService revenueDataService;
	
	public RevenueDataController(RevenueDataService revenueDataService) {
		super();
		this.revenueDataService = revenueDataService;
	}

	@GetMapping
	public List<RevenueData> findAllRevenues(){
		return revenueDataService.findAllRevenues();
	}
	
	@PostMapping
	public RevenueData updateRevenueData(@RequestBody RevenueData revenueData) {
		return revenueDataService.create(revenueData);
	}

	@PostMapping("/bulk")
	public List<RevenueData> updateRevenueDataInBulk(@RequestBody List<RevenueData> revenueDataList) {
		return revenueDataService.createAll(revenueDataList);
	}
	
}
