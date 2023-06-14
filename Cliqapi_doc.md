Tata Cliq

//Page1
>List of category
* http://localhost:9121/category

>List of brands
* http://localhost:9121/brands

>Deals
* http://localhost:9121/deals

>Featured brands
* http://localhost:9121/featuredbrands

>Gadget central
* http://localhost:9121/gadgetcentral

>New arrivals
* http://localhost:9121/newarrival

//Page2
>products wrt category
* http://localhost:9121/product?categoryId=2

>products wrt category+producttype
* http://localhost:9121/filter/1?producttypeId=1

>products wrt category+price
* http://localhost:9121/filter/2?lprice=1000&hprice=1500

>products wrt category+producttype+price
* http://localhost:9121/filter/2?producttypeId=1&lprice=600&hprice=1500

>products wrt category+brand
* http://localhost:9121/filter/2?brand=louis%20philippe

//Page3
>product details
* http://localhost:9121/details/6489c08581a4d65b01d2d60b

//Page4
>order details
* http://localhost:9121/orderDetails
  {"id":[4,8,21,11]}

>placeorder
* http://localhost:9121/placeOrder

>Updateorder
* http://localhost:9121/updateOrder

>deleteorder
* http://localhost:9121/deleteOrder