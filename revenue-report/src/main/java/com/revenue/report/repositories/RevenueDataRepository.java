package com.revenue.report.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.revenue.report.config.entities.RevenueData;

public interface RevenueDataRepository extends JpaRepository<RevenueData, Long>{
	
	List<RevenueData> findAllByDate(String date);
	
	@Query("FROM RevenueData WHERE date BETWEEN :START_DATE AND :END_DATE")
	List<RevenueData> findAllBetweenDateRange(@Param("START_DATE") String startDate, @Param("END_DATE")String endDate);

	@Query("SELECT IFNULL(MAX(revenueId),0)+1 FROM RevenueData")	
	long findNextRevenueId();
}
