import React, { useState } from 'react';

interface AuthViewProps {
    onAuthSuccess: (user: { email: string }) => void;
    onBack: () => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onAuthSuccess, onBack }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const res = await fetch(`${apiUrl}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                onAuthSuccess(data);
            } else {
                setError(data.error || 'Authentication failed');
            }
        } catch (err) {
            setError('Connection error. Is the server running?');
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-card">
                <button className="back-btn" onClick={onBack}>×</button>
                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                <p className="auth-subtitle">{isLogin ? 'Sign in to access your newsroom' : 'Join the elite news collective'}</p>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-submit">
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>

                <p className="auth-toggle">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Create one' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthView;
