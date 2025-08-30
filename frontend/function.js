// MindCare Mental Health Platform - JavaScript Functionality

class MindCareApp {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.isLoggedIn = false;
        this.currentUser = null;
        this.chatHistory = [];
        this.init();
    }

    init() {
        console.log('Initializing MindCare app...');
        this.setupTheme();
        this.setupEventListeners();
        this.setupChatbot();
        this.loadInitialData();
        console.log('MindCare app initialized successfully!');
    }

    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeIcon = document.querySelector('#themeToggle i');
        if (this.currentTheme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Login button
        document.getElementById('loginBtn').addEventListener('click', () => {
            this.showLoginModal();
        });

        // Start chat button
        document.getElementById('startChatBtn').addEventListener('click', () => {
            this.showChatbot();
        });

        // Floating chat button
        document.getElementById('floatingChatBtn').addEventListener('click', () => {
            this.showChatbot();
        });

        // Learn more button
        document.getElementById('learnMoreBtn').addEventListener('click', () => {
            this.scrollToFeatures();
        });

        // Close chat button
        document.getElementById('closeChatBtn').addEventListener('click', () => {
            this.hideChatbot();
        });

        // Close login modal
        document.getElementById('closeLoginModal').addEventListener('click', () => {
            this.hideLoginModal();
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Form submissions
        document.getElementById('studentLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleStudentLogin();
        });

        document.getElementById('volunteerLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleVolunteerLogin();
        });

        document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAdminLogin();
        });

        // Chat input
        document.getElementById('sendMessageBtn').addEventListener('click', () => {
            this.sendMessage();
        });

        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Modal backdrop click
        document.getElementById('loginModal').addEventListener('click', (e) => {
            if (e.target.id === 'loginModal') {
                this.hideLoginModal();
            }
        });
    }

    // Chatbot Functionality
    setupChatbot() {
        this.chatHistory = [
            {
                type: 'bot',
                message: "Hello! I'm your MindCare assistant. I'm here to help you with mental health support. How are you feeling today?",
                timestamp: new Date()
            }
        ];
        this.renderChatMessages();
        
        // Make sure chatbot is hidden initially
        document.getElementById('chatbotSection').classList.remove('active');
        document.getElementById('floatingChatBtn').classList.remove('hidden');
    }

    showChatbot() {
        console.log('Showing chatbot...');
        const chatbotSection = document.getElementById('chatbotSection');
        const floatingBtn = document.getElementById('floatingChatBtn');
        
        if (chatbotSection && floatingBtn) {
            chatbotSection.classList.add('active');
            floatingBtn.classList.add('hidden');
            document.getElementById('chatInput').focus();
            console.log('Chatbot shown successfully');
        } else {
            console.error('Chatbot elements not found:', { chatbotSection, floatingBtn });
        }
    }

    hideChatbot() {
        console.log('Hiding chatbot...');
        const chatbotSection = document.getElementById('chatbotSection');
        const floatingBtn = document.getElementById('floatingChatBtn');
        
        if (chatbotSection && floatingBtn) {
            chatbotSection.classList.remove('active');
            floatingBtn.classList.remove('hidden');
            console.log('Chatbot hidden successfully');
        } else {
            console.error('Chatbot elements not found:', { chatbotSection, floatingBtn });
        }
    }

    sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        
        if (!message) return;

        // Add user message
        this.addMessage('user', message);
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            this.generateBotResponse(message);
        }, 1000);
    }

    addMessage(type, message) {
        const messageObj = {
            type: type,
            message: message,
            timestamp: new Date()
        };
        
        this.chatHistory.push(messageObj);
        this.renderChatMessages();
        this.scrollToBottom();
    }

    generateBotResponse(userMessage) {
        const responses = this.getBotResponses(userMessage.toLowerCase());
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        this.addMessage('bot', randomResponse);
    }

    getBotResponses(userMessage) {
        // Mental health assessment responses based on PHQ-9, GAD-7, GHQ
        if (userMessage.includes('sad') || userMessage.includes('depressed') || userMessage.includes('down')) {
            return [
                "I'm sorry you're feeling this way. It's completely normal to feel sad sometimes. How long have you been feeling this way?",
                "Thank you for sharing that with me. Have you noticed any changes in your sleep or appetite recently?",
                "I hear you, and your feelings are valid. Would you like to talk more about what's been happening?"
            ];
        } else if (userMessage.includes('anxious') || userMessage.includes('worried') || userMessage.includes('stress')) {
            return [
                "Anxiety can be really overwhelming. Can you tell me more about what's making you feel anxious?",
                "It sounds like you're dealing with a lot right now. Have you tried any breathing exercises?",
                "I understand anxiety can feel very intense. What usually helps you feel calmer?"
            ];
        } else if (userMessage.includes('tired') || userMessage.includes('exhausted') || userMessage.includes('burnout')) {
            return [
                "Burnout is very real, especially for students. How has your workload been lately?",
                "It sounds like you might be experiencing academic stress. Have you been able to take breaks?",
                "Your body is telling you something important. What would help you feel more rested?"
            ];
        } else if (userMessage.includes('good') || userMessage.includes('fine') || userMessage.includes('okay')) {
            return [
                "That's great to hear! What's been going well for you lately?",
                "I'm glad you're feeling good! Is there anything you'd like to work on or improve?",
                "That's wonderful! Remember, it's okay to reach out even when things are going well."
            ];
        } else if (userMessage.includes('help') || userMessage.includes('support')) {
            return [
                "I'm here to help! Would you like to talk about what's on your mind, or would you prefer some relaxation resources?",
                "There are many ways I can support you. We can chat, I can suggest resources, or connect you with a volunteer. What feels right?",
                "You're not alone in this. What kind of support would be most helpful for you right now?"
            ];
        } else {
            return [
                "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
                "I'm listening. What's been on your mind lately?",
                "I appreciate you opening up to me. How can I best support you today?",
                "That's interesting. How does that make you feel?",
                "I'm here to listen. Would you like to elaborate on that?"
            ];
        }
    }

    renderChatMessages() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML = '';

        this.chatHistory.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.type}-message`;
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            contentDiv.innerHTML = `<p>${msg.message}</p>`;
            
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
        });
    }

    scrollToBottom() {
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Login System
    showLoginModal() {
        document.getElementById('loginModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    hideLoginModal() {
        document.getElementById('loginModal').classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    switchTab(tabName) {
        // Remove active class from all tabs and forms
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.login-form').forEach(form => form.classList.remove('active'));
        
        // Add active class to selected tab and form
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}LoginForm`).classList.add('active');
    }

    handleStudentLogin() {
        const form = document.getElementById('studentLoginForm');
        const formData = new FormData(form);
        
        // Generate anonymous ID
        const anonymousId = this.generateAnonymousId();
        
        // Store user data (in real app, this would go to database)
        this.currentUser = {
            type: 'student',
            anonymousId: anonymousId,
            college: formData.get('college') || 'Anonymous College',
            gender: formData.get('gender') || 'Prefer not to say'
        };
        
        this.isLoggedIn = true;
        this.hideLoginModal();
        this.showSuccessMessage(`Welcome! Your anonymous ID is: ${anonymousId}`);
        this.updateUIAfterLogin();
    }

    handleVolunteerLogin() {
        const form = document.getElementById('volunteerLoginForm');
        const formData = new FormData(form);
        
        // In real app, verify against college database
        if (formData.get('collegeId') && formData.get('password')) {
            this.currentUser = {
                type: 'volunteer',
                collegeId: formData.get('collegeId'),
                name: 'Verified Volunteer'
            };
            
            this.isLoggedIn = true;
            this.hideLoginModal();
            this.showSuccessMessage('Welcome, Volunteer!');
            this.updateUIAfterLogin();
        } else {
            this.showErrorMessage('Please enter valid credentials');
        }
    }

    handleAdminLogin() {
        const form = document.getElementById('adminLoginForm');
        const formData = new FormData(form);
        
        // In real app, verify admin credentials
        if (formData.get('adminId') && formData.get('password')) {
            this.currentUser = {
                type: 'admin',
                adminId: formData.get('adminId')
            };
            
            this.isLoggedIn = true;
            this.hideLoginModal();
            this.showSuccessMessage('Welcome, Administrator!');
            this.updateUIAfterLogin();
        } else {
            this.showErrorMessage('Please enter valid admin credentials');
        }
    }

    generateAnonymousId() {
        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).substr(2, 5);
        return `MC${timestamp}${random}`.toUpperCase();
    }

    updateUIAfterLogin() {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.innerHTML = `<i class="fas fa-user-check"></i> ${this.currentUser.type === 'student' ? 'Student Portal' : this.currentUser.type === 'volunteer' ? 'Volunteer Portal' : 'Admin Portal'}`;
        loginBtn.onclick = () => this.showUserPortal();
    }

    showUserPortal() {
        // In real app, this would show different portals based on user type
        if (this.currentUser.type === 'student') {
            this.showStudentPortal();
        } else if (this.currentUser.type === 'volunteer') {
            this.showVolunteerPortal();
        } else if (this.currentUser.type === 'admin') {
            this.showAdminPortal();
        }
    }

    showStudentPortal() {
        alert('Student Portal - Coming Soon!\nFeatures: Chatbot, Resources, Volunteer Connection');
    }

    showVolunteerPortal() {
        alert('Volunteer Portal - Coming Soon!\nFeatures: Schedule Management, Student Reports, Meeting Links');
    }

    showAdminPortal() {
        alert('Admin Portal - Coming Soon!\nFeatures: Analytics, Reports, User Management');
    }

    // Utility Functions
    scrollToFeatures() {
        document.querySelector('.features').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 3000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loadInitialData() {
        // In real app, this would load user preferences, chat history, etc.
        console.log('MindCare app initialized successfully!');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.mindCareApp = new MindCareApp();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(style);
