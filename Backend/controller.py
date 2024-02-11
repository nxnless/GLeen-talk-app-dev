import json
import pypyodbc
from flask import Flask, jsonify, request

# DB_SERVER = '0.tcp.ap.ngrok.io:16880'
DB_DATABASE = 'AppDevDB'
DB_USERNAME = 'AppDev'
DB_PASSWORD = '1234'
ngrok_tcp_url = '0.tcp.ap.ngrok.io'
ngrok_port = '16880'

def get_Post():
    try: 
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={ngrok_tcp_url},{ngrok_port};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')

        cursor = connection.cursor()
        
        cursor.execute("""
                       SELECT ID,Text_Post,Count_Like,User_Id,Count_Comment
                        FROM (
                            (SELECT ID,Text_Post,Count_Like,User_Id 
                            FROM Post ) AS v1
                            INNER JOIN
                            (SELECT COUNT(Text_Comment) as Count_Comment ,Post_Id
                            FROM Comment 
                            --WHERE Post_Id in (1,2) 
                            GROUP BY Post_Id) AS v2
                            ON v1.Id = v2.Post_Id
                        )
                        ORDER BY ID DESC
                        """)
        rows = cursor.fetchall()
        
        # Convert rows to a list of dictionaries
        result = [{'ID': row[0], 'Text_Post': row[1], 'Count_Like': row[2], 'User_Id': row[3], 'Count_Comment': row[4]} for row in rows]
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return jsonify(result)
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    

def get_Comment(PostID):
    try: 
        print(PostID)
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       SELECT cm.Id,Text_Comment,cm.Post_Id,cm.User_Id,Icon
                        FROM Comment AS cm 
                        INNER JOIN 
                        Icon AS ic 
                        ON cm.User_Id = ic.User_Id  and cm.Post_Id = ic.Post_Id
                        WHERE cm.Post_Id = ? 
                        """,(PostID,))
        rows = cursor.fetchall()
        
        # Convert rows to a list of dictionaries
        result = [{'ID': row[0], 'Text_Comment': row[1], 'Post_Id': row[2], 'User_Id': row[3], 'Icon': row[4]} for row in rows]
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps(result), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    
def update_Like(PostID):
    try: 
        # print(PostID)
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       UPDATE Post SET Count_Like = Count_Like + 1 WHERE id = ?
                        """,(PostID,))
        
        connection.commit()
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps({'message': 'Success'}), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    
def get_Trend():
    try: 
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       SELECT ID,Text_Post,Count_Like,User_Id,Count_Comment
                        FROM (
                            (SELECT ID,Text_Post,Count_Like,User_Id 
                            FROM Post ) AS v1
                            INNER JOIN
                            (SELECT COUNT(Text_Comment) as Count_Comment ,Post_Id
                            FROM Comment 
                            --WHERE Post_Id in (1,2) 
                            GROUP BY Post_Id) AS v2
                            ON v1.Id = v2.Post_Id
                        )
                        ORDER BY Count_Like DESC
                        """)
        rows = cursor.fetchall()
        
        # Convert rows to a list of dictionaries
        result = [{'ID': row[0], 'Text_Post': row[1], 'Count_Like': row[2], 'User_Id': row[3], 'Count_Comment': row[4]} for row in rows]
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps(result), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    
def get_UserAccount(User_Id,Password,User_Name):
    try: 
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       INSERT into User_Account VALUES (?,?,?)
                        """,(User_Id,Password,User_Name))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps({'message': 'Success'}), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    
def InsertPost(Text_Post,User_Id):
    try: 
        print (Text_Post)
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       INSERT into Post (Text_Post,User_Id) VALUES  (?,?)
                        """,(Text_Post,User_Id))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps({'message': 'Success'}), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    
def InsertComment(Text_Comment,User_Id,PostID):
    try: 
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       insert into Comment (Text_Comment,User_Id,Post_Id) VALUES (?,?,?)
                        """,(Text_Comment,User_Id,PostID))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps({'message': 'Success'}), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500

def DeletePost(User_Id,Id):
    try: 
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       DELETE Post where User_Id = ? and Id = ?
                        """,(User_Id,Id))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps({'message': 'Success'}), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500
    
def DeleteComment(Id,User_Id,PostID):
    # print (Id)
    try: 
        # print(Id+"and"+User_Id)
        connection = pypyodbc.connect(f'Driver=ODBC Driver 17 for SQL Server;Server={DB_SERVER};Database={DB_DATABASE};UID={DB_USERNAME};PWD={DB_PASSWORD};')
        cursor = connection.cursor()
        
        cursor.execute("""
                       DELETE Comment where Id= ? and User_Id= ? and Post_Id= ?
                        """,(Id,User_Id,PostID))
        connection.commit()
        
        cursor.close()
        connection.close()
        
        # Use json.dumps to convert the list of dictionaries to a JSON formatted string
        return json.dumps({'message': 'Success'}), 200
    except Exception as e:
        return json.dumps({'message': 'Error'}), 500





