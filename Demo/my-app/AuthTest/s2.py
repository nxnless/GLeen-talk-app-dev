from flask import Flask, jsonify, request,Response
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS , cross_origin
import pymongo
app = Flask(__name__)
cors = CORS(app) 
# Set up JWT secret key
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a secure secret key
app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)
uri = "mongodb+srv://nonnon2546:6qVqQW86EA83OSV3@cluster0.9yz02fk.mongodb.net"
# Dummy user data (replace with your actual user authentication mechanism)
client = pymongo.MongoClient(uri)
db = client["AppDev"]
users = db["User_Account"]
# API endpoint for user login
@app.route('/login', methods=['POST'])
@cross_origin()
def login():
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

if __name__ == '__main__':
    app.run(debug=True)
