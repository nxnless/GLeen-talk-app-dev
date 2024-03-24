from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)

# Set up JWT secret key
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  # Change this to a secure secret key
jwt = JWTManager(app)

# Dummy user data (replace with your actual user authentication mechanism)
users = {
    'username': 'password'  # Replace 'username' and 'password' with your actual user data
}

# API endpoint for user login
@app.route('/login', methods=['POST'])
def login():
    auth = request.json
    if not auth or not auth.get('username') or not auth.get('password'):
        return jsonify({'message': 'Could not verify'}), 401

    username = auth.get('username')
    password = auth.get('password')
    
    if username in users and users[username] == password:
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid username or password'}), 401 

# Example protected route
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()  # Get data stored inside the JWT token
    return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
    app.run(debug=True)
