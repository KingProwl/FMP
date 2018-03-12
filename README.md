# FMP-node.js-PI2

PI² School project for AssetSagacity 

## How to install and use

1. Download the zip file 
1. With Node.js command prompt, navigate where you downloaded the file and go to the FMPnodejs folder using :
```
cd FMP-node.js-PI2-master
```
then 
```
cd FMPnodejs
```

## Install dependencies

When you are in the FMPnodejs folder, you need to install express/bootstrap/nunjucks/mongoose using:

```
npm install 
```

## MongoDB

To run the app, you need to have your MongoDB connection established:
```
cd MongoDB
cd Server
cd 3.4
mongod
```

## Create database and fill it

To do so, take the two files clients.json and types.json and put them in the MongoDB/Server/3.4/bin folder (where is mongod) then run the command:

```
mongoimport -host localhost:27017 -db asset -collection clients clients.json
```
Wait for the importation, then run : 

```
mongoimport -host localhost:27017 -db asset -collection types types.json
```

Wait for importation then open your MongoDB GUI (robo3T or studio3T ect) and check if there is a new database named **asset** with 2 collections: **clients** and **types**. If they are here, it means that importation was successful.

## Launch the app

Then you can launch the app using app.js in the Node.js command prompt like so:

```
node app.js
```

And go to [localhost:3000](http://localhost:3000/)
