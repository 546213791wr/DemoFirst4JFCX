package com.util;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FileUtil {

	public static final int BUFSIZE = 1024 * 8; 
	
	/** 验证给定文件路径的文件是否存在
	 * @Description: 
	 * @author: 王文彬  
	 * @version: 2015年12月4日 下午1:58:11
	 * @param filePath
	 * @return boolean
	 */
	public static boolean isFileExist(String filePath){
		if(StringUtil.isEmpty(filePath)){
			return false;
		}
		File file = new File(filePath);
		return isFileExist(file);
	}
	/** 验证给定文件是否存在
	 * @Description: 
	 * @author: 王文彬  
	 * @version: 2015年12月4日 下午1:58:11
	 * @param file
	 * @return boolean
	 */
	public static boolean isFileExist(File file){
		return file.exists();
	}

	/**
	 * 读Execel
	 * @param filePath
	 * @return
	 * @throws IOException
	 */
	public static Map<String, List<List<Object>>> readExcel(String filePath) throws IOException {
		XSSFWorkbook xwb = new XSSFWorkbook(filePath);
		Map<String, List<List<Object>>> sheetMap = new HashMap<String, List<List<Object>>>();
		XSSFSheet sheet = null;
		XSSFRow row = null;
		XSSFCell cell = null;
		Object cellValue = null;
		//循环处理Execel的每个Sheet
		for (int i = 0; i < xwb.getNumberOfSheets(); i++) {
			sheet = xwb.getSheetAt(i);
			List<List<Object>> sheetList = new ArrayList<List<Object>>();
			//循环处理每个Sheet的每一行
			for (int j = sheet.getFirstRowNum(); j < sheet.getPhysicalNumberOfRows(); j++) {
				row = sheet.getRow(j);
				if (row == null) {
					continue;
				}
				List<Object> rowList = new ArrayList<Object>();
				//循环处理每行的每一列
				for (int k = row.getFirstCellNum(); k <= row.getLastCellNum(); k++) {
					cell = row.getCell(k);
					if (cell == null) {
						continue;
					}
					// 格式化 number String
					DecimalFormat df = new DecimalFormat("0");
					// 格式化日期字符串
					SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					// 格式化数字
					DecimalFormat nf = new DecimalFormat("0");
					switch (cell.getCellType()) {
						case XSSFCell.CELL_TYPE_STRING: //字符串值列
							cellValue = cell.getStringCellValue();
							break;
						case XSSFCell.CELL_TYPE_NUMERIC: //数值列
							if ("@".equals(cell.getCellStyle().getDataFormatString())) {
								cellValue = df.format(cell.getNumericCellValue());
							} else if ("General".equals(cell.getCellStyle().getDataFormatString())) {
								cellValue = nf.format(cell.getNumericCellValue());
							} else {
								cellValue = sdf.format(HSSFDateUtil.getJavaDate(cell.getNumericCellValue()));
							}
							break;
						case XSSFCell.CELL_TYPE_BOOLEAN: //Boolean值列
							cellValue = cell.getBooleanCellValue();
							break;
						case XSSFCell.CELL_TYPE_BLANK: //空值列
							cellValue = "";
							break;
						default:
							cellValue = cell.toString();
					}
					if (cellValue == null) { //以保证读出来的数据列数和模块列数一致
						cellValue = "";
					}
					rowList.add(cellValue);
				}
				sheetList.add(rowList);
			}
			sheetMap.put(sheet.getSheetName(), sheetList);
		}
		return sheetMap;
	}

}
