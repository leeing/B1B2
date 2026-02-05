import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CylinderBase } from "./shared/CylinderBase";

// 3D 数据柱状图
const DataChart: React.FC<{ rotation: number; yOffset: number; frame: number }> = ({
    rotation,
    yOffset,
    frame,
}) => {
    // 动态柱状图高度
    const bars = [
        { x: 45, baseHeight: 60, phase: 0, color: "#40a8e0" },
        { x: 75, baseHeight: 80, phase: 0.5, color: "#50c8f0" },
        { x: 105, baseHeight: 50, phase: 1, color: "#60d8ff" },
        { x: 135, baseHeight: 90, phase: 1.5, color: "#50c8f0" },
        { x: 165, baseHeight: 70, phase: 2, color: "#40a8e0" },
    ];

    return (
        <svg
            width="330"
            height="270"
            viewBox="0 0 220 180"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, calc(-50% - 120px)) translateY(${yOffset}px) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
            }}
        >
            <defs>
                <linearGradient id="chartBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#cee8f5" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#a5d2e2" stopOpacity="0.9" />
                </linearGradient>

                <linearGradient id="barGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60d8ff" />
                    <stop offset="100%" stopColor="#2090c0" />
                </linearGradient>

                <filter id="chartShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#1a3050" floodOpacity="0.3" />
                </filter>

                <filter id="barGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 图表背景卡片 */}
            <rect x="15" y="10" width="190" height="140" rx="16" ry="16" fill="url(#chartBgGradient)" filter="url(#chartShadow)" />
            <rect x="18" y="13" width="184" height="134" rx="14" ry="14" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" />

            {/* 网格线 */}
            {[0, 1, 2, 3].map((i) => (
                <line key={i} x1="35" y1={40 + i * 25} x2="185" y2={40 + i * 25} stroke="rgba(100,160,200,0.3)" strokeWidth="1" strokeDasharray="4,4" />
            ))}

            {/* 动态柱状图 */}
            {bars.map((bar, i) => {
                const animatedHeight = bar.baseHeight + Math.sin(frame * 0.08 + bar.phase) * 15;
                const barY = 130 - animatedHeight;

                return (
                    <g key={i} filter="url(#barGlow)">
                        <rect
                            x={bar.x}
                            y={barY}
                            width="20"
                            height={animatedHeight}
                            rx="4"
                            fill={bar.color}
                            opacity={0.9}
                        />
                        {/* 柱顶高光 */}
                        <rect
                            x={bar.x + 2}
                            y={barY}
                            width="16"
                            height="6"
                            rx="3"
                            fill="rgba(255,255,255,0.4)"
                        />
                    </g>
                );
            })}

            {/* 数据流动粒子 */}
            {[0, 1, 2, 3, 4].map((i) => {
                const particleY = 130 - ((frame * 2 + i * 30) % 100);
                const particleX = 55 + i * 30;
                const opacity = particleY > 30 && particleY < 120 ? 0.6 : 0;

                return (
                    <circle key={i} cx={particleX} cy={particleY} r="2" fill="#90f0ff" opacity={opacity} />
                );
            })}

            {/* 趋势线 */}
            <path
                d="M 55 90 Q 85 60, 115 80 T 175 50"
                fill="none"
                stroke="#f0c040"
                strokeWidth="2"
                strokeLinecap="round"
                opacity={0.8}
            />

            {/* 光点装饰 */}
            <circle cx="185" cy="20" r="2.5" fill="#70e0ff" opacity={0.6 + Math.sin(frame * 0.1) * 0.3} />
            <circle cx="193" cy="28" r="1.5" fill="#50c8f0" opacity={0.5 + Math.sin(frame * 0.12 + 1) * 0.3} />

            {/* 支架 */}
            <path d="M 95 150 L 95 160 L 85 168 L 135 168 L 125 160 L 125 150" fill="url(#chartBgGradient)" />
            <ellipse cx="110" cy="170" rx="35" ry="6" fill="url(#chartBgGradient)" />
        </svg>
    );
};

// 主组件 - 数据化
export const DataIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const baseRotation = (frame % 180) * 2;
    const cardRotation = interpolate(Math.sin((frame / fps) * Math.PI * 2 * 0.3), [-1, 1], [-8, 8]);

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            <CylinderBase rotation={baseRotation} frame={frame} />
            <DataChart rotation={cardRotation} yOffset={0} frame={frame} />
        </AbsoluteFill>
    );
};
