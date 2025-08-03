

document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultUsers();
    setupLoginForm();
    setupRegisterForm();
    
});

function showMessage(elementId, type, text) {
    const msgElement = document.getElementById(elementId);
    if (!msgElement) return;
    
    // إضافة أيقونات حسب نوع الرسالة
    const icon = type === 'error' ? '❌' : '✅';
    msgElement.innerHTML = `${icon} ${text}`;
    
    msgElement.className = `message ${type}`;
    msgElement.style.display = 'block';
    
    // إخفاء الرسالة بعد 3 ثواني
    setTimeout(() => {
        msgElement.style.display = 'none';
    }, 3000);
}

// ======== CORE FUNCTIONS ========
function initializeDefaultUsers() {
    if (getUsers().length === 0) {
        const defaultUsers = [
            { username: "admin", email: "admin@example.com", password: "admin123" },
            { username: "user1", email: "user1@example.com", password: "password123" }
        ];
        localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function validateCredentials(identifier, password) {
    const users = getUsers();
    return users.find(user => 
        (user.username === identifier || user.email === identifier) && 
        user.password === password
    );
}

function showMessage(elementId, type, text) {
    const msgElement = document.getElementById(elementId);
    if (!msgElement) return;
    
    msgElement.textContent = text;
    msgElement.className = `message ${type}`;
    msgElement.style.display = 'block';
    
    setTimeout(() => {
        msgElement.style.display = 'none';
    }, 3000);
}

// ======== LOGIN PAGE ========
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const identifier = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        if (!identifier || !password) {
            showMessage('loginMessage', 'error', 'Please enter both fields');
            return;
        }
        
        const user = validateCredentials(identifier, password);
        
        if (user) {
            handleSuccessfulLogin(user.username);
        } else {
            showMessage('loginMessage', 'error', 'Invalid credentials');
        }
    });
}

// ======== REGISTER PAGE ========
function setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('newUsername').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('newPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();
        
        // Validation
        if (!username||!email||!password || !confirmPassword) {
            showMessage('registerMessage', 'error', 'Please fill all fields');
            return;
        }
        
        if (password !== confirmPassword) {
            showMessage('registerMessage', 'error', 'Passwords do not match');
            return;
        }
        
        if (checkUserExists(username, email)) {
            showMessage('registerMessage', 'error', 'Username/Email already exists');
            return;
        }
        
        // Save new user
        const newUser = { username, email, password };
        const users = getUsers();
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Auto-login and redirect
        handleSuccessfulLogin(username);
    });
}

function checkUserExists(username, email) {
    const users = getUsers();
    return users.some(user => 
        user.username === username || 
        user.email === email
    );
}

// COMMON FUNCTIONS
function handleSuccessfulLogin(username) {
    localStorage.setItem('lastLogin', new Date().toISOString());
    localStorage.setItem('currentUser', username);
    
    showMessage('loginMessage', 'success', `Welcome ${username}! Redirecting... `);
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1500);
}
// ===================================================================================
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    // هذه الإضافة الجديدة
    const validateInputs = () => {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        const messageElement = document.getElementById('loginMessage');
        
        if (!username && !password) {
            messageElement.textContent = '';
            return false;
        }
        
        if (!username || !password) {
            showMessage('loginMessage', 'error', 'Please fill both fields');
            return false;
        }
        
        return true;
    };

    // التحقق أثناء الكتابة
    document.getElementById('username').addEventListener('input', validateInputs);
    document.getElementById('password').addEventListener('input', validateInputs);
    
    // الباقي كما هو...
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateInputs()) return;
        
        const identifier = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        
        const user = validateCredentials(identifier, password);
        
        if (user) {
            handleSuccessfulLogin(user.username);
        } else {
            showMessage('loginMessage', 'error', 'Invalid username/email or password');
        }
    });
}

/*
هنا علشان الربط لل هووم
*/

// دالة التحويل للصفحة الرئيسية
function redirectToHome() {
   
    window.location.href = "home.html"; 
}


function handleSuccessfulLogin(username) {
    localStorage.setItem('currentUser', username);
    showMessage('loginMessage', 'success',`مرحباً ${username}! يتم التوجيه الآن... `);
    
   
    setTimeout(redirectToHome, 2000);
}
 