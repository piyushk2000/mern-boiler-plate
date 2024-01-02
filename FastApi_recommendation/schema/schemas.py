from bson import ObjectId

def individual_serial(show) -> dict:
    return{
        "userId": str(ObjectId(show["userId"])),
        "showId": show["showId"],
        "showName": show["showName"],
        "showGenres": show["showGenres"],
        "status": show["status"],
        "episode": show["episode"],
        "favorite": show["favorite"],
    }

def list_serial(shows) -> list:
    return[individual_serial(show) for show in shows]


def user_serial(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "profilePicture": user.get("profilePicture", None),  # Optional field
        # Add other fields you want to include
    }