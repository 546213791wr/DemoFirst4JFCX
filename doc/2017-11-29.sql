-- 用户数据泛亚检查 后台功能新增 start
DELETE FROM t_role_permission WHERE permission_id = (SELECT id FROM t_permission  WHERE name = '用户数据泛亚检查' AND url = '/org-data-check/check-user-detail-fanya');

DELETE FROM t_permission WHERE name = '用户数据泛亚检查' and url = '/org-data-check/check-user-detail-fanya';

INSERT INTO t_permission ( id,parent_id, name, code, icon_class, description, url, menu_status, status, create_time)
VALUES ( (SELECT max(a.id)+1 FROM t_permission a),(SELECT a.id FROM t_permission a WHERE a.name = '机构数据维护' and a.parent_id = 0), '用户数据泛亚检查', 'pltres-manage:list', 'icon-columns', '用户数据泛亚检查', '/org-data-check/check-user-detail-fanya', '1', '1', NULL);

INSERT INTO t_role_permission(id,role_id,permission_id,create_time)
values((SELECT max(a.id)+1 FROM t_role_permission a),1,(SELECT a.id FROM t_permission a WHERE name = '用户数据泛亚检查' AND url = '/org-data-check/check-user-detail-fanya'),null);
-- 用户数据泛亚检查 后台功能新增 end