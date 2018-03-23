package com.util;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by leolin on 11/9/2017.
 */
public class ExcelReadToObjList {

    /**
     * 根据文件路径 或者input流读取excel表中的内容（兼容所有版本）
     * @param file
     * @param ips
     * @return
     * @throws IOException
     */
    public static List<List<Object>> readExcel(String file,InputStream ips) throws Exception {
        List<List<Object>> list = new ArrayList<List<Object>>();
        // 构造 XSSFWorkbook 对象，strPath 传入文件路径
        Workbook wbbook = null;
        if(StringUtils.isNotEmpty(file)) {
            File xlsFile = new File(file);
            wbbook = WorkbookFactory.create(xlsFile);
        }else{
            wbbook = WorkbookFactory.create(ips);
        }

        // 读取第一章表格内容
        Sheet sheet = wbbook.getSheetAt(0);
        Object value = null;
        Row row = null;
        Cell cell = null;
        int counter = 0;
        for (int i = sheet.getFirstRowNum(); counter < sheet.getPhysicalNumberOfRows(); i++) {
            row = sheet.getRow(i);
            if (row == null) {
                continue;
            } else {
                counter++;
            }
            List<Object> linked = new ArrayList<Object>(14);
            //定死10列
            for (int j = 0; j <= 13; j++) {
                cell = row.getCell(j);
                if (cell == null || StringUtils.isBlank(cell.toString())) {
                    linked.add(j,"");
                    continue;
                }
                DecimalFormat df = new DecimalFormat("0");// 格式化 number String
                switch (cell.getCellType()) {
                    case XSSFCell.CELL_TYPE_STRING:
                        value = StringUtil.trim(cell.getStringCellValue());
                        break;
                    case XSSFCell.CELL_TYPE_NUMERIC:
                        value = df.format(cell.getNumericCellValue());
                        break;
                    case XSSFCell.CELL_TYPE_BOOLEAN:
                        value = cell.getBooleanCellValue();
                        break;
                    case XSSFCell.CELL_TYPE_BLANK:
                        value = "";
                        break;
                    default:
                        value = StringUtil.trim(cell.toString());
                }

                linked.add(j,value);
            }
            list.add(linked);
        }
        return list;
    }

}
