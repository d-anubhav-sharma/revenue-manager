package com.revenue.report.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.revenue.report.config.entities.RevenueData;
import com.revenue.report.services.impl.RevenueDataDocumentServiceImpl;

@RestController
@RequestMapping("/revenue/document")
public class RevenueDataDocumentController {
	
	private RevenueDataDocumentServiceImpl revenueDataDocumentServiceImpl;

	public RevenueDataDocumentController(RevenueDataDocumentServiceImpl revenueDataDocumentServiceImpl) {
		super();
		this.revenueDataDocumentServiceImpl = revenueDataDocumentServiceImpl;
	}

	@PostMapping("/load")
	public Map<String, List<RevenueData>> loadExcelData(@RequestParam("file") MultipartFile file){
		return revenueDataDocumentServiceImpl.parseFileToGetRevenueList(file);
	}
}
