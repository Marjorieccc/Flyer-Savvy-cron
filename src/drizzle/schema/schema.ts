import { mysqlTable, primaryKey, int, varchar, date, foreignKey, index, double } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const flyer = mysqlTable("flyer", {
	flyerId: int().primaryKey().autoincrement().notNull(),
	importedFlyerId: varchar({ length: 255 }),
	validFrom: date({ mode: 'date' }),
	validTo: date({ mode: 'date' }),
});

export const flyerImage = mysqlTable("flyerImage", {
	flyerImageId: int().primaryKey().autoincrement().notNull(),
	flyerImageUrl: varchar({ length: 512 }),
	flyerId: int().references(() => flyer.flyerId),
});

export const flyerStore = mysqlTable("flyerStore", {
	flyerId: int().notNull().references(() => flyer.flyerId),
	storeId: int().notNull().references(() => store.storeId),
},
(table) => [
	primaryKey({ columns: [table.flyerId, table.storeId], name: "flyerStore_flyerId_storeId"}),
]);

export const grocery = mysqlTable("grocery", {
	groceryId: int().primaryKey().autoincrement().notNull(),
	groceryName: varchar({ length: 255 }),
});

export const pointHistory = mysqlTable("pointHistory", {
	pointHistoryId: int().primaryKey().autoincrement().notNull(),
	point: int(),
	productId: int().references(() => product.productId),
	flyerId: int().references(() => flyer.flyerId),
	pointDetails: varchar({ length: 255 }),
},
(table) => [
	index("product_id_idx").on(table.productId)
]);

export const priceHistory = mysqlTable("priceHistory", {
	priceHistoryId: int().primaryKey().autoincrement().notNull(),
	price: double(),
	unit: varchar({ length: 10 }),
	pricePerQuantity: double(),
	quantity: double(),
	memberPrice: double(),
	originalPrice: double(),
	productId: int().references(() => product.productId),
	flyerId: int().references(() => flyer.flyerId),
},
(table) => [
	index("product_id_idx").on(table.productId)
]);

export const product = mysqlTable("product", {
	productId: int().primaryKey().autoincrement().notNull(),
	importedProductCode: varchar({ length: 255 }),
	productName: varchar({ length: 255 }),
	brand: varchar({ length: 255 }),
	packageSize: int(),
	packageUnit: varchar({ length: 10 }),
	imageUrl: varchar({ length: 255 }),
	groceryId: int().references(() => grocery.groceryId),
},
(table) => [
	index("product_name_idx").on(table.productName),
	index("brand_idx").on(table.brand)
]);

export const store = mysqlTable("store", {
	storeId: int().primaryKey().autoincrement().notNull(),
	importedStoreId: varchar({ length: 255 }),
	storeName: varchar({ length: 255 }),
	address: varchar({ length: 255 }),
	postalCode: varchar({ length: 10 }),
	groceryId: int().references(() => grocery.groceryId),
});
