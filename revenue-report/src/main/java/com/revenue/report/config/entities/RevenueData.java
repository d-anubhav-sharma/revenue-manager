package com.revenue.report.config.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;

@Entity
@Data
@Builder
public class RevenueData {

	@Id
	private long revenueId;
	private String courseName;
	private int enquiriesCount;
	private int converted;
	private String category;
	private double revenueGenerated;
	private String date;
	private String createdTime;
	private String lastUpdatedTime;
	
	public RevenueData() {}

	public RevenueData(long revenueId, String courseName, int enquiriesCount, int converted, String category,
			double revenueGenerated, String date, String createdTime, String lastUpdatedTime) {
		super();
		this.revenueId = revenueId;
		this.courseName = courseName;
		this.enquiriesCount = enquiriesCount;
		this.converted = converted;
		this.category = category;
		this.revenueGenerated = revenueGenerated;
		this.date = date;
		this.createdTime = createdTime;
		this.lastUpdatedTime = lastUpdatedTime;
	}
}
