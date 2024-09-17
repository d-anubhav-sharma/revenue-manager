package com.revenue.report.services.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Service;

import com.revenue.report.config.entities.RevenueData;
import com.revenue.report.repositories.RevenueDataRepository;
import com.revenue.report.services.DateService;
import com.revenue.report.services.RevenueDataService;
import com.revenue.report.services.UserMessageService;

@Service
public class RevenueDataServiceImpl implements RevenueDataService{

	private RevenueDataRepository revenueDataRepository;
	private UserMessageService userMessageService;
	private DateService dateService;
	private static AtomicLong nextRevenueId;

	public RevenueDataServiceImpl(RevenueDataRepository revenueDataRepository, UserMessageService userMessageService, DateService dateService) {
		super();
		this.revenueDataRepository = revenueDataRepository;
		this.userMessageService = userMessageService;
		this.dateService = dateService;
	}

	@Override
	public List<RevenueData> findAllRevenues() {
		return revenueDataRepository.findAll();
	}

	@Override
	public List<RevenueData> findRevenuesByDate(String date) {		
		Objects.requireNonNull(date, userMessageService.fieldCannotBeNull("date"));
		return revenueDataRepository.findAllByDate(date);
	}

	@Override
	public List<RevenueData> findRevenuesBetweenDateRange(String startDate, String endDate) {
		Objects.requireNonNull(startDate, userMessageService.fieldCannotBeNull("startDate"));
		Objects.requireNonNull(endDate, userMessageService.fieldCannotBeNull("endDate"));
		return revenueDataRepository.findAllBetweenDateRange(startDate, endDate);
	}

	@Override
	public RevenueData findRevenueById(long id) {
		Objects.requireNonNull(id, userMessageService.fieldCannotBeNull("id"));
		return revenueDataRepository.findById(id).orElse(null);
	}

	@Override
	public RevenueData create(RevenueData revenueData) {
		Objects.requireNonNull(revenueData, userMessageService.fieldCannotBeNull("revenueData"));
		populateBlankFields(revenueData);
		return revenueDataRepository.save(revenueData);
	}

	@Override
	public List<RevenueData> createAll(List<RevenueData> revenueDataList) {
		Objects.requireNonNull(revenueDataList, userMessageService.fieldCannotBeNull("revenueDataList"));
		revenueDataList.stream().forEach(this::populateBlankFields);
		return revenueDataRepository.saveAll(revenueDataList);
	}

	private void populateBlankFields(RevenueData revenueData) {
		if(revenueData.getRevenueId()==0) revenueData.setRevenueId(nextRevenueId());
		if(revenueData.getDate()==null) revenueData.setDate(dateService.dateToString(LocalDateTime.now()));
		if(revenueData.getCreatedTime()==null) revenueData.setCreatedTime(dateService.dateToString(LocalDateTime.now()));
		if(revenueData.getLastUpdatedTime()==null) revenueData.setLastUpdatedTime(dateService.dateToString(LocalDateTime.now()));
	}

	private long nextRevenueId() {
		if(nextRevenueId==null) nextRevenueId = new AtomicLong(revenueDataRepository.findNextRevenueId());
		return nextRevenueId.incrementAndGet();
	}

	

}
