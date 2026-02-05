import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CylinderBase } from "./shared/CylinderBase";

// AI 大脑/芯片
const AIBrain: React.FC<{ rotation: number; yOffset: number; frame: number }> = ({
    rotation,
    yOffset,
    frame,
}) => {
    // 神经元节点
    const neurons = [
        { x: 110, y: 60, size: 8 },
        { x: 80, y: 80, size: 6 },
        { x: 140, y: 80, size: 6 },
        { x: 65, y: 110, size: 5 },
        { x: 110, y: 100, size: 10 },
        { x: 155, y: 110, size: 5 },
        { x: 80, y: 135, size: 6 },
        { x: 140, y: 135, size: 6 },
        { x: 110, y: 155, size: 7 },
    ];

    // 神经元连接
    const connections = [
        [0, 1], [0, 2], [0, 4],
        [1, 3], [1, 4], [2, 4], [2, 5],
        [3, 6], [4, 6], [4, 7], [5, 7],
        [6, 8], [7, 8], [4, 8],
    ];

    // 脉冲动画
    const pulsePhase = (frame * 0.1) % (Math.PI * 2);

    return (
        <svg
            width="330"
            height="300"
            viewBox="0 0 220 200"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, calc(-50% - 115px)) translateY(${yOffset}px) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
            }}
        >
            <defs>
                <linearGradient id="brainBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a2a40" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#0a1525" stopOpacity="0.95" />
                </linearGradient>

                <linearGradient id="neuronGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60d8ff" />
                    <stop offset="100%" stopColor="#3090d0" />
                </linearGradient>

                <filter id="brainShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1a3050" floodOpacity="0.4" />
                </filter>

                <filter id="neuronGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* 芯片纹理 */}
                <pattern id="chipPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="transparent" />
                    <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="rgba(80,160,220,0.1)" strokeWidth="0.5" />
                </pattern>
            </defs>

            {/* 芯片主体 */}
            <rect x="30" y="25" width="160" height="150" rx="12" ry="12" fill="url(#brainBgGradient)" filter="url(#brainShadow)" />
            <rect x="30" y="25" width="160" height="150" rx="12" ry="12" fill="url(#chipPattern)" />

            {/* 芯片边框 */}
            <rect x="33" y="28" width="154" height="144" rx="10" ry="10" fill="none" stroke="#40a0d0" strokeWidth="2" opacity="0.6" />

            {/* 芯片引脚 */}
            {[0, 1, 2, 3, 4].map((i) => (
                <g key={`pin-${i}`}>
                    <rect x={50 + i * 25} y="15" width="10" height="15" rx="2" fill="#50b8e0" opacity="0.7" />
                    <rect x={50 + i * 25} y="170" width="10" height="15" rx="2" fill="#50b8e0" opacity="0.7" />
                </g>
            ))}
            {[0, 1, 2, 3].map((i) => (
                <g key={`pin-side-${i}`}>
                    <rect x="15" y={50 + i * 30} width="15" height="10" rx="2" fill="#50b8e0" opacity="0.7" />
                    <rect x="190" y={50 + i * 30} width="15" height="10" rx="2" fill="#50b8e0" opacity="0.7" />
                </g>
            ))}

            {/* 神经元连接线（带脉冲动画） */}
            {connections.map(([from, to], i) => {
                const n1 = neurons[from];
                const n2 = neurons[to];
                const pulsePos = (pulsePhase + i * 0.5) % 1;
                const pulseX = n1.x + (n2.x - n1.x) * pulsePos;
                const pulseY = n1.y + (n2.y - n1.y) * pulsePos;

                return (
                    <g key={i}>
                        <line x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="#40a0d0" strokeWidth="1.5" opacity="0.5" />
                        {/* 脉冲点 */}
                        <circle cx={pulseX} cy={pulseY} r="3" fill="#80e0ff" filter="url(#pulseGlow)" opacity={0.8} />
                    </g>
                );
            })}

            {/* 神经元节点 */}
            {neurons.map((neuron, i) => {
                const pulseScale = 1 + Math.sin(frame * 0.15 + i * 0.8) * 0.2;

                return (
                    <g key={i} filter="url(#neuronGlow)">
                        <circle cx={neuron.x} cy={neuron.y} r={neuron.size * pulseScale} fill="url(#neuronGradient)" />
                        <circle cx={neuron.x} cy={neuron.y} r={neuron.size * 0.5} fill="#ffffff" opacity="0.6" />
                    </g>
                );
            })}

            {/* 中心 AI 标志 */}
            <text x="110" y="105" fill="#80e0ff" fontSize="16" fontFamily="system-ui" fontWeight="bold" textAnchor="middle" filter="url(#neuronGlow)">
                AI
            </text>

            {/* 思考光环 */}
            {[0, 1, 2].map((i) => {
                const ringProgress = ((frame * 0.02 + i * 0.33) % 1);
                const ringOpacity = 0.3 * (1 - ringProgress);
                const ringScale = 0.5 + ringProgress * 0.6;

                return (
                    <ellipse
                        key={i}
                        cx="110"
                        cy="100"
                        rx={80 * ringScale}
                        ry={60 * ringScale}
                        fill="none"
                        stroke="#60d8ff"
                        strokeWidth="2"
                        opacity={ringOpacity}
                    />
                );
            })}

            {/* 光点装饰 */}
            <circle cx="175" cy="35" r="2.5" fill="#70e0ff" opacity={0.6 + Math.sin(frame * 0.1) * 0.3} />
            <circle cx="183" cy="43" r="1.5" fill="#50c8f0" opacity={0.5 + Math.sin(frame * 0.12 + 1) * 0.3} />
        </svg>
    );
};

// 主组件 - 智能化
export const AIIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const baseRotation = (frame % 180) * 2;
    const cardRotation = interpolate(Math.sin((frame / fps) * Math.PI * 2 * 0.3), [-1, 1], [-8, 8]);

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            <CylinderBase rotation={baseRotation} frame={frame} />
            <AIBrain rotation={cardRotation} yOffset={0} frame={frame} />
        </AbsoluteFill>
    );
};
