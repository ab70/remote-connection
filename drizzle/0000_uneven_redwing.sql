CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`password` varchar(256),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
