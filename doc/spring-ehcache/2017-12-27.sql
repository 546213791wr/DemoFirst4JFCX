-- 合并重复用户数据
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '合并重复用户数据' AND url = '/admin/org-data-check/check-combine-user');

DELETE FROM t_permission WHERE name = '合并重复用户数据' and url = '/admin/org-data-check/check-combine-user';

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '机构数据维护' and a.parent_id = 0), '合并重复用户数据', 'pltres-manage:list', 'icon-columns', '合并重复用户数据', '/admin/org-data-check/check-combine-user', '1', '1', NULL);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '合并重复用户数据' AND url = '/admin/org-data-check/check-combine-user'),null);

-- 用户用户记录表-建表语句
CREATE TABLE fanya_user_combine_record(
id int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
fid varchar(30) DEFAULT NULL,
uid varchar(50) DEFAULT NULL,
old_uid varchar(50) DEFAULT NULL,
create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);