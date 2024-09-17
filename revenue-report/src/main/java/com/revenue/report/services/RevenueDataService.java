package com.revenue.report.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.revenue.report.config.entities.RevenueData;

@Service
public interface RevenueDataService {

	List<RevenueData> findAllRevenues();
	List<RevenueData> findRevenuesByDate(String date);
	List<RevenueData> findRevenuesBetweenDateRange(String startDate, String endDate);
	RevenueData findRevenueById(long id);
	RevenueData create(RevenueData revenueData);
	List<RevenueData> createAll(List<RevenueData> revenueDataList);
	
}
