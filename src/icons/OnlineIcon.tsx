import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CylinderBase } from "./shared/CylinderBase";

// Mac 风格一体机屏幕 - 线上化
const MacScreen: React.FC<{ rotation: number; yOffset: number; frame: number }> = ({
    rotation,
    yOffset,
    frame,
}) => {
    const cursorBlink = Math.floor(frame / 15) % 2 === 0;
    const lineProgress = Math.min(1, (frame % 60) / 40);

    return (
        <svg
            width="300"
            height="270"
            viewBox="0 0 200 180"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, calc(-50% - 130px)) translateY(${yOffset}px) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "visible",
            }}
        >
            <defs>
                <linearGradient id="macBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e8f0f5" />
                    <stop offset="15%" stopColor="#d0dce5" />
                    <stop offset="85%" stopColor="#b8c8d5" />
                    <stop offset="100%" stopColor="#a8b8c5" />
                </linearGradient>

                <linearGradient id="macScreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a2a35" />
                    <stop offset="100%" stopColor="#0a1520" />
                </linearGradient>

                <linearGradient id="standGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b0c0cc" />
                    <stop offset="50%" stopColor="#d8e4ec" />
                    <stop offset="100%" stopColor="#b0c0cc" />
                </linearGradient>

                <filter id="macShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1a3050" floodOpacity="0.35" />
                </filter>

                <filter id="screenGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Mac 显示器主体 */}
            <rect x="10" y="5" width="180" height="120" rx="8" ry="8" fill="url(#macBodyGradient)" filter="url(#macShadow)" />
            <rect x="18" y="12" width="164" height="98" rx="4" ry="4" fill="#0a0a0a" />
            <rect x="22" y="16" width="156" height="90" rx="2" ry="2" fill="url(#macScreenGradient)" />

            {/* 屏幕内容 */}
            <g filter="url(#screenGlow)">
                <rect x="22" y="16" width="156" height="12" fill="rgba(40, 60, 80, 0.9)" />
                <circle cx="30" cy="22" r="3" fill="#ff5f57" />
                <circle cx="40" cy="22" r="3" fill="#febc2e" />
                <circle cx="50" cy="22" r="3" fill="#28c840" />
                <text x="100" y="25" fill="#90a0b0" fontSize="6" fontFamily="system-ui" textAnchor="middle">Terminal — zsh</text>

                <text x="28" y="42" fill="#50e890" fontSize="8" fontFamily="Monaco, monospace">$ ./deploy --online</text>
                <rect x="28" y="50" width={100 * lineProgress} height="2" rx="1" fill="#40d080" opacity="0.8" />
                <text x="28" y="62" fill="#60c8f0" fontSize="7" fontFamily="Monaco, monospace">✓ Connected to cloud</text>
                <text x="28" y="74" fill="#60c8f0" fontSize="7" fontFamily="Monaco, monospace">✓ Services online</text>
                <text x="28" y="86" fill="#f0c040" fontSize="7" fontFamily="Monaco, monospace">→ Syncing data...</text>
                {cursorBlink && <rect x="28" y="92" width="5" height="10" fill="#50e890" />}
            </g>

            {/* 底部和支架 */}
            <rect x="10" y="110" width="180" height="15" fill="url(#macBodyGradient)" />
            <ellipse cx="100" cy="118" rx="6" ry="4" fill="#a8b8c5" opacity="0.6" />
            <path d="M 85 125 L 85 145 L 75 155 L 125 155 L 115 145 L 115 125" fill="url(#standGradient)" />
            <ellipse cx="100" cy="158" rx="40" ry="8" fill="url(#standGradient)" />

            {/* 光点装饰 */}
            <circle cx="170" cy="15" r="2.5" fill="#70e0ff" opacity={0.6 + Math.sin(frame * 0.12) * 0.3} />
            <circle cx="178" cy="22" r="1.5" fill="#50c8f0" opacity={0.5 + Math.sin(frame * 0.15 + 1) * 0.3} />
        </svg>
    );
};

// 主组件 - 线上化
export const OnlineIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const baseRotation = (frame % 180) * 2;
    const cardRotation = interpolate(Math.sin((frame / fps) * Math.PI * 2 * 0.3), [-1, 1], [-8, 8]);

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            <CylinderBase rotation={baseRotation} frame={frame} />
            <MacScreen rotation={cardRotation} yOffset={0} frame={frame} />
        </AbsoluteFill>
    );
};
