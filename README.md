There are two projects in the directory:
  - app
    This contains the web application created in React JS.

    URL - http://localhost:3000
    Run the following to display the app:
        npm install
        npm start
            
  - services
    This contains the API services created in NodeJS using Node express.
    
    APIs
     - GET products - 
        This service return the list of products

        Payload:
        GET http://localhost:3001/api/products
        
     - POST products -
        This service add to the original list of products and return the new list

        Payload:
        POST http://localhost:3001/api/products
        {
          "id": "1",
          "name": "description",
          "price": 1 
        }
        
     - POST orders - 
        This service post the list of orders with total of product per order and the total amount of all the orders
        
        Payload:
        POST http://localhost:3001/api/orders
        [{"product_id":"1",
          "quantity": 1
          },
          {"product_id": "2",
            "quantity": 1
          }]

    Run the api:
        npm install
        node index.js
    
    To run the unittest:
        npm run test
