/*
 Navicat Premium Data Transfer

 Source Server         : leemulus
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : serverless

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 12/10/2023 11:29:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dirs
-- ----------------------------
DROP TABLE IF EXISTS `dirs`;
CREATE TABLE `dirs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  `port` varchar(255) DEFAULT NULL,
  `dir` varchar(255) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `is_primary` varchar(255) DEFAULT NULL,
  `primary_id` int DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `release_version` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dirs
-- ----------------------------
BEGIN;
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (1, '1', '3401', '', 15902, '2023-09-06 21:18:39', '2023-09-06 21:18:41', '1', NULL, '测试111', '1');
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (3, '3', '3412', 'chelizichen', 89404, '2023-09-07 00:10:50', '2023-09-07 00:10:52', '0', 1, '测试111', '1');
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (5, '1', '3402', '', NULL, '2023-09-10 16:49:20', '2023-09-10 16:49:23', '2', NULL, '测试111', '1');
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (8, NULL, NULL, '', 1, '2023-09-18 20:40:11', '2023-09-18 20:40:11', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (9, NULL, NULL, '', 1, '2023-09-18 20:40:52', '2023-09-18 20:40:52', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (10, NULL, NULL, '', 1, '2023-09-18 20:47:52', '2023-09-18 20:47:52', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (11, NULL, NULL, '', 1, '2023-09-18 20:48:28', '2023-09-18 20:48:28', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (12, NULL, NULL, 'leemulus/ces111', 1, '2023-09-18 20:48:50', '2023-09-18 20:48:50', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (13, NULL, NULL, 'ces111/ces1112', 1, '2023-09-18 22:48:55', '2023-09-18 22:48:55', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (14, NULL, NULL, 'ces111/ces123123', 1, '2023-09-18 22:49:11', '2023-09-18 22:49:11', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (15, NULL, NULL, 'ces111/ces222', 1, '2023-09-18 22:59:28', '2023-09-18 22:59:28', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (16, NULL, NULL, 'leemulus/ces111/ces222', 1, '2023-09-18 23:00:11', '2023-09-18 23:00:11', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (17, NULL, NULL, 'leemulus/ces111/ces222/ces2333', 1, '2023-09-18 23:00:20', '2023-09-18 23:00:20', '0', NULL, NULL, NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (23, '2', '10016', 'TarsusUserServer', 62560, '2023-09-22 23:14:49', '2023-09-22 23:14:49', '0', 1, 'Tarsus用户服务', '1.0');
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`, `description`, `release_version`) VALUES (24, NULL, NULL, 'TarsusUserServer/UserService', 1, '2023-09-22 23:15:09', '2023-09-22 23:15:09', '0', NULL, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for performance_monitoring
-- ----------------------------
DROP TABLE IF EXISTS `performance_monitoring`;
CREATE TABLE `performance_monitoring` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `port` int NOT NULL,
  `request_start_time` timestamp NOT NULL,
  `response_time_ms` float NOT NULL,
  `request_parameters` text,
  `response_body_length` int NOT NULL,
  `response_status_code` int NOT NULL,
  `request_url` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of performance_monitoring
-- ----------------------------
BEGIN;
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (1, 8080, '2023-09-10 09:19:52', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:19:51');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (2, 8080, '2023-09-10 09:19:53', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:19:52');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (3, 8080, '2023-09-10 09:19:53', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:19:53');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (4, 8080, '2023-09-10 09:19:54', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:19:53');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (5, 8080, '2023-09-10 09:19:54', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:19:54');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (6, 8080, '2023-09-10 09:19:55', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:19:54');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (7, 8080, '2023-09-10 09:27:18', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:27:17');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (8, 8080, '2023-09-10 17:36:57', 0, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:36:57');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (9, 8080, '2023-09-10 17:38:23', 0.0112418, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:38:23');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (10, 8080, '2023-09-10 17:39:35', 0.0217046, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 17:39:35');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (11, 3411, '2023-09-10 21:08:15', 0.00677646, '{\"userId\":\"1\"}', 92, 200, '/proxy/leemulus/ping', '2023-09-10 21:08:15');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (12, 3411, '2023-09-10 21:21:18', 0.0180653, '{\n    \"userId\":\"1\"\n}', 92, 200, '/proxy/leemulus/ping', '2023-09-10 21:21:18');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (13, 3411, '2023-09-10 21:21:39', 0.0180653, '{\n    \"userId\":\"1\"\n}', 92, 200, '/proxy/leemulus/ping', '2023-09-10 21:21:39');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (14, 3411, '2023-09-10 21:24:43', 0.035202, '{\n    \"userId\":\"1\"\n}', 47, 200, '/leemulus/ping', '2023-09-10 21:24:43');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (15, 8080, '2023-09-13 15:51:25', 0.021128, '{\"userId\":\"1\"}', 96, 200, '/proxy/leemulus/testping', '2023-09-13 15:51:25');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (16, 3411, '2023-09-13 15:53:35', 0.0154531, '{\"userId\":\"1\"}', 35, 200, '/leemulus/testping', '2023-09-13 15:53:35');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (17, 3411, '2023-09-13 15:55:52', 0.010889, '{\"userId\":\"1\"}', 93, 200, '/leemulus/testping111', '2023-09-13 15:55:52');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (18, 3411, '2023-09-13 15:56:04', 0.00744317, '{\"userId\":\"1\"}', 93, 200, '/leemulus/testping111', '2023-09-13 15:56:04');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (19, 3411, '2023-09-13 15:59:32', 0.0269483, '{\"userId\":\"1\"}', 47, 200, '/leemulus/aaa', '2023-09-13 15:59:32');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (20, 3411, '2023-09-13 16:18:46', 0.0185303, '{\"userId\":\"1\"}', 50, 200, '/leemulus/bbb', '2023-09-13 16:18:46');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (21, 3411, '2023-09-13 16:20:19', 0.0169322, '{\"userId\":\"1\"}', 50, 200, '/leemulus/bbb', '2023-09-13 16:20:19');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (22, 3411, '2023-09-13 16:21:22', 0.0027435, '{\"userId\":\"1\"}', 50, 200, '/leemulus/bbb', '2023-09-13 16:21:22');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (23, 3411, '2023-09-13 16:21:37', 0.0157561, '{\"userId\":\"1\"}', 50, 200, '/leemulus/bbb', '2023-09-13 16:21:37');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (24, 3411, '2023-09-13 16:21:38', 0.0145735, '{\"userId\":\"1\"}', 47, 200, '/leemulus/aaa', '2023-09-13 16:21:39');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (25, 3411, '2023-09-13 16:21:43', 0.0091205, '{\"userId\":\"1\"}', 35, 200, '/leemulus/test', '2023-09-13 16:21:43');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (26, 3411, '2023-09-13 22:04:44', 0.0332003, '{\"userId\":\"1\"}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:04:44');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (27, 3411, '2023-09-13 22:04:50', 0.018669, '{\"userId\":1}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:04:50');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (28, 3411, '2023-09-13 22:04:50', 0.0102084, '{\"userId\":1}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:04:50');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (29, 3411, '2023-09-13 22:04:52', 0.00949175, '{\"userId\":2}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:04:52');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (30, 3411, '2023-09-13 22:04:54', 0.00990142, '{\"userId\":3}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:04:54');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (31, 3411, '2023-09-13 22:05:50', 0.00722646, '{\"userId\":3}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:05:50');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (32, 3411, '2023-09-13 22:05:50', 0.0134869, '{\"userId\":3}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:05:50');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (33, 3411, '2023-09-13 22:05:50', 0.0153047, '{\"userId\":3}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:05:51');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (34, 3411, '2023-09-13 22:24:45', 0.0187804, '{\"userId\":100}', 50, 200, '/leemulus/invokeDemo', '2023-09-13 22:24:45');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (35, 3411, '2023-09-13 22:24:45', 0.0229044, '{\"userId\":100}', 50, 200, '/leemulus/invokeDemo', '2023-09-13 22:24:45');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (36, 3411, '2023-09-13 22:24:47', 0.0207192, '{\"userId\":100}', 50, 200, '/leemulus/invokeDemo', '2023-09-13 22:24:47');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (37, 3411, '2023-09-13 22:24:55', 0.0248261, '{\"userId\":\"100\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-13 22:24:55');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (38, 3411, '2023-09-13 22:24:55', 0.0155853, '{\"userId\":\"100\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-13 22:24:55');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (39, 3411, '2023-09-13 22:25:30', 0.0222348, '{\"userId\":\"100\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-13 22:25:30');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (40, 3411, '2023-09-13 22:25:45', 0.0227869, '{\"userId\":\"1\"}', 81, 200, '/leemulus', '2023-09-13 22:25:45');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (41, 3411, '2023-09-13 22:25:46', 0.0193744, '{\"userId\":\"1\"}', 81, 200, '/leemulus', '2023-09-13 22:25:46');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (42, 3411, '2023-09-13 22:25:57', 0.0239265, '{\"userId\":\"1\"}', 81, 200, '/leemulus', '2023-09-13 22:25:57');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (43, 3411, '2023-09-13 22:25:57', 0.0186666, '{\"userId\":\"1\"}', 81, 200, '/leemulus', '2023-09-13 22:25:57');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (44, 3411, '2023-09-13 22:26:02', 0.00352762, '{\"userId\":\"1\"}', 81, 200, '/leemulus', '2023-09-13 22:26:02');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (45, 3411, '2023-09-13 22:26:08', 0.011465, '{\"userId\":\"1\"}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:26:08');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (46, 3411, '2023-09-13 22:26:12', 0.0113813, '{\"userId\":\"1\"}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:26:12');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (47, 3411, '2023-09-13 22:26:12', 0.00911062, '{\"userId\":\"1\"}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:26:12');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (48, 3411, '2023-09-13 22:26:12', 0.0121013, '{\"userId\":\"1\"}', 48, 200, '/leemulus/invokeDemo', '2023-09-13 22:26:12');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (49, 3411, '2023-09-14 23:50:59', 0.0343626, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:50:59');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (50, 3411, '2023-09-14 23:51:21', 0.0139392, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:51:21');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (51, 3411, '2023-09-14 23:51:27', 0.00867763, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:51:27');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (52, 3411, '2023-09-14 23:51:27', 0.00700458, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:51:27');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (53, 3411, '2023-09-14 23:51:27', 0.00855504, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:51:27');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (54, 3411, '2023-09-14 23:51:36', 0.0110262, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:51:36');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (55, 3411, '2023-09-14 23:51:47', 0.00396662, '{\"userId\":\"1111\"}', 50, 200, '/leemulus/invokeDemo', '2023-09-14 23:51:47');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (56, 3411, '2023-09-14 23:52:29', 0.00828875, '{\"userId\":\"111\"}', 81, 200, '/leemulus', '2023-09-14 23:52:29');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (57, 3411, '2023-09-14 23:52:30', 0.00848192, '{\"userId\":\"111\"}', 81, 200, '/leemulus', '2023-09-14 23:52:30');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (58, 3411, '2023-09-14 23:52:30', 0.00437646, '{\"userId\":\"111\"}', 81, 200, '/leemulus', '2023-09-14 23:52:30');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (59, 3411, '2023-09-14 23:52:35', 0.00799204, '{\"userId\":\"111\"}', 81, 200, '/leemulus', '2023-09-14 23:52:35');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (60, 3411, '2023-09-14 23:52:45', 0.00530046, '{\"userId\":\"111\"}', 47, 200, '/leemulus/invokeDemo', '2023-09-14 23:52:45');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (61, 3411, '2023-09-15 00:00:17', 0.0213524, '{\"userId\":\"1111\"}', 48, 200, '/leemulus/invokeDemo', '2023-09-15 00:00:17');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (62, 10001, '2023-09-22 15:28:03', 0.0302005, '{\"id\":\"1\"}', 97, 200, '/TarsusCacheServer/server', '2023-09-22 15:28:03');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (63, 10001, '2023-09-22 15:28:09', 0.0209083, '{\"id\":\"1\"}', 97, 200, '/TarsusCacheServer/server', '2023-09-22 15:28:09');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (64, 10001, '2023-09-22 15:28:14', 0.00362829, '{\"id\":\"1\"}', 97, 200, '/TarsusCacheServer/server', '2023-09-22 15:28:14');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (65, 10001, '2023-09-22 15:28:24', 0.00705412, '{\"id\":\"1\"}', 97, 200, '/TarsusCacheServer/server', '2023-09-22 15:28:24');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (66, 10001, '2023-09-22 15:28:32', 0.00657079, '{\"id\":\"1\"}', 97, 200, '/TarsusCacheServer/server', '2023-09-22 15:28:32');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (67, 10001, '2023-09-22 15:58:35', 0.0207436, '{\"id\":\"1\"}', 2, 200, '/TarsusCacheServer/server', '2023-09-22 15:58:35');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (68, 10001, '2023-09-22 16:00:32', 0.00857942, '{\"id\":\"1\"}', 2, 200, '/TarsusCacheServer/server', '2023-09-22 16:00:32');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (69, 10001, '2023-09-22 16:00:37', 0.00288162, '{\"id\":\"1\"}', 2, 200, '/TarsusCacheServer/server', '2023-09-22 16:00:37');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (70, 10001, '2023-09-22 16:01:23', 0.0119646, '{\"id\":\"1\"}', 2, 200, '/TarsusCacheServer/server', '2023-09-22 16:01:23');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (71, 10001, '2023-09-22 16:01:28', 0.00896588, '{\"id\":\"1\"}', 2, 200, '/TarsusCacheServer/server', '2023-09-22 16:01:28');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (72, 10001, '2023-09-22 16:02:19', 0.0103357, '{\"id\":\"1\"}', 2, 200, '/TarsusCacheServer/server', '2023-09-22 16:02:19');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (73, 10001, '2023-09-22 16:03:10', 0.0175163, '{\"id\":\"1\"}', 32, 200, '/TarsusCacheServer/server', '2023-09-22 16:03:10');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (74, 10001, '2023-09-22 16:03:16', 0.012084, '{\"id\":\"1\"}', 32, 200, '/TarsusCacheServer/server', '2023-09-22 16:03:16');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (75, 10001, '2023-09-22 16:04:01', 0.0146346, '{\"id\":\"1\"}', 30, 200, '/TarsusCacheServer/server', '2023-09-22 16:04:01');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (76, 10001, '2023-09-22 16:04:59', 0.0182941, '{\"id\":\"1\"}', 30, 200, '/TarsusCacheServer/server', '2023-09-22 16:04:59');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (77, 10001, '2023-09-22 16:06:13', 0.0209351, '{\"id\":\"1\"}', 46, 200, '/TarsusCacheServer/server', '2023-09-22 16:06:13');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (78, 10001, '2023-09-22 16:06:20', 0.0195518, '{\"id\":\"1\"}', 46, 200, '/TarsusCacheServer/server', '2023-09-22 16:06:20');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (79, 10001, '2023-09-22 16:07:55', 0.00815554, '{\"id\":\"1\"}', 46, 200, '/TarsusCacheServer/server', '2023-09-22 16:07:55');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (80, 10001, '2023-09-22 16:11:36', 0.0118609, '{\"id\":\"1\"}', 46, 200, '/TarsusCacheServer/server', '2023-09-22 16:11:36');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (81, 10016, '2023-09-22 23:19:17', 0.0377594, '{\"id\":\"1\"}', 2, 200, '/TarsusUserServer/getById', '2023-09-22 23:19:17');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (82, 10016, '2023-09-22 23:19:23', 0.00693346, '{\"id\":\"1\"}', 2, 200, '/TarsusUserServer/getById', '2023-09-22 23:19:23');
INSERT INTO `performance_monitoring` (`id`, `port`, `request_start_time`, `response_time_ms`, `request_parameters`, `response_body_length`, `response_status_code`, `request_url`, `created_at`) VALUES (83, 10016, '2023-09-22 23:20:39', 0.0251213, '{\"id\":\"1\"}', 73, 200, '/TarsusUserServer/getById', '2023-09-22 23:20:39');
COMMIT;

-- ----------------------------
-- Table structure for release_package
-- ----------------------------
DROP TABLE IF EXISTS `release_package`;
CREATE TABLE `release_package` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dir_id` int NOT NULL,
  `user_id` int NOT NULL,
  `package_version` varchar(255) DEFAULT NULL,
  `package_path` varchar(255) DEFAULT NULL,
  `package_info` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`,`dir_id`,`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of release_package
-- ----------------------------
BEGIN;
INSERT INTO `release_package` (`id`, `dir_id`, `user_id`, `package_version`, `package_path`, `package_info`, `create_time`) VALUES (1, 2, 2, '1', NULL, '测试打包', '2023-09-19 09:31:14');
INSERT INTO `release_package` (`id`, `dir_id`, `user_id`, `package_version`, `package_path`, `package_info`, `create_time`) VALUES (2, 2, 2, '1', NULL, '测试打包', '2023-09-19 09:36:24');
INSERT INTO `release_package` (`id`, `dir_id`, `user_id`, `package_version`, `package_path`, `package_info`, `create_time`) VALUES (3, 2, 2, '1', NULL, '测试打包', '2023-09-19 20:05:48');
COMMIT;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (1, 'admin', '123456', '1347290221@qq.com', '13476973442', '999', '2023-11-12 12:11:22', '2023-11-12 12:11:22');
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (2, 'leeyun', '123456', NULL, NULL, '1', NULL, NULL);
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (3, 'leechen', '123456', NULL, NULL, '1', NULL, NULL);
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (4, 'admin1', '123456', '1347290221@qq.com	', '13476973442', '999', '2022-11-12 20:11:12', '2022-11-12 20:11:12');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
