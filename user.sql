/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50155
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50155
File Encoding         : 65001

Date: 2012-12-07 16:43:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `pwd` varchar(64) DEFAULT NULL,
  `sex` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('2', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('3', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('4', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('5', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('6', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('7', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('8', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('9', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('10', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('11', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('12', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('13', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('14', '卢春梦', '123456', '1');
INSERT INTO `user` VALUES ('15', '卢春梦', '123456', '1');
