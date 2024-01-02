from fastapi import APIRouter
# from models.todos import Show
from config.databse import userShowCollection , userCollection
from schema.schemas import list_serial, user_serial
from bson import ObjectId


router = APIRouter()

@router.get("/shows")
async def get_shows():
    shows = list_serial(userShowCollection.find())
    return shows

# New function to get user details
async def get_users_details(user_ids):
    user_ids_list = [ObjectId(user_id) for user_id in user_ids]  # Convert to ObjectId
    users = userCollection.find({'_id': {'$in': user_ids_list}})
    return [user_serial(user) for user in users]

@router.get("/recommendations/{id}")
async def get_recommendation(id: str):
    shows = list_serial(userShowCollection.find({'userId': ObjectId(id)}))
    showids = [show["showId"] for show in shows]
    userlist = []
    for showid in showids:
        users = list_serial(userShowCollection.find({'showId': showid}))
        for userobj in users:
            if userobj["userId"] != id:
                userlist.append(userobj["userId"])

    final_list = set(userlist)
    user_details = await get_users_details(final_list)
    return user_details




# @router.post("/")
# async def post_todos(todo: Show):
#     userShowCollection.insert_one(dict(todo))

# @router.post("/{id}")
# async def put_todos(id: str , todo: Show):
#     userShowCollection.find_one_and_update({'_id':ObjectId(id)}, {"$set" : dict(todo)})

# @router.delete("/{id}")
# async def delete_todos(id: str):
#     userShowCollection.find_one_and_delete({'_id':ObjectId(id)})
