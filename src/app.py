from flask import Flask, jsonify, request
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

with open('word_list.txt', 'r') as file:                    # Load word list from file and filter words to ensure they are 5 letters long
    words = [word for word in file.read().splitlines() if len(word) == 5]

selected_word = random.choice(words)                        # Select a random 5-letter word for the game

@app.route('/word', methods=['GET'])
def get_word():
    return jsonify({"word_length": len(selected_word)})     # Return the length of the selected word

@app.route('/guess', methods=['POST'])
def guess_word():
    data = request.json
    guess = data.get('guess')

    if not guess or len(guess) != len(selected_word):       # Check if guess is valid
        return jsonify({"error": "Invalid guess"}), 400

    result = []                                             # Analyze the guess
    for i in range(len(selected_word)):
        if guess[i] == selected_word[i]:
            result.append("correct")
        elif guess[i] in selected_word:
            result.append("present")
        else:
            result.append("absent")

    return jsonify({"result": result})                      # Return the analysis result

if __name__ == '__main__':
    app.run(debug=True)
