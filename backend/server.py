# python -u "d:\Appdev\mongodb\std.py"
import pymongo
from flask import Flask,request,jsonify,Response
import json
from flask_cors import CORS , cross_origin
from flask_cors import CORS



app = Flask(__name__)
cors = CORS(app) 
app.config['CORS_HEADERS'] = 'Content-Type'
# Allow  Relate Api and Fontend 
CORS(app, origins='*')

uri = "mongodb+srv://nonnon2546:6qVqQW86EA83OSV3@cluster0.9yz02fk.mongodb.net"

# Create a new client and connect to the server
client = pymongo.MongoClient(uri)

@app.route('/api/CreateAccount', methods=['POST'])
@cross_origin()
def insert_Account():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["User_Account"]
        data = request.get_json()
        Username = data.get('UserName')
        UserID = data.get('UserID')
        Password = data.get('Password')
        # print(data)

        if 'UserName' not in data  or 'UserID' not in data   or 'Password' not in data :
            return jsonify({"message": "Please fill in all fields"}), 400

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_Name": Username, "Password": Password, "User_ID": UserID}
        else :
            # หา _id ที่มีค่ามากที่สุด
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            # เพิ่มค่า _id ใหม่โดยบวกด้วย 1
            new_id = max_id + 1
            new_data = {"_id": new_id, "User_Name": Username, "Password": Password, "User_ID": UserID}

        # บันทึกข้อมูลลงใน MongoDB
        result = collection.insert_one(new_data)
        # print(result)
        return jsonify({"message": "Register Account successfully", "id": UserID}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/AppReport', methods=['POST'])
def insert_AppReport():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["App_feedback"]
        data = request.get_json()
        AppReportMessage = data.get('AppReportMessage')
        if 'AppReportMessage' not in data :
            return jsonify({"message": "Please fill in all fields"}), 400

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

def insert_PostReport():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post_report"]
        data = request.get_json()
        PostReportMessage = data.get('PostReportMessage')

        if 'PostReportMessage' not in data :
            return jsonify({"message": "Please fill in all fields"}), 400

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "PostReportMessage": PostReportMessage}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id, "PostReportMessage": PostReportMessage}
        result = collection.insert_one(new_data)
        return jsonify({"message": "Inserted Report Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/InsertPost', methods=['POST'])

def insert_Post():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post"]
        data = request.get_json()
        Tag = data.get('Tag')
        Text_Post = data.get('Text_Post')
        User_ID  = data.get('User_ID')

        if 'Tag' not in data  or  "Text_Post" not in data or "User_ID" not in data  :
            return jsonify({"message": "Please fill in all fields"}), 400

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
        result = collection.insert_one(new_data)
        return jsonify({"message": "Inserted Post Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/InsertComment', methods=['POST'])
def insert_Comment():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment"]
        data = request.get_json()
        User_ID = data.get("User_ID")
        Text_Comment = data.get("Text_Comment")
        Post_Key = data.get("Post_Key")

        print(data)

        if 'User_ID' not in data or "Text_Comment" not in data or "Post_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        user_collection = db["User_Account"]
        user = user_collection.find_one({"User_ID": User_ID})
        if not user:
            return jsonify({"message": "User_ID not found"}), 404

        if collection.count_documents({}) == 0:
            new_data = {"_id": 1, "User_ID": User_ID, "Comment_Key": 1, "Text_Comment": Text_Comment, "Post_Key": Post_Key,"Like_Comment": 0}
        else :
            max_id = collection.find_one(sort=[("_id", -1)])["_id"]
            new_id = max_id + 1
            new_data = {"_id": new_id,"User_ID": User_ID, "Comment_Key": new_id, "Text_Comment": Text_Comment, "Post_Key": Post_Key,"Like_Comment": 0}

        result = collection.insert_one(new_data)

        # อัปเดต Comment_Count ในตาราง "post"
        post_collection = db["Post"]
        post_collection.update_one({"Post_Key": Post_Key}, {"$inc": {"Comment_Count": 1}})

        return jsonify({"message": "Inserted Comment Successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/LikePost', methods=['POST'])

def insert_LikePost():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Post_liked"]
        data = request.get_json()
        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")


        if 'User_ID' not in data or "Post_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

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

def insert_LikeComment():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment_liked"]
        data = request.get_json()
        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")
        Comment_Key = data.get("Comment_Key")


        if 'User_ID' not in data or "Post_Key" not in data or "Comment_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

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

def insert_Icon():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Icon"]
        data = request.get_json()
        Icon_ID = data.get("Icon_ID")
        Post_Key = data.get("Post_Key")
        User_ID = data.get("User_ID")

        if 'User_ID' not in data or "Post_Key" not in data or "Icon_ID" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

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

# ทำไม get ICON ถึงเป็น method POST อะ
@app.route('/api/GetIcon', methods=['POST'])
def get_Icon():
    try:
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Icon"]
        data = request.get_json()
        User_ID = data.get("User_ID")
        Post_Key = data.get("Post_Key")

        if 'User_ID' not in data or "Post_Key" not in data:
            return jsonify({"message": "Please fill in all fields"}), 400

        icon_data = collection.find_one({"User_ID": User_ID, "Post_Key": Post_Key})

        if icon_data:
            return jsonify({"Icon_ID": icon_data["Icon_ID"]}), 200
        else:
            return jsonify({"message": "Icon not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/GetAllPost', methods=['GET'])

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


@app.route('/api/GetComment', methods=['POST'])

def get_Comments():
    try :
        client.admin.command("ping")
        db = client["AppDev"]
        collection = db["Comment"]
        data = request.get_json()
        Post_Key = data.get("Post_Key")

        if 'Post_Key' not in data :
            return jsonify({"message": "Please provide Post_Key"}), 400

        comments = list(collection.find({"Post_Key": Post_Key}))
        return jsonify(comments), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/alluser', methods=['GET'])
@cross_origin()
def get_users():
    #ตรง collection อยากให้เปลี่ยนให้ตรงกับชื่อ collection ใน databases มันจะได้เชื่อมกัน เพราะเรามีหลาย collection
    # ปล. collection คล้ายๆ table แหละ
    client.admin.command("ping")
    db = client["AppDev"]
    collection = db["User_Account"]
    users = list(collection.find({}))
    return jsonify(users)


if (__name__ == "__main__") :
    app.run(debug=True, port=5000, host='0.0.0.0')


