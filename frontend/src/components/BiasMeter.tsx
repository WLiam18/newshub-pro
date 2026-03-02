import React from 'react';

interface BiasMeterProps {
    score: number;
    label: string;
}

const BiasMeter: React.FC<BiasMeterProps> = ({ score, label }) => {
    // score is 0 to 1
    const color = label.toLowerCase() === 'low' ? 'var(--bias-low)' : label.toLowerCase() === 'medium' ? 'var(--bias-med)' : 'var(--bias-high)';

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span>BIAS ANALYSIS</span>
                <span>{label.toUpperCase()}</span>
            </div>
            <div style={{
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--border-subtle)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${score * 100}%`,
                    backgroundColor: color,
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
            </div>
        </div>
    );
};

export default BiasMeter;
