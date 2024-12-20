from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app,origins=["*"])

@app.route('/')
def index():
    return jsonify({"message":"Hello Kids!"}),200

@app.route('/generate_story', methods=['POST'])
def generate_story():
    data = request.json
    # Simulated response for story generation
    return jsonify({
        "message": "Story generated!",
        "data": data
    })

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0",port=5000)
