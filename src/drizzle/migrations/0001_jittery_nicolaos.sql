CREATE TABLE `point_history` (
	`point_history_id` int AUTO_INCREMENT NOT NULL,
	`point` int,
	`product_id` int,
	`flyer_id` int,
	CONSTRAINT `point_history_point_history_id` PRIMARY KEY(`point_history_id`)
);
--> statement-breakpoint
CREATE TABLE `price_history` (
	`price_history_id` int AUTO_INCREMENT NOT NULL,
	`price` decimal(10,2),
	`unit` varchar(10),
	`price_per_quantity` decimal(10,2),
	`quantity` decimal(10,4),
	`member_price` decimal(10,2),
	`original_price` decimal(10,2),
	`product_id` int,
	`flyer_id` int,
	CONSTRAINT `price_history_price_history_id` PRIMARY KEY(`price_history_id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`product_id` int AUTO_INCREMENT NOT NULL,
	`imported_product_code` varchar(255),
	`product_name` varchar(255),
	`brand` varchar(255),
	`package_size` int,
	`package_unit` varchar(10),
	`image_url` varchar(255),
	`grocery_id` int,
	CONSTRAINT `product_product_id` PRIMARY KEY(`product_id`)
);
--> statement-breakpoint
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_product_id_product_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_history` ADD CONSTRAINT `price_history_product_id_product_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_history` ADD CONSTRAINT `price_history_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_grocery_id_grocery_grocery_id_fk` FOREIGN KEY (`grocery_id`) REFERENCES `grocery`(`grocery_id`) ON DELETE no action ON UPDATE no action;