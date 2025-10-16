from flask import Flask, jsonify, request
from flask_cors import CORS
import json, os

app = Flask(__name__)
CORS(app)

def load_data():
    with open("recipes.json", "r", encoding="utf-8") as f:
        return json.load(f)

@app.route("/recipes")
def all_recipes():
    return jsonify(load_data())

@app.route("/recipes/<name>")
def get_recipe(name):
    data = load_data()
    name = name.lower()
    for group in data.values():
        if isinstance(group, dict):
            for recipe, items in group.items():
                if recipe.lower() == name:
                    return jsonify({recipe: items})
    return jsonify({"error": "recipe not found"})

@app.route("/pantry", methods=["POST"])
def pantry():
    ingredients = [i.strip().lower() for i in request.json.get("ingredients", []) if i.strip()]
    data = load_data()
    results = []

    for group in data.values():
        if isinstance(group, dict):
            for recipe, items in group.items():
                # flatten recipe ingredients into one lowercase string
                recipe_text = " ".join(items).lower()
                # count how many pantry words appear in recipe
                matches = sum(1 for i in ingredients if i in recipe_text)
                if matches > 0:
                    match_pct = int((matches / len(ingredients)) * 100)
                    results.append({
                        "recipe": recipe,
                        "match": match_pct
                    })

    # sort by match %
    results.sort(key=lambda x: x["match"], reverse=True)

    if not results:
        return jsonify({"message": "go ask a magic 8ball."})

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)


# server.py
