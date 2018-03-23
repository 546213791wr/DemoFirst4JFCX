package com.model.enums;


/**
 * 一级模块 类型枚举
 */
public enum MenuModule {

    //menu_type 2阅读  3课程  4测评  5活动  6小组
    READ("阅读", 2), COURSE("课程", 3), EVALUATION("评测", 4), ACTIVITY("活动", 5),GROUP("小组",6);


    private String name ;
    private int index ;

    private MenuModule( String name , int index ){
        this.name = name ;
        this.index = index ;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getIndex() {
        return index;
    }
    public void setIndex(int index) {
        this.index = index;
    }
    public static Integer getByName(String name){
        for (MenuModule menu : MenuModule.values()) {
            if (menu.getName().equals(name)) {
                return menu.index;
            }
        }
        return null;
    }
}
