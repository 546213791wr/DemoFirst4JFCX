package com.util;

import java.util.ArrayList;
import java.util.List;

public class IconUtil {
    private List<String>iconlist=new ArrayList<String>();
    String iconPath=Constants.ICON_PATH;


    public List<String> getIconlist() {
        iconlist.add(iconPath+"icon.png");
        iconlist.add(iconPath+"icon_01.png");
        iconlist.add(iconPath+"icon_02.png");
        iconlist.add(iconPath+"icon_03.png");
        iconlist.add(iconPath+"icon_04.png");
        iconlist.add(iconPath+"icon_05.png");
        iconlist.add(iconPath+"icon_11.png");
        iconlist.add(iconPath+"icon_12.png");
        iconlist.add(iconPath+"icon_13.png");
        iconlist.add(iconPath+"icon_14.png");
        iconlist.add(iconPath+"icon_15.png");
        iconlist.add(iconPath+"icon_16.png");
        iconlist.add(iconPath+"icon_daren.png");
        iconlist.add(iconPath+"icon_jifen.png");
        iconlist.add(iconPath+"icon_zhibo.png");
        iconlist.add(iconPath+"recommand_book_icon.png");
        iconlist.add(iconPath+"subject_icon.png");
        return iconlist;
    }
}
