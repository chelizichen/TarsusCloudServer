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

 Date: 07/09/2023 01:09:27
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
  `user_name` varchar(255) DEFAULT NULL,
  `port` varchar(255) DEFAULT NULL,
  `dir` varchar(255) DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `is_primary` varchar(255) DEFAULT NULL,
  `primary_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dirs
-- ----------------------------
BEGIN;
INSERT INTO `dirs` (`id`, `user_id`, `user_name`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (1, '0', 'admin', '3401', '', 15902, '2023-09-06 21:18:39', '2023-09-06 21:18:41', '1', NULL);
INSERT INTO `dirs` (`id`, `user_id`, `user_name`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (2, '1', '李云', '3411', 'leemulus', 17668, '2023-09-07 00:10:50', '2023-09-07 00:10:52', '0', 1);
INSERT INTO `dirs` (`id`, `user_id`, `user_name`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (3, '2', '李成', '3412', 'chelizichen', 15902, '2023-09-07 00:10:50', '2023-09-07 00:10:52', '0', 1);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
