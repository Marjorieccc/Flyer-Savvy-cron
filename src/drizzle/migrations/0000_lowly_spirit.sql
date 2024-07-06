CREATE TABLE `flyer` (
	`flyer_id` int AUTO_INCREMENT NOT NULL,
	`imported_flyer_id` varchar(255),
	`flyer_name` varchar(255),
	`valid_from` date,
	`valid_to` date,
	CONSTRAINT `flyer_flyer_id` PRIMARY KEY(`flyer_id`)
);
--> statement-breakpoint
CREATE TABLE `flyer_image` (
	`flyer_image_id` int AUTO_INCREMENT NOT NULL,
	`flyer_image_url` varchar(512),
	`flyer_id` int,
	CONSTRAINT `flyer_image_flyer_image_id` PRIMARY KEY(`flyer_image_id`)
);
--> statement-breakpoint
CREATE TABLE `flyer_store` (
	`flyer_id` int NOT NULL,
	`store_id` int NOT NULL,
	CONSTRAINT `flyer_store_flyer_id_store_id_pk` PRIMARY KEY(`flyer_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `grocery` (
	`grocery_id` int AUTO_INCREMENT NOT NULL,
	`grocery_name` varchar(255),
	CONSTRAINT `grocery_grocery_id` PRIMARY KEY(`grocery_id`)
);
--> statement-breakpoint
CREATE TABLE `store` (
	`store_id` int AUTO_INCREMENT NOT NULL,
	`imported_store_id` varchar(255),
	`store_name` varchar(255),
	`address` varchar(255),
	`postal_code` varchar(10),
	`grocery_id` int,
	CONSTRAINT `store_store_id` PRIMARY KEY(`store_id`)
);
--> statement-breakpoint
ALTER TABLE `flyer_image` ADD CONSTRAINT `flyer_image_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `flyer_store` ADD CONSTRAINT `flyer_store_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `flyer_store` ADD CONSTRAINT `flyer_store_store_id_store_store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `store_grocery_id_grocery_grocery_id_fk` FOREIGN KEY (`grocery_id`) REFERENCES `grocery`(`grocery_id`) ON DELETE no action ON UPDATE no action;