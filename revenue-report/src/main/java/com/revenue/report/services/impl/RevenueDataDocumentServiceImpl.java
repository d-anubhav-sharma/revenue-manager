package com.revenue.report.services.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.revenue.report.config.entities.RevenueData;
import com.revenue.report.services.UserMessageService;

@Service
public class RevenueDataDocumentServiceImpl {
	
	private UserMessageService userMessageService;

	public RevenueDataDocumentServiceImpl(UserMessageService userMessageService) {
		super();
		this.userMessageService = userMessageService;
	}

	public Map<String, List<RevenueData>> parseFileToGetRevenueList(MultipartFile file) {
		Objects.requireNonNull(file, userMessageService.fieldCannotBeNull("file"));
		Map<String, List<RevenueData>> revenueListMap = new HashMap<>();
		try(XSSFWorkbook workbook = new XSSFWorkbook(file.getInputStream())){
			Iterator<Sheet> sheetIterator = workbook.sheetIterator();
			while(sheetIterator.hasNext()) {
				Sheet sheet = sheetIterator.next();
				revenueListMap.put(sheet.getSheetName(), getRevenueList(sheet));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return revenueListMap;
	}

	private List<RevenueData> getRevenueList(Sheet sheet) {
		Iterator<Row> rowIterator = sheet.rowIterator();
		if(rowIterator.hasNext())rowIterator.next();
		List<RevenueData> revenues = new ArrayList<>();
		while(rowIterator.hasNext()) {
			Row row = rowIterator.next();
			String refernceValue = getString(row.getCell(0));
			if(refernceValue==null || refernceValue.isBlank()  || refernceValue.contains("Courses")) continue;
			revenues.add(RevenueData
					.builder()
					.courseName(row.getCell(0).getStringCellValue())
					.category("")
					.enquiriesCount((int)getNumeric(row.getCell(1)))
					.converted((int)getNumeric(row.getCell(2)))
					.revenueGenerated(getNumeric(row.getCell(3)))
					.build());
		}
		return revenues;
	}

	private String getString(Cell cell) {
		if(cell!=null && cell.getCellType().equals(CellType.STRING)) {
			return cell.getStringCellValue();
		}
		return "";
	}

	private double getNumeric(Cell cell) {
		if(cell==null) return 0;
		if(cell.getCellType().equals(CellType.NUMERIC)) return cell.getNumericCellValue();
		if(cell.getCellType().equals(CellType.STRING)) {
			String value = cell.getStringCellValue();
			if(value==null || value.isBlank()) return 0;
			try {
				return Double.parseDouble(value);
			}
			catch(Exception ex) {
				return 0;
			}
		}
		return 0;
	}

}
