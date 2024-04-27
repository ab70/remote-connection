ALTER TABLE `users` ADD `role` varchar(256);--> statement-breakpoint
ALTER TABLE `users` ADD `rights` varchar(256);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `email`;