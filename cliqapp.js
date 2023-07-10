let express = require('express');
let app = express();
let port = process.env.PORT||9121;
let Mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect,getData,postData,updateOrder,deleteOrder} = require('./controller/dbcontrollercliq')

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

//all category
app.get('/category',async (req,res) => {
    let query = {};
    let collection = "category"
    let output = await getData(collection,query)
    res.send(output)
})

//brands
app.get('/brands',async (req,res) => {
    let query = {};
    let collection = "brands"
    let output = await getData(collection,query)
    res.send(output)
})

//Deal Wheels
app.get('/deals',async (req,res) => {
    let query = {};
    let collection = "deals"
    let output = await getData(collection,query)
    res.send(output)
})

//Featured Brands
app.get('/featuredbrands',async (req,res) => {
    let query = {};
    let collection = "featuredbrands"
    let output = await getData(collection,query)
    res.send(output)
})

//Gadget Central
app.get('/gadgetcentral',async (req,res) => {
    let query = {};
    let collection = "gadgetcentral"
    let output = await getData(collection,query)
    res.send(output)
})

//slider
app.get('/slider',async (req,res) => {
    let query = {};
    let collection = "slider"
    let output = await getData(collection,query)
    res.send(output)
})

//quicksearch
app.get('/quicksearch',async (req,res) => {
    let query = {};
    let collection = "quicksearch"
    let output = await getData(collection,query)
    res.send(output)
})

//bankoffer
app.get('/bankoffer',async (req,res) => {
    let query = {};
    let collection = "bankoffer"
    let output = await getData(collection,query)
    res.send(output)
})

//ad1
app.get('/ad1',async (req,res) => {
    let query = {};
    let collection = "brandad1"
    let output = await getData(collection,query)
    res.send(output)
})

//ad2
app.get('/ad2',async (req,res) => {
    let query = {};
    let collection = "brandad2"
    let output = await getData(collection,query)
    res.send(output)
})

//ad3
app.get('/ad3',async (req,res) => {
    let query = {};
    let collection = "brandad3"
    let output = await getData(collection,query)
    res.send(output)
})

//New Arrival
app.get('/newarrival',async (req,res) => {
    let query = {};
    let collection = "newarrival"
    let output = await getData(collection,query)
    res.send(output)
})


//product wrt category
app.get('/product', async(req,res) => {
    let query = {}
    if(req.query.categoryId){
        query={category_id: Number(req.query.categoryId)}
    }
    
    
    else{
        query = {}
    }
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})




app.get('/filter/:categoryId', async(req,res) => {
    let categoryId = Number(req.params.categoryId);
    let producttypeId = Number(req.query.producttypeId)
    let lprice = Number(req.query.lprice)
    let hprice = Number(req.query.hprice)
    let brand = (req.query.brand)

    if (producttypeId && lprice && hprice) {
    query = {
      category_id: categoryId,
      Producttype_id: producttypeId,
      price: { $gt: lprice, $lt: hprice }
    }
    
    }else if(producttypeId){
        query = {
            category_id:categoryId,
            Producttype_id:producttypeId
        }
    }
    else if(lprice && hprice){
        query = {
            category_id:categoryId,
            $and:[{price:{$gt:lprice,$lt:hprice}}]
        }
    }
    else if(brand){
        query = {
            category_id:categoryId,
            brand:brand
        }
    }
    else{
        query = {}
    }
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})



// details
app.get('/details/:id', async(req,res) => {
    let id = new Mongo.ObjectId(req.params.id)
    let query = {_id:id}
    let collection = "product";
    let output = await getData(collection,query);
    res.send(output)
})

//orders
app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }else{
        query = {}
    }
   
    let collection = "orders";
    let output = await getData(collection,query);
    res.send(output)
})

//placeOrder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = "orders";
    console.log(data)
    let response = await postData(collection,data)
    res.send(response)
})

//order details {"id":[4,8,21]}
app.post('/orderDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {id:{$in:req.body.id}};
        let collection = 'product';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

//update
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`server on port ${port}`)
    
})