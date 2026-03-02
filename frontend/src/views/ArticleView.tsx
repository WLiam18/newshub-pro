import React from 'react';
import type { Article } from '../types';

interface ArticleViewProps {
    article: Article;
    onBack: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
    const breakdown = JSON.parse(article.bias_breakdown || '{}');

    return (
        <div className="article-view-overlay" style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'var(--bg-primary)', zIndex: 1000, overflowY: 'auto'
        }}>
            <div className="view-header" style={{
                position: 'sticky', top: 0, background: 'var(--glass-bg)',
                backdropFilter: 'blur(20px)', padding: '16px 40px',
                borderBottom: '0.5px solid var(--border-subtle)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>{article.source}</div>
                <button onClick={onBack} className="action-btn" style={{ background: 'none', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>Done</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '80px', padding: '120px 40px', maxWidth: '1200px', margin: '0 auto' }}>
                <article>
                    <h1 style={{ marginBottom: '40px' }}>{article.title}</h1>
                    {article.image_url && (
                        <div className="hero-image">
                            <img src={article.image_url} alt={article.title} />
                        </div>
                    )}
                    <div style={{ fontSize: '21px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                        {article.content.split('\n').map((p, i) => <p key={i} style={{ marginBottom: '24px' }}>{p}</p>)}
                    </div>
                </article>

                <aside style={{ position: 'sticky', top: '200px', height: 'fit-content' }}>
                    <section style={{ marginBottom: '48px' }}>
                        <h4 style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>AI SUMMARY</h4>
                        <p style={{ fontSize: '15px' }}>{article.summary}</p>
                    </section>

                    <section style={{ marginBottom: '48px' }}>
                        <h4 style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>BIAS BREAKDOWN</h4>
                        <div style={{ background: 'var(--bg-secondary)', padding: '24px', borderRadius: 'var(--radius-minimal)', border: '0.5px solid var(--border-subtle)' }}>
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>LOADED LANGUAGE</div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {breakdown.loaded_language?.map((w: string) => <span key={w} className="tag" style={{ border: '0.5px solid var(--border-subtle)', fontSize: '10px' }}>{w}</span>)}
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>FRAMING</div>
                                <p style={{ fontSize: '13px' }}>{breakdown.framing}</p>
                            </div>
                            <div>
                                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>OMISSIONS</div>
                                <p style={{ fontSize: '13px' }}>{breakdown.omissions}</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600 }}>RELIABILITY</span>
                            <span style={{ fontSize: '11px', fontWeight: 600 }}>{Math.round((article.reliability_score || 0.5) * 100)}%</span>
                        </div>
                        <div style={{ width: '100%', height: '2px', background: 'var(--border-subtle)' }}>
                            <div style={{ width: `${(article.reliability_score || 0.5) * 100}%`, height: '100%', background: 'var(--accent-blue)' }} />
                        </div>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default ArticleView;
