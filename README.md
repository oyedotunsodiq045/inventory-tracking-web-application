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

### Testing

| Routes                                                                                                    | Description                  |
| --------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Inventory                                                                                                 |                              |
| POST &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories                                     | Create Inventory             |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories                               | Get All Inventories          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/quesinventoriestions/:id                  | Get Single Inventory         |
| PUT &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/quesinventoriestions/:id                  | Update an Inventory          |
| DELETE &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/quesinventoriestions/:id                                    | Delete an Inventory          |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/inventories/export                        | Export All Inventories       |
| GET &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; url/api/v1/quesinventoriestions/:id/export           | Export an Inventory          |
|                                                                                                           |                              |
| Advanced Filtering                                                                                        |                              |
|                                                                                                           |                              |
| Select, Sorting                                                                                           |                              |
|                                                                                                           |                              |
| Pagination                                                                                                |                              |
