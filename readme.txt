Create database board;

use board;

CREATE TABLE `tb_board` (
  `num` int(10) NOT NULL AUTO_INCREMENT,
   `board_code` varchar(20) DEFAULT NULL,
   `subject` varchar(300) DEFAULT NULL,
   `cont` text,
   `id` varchar(50) DEFAULT NULL,
   `name` char(20) DEFAULT NULL,
   `regdate` datetime DEFAULT NULL,
   `editdate` datetime DEFAULT NULL,
   `views` int(10),
   PRIMARY KEY (`num`)
 ) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE `login_id` (
   `id` char(20) NOT NULL,
   `pwd` char(20) NOT NULL,
   `name` char(20) NOT NULL,
   `cont` text,
   `hobby` text,
   `gender` varchar(20),
   `city` char(20),
   `question` varchar(20),
   `answer` varchar(10),
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
 
create table `comment` (
   `no` int(10) NOT NULL AUTO_INCREMENT,
   `id` char(20) NOT NULL,
   `name` char(20) NOT NULL,
   `comment` text,
   `regdate` datetime DEFAULT NULL,
   `num` int(10),
   PRIMARY KEY (`no`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
 
 코드 실행전에 이걸 mysql에 쳐주고 계정 아이디 root 비밀번호 toor이 아닐시 config.js에서 user password 내용을 바꿔주면 코드 정상 작동
