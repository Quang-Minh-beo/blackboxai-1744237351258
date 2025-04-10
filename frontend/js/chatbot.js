import { sendChatMessage } from './api.js';

const chatbot = {
  init() {
    this.setupUI();
    this.bindEvents();
    this.addWelcomeMessage();
  },

  setupUI() {
    this.chatContainer = document.createElement('div');
    this.chatContainer.className = 'fixed bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden';
    
    this.chatHeader = document.createElement('div');
    this.chatHeader.className = 'bg-blue-600 text-white p-3 font-semibold flex justify-between items-center';
    this.chatHeader.innerHTML = `
      <span>Trợ lý AI</span>
      <button id="chatbot-close" class="text-white hover:text-gray-200">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    this.chatBody = document.createElement('div');
    this.chatBody.className = 'h-64 p-3 overflow-y-auto bg-gray-50';
    
    this.chatInput = document.createElement('div');
    this.chatInput.className = 'p-3 border-t flex';
    this.chatInput.innerHTML = `
      <input type="text" id="chatbot-input" class="flex-1 border rounded-l px-3 py-2 focus:outline-none" placeholder="Nhập câu hỏi...">
      <button id="chatbot-send" class="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700">
        <i class="fas fa-paper-plane"></i>
      </button>
    `;

    this.chatContainer.append(this.chatHeader, this.chatBody, this.chatInput);
    document.body.appendChild(this.chatContainer);
  },

  bindEvents() {
    document.getElementById('chatbot-send').addEventListener('click', this.handleSend.bind(this));
    document.getElementById('chatbot-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSend();
    });
    document.getElementById('chatbot-close').addEventListener('click', () => {
      this.chatContainer.style.display = 'none';
    });
  },

  addWelcomeMessage() {
    this.addMessage('Xin chào! Tôi là trợ lý AI, tôi có thể giúp gì cho bạn?', 'bot');
  },

  async handleSend() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message) {
      this.addMessage(message, 'user');
      input.value = '';
      
      try {
        const response = await sendChatMessage(message);
        this.addMessage(response.reply, 'bot');
      } catch (error) {
        this.addMessage('Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.', 'bot');
      }
    }
  },

  addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `mb-2 p-2 rounded-lg max-w-xs ${sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-200 mr-auto'}`;
    messageDiv.textContent = text;
    this.chatBody.appendChild(messageDiv);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  }
};

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  chatbot.init();
});
