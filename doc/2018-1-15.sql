-- 在xy_fanya_user_detail表中添加对应的aid数据
UPDATE xy_fanya_user_detail x set aid=(SELECT id from plt_open_aca  WHERE x.fid=fid) where x.fid in (SELECT y.fid from (select DISTINCT fid from plt_open_aca) y)

-- 添加学院年级表数据

INSERT into xy_aca_grade(aid,grade_id,`status`)  (SELECT p.id,x.id,x.`status` from xy_grade x join plt_open_aca p on p.fid=x.gid and x.gid is not null )