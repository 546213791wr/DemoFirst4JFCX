package com.util;

import java.util.HashMap;
import java.util.Map;

public class LongToDay {
	   public static Map LongToDay(Long temp){
		   Integer hour=0;
		   Integer minute=0;
		   String time="";
		   hour=(int) (temp/(60*60));
		   if(hour>0){
			   minute=(int) Math.round((temp%(60*60))/60);
		   }else{
			    minute=(int) (temp/60);
			    }
           Map params=new HashMap<String, Integer>();
           params.put("hour", hour);
           params.put("minute", minute);
	   return params;
   }
}
