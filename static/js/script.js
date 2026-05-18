/* ==========================================
   PhishAware - Main JavaScript File
   Interactive Features & Event Handling
   ========================================== */

// ==========================================
// GLOBAL STATE
// ==========================================

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let quizStarted = false;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
  console.log('PhishAware Application Loaded');

  // Set up event listeners
  setupEventListeners();

  // Initialize tooltips
  initializeTooltips();

  // Smooth scroll for navigation
  setupSmoothScroll();
});

// ==========================================
// QUIZ FUNCTIONALITY
// ==========================================
function startQuiz() {
  console.log(quizData);
  console.log("Start Quiz Clicked");

  if (!quizData || !quizData.questions || quizData.questions.length === 0) {
    console.error("Quiz data missing");
    return;
  }
  quizStarted = true;
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];

  // Hide intro section
  document.getElementById("quizHeader").style.display = "none";

  // Show quiz section
  document.getElementById("quizContent").style.display = "block";

  // Show progress bar
  document.getElementById("progressContainer").style.display = "block";

  // Set total questions
  document.getElementById("totalQuestions").textContent =
    quizData.questions.length;

  displayQuestion();
}

function displayQuestion() {

  const question = quizData.questions[currentQuestionIndex];

  if (!question) {
    console.error("Question not found");
    return;
  }

  // Update progress
  document.getElementById("currentQuestion").textContent =
    currentQuestionIndex + 1;

  const progressPercent =
    ((currentQuestionIndex + 1) / quizData.questions.length) * 100;

  document.getElementById("progressFill").style.width =
    progressPercent + "%";

  // Set question text
  document.getElementById("questionText").textContent =
    question.question;

  // Options container
  const optionsContainer =
    document.getElementById("optionsContainer");

  optionsContainer.innerHTML = "";

  // Generate options
  question.options.forEach((option, index) => {

    optionsContainer.innerHTML += `
        <label class="option">
            <input
                type="radio"
                name="answer"
                value="${index}"
                class="answer-radio"
                onclick="selectAnswer(${index})"
            >

            <span class="option-text">
                ${option}
            </span>
        </label>
    `;
  });
};
function selectAnswer(selectedIndex) {

  // Save answer
  selectedAnswers[currentQuestionIndex] = selectedIndex;

  const question =
    quizData.questions[currentQuestionIndex];

  const optionLabels = document.querySelectorAll(".option");

  optionLabels.forEach((label, index) => {

    if (index === question.correct) {
      label.classList.add("correct");
    }

    if (
      index === selectedIndex &&
      selectedIndex !== question.correct
    ) {
      label.classList.add("incorrect");
    }
  });

  // Disable all radios
  const radios =
    document.querySelectorAll(".answer-radio");

  radios.forEach(radio => {

    radio.disabled = true;

    const optionLabel = radio.closest(".option");

    optionLabel.style.pointerEvents = "none";

    optionLabel.style.opacity = "0.8";
  });

  // Show feedback
  const feedbackBox =
    document.getElementById("feedbackBox");

  const feedbackContent =
    document.getElementById("feedbackContent");

  feedbackBox.style.display = "block";

  // Correct answer
  if (selectedIndex === question.correct) {

    score++;

    feedbackContent.innerHTML = `
            <div class="alert alert-success">
                <strong>✅ Correct!</strong><br><br>
                ${question.explanation}
            </div>
        `;

  } else {

    feedbackContent.innerHTML = `
            <div class="alert alert-danger">
                <strong>❌ Incorrect!</strong><br><br>

                Correct Answer:
                ${question.options[question.correct]}

                <br><br>

                ${question.explanation}
            </div>
        `;
  }

  // Next button logic
  const nextBtn =
    document.getElementById("nextQuestionBtn");

  if (currentQuestionIndex === quizData.questions.length - 1) {

    nextBtn.textContent = "Show Results";

    nextBtn.onclick = () => {

      feedbackBox.style.display = "none";

      submitQuiz();
    };

  } else {

    nextBtn.textContent = "Next Question";

    nextBtn.onclick = () => {

      currentQuestionIndex++;

      feedbackBox.style.display = "none";

      // Reset next button
      nextBtn.onclick = null;

      // Load next question
      displayQuestion();
    };
  }
}

function submitQuiz() {
  const selectedRadio = document.querySelector('.answer-radio:checked');
  if (!selectedRadio) {
    showAlert('Please select an answer before submitting.', 'warning');
    return;
  }

  selectedAnswers[currentQuestionIndex] = parseInt(selectedRadio.value);

  // Calculate score
  score = 0;
  selectedAnswers.forEach((answer, index) => {
    if (answer === quizData.questions[index].correct) {
      score++;
    }
  });
  displayQuizResults();
}

function displayQuizResults() {
  const quizContainer = document.getElementById('quiz-container');
  if (!quizContainer) return;

  const totalQuestions = quizData.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = score >= Math.ceil(totalQuestions * 0.7); // 70% pass rate

  let resultHTML = `
    <div class="quiz-header">
      <h2>Quiz Complete!</h2>
    </div>
    
    <div class="card" style="text-align: center;">
      <div style="font-size: 3rem; color: var(--neon-green); margin: 1rem 0;">
        ${percentage}%
      </div>
      <div style="font-size: 1.5rem; margin-bottom: 1rem;">
        You answered ${score} out of ${totalQuestions} correctly
      </div>
  `;

  if (passed) {
    resultHTML += `
      <div class="alert alert-success">
        <span class="alert-icon">✓</span>
        <div>
          <strong>Excellent!</strong> You have passed the Phishing Awareness Quiz!
        </div>
      </div>
      <button class="btn btn-primary" onclick="generateCertificate()">Generate Certificate</button>
    `;
  } else {
    resultHTML += `
      <div class="alert alert-warning">
        <span class="alert-icon">⚠</span>
        <div>
          <strong>Good Try!</strong> Review the material and try again to improve your score.
        </div>
      </div>
      <button class="btn btn-secondary" onclick="location.reload()">Try Again</button>
    `;
  }

  resultHTML += `
    <hr style="margin: 2rem 0; border: 1px solid var(--border-color);">
    <h3 style="color: var(--neon-green); margin-bottom: 1rem;">Review Your Answers:</h3>
    <div id="answer-review"></div>
    <button class="btn btn-secondary" style="margin-top: 2rem;" onclick="location.href='/'">Back to Home</button>
  `;

  quizContainer.innerHTML = resultHTML;

  // Display answer review
  const reviewContainer = document.getElementById('answer-review');
  if (reviewContainer) {
    quizData.questions.forEach((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correct;
      const selectedOption = question.options[selectedAnswers[index]];
      const correctOption = question.options[question.correct];

      reviewContainer.innerHTML += `
        <div class="card" style="margin-bottom: 1rem;">
          <div style="margin-bottom: 1rem;">
            <strong>Question ${index + 1}:</strong> ${question.question}
          </div>
          <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect
          ? `<strong>✓ Correct!</strong> ${question.explanation}`
          : `<strong>✗ Incorrect.</strong> You selected: "${selectedOption}"<br><br>
                 Correct answer: "${correctOption}"<br><br>
                 ${question.explanation}`
        }
          </div>
        </div>
      `;
    });
  }
}

function generateCertificate() {

  const fullName = prompt(
    "Enter your Full Name for the Certificate:"
  );
  document.title =
    `${fullName}_PhishAware_Certificate`;

  if (!fullName || fullName.trim() === "") {

    showAlert(
      "Certificate name is required.",
      "warning"
    );

    return;
  }

  const now = new Date();

  const dateStr = now.toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  const certificateHTML = `

        <div class="certificate-wrapper">

            <div class="certificate">

                <div class="certificate-header">
                    🔒 Certificate of Completion
                </div>

                <p class="certificate-text">
                    This certifies that
                </p>

                <div class="certificate-name">
                    ${fullName}
                </div>

                <p class="certificate-text">

                    has successfully completed the

                    <br><br>

                    <strong>
                        PhishAware:
                        Phishing Awareness Training
                    </strong>

                </p>

                <p class="certificate-text">

                    Demonstrated knowledge in:

                    <br>

                    ✔ Phishing Detection  
                    ✔ Email Spoofing Awareness  
                    ✔ Credential Protection  
                    ✔ Cybersecurity Best Practices

                </p>

                <div class="certificate-date">
                    Completed on: ${dateStr}
                </div>

            </div>

            <button
                class="btn btn-primary mt-3"
                onclick="printCertificate()"
            >
                🖨 Print Certificate
            </button>

        </div>
    `;

  const quizContainer =
    document.getElementById("quiz-container");

  quizContainer.innerHTML = certificateHTML;
  document.querySelector(".certificate-wrapper")
    .scrollIntoView({
      behavior: "smooth"
    });
}

function printCertificate() {

  window.print();

  setTimeout(() => {
    document.title = "PhishAware";
  }, 1000);
}

// ==========================================
// PHISHING SIMULATION HANDLING
// ==========================================

function handlePhishingSubmit(event) {
  event.preventDefault();

  // Don't store any data - just redirect
  console.log('Phishing simulation submitted - redirecting to awareness page');

  // Redirect to awareness page
  window.location.href = '/awareness';
}

// ==========================================
// URL SAFETY CHECKER
// ==========================================

function checkURLSafety() {
  const urlInput = document.getElementById('url-input');
  const resultContainer = document.getElementById('url-result');

  if (!urlInput || !resultContainer) return;

  const url = urlInput.value.trim();

  if (!url) {
    showAlert('Please enter a URL to check', 'warning');
    return;
  }

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    let riskScore = 0;
    let warnings = [];

    // Check for suspicious patterns
    if (domain.includes('-')) {
      riskScore += 20;
      warnings.push('⚠ Domain contains hyphens (common in fake domains)');
    }

    if (domain.includes('secure') || domain.includes('verify') || domain.includes('confirm')) {
      riskScore += 25;
      warnings.push('⚠ Domain contains urgency/security keywords');
    }

    if (domain.length > 40) {
      riskScore += 15;
      warnings.push('⚠ Domain is unusually long');
    }

    if (!urlObj.protocol.includes('https')) {
      riskScore += 30;
      warnings.push('⚠ Not using HTTPS (insecure connection)');
    }

    // Check for common typosquatting patterns
    const commonDomains = ['google.com', 'facebook.com', 'instagram.com', 'amazon.com', 'paypal.com', 'apple.com'];
    commonDomains.forEach(common => {
      if (domain.includes(common.replace('.com', '')) && domain !== common) {
        riskScore += 35;
        warnings.push(`⚠ Possible typosquatting of ${common}`);
      }
    });

    let riskLevel = 'LOW';
    let riskColor = 'var(--success-green)';

    if (riskScore > 60) {
      riskLevel = 'HIGH';
      riskColor = 'var(--danger-red)';
    } else if (riskScore > 30) {
      riskLevel = 'MEDIUM';
      riskColor = 'var(--warning-orange)';
    }

    let resultHTML = `
      <div class="card">
        <h3 style="color: ${riskColor}; margin-bottom: 1rem;">Risk Level: ${riskLevel}</h3>
        <div style="font-size: 2rem; color: ${riskColor}; margin-bottom: 1rem;">
          ${riskScore}% Risk
        </div>
        
        <div class="progress-container">
          <div class="progress-bar" style="width: ${riskScore}%; background: ${riskColor === 'var(--danger-red)' ? 'linear-gradient(90deg, var(--danger-red) 0%, #ff6e40 100%)' : riskColor === 'var(--warning-orange)' ? 'linear-gradient(90deg, var(--warning-orange) 0%, #ffb74d 100%)' : 'linear-gradient(90deg, var(--success-green) 0%, #66bb6a 100%)'}"></div>
        </div>
        
        ${warnings.length > 0 ? `
          <h4 style="color: var(--neon-green); margin: 1.5rem 0 1rem;">Suspicious Indicators:</h4>
          <ul style="list-style: none; padding: 0;">
            ${warnings.map(w => `<li style="color: var(--warning-orange); margin-bottom: 0.5rem;">${w}</li>`).join('')}
          </ul>
        ` : `
          <div class="alert alert-success">
            <span class="alert-icon">✓</span>
            <div>This URL appears to be legitimate</div>
          </div>
        `}
        
        <div style="margin-top: 1.5rem; padding: 1rem; background-color: rgba(255, 255, 255, 0.05); border-radius: 5px;">
          <strong style="color: var(--neon-green);">Domain:</strong> ${domain}
        </div>
      </div>
    `;

    resultContainer.innerHTML = resultHTML;
  } catch (error) {
    showAlert('Invalid URL format. Please enter a valid URL.', 'danger');
  }
}

// ==========================================
// EMAIL ANALYZER
// ==========================================

function analyzeEmail() {
  const emailInput = document.getElementById('email-input');
  const resultContainer = document.getElementById('email-result');

  if (!emailInput || !resultContainer) return;

  const emailText = emailInput.value.trim();

  if (!emailText) {
    showAlert('Please paste an email to analyze', 'warning');
    return;
  }

  let suspiciousPatterns = [];
  let score = 0;

  // Check for urgency words
  const urgencyWords = ['urgent', 'immediate', 'immediately', 'now', 'action required', 'act now', 'verify', 'confirm', 'click here', 'limited time', 'expires'];
  urgencyWords.forEach(word => {
    if (emailText.toLowerCase().includes(word)) {
      suspiciousPatterns.push(`⚠ Urgency language: "${word}"`);
      score += 15;
    }
  });

  // Check for generic greetings
  const genericGreetings = ['dear user', 'dear customer', 'dear valued customer', 'hello', 'to whom it may concern'];
  genericGreetings.forEach(greeting => {
    if (emailText.toLowerCase().includes(greeting)) {
      suspiciousPatterns.push(`⚠ Generic greeting: "${greeting}"`);
      score += 10;
    }
  });

  // Check for suspicious requests
  const suspiciousRequests = ['verify account', 'confirm password', 'update information', 'click link', 'download attachment', 'provide credentials'];
  suspiciousRequests.forEach(request => {
    if (emailText.toLowerCase().includes(request)) {
      suspiciousPatterns.push(`⚠ Suspicious request: "${request}"`);
      score += 20;
    }
  });

  // Check for spoofed domain indicators
  if (emailText.includes('@') && !emailText.toLowerCase().includes('noreply')) {
    const domainMatch = emailText.match(/@([\w.-]+)/);
    if (domainMatch) {
      const domain = domainMatch[1];
      if (domain.includes('-') || domain.length > 30) {
        suspiciousPatterns.push(`⚠ Suspicious sender domain: ${domain}`);
        score += 25;
      }
    }
  }

  // Check for threats
  const threats = ['suspended', 'locked', 'compromised', 'unauthorized access', 'illegal activity'];
  threats.forEach(threat => {
    if (emailText.toLowerCase().includes(threat)) {
      suspiciousPatterns.push(`⚠ Threat language: "${threat}"`);
      score += 20;
    }
  });

  let riskLevel = 'LOW';
  let riskColor = 'var(--success-green)';

  if (score > 60) {
    riskLevel = 'HIGH';
    riskColor = 'var(--danger-red)';
  } else if (score > 30) {
    riskLevel = 'MEDIUM';
    riskColor = 'var(--warning-orange)';
  }

  let resultHTML = `
    <div class="card">
      <h3 style="color: ${riskColor}; margin-bottom: 1rem;">Email Risk Level: ${riskLevel}</h3>
      <div style="font-size: 2rem; color: ${riskColor}; margin-bottom: 1rem;">
        ${score}% Suspicious
      </div>
      
      <div class="progress-container">
        <div class="progress-bar" style="width: ${Math.min(score, 100)}%; background: ${riskColor === 'var(--danger-red)' ? 'linear-gradient(90deg, var(--danger-red) 0%, #ff6e40 100%)' : riskColor === 'var(--warning-orange)' ? 'linear-gradient(90deg, var(--warning-orange) 0%, #ffb74d 100%)' : 'linear-gradient(90deg, var(--success-green) 0%, #66bb6a 100%)'}"></div>
      </div>
      
      ${suspiciousPatterns.length > 0 ? `
        <h4 style="color: var(--danger-red); margin: 1.5rem 0 1rem;">Detected Issues:</h4>
        <ul style="list-style: none; padding: 0;">
          ${suspiciousPatterns.map(p => `<li style="color: var(--warning-orange); margin-bottom: 0.5rem;">${p}</li>`).join('')}
        </ul>
      ` : `
        <div class="alert alert-success">
          <span class="alert-icon">✓</span>
          <div>This email appears to be legitimate</div>
        </div>
      `}
      
      <h4 style="color: var(--neon-green); margin-top: 1.5rem; margin-bottom: 1rem;">Recommendations:</h4>
      <ul style="list-style: none; padding: 0; color: var(--text-secondary);">
        <li>✓ Never click links in unexpected emails</li>
        <li>✓ Verify sender address by hovering over it</li>
        <li>✓ Contact the organization directly using official phone number</li>
        <li>✓ Check for HTTPS before entering credentials</li>
        <li>✓ Be suspicious of urgent requests</li>
      </ul>
    </div>
  `;

  resultContainer.innerHTML = resultHTML;
}

// ==========================================
// EVENT LISTENERS SETUP
// ==========================================

function setupEventListeners() {
  // URL Safety Checker
  const urlCheckBtn = document.getElementById('check-url-btn');
  if (urlCheckBtn) {
    urlCheckBtn.addEventListener('click', checkURLSafety);
  }

  const urlInput = document.getElementById('url-input');
  if (urlInput) {
    urlInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkURLSafety();
    });
  }

  // Email Analyzer
  const emailAnalyzeBtn = document.getElementById('analyze-email-btn');
  if (emailAnalyzeBtn) {
    emailAnalyzeBtn.addEventListener('click', analyzeEmail);
  }

  // Start Quiz
  const startQuizBtn = document.getElementById("startQuizBtn");
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
  }

  // Phishing forms
  const phishingForms = document.querySelectorAll('.phishing-form');
  phishingForms.forEach(form => {
    form.addEventListener('submit', handlePhishingSubmit);
  });
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showAlert(message, type = 'info') {
  // Create alert element
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.style.position = 'fixed';
  alert.style.top = '100px';
  alert.style.right = '20px';
  alert.style.zIndex = '10000';
  alert.style.maxWidth = '400px';
  alert.style.animation = 'slideInRight 0.3s ease-out';

  const iconMap = {
    success: '✓',
    danger: '✗',
    warning: '⚠',
    info: 'ℹ'
  };

  alert.innerHTML = `
    <span class="alert-icon">${iconMap[type] || 'ℹ'}</span>
    <div>${message}</div>
  `;

  document.body.appendChild(alert);

  // Auto remove after 5 seconds
  setTimeout(() => {
    alert.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => alert.remove(), 300);
  }, 5000);
}

function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

function initializeTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function () {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');
      tooltip.style.position = 'absolute';
      tooltip.style.background = 'var(--neon-green)';
      tooltip.style.color = 'var(--primary-dark)';
      tooltip.style.padding = '0.5rem 1rem';
      tooltip.style.borderRadius = '5px';
      tooltip.style.fontSize = '0.85rem';
      tooltip.style.zIndex = '1000';
      tooltip.style.whiteSpace = 'nowrap';
      tooltip.style.marginTop = '5px';

      this.appendChild(tooltip);
    });

    element.addEventListener('mouseleave', function () {
      const tooltip = this.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
    });
  });
}

// ==========================================
// SIMULATION PAGE FUNCTIONS
// ==========================================

function startSimulation(type) {
  // Redirect to the appropriate simulation page
  const simulationMap = {
    'bank': '/fake_bank',
    'social': '/fake_social',
    'giveaway': '/fake_giveaway'
  };

  if (simulationMap[type]) {
    window.location.href = simulationMap[type];
  }
}

// ==========================================
// DASHBOARD ANIMATIONS
// ==========================================

function animateDashboardCards() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';

    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ==========================================
// PAGE-SPECIFIC INITIALIZATION
// ==========================================

function initDashboard() {
  animateDashboardCards();
}

function initSimulationPage() {
  // Add animations to simulation cards
  const simulationCards = document.querySelectorAll('.simulation-card');
  simulationCards.forEach((card, index) => {
    card.style.animation = `slideUp 0.5s ease-out ${index * 0.1}s both`;
  });
}

// ==========================================
// EXPORT FOR EXTERNAL USE
// ==========================================

window.PhishAware = {
  startQuiz,
  checkURLSafety,
  analyzeEmail,
  startSimulation,
  showAlert,
  generateCertificate,
  printCertificate
};

// Log initialization
console.log('PhishAware JavaScript loaded successfully');
