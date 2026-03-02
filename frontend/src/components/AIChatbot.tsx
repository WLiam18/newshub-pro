import React, { useState } from 'react';

const AIChatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
        { role: 'bot', text: 'Hello! I am your NewsHub assistant. Ask me anything about the current events.' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            if (!apiUrl.startsWith('http')) apiUrl = `https://${apiUrl}`;
            const res = await fetch(`${apiUrl}/api/ask`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userMsg })
            });
            const data = await res.json();
            // Preprocess response to remove markdown bold markers
            const cleanText = data.answer.replace(/\*\*(.*?)\*\*/g, '$1');
            setMessages(prev => [...prev, { role: 'bot', text: cleanText }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="chatbot-trigger" onClick={() => setIsOpen(!isOpen)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </div>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">NewsHub AI Assistant</div>
                    <div className="chat-messages">
                        {messages.map((m, i) => (
                            <div key={i} className={`message ${m.role}`}>
                                {m.text.split('\n').map((line, idx) => (
                                    <p key={idx} style={{ marginBottom: line ? '8px' : '0' }}>{line}</p>
                                ))}
                            </div>
                        ))}
                        {loading && <div className="message bot typing">Thinking...</div>}
                    </div>
                    <div className="chat-input-area">
                        <input
                            type="text"
                            className="chat-input"
                            placeholder="Ask about the news..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button className="action-btn" onClick={handleSend} style={{ padding: '8px 12px' }}>→</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIChatbot;
