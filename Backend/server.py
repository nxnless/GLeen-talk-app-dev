from flask import Flask, jsonify, request
# flask_cors requirement for JSX fontend
from flask_cors import CORS 
from controller import get_Post,get_Comment,update_Like,get_Trend,get_UserAccount,InsertPost,InsertComment,DeletePost,DeleteComment
from bson.objectid import ObjectId
from flask_basicauth import BasicAuth
import json

app = Flask(__name__)
CORS(app)

# Auth
app.config['BASIC_AUTH_USERNAME'] = 'AppDev'
app.config['BASIC_AUTH_PASSWORD'] = '1234AppDev'
basic_auth = BasicAuth(app)
    
# Enable CORS for all routes
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS,PUT,DELETE')
    # response.headers.add('Access-Control-Allow-Origin', 'https://yourfrontenddomain.com')
    return response


@app.route('/api/api_get_Post', methods=['GET'])
@basic_auth.required
def api_get_post():
    return get_Post()

# # วิธีที่ 1 URL : http://192.168.1.136:5000/api/api_get_Comment/1
# @app.route('/api/api_get_Comment/<int:PostID>', methods=['GET'])
# @basic_auth.required
# def api_get_comment(PostID):
#     return get_Comment(PostID)

# วิธีที่ 1 URL : http://192.168.1.136:5000/api/api_get_Comment/1
@app.route('/api/api_get_Comment', methods=['POST'])
@basic_auth.required
def api_get_comment():
    data = request.json
    if 'PostID' not in data :
        return jsonify({'message' : 'Request PostID'}),400
    return get_Comment(data['PostID'])

# # วิธีที่ 2  URL : http://192.168.1.136:5000/api/api_get_Comment2?PostID=2
# @app.route('/api/api_get_Comment2', methods=['GET'])
# @basic_auth.required
# def api_get_comment2():
#     PostID = request.args.get('PostID')
#     if PostID is None:
#         return jsonify({'message': 'PostID parameter is required'}), 400
#     return get_Comment(PostID)

# URL : http://192.168.1.136:5000/api/api_update_Like/1
@app.route('/api/api_update_Like/<int:Post_ID>', methods=['PUT'])
@basic_auth.required
def api_update_Like():
    data = request.json
    if 'PostID' not in data :
        return jsonify({'message' : 'Request PostID'}),400
    return update_Like(data['PostID'])

@app.route('/api/api_get_Trend', methods=['GET'])
@basic_auth.required
def api_get_Trend():
    return get_Trend()

@app.route('/api/api_get_UserAccount', methods=['POST'])
@basic_auth.required
def api_get_UserAccount():
    data = request.json
    if 'User_Id' not in data or 'Password' not in data or 'User_Name' not in data :
        return jsonify({'message' : 'Request PostID'}),400
    return get_UserAccount(data['User_Id'],data['Password'],data['User_Name'])


@app.route('/api/api_InsertPost', methods=['POST'])
@basic_auth.required
def api_InsertPost():
    data = request.json
    print (data['Text_Post'])
    if 'Text_Post' not in data or 'User_Id' not in data:
        return jsonify({'message' : 'Request PostID'}),400
    return InsertPost(data['Text_Post'],data['User_Id'])

@app.route('/api/api_InsertComment', methods=['POST'])
@basic_auth.required
def api_InsertComment():
    data = request.json
    if 'PostID' not in data or 'Text_Comment' not in data or 'User_Id' not in data :
        return jsonify({'message' : 'Request PostID'}),400
    return InsertComment(data['Text_Comment'],data['User_Id'],data['PostID'])

@app.route('/api/api_DeletePost', methods=['DELETE'])
@basic_auth.required
def api_DeletePost():
    data = request.json
    if 'User_Id' not in data or 'Id' not in data:
        return jsonify({'message' : 'Request PostID'}),400
    return DeletePost(data['User_Id'],data['Id'])


@app.route('/api/api_DeleteComment', methods=['DELETE'])
@basic_auth.required
def api_DeleteComment():
    data = request.json
    # print (data)
    if 'Id' not in data or 'User_Id' not in data or 'PostID' not in data:
        return jsonify({'message' : 'Request PostID'}),400
    return DeleteComment(data['Id'],data['User_Id'],data['PostID'])



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    


    
    # Id,User_Id,PostID