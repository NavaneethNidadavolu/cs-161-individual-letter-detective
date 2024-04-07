import os
import jwt
import psycopg2
from flask_cors import CORS
from flask import Flask, request, Response, current_app
from dotenv import load_dotenv
# Load environment variables from .env file
load_dotenv()

# Defining database connection parameters
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DATABASE = os.getenv("POSTGRES_DATABASE")

# Initialize Flask application
app = Flask(__name__)
CORS(app)

@current_app.before_request
def basic_authentication():
    if request.method.lower() == 'options':
        return Response()


# Define database connection parameters
db_params = {
    "host": POSTGRES_HOST,
    "database": POSTGRES_DATABASE,
    "user": POSTGRES_USER,
    "password": POSTGRES_PASSWORD,
    "port": "5432"
}

# Define a function to connect to the database
def connect_to_db():
    try:
        connection = psycopg2.connect(**db_params)
        cursor = connection.cursor()
        print("Connected to the database.")
        return connection, cursor
    except (Exception, psycopg2.Error) as error:
        print(f"Error connecting to the database: {error}")
        return None, None

# Define a function to close the database connection
def close_db_connection(connection, cursor):
    if connection:
        cursor.close()
        connection.close()
        print("Database connection closed.")


# Define the home route
@app.route('/')
def home():
    return {'message': 'Hello World'}, 200


# Define the middleware to read JWT from header
@app.before_request
def read_jwt_from_header():
	if request.path == '/savegame' or request.path == '/scores':
		auth_token = request.headers.get('auth-token')
		if auth_token:
			try:
				decoded_token = jwt.decode(auth_token, options={"verify_signature": False})
				request.decoded_token = decoded_token

			except jwt.exceptions.InvalidTokenError as error:
				print(f"Error decoding JWT: {error}")
				return {'message': 'Invalid auth-token'}, 401
		else:
			return {'message': 'auth-token not found'}, 401


# Define the savegame route
@app.route('/savegame', methods=['POST'])
def saveGame():

	connection, cursor = connect_to_db()
	
	if connection is None or cursor is None:
		return {'message': 'Error connecting to the database'}, 500
	
	try:
		# Get the game data from the request body
		body = request.get_json()
		
		if not body:
			return {'message': 'body required'}, 500

		if not body.get('level'):
			return {'message': 'Invalid body'}, 500

		if not body.get('score'):
			return {'message': 'Invalid body'}, 500
		
		data = [(request.decoded_token.get('sub'), request.decoded_token.get('name'), request.decoded_token.get('picture'), body.get('level'), body.get('score'))]
		print(data)
		cursor.executemany("INSERT INTO numrecall_users (user_id, user_name, user_pic, level, score) VALUES (%s, %s, %s, %s)", data)
		connection.commit()
		
		return {'message': 'Game data saved successfully'}, 200
	
	except (Exception, psycopg2.Error) as error:
		print(f"Error saving game data: {error}")
		return {'message': 'Error saving game data'}, 500
	finally:
		# Close the database connection
		close_db_connection(connection, cursor)


# Define the leaderboard route
@app.route('/leaderboard')
def leaderboard():
	
	connection, cursor = connect_to_db()
	if connection is None or cursor is None:
		return {'message': 'Error connecting to the database'}, 500

	try:
		# Execute the query to fetch data from the numrecall table
		cursor.execute("SELECT user_id, user_name, user_pic, score FROM numrecall_users ORDER BY score DESC LIMIT 10")
		# Fetch all the rows from the result set
		rows = cursor.fetchall()
		# Create a list to store the leaderboard data
		leaderboard = []
		# Iterate over the rows and create a dictionary for each row
		for row in rows:
			leaderboard.append({
				'user_id': row[0],
				'user_name': row[1],
    			'user_pic': row[2],
    			'score': row[3]
			})
		# Return the leaderboard data as JSON
		return {'leaderboard': leaderboard}, 200
	except (Exception, psycopg2.Error) as error:
		print(f"Error fetching data from the database: {error}")
		return {'message': 'Error fetching data from the database'}, 500
	finally:
		# Close the database connection
		close_db_connection(connection, cursor)
  


# Define the user score board route
@app.route('/scores')
def scores():
    
	print(request.decoded_token.get('sub'))

	connection, cursor = connect_to_db()
 
	if connection is None or cursor is None:
		return {'message': 'Error connecting to the database'}, 500

	try:
		# Execute the query to fetch data from the numrecall table
		cursor.execute("SELECT user_id, user_name, level, score FROM numrecall_users where user_id = '{}'  ORDER BY score DESC LIMIT 10".format(request.decoded_token.get('sub')))
  
  		# Fetch all the rows from the result set
		rows = cursor.fetchall()
		# Create a list to store the leaderboard data
		userScores = []
		# Iterate over the rows and create a dictionary for each row
		for row in rows:
			userScores.append({
				'user_id': row[0],
				'user_name': row[1],
    			'level': row[2],
    			'score': row[3]
			})
		# Return the userScores data as JSON
		return {'scores': userScores}, 200
	except (Exception, psycopg2.Error) as error:
		print(f"Error fetching data from the database: {error}")
		return {'message': 'Error fetching data from the database'}, 500
	finally:
		# Close the database connection
		close_db_connection(connection, cursor)


# Run the Flask application
if __name__ == '__main__':
    connection, cursor = connect_to_db()    
    try:
        app.run(host='0.0.0.0', port=4000, debug=True)
    finally:
        close_db_connection(connection, cursor)