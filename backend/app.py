from flask import Flask, request, jsonify
import jwt
import datetime
from flask_cors import CORS
from functools import wraps

app = Flask(__name__)
CORS(app)

SECRET_KEY = "your-secret-key"

# --- JWT validation decorator ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(*args, **kwargs)

    return decorated

# --- Login Route ---
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username.lower() == 'kyle' and password.lower() == 'kyle':
        token = jwt.encode({
            'user': username,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({ 'token': token })

    return jsonify({ 'message': 'Invalid credentials' }), 401

# --- Chart Data Routes ---
@app.route('/chart1', methods=['GET'])
@token_required
def chart1():
    data = {
        'labels': ['GPT-4', 'Claude 3', 'Gemini', 'Mistral', 'LLaMA 2'],
        'values': [75, 65, 60, 50, 45]
    }
    return jsonify(data)

@app.route('/chart2', methods=['GET'])
@token_required
def chart2():
    data = {
        'labels': ['Text', 'Image', 'Code', 'Audio'],
        'values': [80, 60, 55, 40]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(port=3000)
