# Big-Mart

## About Project :
•Big-Mart is a secure, E-commerce developed primarily to facilitate buying and selling of products between users to manage products, categories and
users . Deployed on Heroku.                       
• Integrated Stripe payments gateway for accepting payments in demo mode.                               
• While user can order items, review & comment on products, sell items.                       
• While admin can manage posts, users, categories, comments.                       
• Tested the APIs using Postman .                 
  
  Visit Website : https://bigmarts.herokuapp.com/


## Features:

◼Login/Signup User Account            
◼Update Profile/Password User Account           
◼Reset Password Mail using                           
◼Cart Add/Remove Items | Update Quantities             
◼Save For Later Add/Remove Items                        
◼Wishlist Add Items                          
◼Products Pagination (Default 8 Products Per Page)                    
◼Product Search                                                          
◼Product Filters Based on Category/Ratings | Price Range                           
◼Shipping Info in Session Storage              
◼My Orders (With All Filters)              
◼Order Details of All Ordered Item                          
◼Review Products User Account                        
◼Admin: Dashboard access to only admin roles                        
◼Admin: Update Order Status | Delete Order                      
◼Admin: Add/Update Products                                                     
◼Admin: Update User Data | Delete User                            
◼Admin: List Review of Product | Delete Review                           
◼Stock Management: Decrease stock of product when shipped   
& many more

## Project Technologies
This project utilizes various technologies to provide its functionality:

### Frontend:             
▪️ HTML5                  
▪️ CSS3                         
▪️ JavaScript                    
▪️ React.js                      
▪️ Redux.js                         
###  Backend:                         
▪️ Node.js                        
▪️ Express.js                         
### Database:                         
▪️ MongoDB                          
### Image Hosting:                     
▪️ Cloudinary                           
### Payment Gateway:                      
▪️ Stripe                               
### Deployment:                       
▪️ Heroku                            

## Install Dependencies

For Backend - `npm i`

For Frontend - `cd frontend` `npm i`

## Env Variables

Make Sure to Create a config.env file in backend/config directory and add appropriate variables in order to use the app.

Essential Variables 
PORT= DB_URI = STRIPE_API_KEY= STRIPE_SECRET_KEY= JWT_SECRET= JWT_EXPIRE= COOKIE_EXPIRE= SMPT_SERVICE = SMPT_MAIL= SMPT_PASSWORD= SMPT_HOST= SMPT_PORT= CLOUDINARY_NAME CLOUDINARY_API_KEY CLOUDINARY_API_SECRET fill each filed with your info respectively
