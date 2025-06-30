# People Picker
This is the repo for the people picker project

# Run Server
````bash
cd server
node server.js
````

# Run Client
````bash
cd vanillaClient
npx browser-sync --files "*.html, *.js, *.css" --server start
````

# To use mongoDB
You need to have mongoDB installed on your machine, obvi. Open a terminal and run the following:
```bash
cd data
npm run start
```
When you run these commands, it will start mongoDB service on port 27017 and import the initial data into the `peoplepicker` database.

---
Note: git will ignore a folder unless there is a file in it. This is why we created a li'l file called `.gitkeep` in the `data/db` folder. This way, we can keep the `db` folder in our repo while ignoring its contents.
---

# To create/reset the mongoDB data
This will drop the existing `people` collection and import the data from `db.json` into the `peoplepicker` database.
```bash
cd data
npm run reset
```

