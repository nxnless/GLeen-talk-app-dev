# python -u "d:\Appdev\mongodb\std.py"
import pymongo
from flask import Flask,request,jsonify,Response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS , cross_origin
from pymongo import MongoClient
from pymongo import DESCENDING
app = Flask(__name__)
cors = CORS(app) 
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a secure secret key
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)
# Allow  Relate Api and Fontend 


uri = "mongodb+srv://nonnon2546:6qVqQW86EA83OSV3@cluster0.9yz02fk.mongodb.net"

# Create a new client and connect to the server
client = pymongo.MongoClient(uri)


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/CreateAccount', methods=['POST'])
@cross_origin()
def insert_Account():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["User_Account"]
        data = request.get_json()

        if 'User_Name' not in data   or 'Password' not in data :
            return jsonify({"message": "Please fill in all fields"}), 400

        Username = data.get('User_Name')
        Password = data.get('Password')
        # print(data)

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_Name": Username, "Password": Password, "User_ID": 1}
        else :
            # หา _id ที่มีค่ามากที่สุด
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            # เพิ่มค่า _id ใหม่โดยบวกด้วย 1
            new_id = max_id + 1
            UserID = new_id
            new_data = {"_id": new_id, "User_Name": Username, "Password": Password, "User_ID": UserID}

        # บันทึกข้อมูลลงใน MongoDB
        result = collection.insert_one(new_data)
        # print(result)
        return jsonify({"message": "Register Account successfully", "id": UserID}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/tag', methods=['POST'])
@cross_origin()
def add_tag():
    client.admin.command("ping")
    db = client["AppDev"]
    collection = db["Tag"]
    data = request.get_json()
    tag_name = data.get('tag_name')
    try:
        data = request.get_json()
        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "tag_name": tag_name, "tag_id":  1}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            tag_id = new_id
            new_data = {"_id": new_id, "tag_name": tag_name, "tag_id":  tag_id}
        collection.insert_one(new_data)
        return jsonify({'message': 'Data inserted successfully'}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500

@app.route('/api/AppReport', methods=['POST'])
@cross_origin()
def insert_AppReport():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["App_feedback"]
        data = request.get_json()

        if 'AppReportMessage' not in data :
            return jsonify({"message": "Please fill in all fields"}), 400

        AppReportMessage = data.get('AppReportMessage')

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "AppReportMessage": AppReportMessage}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id, "AppReportMessage": AppReportMessage}
        result = collection.insert_one(new_data)
        return jsonify({"message": "Inserted Report Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/PostReport', methods=['POST'])
@cross_origin()
def insert_PostReport():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post_report"]
        data = request.get_json()
        if 'PostReportMessage' not in data :
            return jsonify({"message": "Please fill in all fields"}), 400
        PostReportMessage = data.get('PostReportMessage')
        Post_Key = data.get('Post_Key')
        Text_Post = data.get('Text_Post')
        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "PostReportMessage": PostReportMessage}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id, "PostReportMessage": PostReportMessage , "Post_Key":Post_Key ,"Text_Post":Text_Post}
        result = collection.insert_one(new_data)
        return jsonify({"message": "Inserted Report Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/InsertPost', methods=['POST'])
@cross_origin()
def insert_Post():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]
        data = request.get_json()
        collectionIcon = db["Icon"]
        if 'Tag' not in data  or  "Text_Post" not in data or "User_ID" not in data  :
            return jsonify({"message": "Please fill in all fields"}), 400

        Tag = data.get('Tag')
        Text_Post = data.get('Text_Post')
        User_ID  = data.get('User_ID')

        # ตรวจสอบว่ามี User_ID ที่ระบุในตาราง User_Account หรือไม่
        user_collection = db["User_Account"]
        user = user_collection.find_one({"User_ID": User_ID})
        if not user:
            return jsonify({"message": "User_ID not found"}), 404

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "Tag": Tag, "Post_Key": 1, "Text_Post": Text_Post, "User_ID": User_ID, "Comment_Count": 0,"Like_Post" : 0}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id, "Tag": Tag, "Post_Key": new_id, "Text_Post": Text_Post, "User_ID": User_ID, "Comment_Count": 0,"Like_Post" : 0}
        data_insert_icon = {"Post_Key":new_id , "User_ID":User_ID , "Icon_ID":1}
        result = collectionIcon.insert_one(data_insert_icon)
        result = collection.insert_one(new_data)
        return jsonify({"message": "Inserted Post Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/InsertComment', methods=['POST'])
@cross_origin()
def insert_Comment():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment"]
        data = request.get_json()
        collectionIcon = db["Icon"]
        
        if 'User_ID' not in data or "Text_Comment" not in data or "Post_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400
        User_ID = data.get("User_ID")
        Text_Comment = data.get("Text_Comment")
        Post_Key = data.get("Post_Key")
        iconcheck =  collectionIcon.find_one({"Post_Key":Post_Key ,"User_ID":User_ID})
        if iconcheck:
            icon_id = iconcheck["Icon_ID"]
        else:
            iconcheck = collectionIcon.find_one({"Post_Key": Post_Key})
            if iconcheck:
                icon_id = collectionIcon.count_documents({"Post_Key": Post_Key}) + 1
            else:
                icon_id = 1  # If no icons found for the post_key, set icon_id t
            data_insert_icon = {"Post_Key":Post_Key , "User_ID":User_ID , "Icon_ID":icon_id}
            result = collectionIcon.insert_one(data_insert_icon)
        user_collection = db["User_Account"]
        user = user_collection.find_one({"User_ID": User_ID})
        if not user:
            return jsonify({"message": "User_ID not found"}), 404

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_ID": User_ID, "Comment_Key": 1, "Text_Comment": Text_Comment, "Post_Key": Post_Key,"Like_Comment": 0 ,"Icon_id":icon_id}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id,"User_ID": User_ID, "Comment_Key": new_id, "Text_Comment": Text_Comment, "Post_Key": Post_Key,"Like_Comment": 0 ,"Icon_id":icon_id}

        result = collection.insert_one(new_data)
        
        # อัปเดต Comment_Count ในตาราง "post"
        post_collection = db["Post"]
        post_collection.update_one({"Post_Key": Post_Key}, {"$inc": {"Comment_Count": 1}})

        return jsonify({"message": "Inserted Comment Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/LikePost', methods=['POST'])
@cross_origin()
def insert_LikePost():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post_liked"]
        data = request.get_json()

        if 'User_ID' not in data or "Post_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")


        user_collection = db["User_Account"]
        user = user_collection.find_one({"User_ID": User_ID})
        if not user:
            return jsonify({"message": "User_ID not found"}), 404

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_ID": User_ID,  "Post_Key": Post_Key,}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id,"User_ID": User_ID,  "Post_Key": Post_Key}
        result = collection.insert_one(new_data)

        post_collection = db["Post"]
        post_collection.update_one({"Post_Key": Post_Key}, {"$inc": {"Like_Post": 1}})

        return jsonify({"message": "Liked Post Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/LikeComment', methods=['POST'])
@cross_origin()
def insert_LikeComment():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment_liked"]
        data = request.get_json()

        if 'User_ID' not in data or "Post_Key" not in data or "Comment_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")
        Comment_Key = data.get("Comment_Key")

        user_collection = db["User_Account"]
        user = user_collection.find_one({"User_ID": User_ID})
        if not user:
            return jsonify({"message": "User_ID not found"}), 404

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_ID": User_ID,  "Post_Key": Post_Key,"Comment_Key": Comment_Key}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id,"User_ID": User_ID,  "Post_Key": Post_Key,"Comment_Key": Comment_Key}
        result = collection.insert_one(new_data)

        comment_collection = db["Comment"]
        comment_collection.update_one({"Post_Key": Post_Key,"Comment_Key": Comment_Key}, {"$inc": {"Like_Comment": 1}})

        return jsonify({"message": "Liked Comment Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/Icon', methods=['POST'])
@cross_origin()
def insert_Icon():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Icon"]
        data = request.get_json()

        if 'User_ID' not in data or "Post_Key" not in data or "Icon_ID" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        Icon_ID = data.get("Icon_ID")
        Post_Key = data.get("Post_Key")
        User_ID = data.get("User_ID")

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_ID": User_ID,  "Post_Key": Post_Key,"Icon_ID": Icon_ID}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id,"User_ID": User_ID,  "Post_Key": Post_Key,"Icon_ID": Icon_ID}
        result = collection.insert_one(new_data)

        return jsonify({"message": "Inserted Icon Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetIcon', methods=['GET'])
@cross_origin()
def get_Icon():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Icon"]
        data = request.get_json()

        if 'User_ID' not in data or "Post_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")

        icon_data = collection.find_one({"User_ID": User_ID, "Post_Key": Post_Key})

        if icon_data:
            return jsonify({"Icon_ID": icon_data["Icon_ID"]}), 200
        else:
            return jsonify({"message": "Icon not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetAllPost', methods=['GET'])
@cross_origin()
def get_all_posts():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]

        # ดึงข้อมูล Post ทั้งหมดและเรียงลำดับตาม _id จากมากไปน้อย
        all_posts = list(collection.find().sort("_id", -1))

        return jsonify(all_posts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetComment/<int:post_key>', methods=['GET'])
@cross_origin()
def get_Comments(post_key):
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment"]

        comments = list(collection.find({"Post_Key": post_key}))
        return jsonify(comments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/GetOnePost/<int:post_key>', methods=['GET'])
@cross_origin()
def Get_onPost(post_key):
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]

        # Search for a document based on Post_Key
        post = collection.find_one({"Post_Key": post_key})

        if post is None:
            return jsonify({"message": "No post found for the given Post_Key"}), 404

        # Assuming you want to return the found post
        return jsonify(post), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/AllPostByTag/<string:tag>', methods=['GET'])
@cross_origin()
def get_PostTag(tag):
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]

        posts = list(collection.find({"Tag": tag}).sort("_id", -1))

        return jsonify(posts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetPostLiked', methods=['GET'])
@cross_origin()
def get_PostLiked():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post_liked"]
        data = request.get_json()

        if 'Post_Key' not in data :
            return jsonify({"message": "Please provide Post_Key"}), 400

        Post_Key = data.get("Post_Key")

        posts_liked = list(collection.find({"Post_Key": Post_Key}).sort("_id", -1))

        return jsonify(posts_liked), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetCommentByPostKey', methods=['GET'])
@cross_origin()
def get_CommentByPostKey():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment"]
        data = request.get_json()

        if 'Post_Key' not in data :
            return jsonify({"message": "Please provide Post_Key"}), 400

        Post_Key = data.get("Post_Key")

        comment = list(collection.find({"Post_Key": Post_Key}).sort("_id", -1))

        return jsonify(comment), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetCommentLiked', methods=['GET'])
@cross_origin()
def get_CommentLiked():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment_liked"]
        data = request.get_json()

        if 'Post_Key' not in data or 'Comment_Key' not in data:
            return jsonify({"message": "Please provide Post_Key and Comment_Key"}), 400

        Post_Key = data.get("Post_Key")
        Comment_Key = data.get("Comment_Key")

        comment = list(collection.find({"Post_Key": Post_Key,"Comment_Key" : Comment_Key}).sort("_id", -1))

        return jsonify(comment), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/IconByUserID', methods=['GET'])
@cross_origin()
def get_IconByUserID():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment_liked"]
        data = request.get_json()

        if 'Post_Key' not in data or 'User_ID' not in data:
            return jsonify({"message": "Please provide Post_Key and User_ID"}), 400

        Post_Key = data.get("Post_Key")
        User_ID = data.get("User_ID")

        Icon = list(collection.find_one({"Post_Key": Post_Key,"User_ID" : User_ID}).sort("_id", -1))

        return jsonify(Icon), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/PostByUserID/<string:user_id>', methods=['GET'])
@cross_origin()
def get_PostByUserID(user_id):
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]
        
        posts = list(collection.find({"User_ID": user_id}).sort("_id", -1))
        
        return jsonify(posts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/DeletePostLike', methods=['DELETE'])
@cross_origin()
def delete_PostLike():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        post_liked_collection = db["Post_liked"]
        post_collection = db["Post"]
        data = request.get_json()

        if 'User_ID' not in data or "Post_Key" not in data:
            return jsonify({"message": "Please provide User_ID and Post_Key"}), 400

        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")

        post_liked_collection.delete_one({"User_ID": User_ID, "Post_Key": Post_Key})

        post_collection.update_one({"Post_Key": Post_Key}, {"$inc": {"Like_Post": -1}})

        return jsonify({"message": "Deleted Post Like Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/DeleteCommentLike', methods=['DELETE'])
@cross_origin()
def delete_CommentLike():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        comment_liked_collection = db["Comment_liked"]
        comment_collection = db["Comment"]
        data = request.get_json()

        if 'User_ID' not in data or "Post_Key" not in data or "Comment_Key" not in data:
            return jsonify({"message": "Please provide User_ID, Post_Key, and Comment_Key"}), 400

        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")
        Comment_Key = data.get("Comment_Key")

        comment_liked_collection.delete_one({"User_ID": User_ID, "Post_Key": Post_Key, "Comment_Key": Comment_Key})

        comment_collection.update_one({"Post_Key": Post_Key, "Comment_Key": Comment_Key}, {"$inc": {"Like_Comment": -1}})

        return jsonify({"message": "Deleted Comment Like Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/DeletePost', methods=['DELETE'])
@cross_origin()
def delete_post():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        post_collection = db["Post"]
        comment_collection = db["Comment"]
        post_liked_collection = db["Post_liked"]
        comment_liked_collection = db["Comment_liked"]
        Icon_collection = db["Icon"]
        data = request.get_json()

        if 'Post_Key' not in data:
            return jsonify({"message": "Please provide Post_Key"}), 400

        Post_Key = data.get("Post_Key")

        post_collection.delete_one({"Post_Key": Post_Key})

        comment_collection.delete_many({"Post_Key": Post_Key})

        post_liked_collection.delete_many({"Post_Key": Post_Key})

        comment_liked_collection.delete_many({"Post_Key": Post_Key})

        Icon_collection.delete_many({"Post_Key": Post_Key})

        return jsonify({"message": "Deleted Post and Associated Data Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/DeleteComment', methods=['DELETE'])
@cross_origin()
def delete_Comment():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        comment_collection = db["Comment"]
        post_collection = db["Post"]
        data = request.get_json()

        if 'ID' not in data or 'Post_Key' not in data:
            return jsonify({"message": "Please provide ID and Post_Key"}), 400

        comment_id = data.get("ID")
        post_key = data.get("Post_Key")

        result = comment_collection.delete_one({"_id": comment_id})

        if result.deleted_count == 1:
            post_collection.update_one({"Post_Key": post_key}, {"$inc": {"Comment_Count": -1}})
            return jsonify({"message": "Deleted comment successfully"}), 200
        else:
            return jsonify({"message": "Comment not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/username_check', methods=['GET'])
@cross_origin()
def get_username():
    try :
        db = client["AppDev"]
        collection = db["User_Account"]
        data = request.get_json()

        if 'User_Name' not in data :
            return jsonify({"message": "Please provide User_Name"}), 400

        username = data.get("User_Name")

        userchk = list(collection.find({"User_Name": username}))
       

        return jsonify(userchk), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    db = client["AppDev"]
    users = db["User_Account"]
    auth = request.json
    if not auth or not auth.get('User_Name') or not auth.get('Password'):
        return jsonify({'message': 'Could not verify'}), 401
    
    username = auth.get('User_Name')
    password = auth.get('Password')
    find_user = users.find_one({"User_Name": username})
    
    if find_user and find_user["Password"] == password:
        access_token = create_access_token(identity= find_user["User_ID"])
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid username or password'}), 401

# Example protected route
@app.route('/protected', methods=['GET'])
@cross_origin()
@jwt_required()
def protected():
    current_user = get_jwt_identity()  # Get data stored inside the JWT token
    return jsonify(logged_in_as=current_user), 200

@app.route('/api/alluser', methods=['GET'])
@cross_origin()
def get_users():
    db = client["AppDev"]
    #ตรง collection อยากให้เปลี่ยนให้ตรงกับชื่อ collection ใน databases มันจะได้เชื่อมกัน เพราะเรามีหลาย collection
    # ปล. collection คล้ายๆ table แหละ
    collection = db['User_Account']
    users = list(collection.find({}))
    user_names = [user.get("User_Name") for user in users if "User_Name" in user]
    return jsonify( user_names)
    
@app.route('/api/tag', methods=['GET'])
@cross_origin()
def get_tag():
    client.admin.command("ping")
    db = client["AppDev"]
    collection = db["Tag"]
    Tag = list(collection.find({}))
    return jsonify(Tag)


@app.route('/api/AllPostByTrend', methods=['GET'])
@cross_origin()
def get_all_post_by_trend():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]

        all_posts = list(collection.find().sort([("Like_Post", -1), ("Comment_Count", -1)]))

        return jsonify(all_posts), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/InsertIMG_PATH', methods=['POST'])
@cross_origin()
def insert_IMG_PATH():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["IMG_Path"]
        data = request.get_json()

        if 'URL' not in data or 'Icon_Name' not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        URL = data.get('URL')
        Icon_Name = data.get('Icon_Name')

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "URL": URL,"Icon_Name": Icon_Name}
        else :
            # หา _id ที่มีค่ามากที่สุด
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            # เพิ่มค่า _id ใหม่โดยบวกด้วย 1
            new_id = max_id + 1
            new_data = {"_id": new_id, "URL": URL,"Icon_Name": Icon_Name}

        result = collection.insert_one(new_data)
        # print(result)
        return jsonify({"message": "Insert IMG_Path successfully", "URL": URL}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/GetALL_IMG_PATH', methods=['GET'])
@cross_origin()
def get_all_img_path():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["IMG_Path"]

        # ดึงข้อมูล Post ทั้งหมดและเรียงลำดับตาม _id จากมากไปน้อย
        all_img_path = list(collection.find())

        return jsonify(all_img_path), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if (__name__ == "__main__") :
    app.run(debug=True, port=5000, host='0.0.0.0')


