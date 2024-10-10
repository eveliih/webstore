# Online Food Store - FoodOnline
This is the final project for the **Full Stack Open** course. The project is a webstore where users can log in, add items to their shopping cart and place orders.

App running here https://foodonline.azurewebsites.net/.
😎 

*(I'm using the free products from Azure to host my app, so it might take a little bit of time before the app wakes up if it hasn't been used lately. Please give it a little bit of time and refresh the page if needed. You'll know the app is working when you see the products on the front page.)*

The frontend is built with React, and the backend is built with Node.js. Both the database and the application are hosted on Azure. This was my first experience using Azure, and it presented some challenges, particularly when working with only free-tier services.


## Application Overview and User Instructions
On the front page, you can browse different products. If you want to see products from a specific category, use the **"Products"** dropdown menu in the header. You can also search for a specific product by typing its name into the search bar.

By clicking on a product, you can see more details about it, such as its ingredients and origin. On the product details page, you can add items to your shopping cart. To be able to add items to your cart, you must log in. If an item is already in your cart, the total quantity will be displayed on the product details page. You can adjust the quantity by selecting the desired amount and adding it to the cart.

If you don't have a username and password yet, click the **"Log in"** button and then click **"Create Account"**. Fill in your name, username, and password. After a successful sign-up, you can log in and add items to your cart.

You can view your cart items by clicking the **"Shopping Cart"** button. In the shopping cart, you can remove items or place an order. If you don't want to remove the product totally, but you want to decrease or increase the quantity of the product, please do it on the product details page. Place an order by entering your email address. Your email will only be used to send you the order details — your address will not be saved. No actual orders are placed, as this is a study project! But you will receive an email from the address: fullstack.foodonline@gmail.com.

After successfully placing an order, you can view all your orders by clicking the **"Order History"** button. This button can also be found in the shopping cart at any time.

The app is responsive and works smoothly on any device.
## Project structure

```
│ /webstore (backend)
│ ├── /.github
│ ├── /controllers
│ ├── /models 
│ ├── /requests 
│ ├── /tests 
│ ├── /util 
│ ├── app.js 
│ ├── index.js 
│ ├── package.json
│ └── /webstore (frontend)
│   ├── /src
│     ├── /assets 
│     ├── /components 
│     ├── /helpers
│     ├── /hooks 
│     ├── /reducers
│     ├── /services
│     ├── store.js
│     ├── App.jsx
│     ├── App.css
│     └── main.jsx 
│   ├── index.html
│   └──  package.json
```

## Used technologies
- React
- React Boostrap
- Node.js
- Vite
- GitHub Actions (deployment pipeline with e2e tests)
- Express
- Axios
- Redux
- Bcrypt
- Sequelize
- Azure App Service
- Relational Database (Azure SQL Database)
- Nodemailer
- Cypress
- ...

## Database structure
![alt text](https://github.com/eveliih/webstore/blob/main/database-structure.png)

The project's database is hosted on **Azure SQL Database**. The key tables used in the project are:

- **Users**
- **Carts**
- **Cart Items**
- **Orders**
- **Order Items**
- **Products**
- **Product Categories**
- **Images**

### Key Relationships

- **Carts** and **Orders** tables have a foreign key, `user_id`, which references the **Users** table.
- The **Order Items** table contains foreign keys, `order_id` and `product_id`, which reference the **Orders** and **Products** tables, respectively.
- Similarly, the **Cart Items** table contains foreign keys, `cart_id` and `product_id`, referencing the **Carts** and **Products** tables.
- The **Products** table has a foreign key, `category_id`, that references the **Product Categories** table.
- The **Images** table has a foreign key, `product_id`, that references the **Products** table.


### Credits
Product images from Pixabay. App icon from Flaticon.
