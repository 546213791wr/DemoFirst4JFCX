-- 设置权限
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission WHERE name = '模块管理' and parent_id = 0);
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '模块列表' AND url = '/module/normal-org-module-list');
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '资源分类' AND url = '/module/normal-org-classify-list');
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '模块资源' AND url = '/module/normal-org-module-pltres-list');
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission WHERE name = '资源管理' and parent_id = 0);
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '资源列表' AND url = '/pltRes/normal-org-pltres-list');

-- 添加模块
DELETE FROM t_permission WHERE name = '模块管理' and parent_id = 0;
DELETE FROM t_permission WHERE name = '模块列表' and url = '/module/normal-org-module-list';
DELETE FROM t_permission WHERE name = '资源分类' and url = '/module/normal-org-classify-list';
DELETE FROM t_permission WHERE name = '模块资源' and url = '/module/normal-org-module-pltres-list';
DELETE FROM t_permission WHERE name = '资源管理' and parent_id = 0;
DELETE FROM t_permission WHERE name = '资源列表' and url = '/pltRes/normal-org-pltres-list';

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),'0', '模块管理', '', 'icon-columns', NULL, NULL, '1', '1', NULL);

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '模块管理' and a.parent_id = 0), '模块列表', 'module-manage:list', 'icon-columns', '模块列表', '/module/normal-org-module-list', '1', '1', NULL);

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '模块管理' and a.parent_id = 0), '资源分类', 'module-manage:classify-list', 'icon-columns', '资源分类', '/module/normal-org-classify-list', '1', '1', NULL);

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '模块管理' and a.parent_id = 0), '模块资源', 'module-manage:pltres-list', 'icon-columns', '模块资源', '/module/normal-org-module-pltres-list', '1', '1', NULL);

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),'0', '资源管理', '', 'icon-columns', NULL, NULL, '1', '1', NULL);

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '资源管理' and a.parent_id = 0), '资源列表', 'pltres-manage:list', 'icon-columns', '资源列表', '/pltRes/normal-org-pltres-list', '1', '1', NULL);


INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '模块管理' and parent_id = 0),null);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '模块列表' AND url = '/module/normal-org-module-list'),null);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '资源分类' AND url = '/module/normal-org-classify-list'),null);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '模块资源' AND url = '/module/normal-org-module-pltres-list'),null);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '资源管理' and parent_id = 0),null);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '资源列表' AND url = '/pltRes/normal-org-pltres-list'),null);


