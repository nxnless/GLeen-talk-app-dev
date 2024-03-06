from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS , cross_origin

#ทำแค่ GET ธรรมดามาเลยก็ได้ไม่ต้อง filter มันไป filter ที่ ไฟล์ fontend ได้เดี๋ยวเราจัดการเอง
app = Flask(__name__)
cors = CORS(app) 
app.config['CORS_HEADERS'] = 'Content-Type'
# Connect to MongoDB
client = MongoClient('mongodb+srv://nonnon2546:6qVqQW86EA83OSV3@cluster0.9yz02fk.mongodb.net/?retryWrites=true&w=majority')
db = client['AppDev']


@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/api/products', methods=['GET'])
@cross_origin()
def get_users():
    #ตรง collection อยากให้เปลี่ยนให้ตรงกับชื่อ collection ใน databases มันจะได้เชื่อมกัน เพราะเรามีหลาย collection
    # ปล. collection คล้ายๆ table แหละ
    collection = db['Comment']
    users = list(collection.find({}))
    return jsonify(users)

@app.route('/api/products', methods=['POST'])
@cross_origin()
def add_user():
    collection = db['Comment']
    try:
        data = request.get_json()  # Get JSON data from the request
        # Process the received data
        #บรรทัดที่ 35-36 นี้ fix ว่าต้องเป็นแบบนี้อยู่แล้วเลยคับ
        id = collection.count_documents({}) + 1
        data['_id'] = id
        #_id ทำงี้เพราะว่าตอนที่ _id เป็น string มัน query ไม่ออกไม่รู้ทำไม
        collection.insert_one(data)
        return jsonify({'message': 'Data inserted successfully'}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500


# โปรแกรม เราไม่มี put ไม่ต้องใส่ใจตรงนี้ก็ได้
# @app.route('/api/products/<user_id>', methods=['PUT'])
# @cross_origin()
# def update_user(user_id):
#     collection = db['Comment']
#     user_data = request.json
#     result = collection.update_one({"_id": user_id}, {"$set": user_data})
#     if result.modified_count > 0:
#         return jsonify({"message": "User updated successfully"})
#     else:
#         return jsonify({"message": "User not found"}), 404
    
@app.route('/api/products/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_data(id):
    collection = db['Comment']
    deleted = collection.delete_one({'_id': id})
    if deleted.deleted_count == 1:
        return jsonify({'message': 'Data deleted successfully'}), 200
    else:
        return jsonify({'error': 'Data not found'}), 404

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)