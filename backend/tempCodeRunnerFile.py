@app.route('/api/PostByUserID/<string:user_id>', methods=['GET'])
# @cross_origin()
# def get_PostByUserID(user_id):
#     try:
#         client.admin.command("ping")
#         db = client["AppDev"]
#         collection = db["Post"]
        
#         posts = list(collection.find({"User_ID": user_id}).sort("_id", -1))
        
#         return jsonify(posts), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500