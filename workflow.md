

    2024-07-05: first commit
    
    2024-07-10: revise list organization to enhance readability


1. call[handler](src/handling/handle.ts)
2. call [fetchHandler](src/handling/fetch.ts)
   - call [fetchFlyerList](src/fetching/fetchFlyer.ts)
     - return flyer list, throw error if failed
   - for each flyer, call [fetchProductDetailsHandler](src/handling/fetch.ts)
     - call [extractProductCodeList](src/handling/extract.ts)
       - return all product code list extracted from flyer
     - call [fetchProductDetailsList](src/fetching/fetchFlyer.ts)
       - return product details of the all product from product code list
     - return product details list / null
     - return null if caught error
   - push flyer to new filtered flyer list and assign fetched product details list to flyer only if the fetched product details list is not null / empty
   - throw error if all fetched product list are null / empty
   - throw error if caught error
   - return filtered flyer list each with list of product details

3. for each fetched flyer call [parseAndUpdate](src/handling/parseAndUpdate.ts)
   - database connection : Avien MySQL DataBase with Drizzle ORM using [db](src/db/db.ts)
   - call [parseFlyer](src/parsing/flyer.ts)
     - return parsed flyer data / null
   - return false if failed to parse flyer as no information for further action
   - call [processFlyer](src/services/service.ts)
     - call [getFlyerID](src/db/tables/flyer.ts)
       - return exsiting flyerID / null
     - return exsiting flyerID and isNew = false if existed flyer
     - call [addFlyer](src/db/tables/flyer.ts)
       - return new flyer id / null
     - return exsiting flyerID and isNew = false
     - return null and isNew = false if caught error
   - return false if fail to process flyer
   - call [processFlyerStore](src/services/service.ts)
     - call [getStoreID](src/db/tables/store.ts)
       - return if store is not in database
     - otherwise, call [addFlyerStore](src/db/tables/flyerStore.ts)
       - no return as all operations done by Drizzle ORM
   - return false if flyer already existed (isNew = false)
   - for each productdetail object from the flyer's productDetailsList call [parseAndUpdateProduct](src/handling/parseAndUpdate.ts)
     - call [parseProduct](src/parsing/product.ts)
       - return parsed product data or return null if caught error
     - call [parsePriceHistory](src/parsing/priceHistory.ts)
       - return parsed price data or return null if caught error
     - call [parsePointHistory](src/parsing/pointHistory.ts)
       - return parsed point data or return null if caught error
     - return false if fail to parse product
     - call [processProduct](src/services/service.ts)
       - call [getProductID](src/db/tables/product.ts)
         - return exsiting product ID / null
       - return exsiting product ID if existed product
       - call [addProduct](src/db/tables/product.ts)
         - call [handleImage](src/db/handleImage/handleImage.ts)
           - return uploaded image url (host by cloundinary)
         - return new product id / null
       - return new product id / null 
     - return false if fail to process product 
     - call [processPriceHistory](src/services/service.ts) if price data successfully parsed
       - call [getPriceHistoryID](src/db/tables/priceHistory.ts)
         - return exsiting price ID / null
       - return exsiting price ID if existed price record
       - call [addPriceHistory](src/db/tables/priceHistory.ts)
         - return new price id / null
       - return new price id / null
     - call [processPointHistory](src/services/service.ts) if price data successfully parsed
       - call [getPointHistoryID](src/db/tables/pointHistory.ts)
         - return exsiting point ID / null
       - return exsiting point ID if existed point record
       - call [addPointHistory](src/db/tables/pointHistory.ts)
         - return new point id / null
       - return new point id / null
     - return true or return false if caught error
   - return false if all fail to parse and update product
   - return true or return false if caught error

4. throw error if all flyers are fail to parse and update product 
5. catch and throw error
   


