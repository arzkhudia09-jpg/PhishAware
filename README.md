# 🔒 PhishAware - Phishing Awareness Simulator

> **A comprehensive educational platform for cybersecurity awareness and phishing detection training**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Python](https://img.shields.io/badge/Python-3.13%2B-blue)
![Flask](https://img.shields.io/badge/Flask-3.0.0-blue)
![Live Demo](https://img.shields.io/badge/demo-phishaware--2dwn.onrender.com-brightgreen)

## 🔗 Live Demo

Try the live app at: https://phishaware-2dwn.onrender.com

## ⚠️ Important Disclaimer

**This project is developed STRICTLY for cybersecurity awareness and educational simulation purposes only.**

- ✅ Does NOT store passwords, emails, or credentials
- ✅ Does NOT send user data anywhere
- ✅ Does NOT perform real phishing attacks
- ✅ Educational tool for training only
- ✅ All data is temporary and non-persistent

## 🎯 Project Overview

PhishAware is a modern, interactive web application designed to educate users about phishing attacks and cybersecurity best practices. The application features realistic phishing simulations that immediately redirect to educational explanations, helping users understand attack mechanisms and learn defensive strategies.

### Key Features

- **🎭 Realistic Phishing Simulations**
  - Fake Bank Login
  - Fake Social Media Login
  - Fake Giveaway Scam
  - Immediate educational redirect on form submission

- **📚 Interactive Quiz System**
  - 10 comprehensive phishing awareness questions
  - Instant feedback with explanations
  - Progress tracking
  - Score calculation with 70% pass threshold
  - Certificate generation for passing users

- **📘 Enhanced Learning Experience**
  - Polished educational dashboard for faster comprehension
  - Readable, bite-sized security advice on the tips page
  - Improved visual flow and attention-guiding content blocks

- **🛡️ Security Tools**
  - URL Safety Checker - Analyze URLs for suspicious patterns
  - Email Analyzer - Detect phishing indicators in emails
  - Risk scoring and visual indicators

- **📊 Educational Dashboard**
  - Comprehensive attack type explanations
  - Attack flow diagrams
  - Prevention methods
  - Cybersecurity terminology guide

- **💡 Security Tips & Best Practices**
  - Actionable security recommendations
  - HTTPS verification guide
  - Multi-factor authentication (MFA) information
  - Password manager usage tips

- **🎨 Professional UI/UX**
  - Dark cybersecurity theme
  - Neon green accents
  - Terminal-inspired design
  - Fully responsive mobile design
  - Smooth animations and transitions

## 🚀 Technology Stack

### Backend
- **Framework**: Python Flask 2.3.3
- **Server**: Gunicorn (production)
- **Runtime**: Python 3.8+

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Advanced styling with animations
- **JavaScript**: Vanilla JS (no dependencies)

### Deployment
- **Platform**: Render, Heroku, or any cloud service
- **Server**: Gunicorn WSGI
- **Database**: None (no data storage)

## 📁 Project Structure

```
PhishAware/
│
├── app.py                          # Flask application & routes
├── requirements.txt                # Python dependencies
├── Procfile                        # Deployment configuration
├── .gitignore                      # Git ignore rules
├── README.md                       # Documentation
│
├── static/
│   ├── css/
│   │   └── style.css              # Main stylesheet (cybersecurity theme)
│   │
│   ├── js/
│   │   └── script.js              # Interactive features & quiz logic
│   │
│   └── images/
│       └── (add cybersecurity icons here)
│
├── templates/
│   ├── index.html                 # Landing page
│   ├── simulations.html           # Simulation selection
│   ├── fake_bank.html             # Bank phishing simulation
│   ├── fake_social.html           # Social media phishing
│   ├── fake_giveaway.html         # Giveaway scam simulation
│   ├── awareness.html             # Educational explanation
│   ├── quiz.html                  # Interactive quiz
│   ├── dashboard.html             # Learning dashboard
│   ├── tips.html                  # Security tips
│   └── certificate.html           # Completion certificate
│
└── data/
    └── quiz.json                  # Quiz questions & answers
```

## 🔧 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/PhishAware.git
cd PhishAware
```

2. **Create virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the application**
```bash
python app.py
```

5. **Access the application**
Open your browser and navigate to:
```
http://localhost:5000
```

## 🌐 Deployment

### Deploy to Render

1. Push your code to GitHub
2. Connect your repository to Render
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `gunicorn app:app`
5. Deploy!

### Deploy to Heroku

1. Create Heroku account and install Heroku CLI
2. Initialize git repository
3. Create Heroku app:
```bash
heroku create your-app-name
```

4. Deploy:
```bash
git push heroku main
```

### Deploy to Other Platforms

The application is compatible with:
- ✅ AWS Elastic Beanstalk
- ✅ Google Cloud Platform
- ✅ Azure App Service
- ✅ DigitalOcean
- ✅ Fly.io
- ✅ Any Docker-compatible platform

## 📖 Usage Guide

### For Students/Users

1. **Start with the Landing Page**
   - Read the introduction
   - Understand the educational purpose

2. **Try a Simulation**
   - Select a phishing simulation
   - See realistic phishing attempt
   - Submit the form
   - Learn why it's a phishing attack

3. **Take the Quiz**
   - Answer 10 questions
   - Get instant feedback
   - Receive score
   - Generate certificate if passing

4. **Use Security Tools**
   - Check URL safety
   - Analyze suspicious emails
   - Understand risk indicators

5. **Review Dashboard**
   - Learn about attack types
   - Understand prevention methods
   - Review security terminology

### For Instructors

1. **Share the URL**
   - Share application URL with students
   - No installation required

2. **Track Understanding**
   - Students can complete simulations independently
   - Quiz scores show comprehension
   - Certificates demonstrate completion

3. **Supplement Training**
   - Use as part of security awareness program
   - Combine with in-class discussions
   - Reference specific attack types

## 🎓 Learning Outcomes

After completing PhishAware, users will understand:

- ✅ How phishing attacks work
- ✅ Common red flags in suspicious emails
- ✅ URL verification techniques
- ✅ Difference between legitimate and fake domains
- ✅ Importance of HTTPS and security indicators
- ✅ Social engineering tactics
- ✅ Multi-factor authentication benefits
- ✅ Password security best practices
- ✅ When to verify sender identity
- ✅ How to report phishing attempts

## 🔒 Security Features

### Data Protection
- ✅ No credentials storage
- ✅ No form data logging
- ✅ No database usage
- ✅ No external data transmission
- ✅ Client-side quiz processing
- ✅ No tracking or analytics

### Ethical Design
- ✅ Clear educational disclaimers
- ✅ Immediate redirection from simulations
- ✅ No real phishing consequences
- ✅ Explanation of all attack methods
- ✅ Defense strategies provided

## 🎨 Design Features

### Visual Theme
- Dark cybersecurity background (#0a0e27)
- Neon green accents (#00ff41)
- Terminal-inspired interface
- Professional SOC dashboard aesthetics

### User Experience
- Smooth page transitions
- Animated components
- Mobile-responsive design
- Keyboard accessible
- Readable typography
- Consistent color scheme

### Animations
- Hero section floating effects
- Button hover animations
- Card elevation on hover
- Progress bar fills
- Alert slide-in animations
- Pulsing urgency indicators

## 📊 Quiz System

### Question Bank
The application includes 10 comprehensive questions covering:

1. Email indicators
2. Urgent action requests
3. Suspicious URLs
4. Smishing attacks
5. Generic greetings
6. HTTPS understanding
7. Account suspension threats
8. Two-Factor Authentication
9. Business Email Compromise
10. Malicious attachments

### Scoring
- Each question: 1 point
- Pass threshold: 70% (7/10)
- Passing users receive certificate
- Detailed feedback on all answers

## 🛠️ API Endpoints

### Public Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/` | GET | Landing page |
| `/simulations` | GET | Simulation selection page |
| `/fake_bank` | GET | Bank phishing simulation |
| `/fake_social` | GET | Social media phishing |
| `/fake_giveaway` | GET | Giveaway scam simulation |
| `/awareness` | GET | Awareness/education page |
| `/quiz` | GET | Quiz page |
| `/dashboard` | GET | Learning dashboard |
| `/tips` | GET | Security tips |

### Form Submissions
| Route | Method | Description |
|-------|--------|-------------|
| `/fake_bank` | POST | Bank form redirect |
| `/fake_social` | POST | Social form redirect |
| `/fake_giveaway` | POST | Giveaway form redirect |

**Important**: All form submissions are redirected immediately. No data is processed or stored.

## 💻 Development

### Code Quality
- Clean, modular structure
- Well-commented code
- Consistent naming conventions
- Responsive design practices
- Accessibility standards

### File Organization
```
app.py              - 300+ lines
style.css           - 1000+ lines
script.js           - 800+ lines
HTML templates      - 100-300 lines each
```

### Future Enhancement Ideas
- [ ] Admin dashboard for instructors
- [ ] User session tracking (anonymous)
- [ ] Leaderboard for quiz competition
- [ ] More phishing simulations
- [ ] Video tutorials
- [ ] Mobile app
- [ ] Multiple language support
- [ ] Advanced analytics

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Guidelines
- Follow existing code style
- Add comments for complex logic
- Test responsiveness on mobile
- Ensure accessibility compliance

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- Cybersecurity best practices from NIST
- OWASP Foundation guidelines
- Security awareness resources
- UI/UX design principles

## 📧 Support

For questions or issues:
- Create an issue on GitHub
- Email: support@phishaware.com
- Check documentation: [Full Docs](https://docs.phishaware.com)

## ⚡ Quick Reference

### Common Issues

**Port already in use:**
```bash
python app.py --port 8080
```

**Module import errors:**
```bash
pip install --upgrade -r requirements.txt
```

**Not running on localhost:**
```bash
# In app.py, change:
app.run(host='0.0.0.0', port=5000)
```

### Performance Tips
- Cache static assets
- Minimize JavaScript bundle
- Optimize images
- Use CDN for production
- Enable gzip compression

## 📚 Additional Resources

- [OWASP Phishing Resources](https://owasp.org)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)
- [FBI Phishing Warnings](https://www.fbi.gov/investigate/cyber)
- [Cybersecurity & Infrastructure Security Agency](https://www.cisa.gov)

---

## 🚀 Getting Started Right Now

```bash
# 1. Clone
git clone https://github.com/yourusername/PhishAware.git && cd PhishAware

# 2. Setup
python -m venv venv && source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Install
pip install -r requirements.txt

# 4. Run
python app.py

# 5. Open browser to http://localhost:5000
```

**Happy Learning! 🎓🔒**

---

### Legal Notice

This application is designed for **educational and authorized training purposes only**. Users must:
- ✅ Use only for legitimate security awareness training
- ✅ Not use simulations to trick real people
- ✅ Not use for unauthorized security testing
- ✅ Comply with all applicable laws and regulations
- ✅ Obtain proper authorization before conducting security training

**Misuse of this application for actual phishing or unauthorized security testing is illegal.**

---

**Last Updated**: May 2026
**Version**: 1.0.0
**Status**: Production Ready ✅
