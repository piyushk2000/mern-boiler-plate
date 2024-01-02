from pymongo import MongoClient



client = MongoClient("mongodb+srv://piyush:piyupiyu@cluster0.vcpgtbo.mongodb.net/?retryWrites=true&w=majority")

db = client.test

userShowCollection = db["usershows"]

userCollection = db["users"]