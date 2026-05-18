"""
PhishAware - Educational Phishing Awareness Simulator
A cybersecurity training platform for phishing detection and prevention

IMPORTANT: This application is developed strictly for cybersecurity awareness
and educational simulation purposes only. No credentials are stored or transmitted.
"""

from flask import Flask, render_template, redirect, url_for, request, jsonify
import json
from pathlib import Path

# Initialize Flask app
app = Flask(__name__, template_folder="templates", static_folder="static")
app.config["SECRET_KEY"] = "phishaware-education-key-only"

# Load quiz data
QUIZ_FILE = Path("data/quiz.json")


def load_quiz_data():
    """Load quiz questions from JSON file"""
    try:
        with open(QUIZ_FILE, "r") as f:
            return json.load(f)
    except FileNotFoundError:
        return {"questions": []}


# ============================================================
# MAIN ROUTES
# ============================================================


@app.route("/")
def index():
    """Home page - Landing page with hero section"""
    return render_template("index.html")


@app.route("/simulations")
def simulations():
    """Simulations selection page - Choose which phishing to simulate"""
    return render_template("simulations.html")


@app.route("/dashboard")
def dashboard():
    """Educational dashboard - Learn about phishing attacks"""
    return render_template("dashboard.html")


@app.route("/tips")
def tips():
    """Security tips page - Best practices and prevention methods"""
    return render_template("tips.html")


@app.route("/quiz")
def quiz():
    """Interactive quiz page"""
    quiz_data = load_quiz_data()
    return render_template(
        "quiz.html",
        quiz_data=json.dumps(quiz_data)
    )


# ============================================================
# PHISHING SIMULATION ROUTES
# ============================================================


@app.route("/simulate/bank")
def simulate_bank():
    """Fake bank login simulation"""
    return render_template("fake_bank.html")


@app.route("/simulate/social")
def simulate_social():
    """Fake social media login simulation"""
    return render_template("fake_social.html")


@app.route("/simulate/giveaway")
def simulate_giveaway():
    """Fake giveaway scam simulation"""
    return render_template("fake_giveaway.html")


# ============================================================
# PHISHING SUBMISSION ROUTES (Don't store data - redirect to awareness)
# ============================================================


@app.route("/phishing/bank-submit", methods=["POST"])
def bank_submit():
    """Handle fake bank form submission - NEVER store credentials"""
    # Do NOT process or store form data
    # Simply redirect to awareness page
    return redirect(url_for("awareness", sim="bank"))


@app.route("/phishing/social-submit", methods=["POST"])
def social_submit():
    """Handle fake social form submission - NEVER store credentials"""
    # Do NOT process or store form data
    # Simply redirect to awareness page
    return redirect(url_for("awareness", sim="social"))


@app.route("/phishing/giveaway-submit", methods=["POST"])
def giveaway_submit():
    """Handle fake giveaway form submission - NEVER store data"""
    # Do NOT process or store form data
    # Simply redirect to awareness page
    return redirect(url_for("awareness", sim="giveaway"))


# ============================================================
# AWARENESS & EDUCATION ROUTES
# ============================================================


@app.route("/awareness")
def awareness():
    """Awareness explanation page - Show what they fell for and why"""
    sim_type = request.args.get("sim", "bank")

    # Awareness data for each simulation type
    awareness_data = {
        "bank": {
            "title": "Bank Phishing Simulation",
            "real_url": "https://secure.yourbank.com",
            "fake_url": "https://secure-yourbank.security-verify.xyz",
            "red_flags": [
                'Suspicious domain - "security-verify.xyz" is not yourbank.com',
                "Extra words in domain to look legitimate",
                "Generic greeting - no personalization",
                'Urgent language - "Verify immediately" creates pressure',
                "Asks for password - banks never ask for passwords via links",
                "Poor design quality compared to real bank site",
                "Misspelled domain trying to impersonate official site",
            ],
            "threat_level": "HIGH",
            "explanation": "This phishing attempt impersonated your bank to steal login credentials. Real banks never ask you to verify credentials via email links.",
        },
        "social": {
            "title": "Social Media Phishing Simulation",
            "real_url": "https://instagram.com",
            "fake_url": "https://instagram-security-login.co",
            "red_flags": [
                "Fake TLD (.co instead of .com)",
                "Extra words in domain (instagram-security)",
                "Claims account will be deleted",
                "Creates false urgency",
                "Asks for password directly",
                "Instagram would never contact you this way",
                "Generic greeting without your name",
            ],
            "threat_level": "HIGH",
            "explanation": "Social media platforms never ask you to verify through suspicious links. Always log in directly from the official app or website.",
        },
        "giveaway": {
            "title": "Giveaway Scam Simulation",
            "real_url": "https://official-brand.com",
            "fake_url": "https://brand-giveaway-win-now.xyz",
            "red_flags": [
                'Too good to be true - "You won!"',
                "Asks for personal information",
                "Suspicious domain name",
                "Generic greeting",
                "Urgency to claim prize",
                "Real brands have verification on their official site",
                "Requires payment or sensitive data upfront",
            ],
            "threat_level": "CRITICAL",
            "explanation": "Giveaway scams trick users into revealing personal information or paying fees. Legitimate prizes never require upfront payments or personal data collection.",
        },
    }

    current = awareness_data.get(sim_type, awareness_data["bank"])
    return render_template("awareness.html", data=current)


@app.route("/certificate")
def certificate():
    """Certificate page - After completing quiz"""
    return render_template("certificate.html")


# ============================================================
# API ROUTES FOR ADVANCED FEATURES
# ============================================================


@app.route("/api/check-url", methods=["POST"])
def check_url():
    """URL Safety Checker - Analyze URL for phishing indicators"""
    data = request.get_json()
    url = data.get("url", "").lower()

    risk_score = 0
    indicators = []

    # Check for suspicious patterns
    suspicious_words = [
        "verify",
        "confirm",
        "secure",
        "urgent",
        "update",
        "click",
        "bank",
        "paypal",
        "amazon",
    ]
    for word in suspicious_words:
        if word in url:
            risk_score += 15
            indicators.append(f"Contains suspicious word: '{word}'")

    # Check for common phishing patterns
    if len(url.split(".")) > 3:
        risk_score += 20
        indicators.append("Multiple subdomains (may be impersonation)")

    if url.count("-") > 2:
        risk_score += 15
        indicators.append("Many hyphens in domain (common in phishing)")

    if "http://" in url:
        risk_score += 30
        indicators.append("Uses HTTP instead of HTTPS (not secure)")

    if url.endswith((".tk", ".ml", ".ga", ".cf", ".xyz", ".top", ".info")):
        risk_score += 20
        indicators.append("Uses suspicious TLD (free domain provider)")

    # Ensure score is 0-100
    risk_score = min(risk_score, 100)
    risk_level = "Low Risk"
    if risk_score > 70:
        risk_level = "Critical Risk"
    elif risk_score > 50:
        risk_level = "High Risk"
    elif risk_score > 30:
        risk_level = "Medium Risk"

    return jsonify(
        {"risk_score": risk_score, "risk_level": risk_level, "indicators": indicators}
    )


@app.route("/api/analyze-email", methods=["POST"])
def analyze_email():
    """Email Analyzer - Analyze email text for phishing indicators"""
    data = request.get_json()
    email_text = data.get("email", "").lower()

    phishing_words = {
        "urgent": 30,
        "verify": 25,
        "confirm": 25,
        "click here": 20,
        "act now": 25,
        "update payment": 30,
        "suspend": 30,
        "expire": 25,
        "limited time": 20,
        "unusual activity": 30,
    }

    risk_score = 0
    found_indicators = []

    for word, score in phishing_words.items():
        if word in email_text:
            risk_score += score
            found_indicators.append(f"Uses urgent language: '{word}'")

    # Check for generic greeting
    generic_greetings = ["dear user", "dear valued customer", "dear customer"]
    for greeting in generic_greetings:
        if greeting in email_text:
            risk_score += 15
            found_indicators.append("Generic greeting (no personalization)")

    risk_score = min(risk_score, 100)
    risk_level = "Low Risk"
    if risk_score > 70:
        risk_level = "Critical Risk"
    elif risk_score > 50:
        risk_level = "High Risk"
    elif risk_score > 30:
        risk_level = "Medium Risk"

    return jsonify(
        {
            "risk_score": risk_score,
            "risk_level": risk_level,
            "indicators": found_indicators,
        }
    )


# ============================================================
# ERROR HANDLERS
# ============================================================


@app.errorhandler(404)
def page_not_found(e):
    """Handle 404 errors"""
    return render_template("index.html"), 404


@app.errorhandler(500)
def internal_error(e):
    """Handle 500 errors"""
    return render_template("index.html"), 500


# ============================================================
# RUN APPLICATION
# ============================================================

if __name__ == "__main__":
    # Development server
    # For production, use Gunicorn: gunicorn app:app
    app.run(debug=False, host="0.0.0.0", port=5000)
