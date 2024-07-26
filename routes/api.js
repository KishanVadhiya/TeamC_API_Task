const express = require('express');
const router = express.Router();
const fetch= require('node-fetch');
const Products= require('../models/products.model');
require('dotenv').config();
// const bytexlURL='https://json-server-c67opnddza-el.a.run.app';
const fetchImages = (n) => {
    // console.log("Inside fetchImages");
    return fetch('https://api.unsplash.com/search/photos?query=electronics&per_page='+n, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data.results;
    })
    .catch(error => {
      console.error('Error fetching images', error);
      // Return an empty array in case of error
        return [];
    });
};



const mergedImages = async (products) => {

    const imagesArray= await fetchImages(Object.entries(products).length);
    products= Object.keys(products).map((key, index) => ({
        ...products[key],
        imgURL: imagesArray[index]?.urls?.small || 'defaultImageURL',
      }));
    return products;
}
// console.log("\n\n\n\n");
// console.log(mergeImages({"abc":"def","ghi":"jkl"}));
// (async ()=>{
    // console.log(await mergeImages({"abc":{"x":"def"},"ghi":{"y":"jkl"}}));
// })();

const manageQueryParameter = (queryParamObj)=>{
    let queryURL='?';
    if(queryParamObj.top){
        queryURL+=`&top=${queryParamObj.top}`;
    }
    if(queryParamObj.minPrice){
        queryURL+=`&minPrice=${queryParamObj.minPrice}`
    }

    if(queryParamObj.maxPrice){
        queryURL+=`&maxPrice=${queryParamObj.maxPrice}`
    }

    if(queryParamObj.availability){
        queryURL+=`&availability=${queryParamObj.availability}`
    }

    if(queryURL==='?'){
        return "";
    }
    return (queryURL.slice(0,1) + queryURL.slice(2));

};

router.get('/products',(req,res,next)=>{
    // console.log('\n\n\n',req.originalUrl);
    fetch(`${bytexlURL}/products`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        if(req.query.top){
            const topProducts={}
            let count=0;
            for (const key in data){
                if(count>=req.query.top){
                    break;
                }
                topProducts[key]=data[key];
                count++;
            }
            data=topProducts;
        }
        if(req.query.minPrice){
            const filteredProducts={};
            for (const[key,product] of Object.entries(data)){
                if(product.price>=req.query.minPrice){
                    filteredProducts[key]=product;
                }
            }
            data=filteredProducts;
        }
        if(req.query.maxPrice){
            const filteredProducts={};
            for (const[key,product] of Object.entries(data)){
                if(product.price<=req.query.maxPrice){
                    filteredProducts[key]=product;
                }
            }
            data=filteredProducts;
        }

        if(req.query.availability){
            const filteredProducts={};
            for (const[key,product] of Object.entries(data)){
                if(product.availability===req.query.availability){
                    filteredProducts[key]=product;
                }
            }
            data=filteredProducts;
        }
        ;(async ()=>{
            res.send(await mergedImages(data))
        })();
        // res.send(mergedImages(data));
    })
    .catch(error=>{
        console.error("Error fetching products",error);
        next(error);
    })
});


router.get('/categories',(req,res,next)=>{
    fetch(`${bytexlURL}/categories`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        console.error("Error fetching products",error);
        next(error);
    })
});

router.get('/companies',(req,res,next)=>{
    fetch(`${bytexlURL}/companies`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        console.error("Error fetching products",error);
        next(error);
    })
});

router.get('/companies/:companyName/products',(req,res,next)=>{

    fetch(`${bytexlURL}/companies/${req.params.companyName}/products${manageQueryParameter(req.query)}`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        // res.send(data);
        ;(async ()=>{
            res.send(await mergedImages(data))
        })();
    })
    .catch(error=>{
        console.error("Error fetching products",error);
        next(error);
    })
});


router.get('/categories/:categoryName/products',(req,res,next)=>{

    fetch(`${bytexlURL}/categories/${req.params.categoryName}/products${manageQueryParameter(req.query)}`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        // res.send(data);
        ;(async ()=>{
            res.send(await mergedImages(data))
        })();
    })
    .catch(error=>{
        console.error("Error fetching products",error);
        next(error);
    })
});


router.get('/companies/:companyName/categories/:categoryName/products',(req,res,next)=>{

    fetch(`${bytexlURL}/companies/${req.params.companyName}/categories/${req.params.categoryName}/products${manageQueryParameter(req.query)}`)
    .then(response =>{
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data=>{
        // res.send(data);
        ;(async ()=>{
            res.send(await mergedImages(data))
        })();
    })
    .catch(error=>{
        console.error("Error fetching products",error);
        next(error);
    })
});

router.post('/saveproduct',(req,res,next)=>{
    console.log(req.body);
    if(req.body.product){
        Products.create(req.body.product)
                .then((data)=> res.json(data))
                .catch(next);
    }else{
        res.json({
            error:"Invalid input"
        });
    }
});

router.get('/getproducts',(req,res,next)=>{
    Products.find({})
            .then((data)=>res.json(data))
            .catch(next);
});



// router.get('/todos', (req, res, next) => {
//     // This will return all the data, exposing only the id and action field to the client
//     Todo.find({}, 'action')
//         .then((data) => res.json(data))
//         .catch(next);
// });

// router.post('/todos', (req, res, next) => {
//     if (req.body.action) {
//         Todo.create(req.body)
//             .then((data) => res.json(data))
//             .catch(next);
//     } else {
//         res.json({
//             error: 'The input field is empty',
//         });
//     }
// });

// router.delete('/todos/:id', (req, res, next) => {
//     Todo.findOneAndDelete({ _id: req.params.id })
//         .then((data) => res.json(data))
//         .catch(next);
// });

module.exports = router;