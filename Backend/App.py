from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)

# ---------------- CONFIG ----------------
app.secret_key = "job_tracker_secret"

CORS(app, supports_credentials=True)

bcrypt = Bcrypt(app)

# ---------------- DB CONNECTION ----------------
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="velmurugan2002",
        database="job_tracker"
    )

# ---------------- HOME ----------------
@app.route("/")
def home():
    return jsonify({"message": "Backend running 🚀"})

# ---------------- REGISTER ----------------
@app.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        username = data["username"]
        email = data["email"]
        password = data["password"]

        hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")

        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            cursor.close()
            db.close()
            return jsonify({"message": "User already exists"}), 400

        cursor.execute(
            "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)",
            (username, email, hashed_password)
        )

        db.commit()
        cursor.close()
        db.close()

        return jsonify({"message": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- LOGIN ----------------
@app.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        email = data["email"]
        password = data["password"]

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users WHERE email=%s", (email,))
        user = cursor.fetchone()

        cursor.close()
        db.close()

        if not user:
            return jsonify({"message": "User not found"}), 404

        if bcrypt.check_password_hash(user["password"], password):
            session["user_id"] = user["id"]

            return jsonify({
                "message": "Login successful",
                "user": {
                    "id": user["id"],
                    "username": user["username"],
                    "email": user["email"]
                }
            }), 200

        return jsonify({"message": "Invalid password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- LOGOUT ----------------
@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logged out successfully"})

# ---------------- ADD APPLICATION ----------------
@app.route("/applications", methods=["POST"])
def add_application():
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        data = request.get_json()

        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute("""
            INSERT INTO applications
            (user_id, company, role, status, applied_on, location, job_url, notes)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            user_id,
            data["company"],
            data["role"],
            data.get("status", "Applied"),
            data["applied_on"],
            data.get("location"),
            data.get("job_url"),
            data.get("notes")
        ))

        db.commit()

        cursor.close()
        db.close()

        return jsonify({"message": "Application added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- GET APPLICATIONS ----------------
@app.route("/applications", methods=["GET"])
def get_applications():
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            "SELECT * FROM applications WHERE user_id=%s ORDER BY id DESC",
            (user_id,)
        )

        applications = cursor.fetchall()

        cursor.close()
        db.close()

        return jsonify(applications), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- UPDATE APPLICATION ----------------
@app.route("/applications/<int:id>", methods=["PUT"])
def update_application(id):
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        data = request.get_json()

        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute("""
            UPDATE applications
            SET company=%s, role=%s, status=%s
            WHERE id=%s AND user_id=%s
        """, (
            data["company"],
            data["role"],
            data["status"],
            id,
            user_id
        ))

        db.commit()

        cursor.close()
        db.close()

        return jsonify({"message": "Application updated"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- DELETE APPLICATION ----------------
@app.route("/applications/<int:id>", methods=["DELETE"])
def delete_application(id):
    try:
        user_id = session.get("user_id")

        if not user_id:
            return jsonify({"message": "Unauthorized"}), 401

        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute(
            "DELETE FROM applications WHERE id=%s AND user_id=%s",
            (id, user_id)
        )

        db.commit()

        cursor.close()
        db.close()

        return jsonify({"message": "Application deleted"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)
