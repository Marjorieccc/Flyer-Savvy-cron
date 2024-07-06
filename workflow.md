For workflow documentation draft

1. call[handler](src/handling/handle.ts)
2. call [fetchHandler](src/handling/fetch.ts)
    2.1 call [fetchFlyerList](src/fetching/fetchFlyer.ts) 
        2.1.1 return flyer list, throw error if failed

    2.2 for each flyer, call [fetchProductDetailsHandler](src/handling/fetch.ts)
        2.2.1 call [extractProductCodeList](src/handling/extract.ts)
              2.2.1.1 return all product code list extracted from flyer
        2.2.2 call [fetchProductDetailsList](src/fetching/fetchFlyer.ts)
              2.2.2.1 return product details of the all product from product code list
        2.2.3 return product details list / null
        2.2.4 return null if caught error

    2.3 push flyer to new filtered flyer list and assign fetched product details list to flyer only if the fetched product details list is not null / empty
    2.4 throw error if all fetched product list are null / empty
    2.5 throw error if caught error
    2.6 return filtered flyer list each with list of product details

    **todo**: fetch and save as json file in server for further access and operations

3. for each fetched flyer call [parseAndUpdate](src/handling/parseAndUpdate.ts)
      3.1 **database connection** : Avien MySQL DataBase with Drizzle ORM using [db](src/db/db.ts)
      3.2 call [parseFlyer](src/parsing/flyer.ts)
            3.2.1 return parsed flyer data / null

      3.3 return false if failed to parse flyer as no information for further action

      3.4 call [processFlyer](src/services/service.ts)
            3.4.1 call [getFlyerID](src/db/tables/flyer.ts)
                  3.4.1.1 return exsiting flyerID / null
            3.4.2 return exsiting flyerID and isNew = false if existed flyer
            3.4.3 call [addFlyer](src/db/tables/flyer.ts)
                  3.4.3.1 return new flyer id / null
            3.4.4 return exsiting flyerID and isNew = false
            3.4.5 return null and isNew = false if caught error

      3.5 return false if fail to process flyer

      3.6 call [processFlyerStore](src/services/service.ts)
            3.6.1 call [getStoreID](src/db/tables/store.ts)
                  3.6.1.1 return if store is not in database
            3.6.2 otherwise, call [addFlyerStore](src/db/tables/flyerStore.ts)
                  3.6.2.1 no return as all operations done by Drizzle ORM
    
      3.7 return false if flyer already existed (isNew = false)
    
      3.8 for each productdetail object from the flyer's productDetailsList call [parseAndUpdateProduct](src/handling/parseAndUpdate.ts)
            3.8.1 call [parseProduct](src/parsing/product.ts)
                  3.8.1.1 return parsed product data or return null if caught error
            3.8.2 call [parsePriceHistory](src/parsing/priceHistory.ts)
                  3.8.2.1 return parsed price data or return null if caught error
            3.8.3 call [parsePointHistory](src/parsing/pointHistory.ts)
                  3.8.3.1 return parsed point data or return null if caught error
            3.8.4 return false if fail to parse product 
            3.8.5 call [processProduct](src/services/service.ts)
                  3.8.5.1 call [getProductID](src/db/tables/product.ts)
                        3.8.5.1.1 return exsiting product ID / null
                  3.8.5.2 return exsiting product ID if existed product
                  3.8.5.3 call [addProduct](src/db/tables/product.ts)
                        3.8.5.3.1 call [handleImage](src/db/handleImage/handleImage.ts)                         
                              3.8.5.3.1.1 return uploaded image url (host by cloundinary)
                        3.8.5.3.2 return new product id / null
                  3.8.5.4 return new product id / null 
            3.8.6 return false if fail to process product 
            3.8.7 call [processPriceHistory](src/services/service.ts) if price data successfully parsed
                  3.8.7.1 call [getPriceHistoryID](src/db/tables/priceHistory.ts)
                        3.8.7.1.1 return exsiting price ID / null
                  3.8.7.2 return exsiting price ID if existed price record
                  3.8.7.3 call [addPriceHistory](src/db/tables/priceHistory.ts)
                        3.8.7.3.1 return new price id / null
                  3.8.7.4 return new price id / null 
            3.8.8 call [processPointHistory](src/services/service.ts) if price data successfully parsed
                  3.8.8.1 call [getPointHistoryID](src/db/tables/pointHistory.ts)
                        3.8.5.1.1 return exsiting point ID / null
                  3.8.8.2 return exsiting point ID if existed point record
                  3.8.8.3 call [addPointHistory](src/db/tables/pointHistory.ts)
                        3.8.8.3.1 return new point id / null
                  3.8.8.4 return new point id / null 
            3.8.9 return true or return false if caught error
      3.9 return false if all fail to parse and update product 
      3.10 return true or return false if caught error

4. throw error if all flyers are fail to parse and update product 
5. catch and throw error
   


