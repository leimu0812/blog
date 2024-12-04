-- 创建数据库
CREATE DATABASE IF NOT EXISTS blog DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE blog;

-- 用户表
CREATE TABLE `t_user` (
    `id`               bigint(20)      not null                   comment '用户ID',
    `username`         varchar(30)     not null                   comment '用户名',
    `password`         varchar(100)    default ''                 comment '密码',
    `nickname`         varchar(30)     not null                   comment '用户昵称',
    `avatar`           varchar(255)    default ''                 comment '头像URL',
    `motto`           varchar(255)    default ''                 comment '个性签名',
    `email`           varchar(50)     default ''                 comment '邮箱',
    `location`        varchar(100)    default ''                 comment '所在地',
    `github_url`      varchar(255)    default ''                 comment 'GitHub链接',
    `blog_url`        varchar(255)    default ''                 comment '博客链接',
    `status`          char(1)         default '0'                comment '状态（0正常 1禁用）',
    `del_flag`        char(1)         default '0'                comment '删除标志（0存在 2删除）',
    `login_ip`        varchar(128)    default ''                 comment '最后登录IP',
    `login_time`      datetime                                   comment '最后登录时间',
    `create_time`     datetime                                   comment '创建时间',
    `update_time`     datetime                                   comment '更新时间',
    primary key (id)
) engine=innodb comment = '用户表';

-- 文章表
CREATE TABLE `t_article` (
    `id`               bigint(20)      not null                   comment '文章ID',
    `title`            varchar(255)    not null                   comment '文章标题',
    `content`          longtext        not null                   comment '文章内容',
    `markdown_content` longtext                                   comment 'Markdown原始内容',
    `summary`          varchar(500)    default ''                 comment '文章摘要',
    `cover_img`        varchar(255)    default ''                 comment '封面图片URL',
    `category_id`      bigint(20)                                comment '分类ID',
    `author_id`        bigint(20)      not null                   comment '作者ID',
    `views`            int(11)         default 0                  comment '浏览量',
    `likes`            int(11)         default 0                  comment '点赞数',
    `comments`         int(11)         default 0                  comment '评论数',
    `is_top`           char(1)         default '0'                comment '是否置顶（0否 1是）',
    `status`           char(1)         default '0'                comment '状态（0草稿 1发布 2删除）',
    `create_time`      datetime                                   comment '创建时间',
    `update_time`      datetime                                   comment '更新时间',
    primary key (id)
) engine=innodb comment = '文章表';

-- 分类表
CREATE TABLE `t_category` (
    `category_id`       bigint(20)      not null                   comment '分类ID',
    `category_name`     varchar(50)     not null                   comment '分类名称',
    `description`       varchar(255)    default ''                 comment '分类描述',
    `icon`              varchar(50)     default ''                 comment '图标',
    `article_count`     int(11)         default 0                  comment '文章数量',
    `sort_order`        int(11)         default 0                  comment '显示顺序',
    `status`            char(1)         default '0'                comment '状态（0正常 1停用）',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (category_id)
) engine=innodb comment = '文章分类表';

-- 标签表
CREATE TABLE `t_tag` (
    `tag_id`            bigint(20)      not null                   comment '标签ID',
    `tag_name`          varchar(50)     not null                   comment '标签名称',
    `article_count`     int(11)         default 0                  comment '文章数量',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (tag_id)
) engine=innodb comment = '文章标签表';

-- 文章标签关联表
CREATE TABLE `t_article_tag` (
    `article_id`        bigint(20)      not null                   comment '文章ID',
    `tag_id`            bigint(20)      not null                   comment '标签ID',
    primary key (article_id, tag_id)
) engine=innodb comment = '文章标签关联表';

-- 评论表
CREATE TABLE `t_comment` (
    `comment_id`        bigint(20)      not null                   comment '评论ID',
    `content`           text            not null                   comment '评论内容',
    `article_id`        bigint(20)      not null                   comment '文章ID',
    `user_id`           bigint(20)      not null                   comment '评论用户ID',
    `parent_id`         bigint(20)      default null               comment '父评论ID',
    `reply_user_id`     bigint(20)      default null               comment '回复用户ID',
    `likes`             int(11)         default 0                  comment '点赞数',
    `ip_location`       varchar(100)    default ''                 comment 'IP归属地',
    `status`            char(1)         default '0'                comment '状态（0正常 1删除）',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (comment_id)
) engine=innodb comment = '文章评论表';

-- 友链表
CREATE TABLE `t_friend_link` (
    `link_id`           bigint(20)      not null                   comment '友链ID',
    `link_name`         varchar(50)     not null                   comment '网站名称',
    `link_url`          varchar(255)    not null                   comment '网站链接',
    `link_avatar`       varchar(255)    default ''                 comment '网站图标',
    `description`       varchar(255)    default ''                 comment '网站描述',
    `category`          varchar(50)     not null                   comment '分类',
    `section`           varchar(50)     default 'OTHER'            comment '所属分类板块',
    `tags`              json                                       comment '标签JSON',
    `sort_order`        int(11)         default 0                  comment '显示顺序',
    `status`            char(1)         default '0'                comment '状态（0正常 1隐藏）',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (link_id)
) engine=innodb comment = '友情链接表';

-- 系统配置表
CREATE TABLE `t_config` (
    `config_id`         bigint(20)      not null                   comment '配置ID',
    `config_key`        varchar(50)     not null                   comment '配置键',
    `config_value`      text                                       comment '配置值',
    `site_name`         varchar(50)     default ''                 comment '网站名称',
    `site_desc`         varchar(255)    default ''                 comment '网站描述',
    `start_time`        datetime                                   comment '建站时间',
    `status`            char(1)         default '0'                comment '状态（0正常 1停用）',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (config_id)
) engine=innodb comment = '系统配置表';

-- 个人信息表
CREATE TABLE `t_profile` (
    `profile_id`        bigint(20)      not null                   comment '配置ID',
    `user_name`         varchar(50)     not null                   comment '博主名称',
    `title`             varchar(100)    default ''                 comment '头衔/职称',
    `avatar`            varchar(255)    default ''                 comment '头像URL',
    `quote`             varchar(255)    default ''                 comment '个性签名/座右铭',
    `tags`              json                                       comment '个人标签',
    `skills`            json                                       comment '技能列表',
    `socials`           json                                       comment '社交链接',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (profile_id)
) engine=innodb comment = '个人信息表';

-- 建站日志表
CREATE TABLE `t_site_timeline` (
    `timeline_id`       bigint(20)      not null                   comment '日志ID',
    `title`             varchar(100)    not null                   comment '事件标题',
    `content`           varchar(500)    default ''                 comment '事件内容',
    `event_time`        datetime        not null                   comment '事件时间',
    `event_type`        varchar(20)     default 'primary'          comment '事件类型',
    `color`             varchar(20)     default ''                 comment '显示颜色',
    `status`            char(1)         default '0'                comment '状态（0显示 1隐藏）',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (timeline_id)
) engine=innodb comment = '建站日志表';

-- 网站统计表
CREATE TABLE `t_site_stats` (
    `stats_id`          bigint(20)      not null                   comment '统计ID',
    `total_views`       bigint(20)      default 0                  comment '总访问量',
    `total_users`       int(11)         default 0                  comment '总用户数',
    `total_articles`    int(11)         default 0                  comment '总文章数',
    `total_comments`    int(11)         default 0                  comment '总评论数',
    `total_likes`       int(11)         default 0                  comment '总点赞数',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (stats_id)
) engine=innodb comment = '网站统计表';

-- 访问日志表
CREATE TABLE `t_visit_log` (
    `visit_id`          bigint(20)      not null                   comment '访问ID',
    `ip_addr`           varchar(128)    default ''                 comment '访问IP',
    `user_agent`        varchar(500)    default ''                 comment '用户代理',
    `request_url`       varchar(255)    default ''                 comment '请求URL',
    `create_by`         bigint(20)      default null               comment '创建者',
    `create_time`       datetime                                   comment '创建时间',
    `update_by`         bigint(20)      default null               comment '更新者',
    `update_time`       datetime                                   comment '更新时间',
    `remark`            varchar(500)    default null               comment '备注',
    primary key (visit_id)
) engine=innodb comment = '访问日志表'; 