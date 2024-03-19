from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS , cross_origin
from flask_jwt_extended import JWTManager, create_access_token, jwt_required , get_jwt_identity
#ทำแค่ GET ธรรมดามาเลยก็ได้ไม่ต้อง filter มันไป filter ที่ ไฟล์ fontend ได้เดี๋ยวเราจัดการเอง
app = Flask(__name__)
cors = CORS(app) 
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
jwt = JWTManager(app)
# Connect to MongoDB
client = MongoClient('mongodb+srv://nonnon2546:6qVqQW86EA83OSV3@cluster0.9yz02fk.mongodb.net/?retryWrites=true&w=majority')
db = client['AppDev']
collection = db['User_Account']
aa = db['Comment']
@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/protected', methods=['GET'])
def protected():
    current_user = get_jwt_identity()  # Get data stored inside the JWT token
    return jsonify(logged_in_as=current_user), 200

@app.route('/login', methods=['POST'])
def login():
    
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return jsonify({'message': 'Could not verify'}), 401

    user_name = auth.get('username')
    password = auth.get('password')
    
    if user_name in collection and collection[user_name] == password:
        access_token = create_access_token(identity=user_name)
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid username or password'}), 401
    

@app.route('/api/alluser', methods=['GET'])
@cross_origin()
def get_users():
    #ตรง collection อยากให้เปลี่ยนให้ตรงกับชื่อ collection ใน databases มันจะได้เชื่อมกัน เพราะเรามีหลาย collection
    # ปล. collection คล้ายๆ table แหละ
    collection = db['User_Account']
    users = list(collection.find({}))
    return jsonify(users)


@app.route('/register', methods=['POST'])
@cross_origin()
def add_user():
    collection = db['User_Account']
    try:
        data = request.get_json()  # Get JSON data from the request
        # Process the received data
        #บรรทัดที่ 35-36 นี้ fix ว่าต้องเป็นแบบนี้อยู่แล้วเลยคับ
        id = collection.count_documents({}) + 1
        data['_id'] = id
        data['User_id'] = id
        #_id ทำงี้เพราะว่าตอนที่ _id เป็น string มัน query ไม่ออกไม่รู้ทำไม
        collection.insert_one(data)
        return jsonify({'message': 'Data inserted successfully'}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)