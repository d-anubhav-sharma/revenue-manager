package com.revenue.report.filters;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CorsFilter extends OncePerRequestFilter{

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		response.addHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true");
		response.addHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "*");
		response.addHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "*");
		response.addHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, getOrigin(request));
		filterChain.doFilter(request, response);
	}

	private String getOrigin(HttpServletRequest request) {
		return or(request.getHeader(HttpHeaders.ORIGIN), request.getHeader(HttpHeaders.HOST));
	}

	private String or(String val1, String val2) {
		if(val1==null || val1.isBlank()) return val2;
		return val1;
	}

}
