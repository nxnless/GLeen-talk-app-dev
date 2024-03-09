from flask import request,jsonify,Flask, render_template
from flask_cors import CORS , cross_origin
app = Flask(__name__)
CORS(app)

books=[
    {"id":1,"title":"Book 1","author":"Author 1"},
    {"id":2,"title":"Book 2","author":"Author 2"},
    {"id":3,"title":"Book 3","author":"Author 3"}
]
@app.route("/")
@cross_origin()
def Greet():
    return "<p>Welcome to Book Management Systems</p>"
@app.route("/books", methods=["GET"])
def get_all_books():
    sorted_books = sorted(books, key=lambda x: x['id'], reverse=True)
    return jsonify({"books": sorted_books})

@app.route("/book/<string:author_id>",methods=["GET"])
@cross_origin()
def get_book(author_id):
    book =  next(( b for b in books if b["author"]==author_id ),None)
    if book:
        return jsonify(book)
    else:
        return jsonify({"error":"Book not found"}),404
    
@app.route("/booksfilter/<string:author_id>", methods=["GET"])
@cross_origin()
def get_books_by_author(author_id):
    matched_books = [book for book in books if book["author"] == author_id]

    if matched_books:
        return jsonify(matched_books)
    else:
        return jsonify({"error": "Books not found for author"}), 404

@app.route("/booksSort/<string:author_id>", methods=["GET"])
@cross_origin()
def get_books_by_authorSort(author_id):
    matched_books = [book for book in books if book["author"] == author_id]
    if matched_books:
        sorted_books = sorted(matched_books, key=lambda x: x["id"], reverse=True)
        return jsonify(sorted_books)
    else:
        return jsonify({"error": "Books not found for author"}), 404

@app.route("/books",methods=["POST"])
@cross_origin()
def create_book():
    data = request.get_json()
    new_book={
        "id":len(books)+1,
        "title":data["title"],
        "author":data["author"]
    }
    books.append(new_book)
    return jsonify(new_book),201

@app.route("/books/<int:book_id>",methods=["PUT"])
@cross_origin()
def update_book(book_id):
    book = next((b for b in books if b["id"]==book_id),None)
    if book:
        data = request.get_json()
        book.update(data)
        return jsonify(book)
    else:
        return jsonify({"error":"Book not found"}),404

@app.route("/books/<int:book_id>",methods=["DELETE"])
@cross_origin()
def delete_book(book_id):
    book = next((b for b in books if b["id"]==book_id),None)
    if book:
        books.remove(book)
        return jsonify({"message":"Book deleted successfully"}),200
    else:
        return jsonify({"error":"Book not found"}),404
    

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000,debug=True)