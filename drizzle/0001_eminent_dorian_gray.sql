CREATE TABLE `telegram_intake_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`chatId` varchar(64) NOT NULL,
	`telegramUsername` varchar(64),
	`displayName` varchar(255),
	`answers` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `telegram_intake_leads_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `telegram_intake_leads_created_at_idx` ON `telegram_intake_leads` (`createdAt`);--> statement-breakpoint
CREATE INDEX `telegram_intake_leads_chat_id_idx` ON `telegram_intake_leads` (`chatId`);