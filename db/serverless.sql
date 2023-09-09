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

 Date: 09/09/2023 22:14:25
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of dirs
-- ----------------------------
BEGIN;
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (1, '1', '3401', '', 15902, '2023-09-06 21:18:39', '2023-09-06 21:18:41', '1', NULL);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (2, '2', '3411', 'leemulus', 89210, '2023-09-07 00:10:50', '2023-09-07 00:10:52', '0', 1);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (3, '3', '3412', 'chelizichen', 89404, '2023-09-07 00:10:50', '2023-09-07 00:10:52', '0', 1);
INSERT INTO `dirs` (`id`, `user_id`, `port`, `dir`, `pid`, `update_time`, `create_time`, `is_primary`, `primary_id`) VALUES (4, '2', '3413', 'test', 89304, NULL, NULL, NULL, 1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (1, 'admin', '123456', NULL, NULL, '999', NULL, NULL);
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (2, 'leeyun', '123456', NULL, NULL, '1', NULL, NULL);
INSERT INTO `users` (`id`, `user_name`, `password`, `email`, `phone`, `level`, `create_time`, `update_time`) VALUES (3, 'leechen', '123456', NULL, NULL, '1', NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
