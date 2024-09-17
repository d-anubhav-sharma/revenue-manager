package com.revenue.report.services;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

import org.springframework.stereotype.Service;

import com.revenue.report.config.Constants;

@Service
public class DateService {
	
	private static final DateTimeFormatter DEFAULT_FORMATTER = DateTimeFormatter.ofPattern(Constants.DEFAULT_DATE_FORMAT);
	private UserMessageService userMessageService;
	
	public DateService(UserMessageService userMessageService) {
		super();
		this.userMessageService = userMessageService;
	}

	public String dateToString(LocalDateTime date) {
		Objects.requireNonNull(date, userMessageService.fieldCannotBeNull("date"));
		return dateToString(date, DEFAULT_FORMATTER);
	}

	public String dateToString(LocalDateTime date, String dateFormat) {
		Objects.requireNonNull(date, userMessageService.fieldCannotBeNull("date"));
		Objects.requireNonNull(dateFormat, userMessageService.fieldCannotBeNull("dateFormat"));
		return dateToString(date, DateTimeFormatter.ofPattern(dateFormat));
	}
	
	public String dateToString(LocalDateTime date, DateTimeFormatter dateFormat) {
		Objects.requireNonNull(date, userMessageService.fieldCannotBeNull("date"));
		Objects.requireNonNull(dateFormat, userMessageService.fieldCannotBeNull("dateFormat"));
		return date.format(dateFormat);
	}
		
	public LocalDateTime parseDateString(String dateString) {
		Objects.requireNonNull(dateString, userMessageService.fieldCannotBeNull("dateString"));
		return parseDateString(dateString, DEFAULT_FORMATTER);
	}

	public LocalDateTime parseDateString(String dateString, DateTimeFormatter dateFormatter) {
		Objects.requireNonNull(dateString, userMessageService.fieldCannotBeNull("dateString"));
		Objects.requireNonNull(dateFormatter, userMessageService.fieldCannotBeNull("dateFormatter"));
		return LocalDateTime.parse(dateString, dateFormatter);
	}
	
	public DayOfWeek getDayOfWeek(int year, int month, int day) {
		return LocalDateTime.of(year, month, day, 0, 0).getDayOfWeek();
	}
}
