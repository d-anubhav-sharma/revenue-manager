package com.revenue.report.services;

import java.util.Objects;

import org.springframework.stereotype.Service;

@Service
public class UserMessageService {

	public String fieldCannotBeNull(String fieldName) {
		Objects.requireNonNull(fieldName);
		return fieldName + " cannot be null";
	}
	
}
