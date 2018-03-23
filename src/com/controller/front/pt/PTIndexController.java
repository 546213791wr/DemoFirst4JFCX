package com.controller.front.pt;

import com.service.StatisticsService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.support.WebContentGenerator;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
@RequestMapping("pt-index")
public class PTIndexController extends WebContentGenerator {
    @Resource
    private StatisticsService statisticsService;

    /**首页
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @RequestMapping
    public String index(HttpServletRequest request, HttpServletResponse response, Model model){
        String cityCode = "350300";
        Map<String,Integer> dataCount = statisticsService.getStatistics(cityCode);
        model.addAttribute("dataCount", dataCount);
        return "pt/index2";
    }

    @SuppressWarnings({ "unchecked", "rawtypes" })
    @RequestMapping("cityReport")
    public String cityReport(HttpServletRequest request, HttpServletResponse response, Model model){
        return "pt/cityReport";
    }
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @RequestMapping("countyReport")
    public String countyReport(HttpServletRequest request, HttpServletResponse response, Model model){
        return "pt/countyReport";
    }
    @SuppressWarnings({ "unchecked", "rawtypes" })
    @RequestMapping("schoolReport")
    public String schoolReport(HttpServletRequest request, HttpServletResponse response, Model model){
        return "pt/schoolReport";
    }
}
