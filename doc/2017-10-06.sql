 -- 用户数对比相关表及后台模块创建 start
 CREATE TABLE user_detail_check_result (
  id int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',

  uid varchar(50) DEFAULT NULL,
  fid varchar(30) DEFAULT NULL,
  login_name varchar(50) DEFAULT NULL COMMENT '登录名',
  real_name varchar(128) DEFAULT NULL COMMENT '真实姓名',

  info_return_uid varchar(50) DEFAULT NULL COMMENT '详情接口返回的uid',
  info_return_fid varchar(30) DEFAULT NULL COMMENT '详情接口返回的fid',
  info_return_login_name varchar(50) DEFAULT NULL COMMENT '详情接口返回的登录名',
  info_return_real_name varchar(128) DEFAULT NULL COMMENT '详情接口返回的真实姓名',

  login_return_uid varchar(50) DEFAULT NULL COMMENT '登录接口返回的uid',
  login_return_fid varchar(30) DEFAULT NULL COMMENT '登录接口返回的fid',
  login_return_login_name varchar(50) DEFAULT NULL COMMENT '登录接口返回的登录名',
  login_return_real_name varchar(128) DEFAULT NULL COMMENT '登录接口返回的真实姓名',

  err_type VARCHAR(500) DEFAULT NULL COMMENT '错误类型',
  create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (id)
);


DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '用户数据检查' AND url = '/org-data-check/check-user-detail');

DELETE FROM t_permission WHERE name = '用户数据检查' and url = '/org-data-check/check-user-detail';

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '机构数据维护' and a.parent_id = 0), '用户数据检查', 'pltres-manage:list', 'icon-columns', '用户数据检查', '/org-data-check/check-user-detail', '1', '1', NULL);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '用户数据检查' AND url = '/org-data-check/check-user-detail'),null);

-- 用户数对比相关表及后台模块创建 end
