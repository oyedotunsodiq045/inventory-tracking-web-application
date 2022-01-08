# inventory-tracking-web-application

> Shopify inventory-tracking-web-application backend API. [GitHub Repo](https://github.com/oyedotunsodiq045/inventory-tracking-web-application).

## Quick Start

```bash
# Install dependencies
npm i

# Install dev-dependencies
npm i -D nodemon

# Serve on localhost:5000 (development)
npm run dev

# Serve on localhost:5000 (production)
npm start

# Import sample data into mongodb
node seeder -i

# Delete data from mongodb
node seeder -d
```

### Instruction

| Note                                                                                 |
| ------------------------------------------------------------------------------------ |
| url &nbsp; &nbsp; &nbsp; &nbsp; https://shopify-itwa.herokuapp.com                   |
|                                                                                      |
### Testing

| Routes                                                                                           | Description                  |
| ------------------------------------------------------------------------------------------------ | ---------------------------- |
| Inventory                                                                                        |                              |
| POST &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories                            | Create Inventory             |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories                      | Get All Inventories          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/:id                  | Get Single Inventory         |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/:id                  | Update an Inventory          |
| DELETE &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/:id                                    | Delete an Inventory          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/export               | Export All Inventories       |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/:id/export           | Export an Inventory          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/month                | Get this month Inventory     |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/week                 | Get this week Inventory      |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/today                | Get today's Inventory         |
|                                                                                                  |                              |
| Advanced Filtering                                                                               |                              |
|                                                                                                  |                              |
| Select, Sorting                                                                                  |                              |
|                                                                                                  |                              |
| Pagination                                                                                       |                              |
