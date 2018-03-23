INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('14', '0', '资源管理', NULL, 'icon-columns', '资源管理', '', '1', '1', NULL);
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('15', '14', '资源管理-列表', 'resource:list', 'icon-columns', '资源管理-列表', '/resource/list', '1', '1', NULL);
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('16', '0', '机构管理', NULL, 'icon-columns', NULL, NULL, '1', '1', '2017-09-07 11:51:01');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('17', '16', '用户列表', 'organization:userlist', 'icon-columns', '用户列表', '/pk-organization/userList', '1', '1', '2017-09-07 11:51:01');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('18', '16', '角色列表', 'organization:rolelist', 'icon-columns', '权限列表', '/pk-organization/roleList', '1', '1', '2017-09-07 11:51:01');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('19', '16', '机构列表', ' organization:orglist', 'icon-columns', '机构列表', '/pk-organization/orgList', '1', '1', '2017-09-07 11:51:01');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('20', '0', '机构数据检查', '', 'icon-columns', '', NULL, '1', '1', '2017-09-08 11:06:01');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('21', '20', '数据同步', 'module:list', 'icon-columns', '数据同步', '/org-data-check/sync-data', '1', '1', '2017-09-08 11:06:01');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('22', '16', '区域管理', 'organization:unitmanage', 'icon-columns', '区域管理', '/pk-organization/areaManage', '1', '1', '2017-09-20 11:50:55');
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('23', '0', '机构数据维护', '', 'icon-columns', NULL, NULL, '1', '1', NULL);
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('24', '23', '数据同步', 'org-data-check:add', 'icon-columns', '数据同步', '/org-data-check/add', '1', '1', NULL);
INSERT INTO `pc2.0`.`t_permission` (`id`, `parent_id`, `name`, `code`, `icon_class`, `description`, `url`, `menu_status`, `status`, `create_time`) VALUES ('25', '23', '数据更新', 'org-data-check:update', 'icon-columns', '数据更新', '/org-data-check/update', '1', '1', NULL);


INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('14', '1', '14', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('15', '1', '15', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('16', '1', '16', '2017-09-07 12:58:32');
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('17', '1', '17', '2017-09-07 12:58:32');
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('18', '1', '18', '2017-09-07 12:58:32');
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('19', '1', '19', '2017-09-07 12:58:32');
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('20', '1', '20', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('21', '1', '21', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('22', '1', '22', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('23', '1', '23', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('24', '1', '24', NULL);
INSERT INTO `pc2.0`.`t_role_permission` (`id`, `role_id`, `permission_id`, `create_time`) VALUES ('25', '1', '25', NULL);


alter table plt_open_org add status INT not null default 1; -- 新增‘状态’字段
alter table plt_open_org add publish INT not null default 1;    -- 新增‘发布’字段
alter table plt_org_carousel add status INT not null default 1; -- 新增‘状态’字段
