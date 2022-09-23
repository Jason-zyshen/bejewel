# BeJewel.design

This is the test web app of my startup BeJewel. I'm going to build a eCommerce website from scratch. This will be a progressing process for sure. I will split the work into several stages.

## #1 DEFINE

At this first stage, my goal is to define the (very basic) system of this platform from a business perspective as well as a software architecture perspective.

### The Whole Picture

It requires a huge amount of work to develop all the systems I need to support this eCommerce platform business. To move this project move quickly, I will use as many third party services as possible so that I don't need to build everything in house. I will be very focus on the key features that differentiate us from other players in the market. But we still need to have a clear understanding of the systems/services we need for the business:

- Account/Login/Authentication
- Tax & Payment
- Marketing & Newsletter
- Inventory Management
- Order Management
- Transportation Management
- Product Management
- Legal Agreement
- SEO & Data Tracking
- ...

### Use Cases

#### User: Customer

- Visit website
- Search products with keywords
- Browse different categories of products
- See the detailed page of each product
- Add product to cart
- Add product to likes
- View cart
- View likes
- Move products between cart and likes
- Proceed to payment
- Edit address and contact information
- Create an account
- Login/logout
- View/track/cancel orders

#### User: Admin

- Upload new products
- Edit existing products
- View dashboard
- View/edit orders

## #2 DESIGN

In this stage, I'm going to design the data structure of the system on [arrows.app](https://arrows.app/#/googledrive/ids=1WEcj3gSbti6DKPE3BMByYuCvrk4o-wDN), and it looks like this:
![Data Structure](Data%20Structure.png)

Then, we are going to create a database by on [Neo4j AuraDB](https://console.neo4j.io/), and start a sever on Apollo. The server itself is just a copy-paste from the instructions on Aura website. I added a dotenv file to restore login info for AuraDB, and use the "introspector" module to generate the graphql schema directly from the database. Once it's all set, we can start the server and use the Apollo Explore to query data from our AuraDB.

Now that we have the backend running with the database, we're going to refine the data structure and add custom logics based on use cases. The use cases will be very similar to the ones we have listed above. The difference is that we will create a very detailed list of actions that users will take. Notice that there will be numbers of actions needed to be taken to realize a simple action of users. To make everything organized, a good way is to think from the actions related to each page. As it says, we are going to realize the basic functions for a common e-commerce platform, thus making it reasonable to build build our website based on a template. [This](https://github.com/jamstack-cms/jamstack-ecommerce) is the template we are going to start with. Huge thanks to all the contributors in this project.

**The structure of the website (template)**

- Home page
  - list all the categories with number of items in them
  - list the top items of specific category and fetch information about name, price, designer, and other information required
- All categories page
  - list all the categories with number of items in them
- Category page
  - list all the items of specific category and fetch information about name, price, designer, and other information required
- Item page
  - Display all the information about the item, including pictures, name, price, designer, and other information required
  - Display the sales progress and the count down of the end of the campaign
  - Add/remove item to/from cart
  - Add/remove item to/from like
  - View and post reviews in text and pictures
  - Connect to instagram - 3rd party service
- Cart page
  - Change the number of each item
  - Remove the item when the amount is 0 - frontend
  - List the items in the likes
- Login page for admin
  - Input email address and password - 3rd party service
  - Authentication and authorization
  - No forget password as it's for internal usage
- Admin page
  - List all the items
  - Add/remove/edit items

Of course there are still lots of necessary pages and functions are missing like the checkout page. We will consider using third party services for login and payment later. But right now, let's stick with the function list above. As you can see, there are actually many of the functions are overlapped. This is one of the benefit of listing everything down. And also, as we see that most functions are just CRUD which have been automatically generated GraphQL and Apollo.
## #3 DEVELOP

### Database

reference: https://github.com/Jason-zyshen/grand-mes
client protocol: https://gqty.dev/


## To-Do
- [ ] Add parameter "status" to relationship "cart-product" 