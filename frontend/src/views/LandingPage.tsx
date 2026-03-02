import React, { useState, useEffect } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "How is the bias score calculated?",
        answer: "Our proprietary AI model analyzes linguistic markers, framing patterns, and source reliability to generate a normalized score between 0 and 100."
    },
    {
        question: "What is Loaded Language?",
        answer: "Loaded language refers to words or phrases intended to evoke strong emotional responses rather than provide objective information. Our AI flags these in real-time."
    },
    {
        question: "Can I trust the reliability score?",
        answer: "The score is calculated by cross-referencing article claims against our global knowledge graph and historical source performance data."
    }
];

const PRESET_QUESTIONS = [
    "Analyze this headline for bias.",
    "Summarize the latest tech news.",
    "How accurate is this source?"
];

interface LandingPageProps {
    onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
        { role: 'bot', content: 'Welcome to NewsHub Intelligence. Select a sample query to see me in action.' }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSampleQuery = (query: string) => {
        if (isTyping) return;
        setChatMessages(prev => [...prev, { role: 'user', content: query }]);
        setIsTyping(true);

        setTimeout(() => {
            let response = "Analysis complete. Source identified as highly reliable with neutral framing.";
            if (query.includes("tech")) {
                response = "Silicon Valley reports indicate a 14% surge in AI chip demand this quarter.";
            }

            setChatMessages(prev => [...prev, { role: 'bot', content: response }]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="landing-container">
            <nav className="landing-nav animate-on-scroll">
                <div className="logo">NewsHub</div>
                <button className="login-btn" onClick={onGetStarted}>Sign In</button>
            </nav>

            <main className="landing-hero animate-on-scroll">
                <div className="hero-content">
                    <div className="badge">VERSION 1.0 LIVE</div>
                    <h1>The Intelligence layer for Global News.</h1>
                    <p>Global coverage meets deep AI intelligence. Bias analysis, reliability scoring, and real-time updates—all in one premium terminal.</p>
                    <div className="hero-actions">
                        <button className="primary-btn" onClick={onGetStarted}>Access Terminal</button>
                        <button className="secondary-btn">Explore Features</button>
                    </div>
                </div>

                <div className="hero-mockup">
                    <div className="glow-orb"></div>
                    <div className="mockup-window">
                        <div className="mockup-header">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <div className="mockup-body">
                            <div className="skeleton-line full"></div>
                            <div className="skeleton-line half"></div>
                            <div className="skeleton-grid">
                                <div className="skeleton-box"></div>
                                <div className="skeleton-box"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <section className="features-grid animate-on-scroll">
                <div className="feature-card">
                    <div className="feature-icon">Pulse</div>
                    <h3>Real-time Pulse</h3>
                    <p>Synchronized every 15 minutes with the global news stream. Never miss a breaking story as it unfolds.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">Bias</div>
                    <h3>Bias Detection</h3>
                    <p>Pinpoint loaded language and framing with high-precision AI. Understand the narrative behind the news.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">Score</div>
                    <h3>Reliability Score</h3>
                    <p>Truth analysis powered by Llama 3 for every single headline. We cross-reference sources to ensure accuracy.</p>
                </div>
            </section>

            <section className="interactive-chat-sample animate-on-scroll">
                <div className="chat-sample-container">
                    <div className="chat-sample-info">
                        <label>INTERACTIVE PREVIEW</label>
                        <h2>Try our AI Intelligence.</h2>
                        <p>Select a sample query to see how our engine analyzes global news flow in real-time.</p>
                        <div className="sample-queries">
                            {PRESET_QUESTIONS.map(q => (
                                <button key={q} onClick={() => handleSampleQuery(q)} disabled={isTyping}>{q}</button>
                            ))}
                        </div>
                    </div>
                    <div className="chat-sample-window">
                        <div className="chat-messages">
                            {chatMessages.map((m, i) => (
                                <div key={i} className={`message ${m.role}`}>
                                    {m.content}
                                </div>
                            ))}
                            {isTyping && <div className="message bot typing">Analyzing...</div>}
                        </div>
                    </div>
                </div>
            </section>

            <section className="reviews-marquee-section animate-on-scroll">
                <div className="section-title">
                    <label>TESTIMONIALS</label>
                    <h2>Trusted by the collective.</h2>
                </div>
                <div className="marquee">
                    <div className="marquee-content">
                        {[1, 2].map(i => (
                            <React.Fragment key={i}>
                                <div className="review-card">
                                    <p>"The bias breakdown is a game changer. I finally feel like I'm getting the full picture."</p>
                                    <strong>Sarah Chen, Policy Analyst</strong>
                                </div>
                                <div className="review-card">
                                    <p>"A masterclass in minimalistic design. NewsHub makes reading news premium."</p>
                                    <strong>Marcus Thorne, Lead Designer</strong>
                                </div>
                                <div className="review-card">
                                    <p>"Finally, news that doesn't feel like an agenda. Pure data, pure intelligence."</p>
                                    <strong>Dr. Elena Vance, Researcher</strong>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            <section className="faq-section animate-on-scroll">
                <div className="section-title">
                    <label>FAQ</label>
                    <h2>Intelligence Decoded.</h2>
                </div>
                <div className="faq-accordion">
                    {FAQ_DATA.map((item, index) => (
                        <div key={index} className={`faq-node ${openFaq === index ? 'active' : ''}`}>
                            <button
                                className="faq-question"
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                            >
                                {item.question}
                                <span className="faq-icon">{openFaq === index ? '−' : '+'}</span>
                            </button>
                            <div className="faq-answer">
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            <footer className="landing-footer">
                <div className="footer-content">
                    <div className="logo" style={{ fontSize: "1.2rem" }}>NewsHub</div>
                    <p>© 2026 NewsHub Intelligence Collective. All rights reserved.</p>
                </div>
            </footer>

        </div>
    );
};

export default LandingPage;