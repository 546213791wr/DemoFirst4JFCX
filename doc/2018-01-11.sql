-- 用户合并version记录-建表语句
CREATE TABLE combine_version_record(
id int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
start_version varchar(30) DEFAULT NULL,
end_version varchar(30) DEFAULT NULL,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
modify_time timestamp DEFAULT NULL,
PRIMARY KEY (id)
);

-- 用户合并version记录默认起始version添加
INSERT INTO combine_version_record(start_version,create_time) VALUES('194137935',SYSDATE());