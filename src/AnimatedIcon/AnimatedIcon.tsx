import React from "react";
import {
    AbsoluteFill,
    useCurrentFrame,
    useVideoConfig,
    interpolate,
} from "remotion";

// 动态光环效果
const GlowRings: React.FC<{ frame: number }> = ({ frame }) => {
    // 多个光环以不同速度扩散
    const rings = [0, 1, 2].map((i) => {
        const delay = i * 30;
        const progress = ((frame + delay) % 90) / 90;
        const scale = 0.5 + progress * 0.8;
        const opacity = 0.4 * (1 - progress);

        return (
            <ellipse
                key={i}
                cx="300"
                cy="320"
                rx={200 * scale}
                ry={35 * scale}
                fill="none"
                stroke="url(#glowRingGradient)"
                strokeWidth="2"
                opacity={opacity}
            />
        );
    });

    return <>{rings}</>;
};

// 科技感粒子效果
const TechParticles: React.FC<{ frame: number }> = ({ frame }) => {
    const particles = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + (frame * 0.02);
        const radius = 180 + Math.sin(frame * 0.05 + i) * 20;
        const x = 300 + Math.cos(angle) * radius;
        const y = 200 + Math.sin(angle) * radius * 0.3;
        const size = 2 + Math.sin(frame * 0.1 + i * 2) * 1;
        const opacity = 0.4 + Math.sin(frame * 0.08 + i) * 0.3;

        return (
            <circle
                key={i}
                cx={x}
                cy={y}
                r={size}
                fill="#7dd8f8"
                opacity={opacity}
            />
        );
    });

    return <>{particles}</>;
};

// 3D 圆柱底座组件 - 增强科技感
const CylinderBase: React.FC<{ yOffset: number; frame: number }> = ({ yOffset, frame }) => {
    // 动态光效
    const glowIntensity = 0.3 + Math.sin(frame * 0.08) * 0.15;

    return (
        <svg
            width="600"
            height="400"
            viewBox="0 0 600 400"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translateY(${yOffset}px)`,
            }}
        >
            <defs>
                {/* 主圆柱渐变 - 更强的蓝色科技感 */}
                <linearGradient id="cylinderBodyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3a7090" />
                    <stop offset="20%" stopColor="#5a9fc8" />
                    <stop offset="50%" stopColor="#7cc5e8" />
                    <stop offset="80%" stopColor="#5a9fc8" />
                    <stop offset="100%" stopColor="#3a7090" />
                </linearGradient>

                {/* 圆柱顶部渐变 */}
                <radialGradient id="cylinderTopGradient" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#90d8f5" />
                    <stop offset="40%" stopColor="#6ac0e8" />
                    <stop offset="70%" stopColor="#4aa8d8" />
                    <stop offset="100%" stopColor="#3a90c0" />
                </radialGradient>

                {/* 内凹渐变 - 更深的科技蓝 */}
                <radialGradient id="innerBowlGradient" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#4a90b0" />
                    <stop offset="50%" stopColor="#3a7898" />
                    <stop offset="100%" stopColor="#2a6080" />
                </radialGradient>

                {/* 底盘渐变 */}
                <linearGradient id="basePlateGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6ab0d5" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#a0d8f5" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#6ab0d5" stopOpacity="0.3" />
                </linearGradient>

                {/* 发光环渐变 */}
                <linearGradient id="glowRingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#40c0f0" stopOpacity="0" />
                    <stop offset="50%" stopColor="#60e0ff" />
                    <stop offset="100%" stopColor="#40c0f0" stopOpacity="0" />
                </linearGradient>

                {/* 白色环带渐变 */}
                <linearGradient id="whiteBandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c8e8f8" stopOpacity="0.6" />
                    <stop offset="30%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="70%" stopColor="#ffffff" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#c8e8f8" stopOpacity="0.6" />
                </linearGradient>

                {/* 阴影 */}
                <radialGradient id="shadowGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#205070" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#205070" stopOpacity="0" />
                </radialGradient>

                {/* 科技光晕滤镜 */}
                <filter id="techGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* 底部阴影 */}
            <ellipse cx="300" cy="350" rx="250" ry="35" fill="url(#shadowGradient)" />

            {/* 动态光环 */}
            <GlowRings frame={frame} />

            {/* 透明底盘 */}
            <ellipse cx="300" cy="320" rx="240" ry="40" fill="url(#basePlateGradient)" />
            <ellipse cx="300" cy="320" rx="240" ry="40" fill="none" stroke="#50b8e0" strokeWidth="2" opacity={0.3 + glowIntensity} />

            {/* 科技粒子 */}
            <TechParticles frame={frame} />

            {/* 圆柱主体 */}
            <path
                d="M 100 280 
                   L 100 200 
                   A 200 55 0 0 1 500 200 
                   L 500 280 
                   A 200 55 0 0 1 100 280"
                fill="url(#cylinderBodyGradient)"
            />

            {/* 白色环带 */}
            <path
                d="M 110 275
                   L 110 255
                   A 190 50 0 0 1 490 255
                   L 490 275
                   A 190 50 0 0 1 110 275"
                fill="url(#whiteBandGradient)"
            />

            {/* 圆柱底部边缘发光 */}
            <ellipse cx="300" cy="280" rx="200" ry="55" fill="none" stroke="#40b0e0" strokeWidth="2" opacity={glowIntensity} filter="url(#techGlow)" />

            {/* 圆柱顶部椭圆 */}
            <ellipse cx="300" cy="200" rx="200" ry="55" fill="url(#cylinderTopGradient)" />

            {/* 内凹效果 */}
            <ellipse cx="300" cy="195" rx="170" ry="45" fill="url(#innerBowlGradient)" />
            <ellipse cx="300" cy="190" rx="140" ry="35" fill="#3a7898" />
            <ellipse cx="300" cy="188" rx="120" ry="28" fill="#2a6585" />

            {/* 顶部发光边缘 */}
            <ellipse cx="300" cy="200" rx="200" ry="55" fill="none" stroke="#70d0f8" strokeWidth="1.5" opacity={0.5 + glowIntensity * 0.5} />

            {/* 内部装饰条 */}
            <ellipse cx="300" cy="185" rx="60" ry="8" fill="rgba(80, 160, 200, 0.5)" />

            {/* 顶部高光 */}
            <ellipse cx="260" cy="175" rx="60" ry="12" fill="rgba(255,255,255,0.25)" />

            {/* 动态光点 */}
            <circle cx="180" cy="190" r="3" fill="#90e8ff" opacity={0.5 + Math.sin(frame * 0.15) * 0.3} />
            <circle cx="200" cy="180" r="2" fill="#70d8f8" opacity={0.4 + Math.sin(frame * 0.12 + 1) * 0.3} />
            <circle cx="400" cy="195" r="2.5" fill="#80e0ff" opacity={0.5 + Math.sin(frame * 0.1 + 2) * 0.3} />
            <circle cx="420" cy="185" r="1.5" fill="#60d0f0" opacity={0.4 + Math.sin(frame * 0.14 + 3) * 0.3} />
        </svg>
    );
};

// Mac 风格一体机屏幕
const MacScreen: React.FC<{ rotation: number; yOffset: number; frame: number }> = ({
    rotation,
    yOffset,
    frame,
}) => {
    // 屏幕内容动画
    const cursorBlink = Math.floor(frame / 15) % 2 === 0;
    const lineProgress = Math.min(1, (frame % 60) / 40);

    return (
        <svg
            width="200"
            height="180"
            viewBox="0 0 200 180"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, calc(-50% - 95px)) translateY(${yOffset}px) rotateY(${rotation}deg)`,
                transformStyle: "preserve-3d",
                backfaceVisibility: "visible",
            }}
        >
            <defs>
                {/* Mac 银色渐变 */}
                <linearGradient id="macBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#e8f0f5" />
                    <stop offset="15%" stopColor="#d0dce5" />
                    <stop offset="85%" stopColor="#b8c8d5" />
                    <stop offset="100%" stopColor="#a8b8c5" />
                </linearGradient>

                {/* 屏幕渐变 - 深色科技感 */}
                <linearGradient id="macScreenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a2a35" />
                    <stop offset="100%" stopColor="#0a1520" />
                </linearGradient>

                {/* 支架渐变 */}
                <linearGradient id="standGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b0c0cc" />
                    <stop offset="50%" stopColor="#d8e4ec" />
                    <stop offset="100%" stopColor="#b0c0cc" />
                </linearGradient>

                {/* 屏幕反光 */}
                <linearGradient id="screenReflection" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                    <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>

                {/* 阴影 */}
                <filter id="macShadow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1a3050" floodOpacity="0.35" />
                </filter>

                {/* 屏幕发光 */}
                <filter id="screenContentGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="1" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Mac 显示器主体 */}
            <rect
                x="10"
                y="5"
                width="180"
                height="120"
                rx="8"
                ry="8"
                fill="url(#macBodyGradient)"
                filter="url(#macShadow)"
            />

            {/* 屏幕边框 - 黑色 */}
            <rect
                x="18"
                y="12"
                width="164"
                height="98"
                rx="4"
                ry="4"
                fill="#0a0a0a"
            />

            {/* 屏幕显示区域 */}
            <rect
                x="22"
                y="16"
                width="156"
                height="90"
                rx="2"
                ry="2"
                fill="url(#macScreenGradient)"
            />

            {/* 屏幕反光效果 */}
            <rect
                x="22"
                y="16"
                width="156"
                height="90"
                rx="2"
                ry="2"
                fill="url(#screenReflection)"
            />

            {/* 屏幕内容 - 科技代码风格 */}
            <g filter="url(#screenContentGlow)">
                {/* 顶部菜单栏 */}
                <rect x="22" y="16" width="156" height="12" fill="rgba(40, 60, 80, 0.9)" />
                <circle cx="30" cy="22" r="3" fill="#ff5f57" />
                <circle cx="40" cy="22" r="3" fill="#febc2e" />
                <circle cx="50" cy="22" r="3" fill="#28c840" />

                {/* 终端窗口标题 */}
                <text x="100" y="25" fill="#90a0b0" fontSize="6" fontFamily="system-ui" textAnchor="middle">
                    Terminal — zsh
                </text>

                {/* 命令行内容 */}
                <text x="28" y="42" fill="#50e890" fontSize="8" fontFamily="Monaco, monospace">
                    $ ./deploy --online
                </text>

                {/* 动态加载线 */}
                <rect x="28" y="50" width={100 * lineProgress} height="2" rx="1" fill="#40d080" opacity="0.8" />

                <text x="28" y="62" fill="#60c8f0" fontSize="7" fontFamily="Monaco, monospace">
                    ✓ Connected to cloud
                </text>

                <text x="28" y="74" fill="#60c8f0" fontSize="7" fontFamily="Monaco, monospace">
                    ✓ Services online
                </text>

                <text x="28" y="86" fill="#f0c040" fontSize="7" fontFamily="Monaco, monospace">
                    → Syncing data...
                </text>

                {/* 闪烁光标 */}
                {cursorBlink && (
                    <rect x="28" y="92" width="5" height="10" fill="#50e890" />
                )}
            </g>

            {/* 底部下巴区域 */}
            <rect
                x="10"
                y="110"
                width="180"
                height="15"
                rx="0"
                ry="0"
                fill="url(#macBodyGradient)"
            />

            {/* Mac Logo 位置 (简化) */}
            <ellipse cx="100" cy="118" rx="6" ry="4" fill="#a8b8c5" opacity="0.6" />

            {/* 支架 */}
            <path
                d="M 85 125 L 85 145 L 75 155 L 125 155 L 115 145 L 115 125"
                fill="url(#standGradient)"
            />

            {/* 底座 */}
            <ellipse cx="100" cy="158" rx="40" ry="8" fill="url(#standGradient)" />
            <ellipse cx="100" cy="158" rx="40" ry="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

            {/* 科技光点装饰 */}
            <circle cx="170" cy="15" r="2.5" fill="#70e0ff" opacity={0.6 + Math.sin(frame * 0.12) * 0.3} />
            <circle cx="178" cy="22" r="1.5" fill="#50c8f0" opacity={0.5 + Math.sin(frame * 0.15 + 1) * 0.3} />
            <circle cx="165" cy="20" r="1" fill="#60d8ff" opacity={0.4 + Math.sin(frame * 0.1 + 2) * 0.3} />

            {/* 屏幕边缘发光 */}
            <rect
                x="22"
                y="16"
                width="156"
                height="90"
                rx="2"
                ry="2"
                fill="none"
                stroke="#40a0d0"
                strokeWidth="0.5"
                opacity={0.3 + Math.sin(frame * 0.06) * 0.2}
            />
        </svg>
    );
};

// 主组件
export const AnimatedIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();

    // 更动感的上下移动
    const ringYOffset = interpolate(
        Math.sin((frame / fps) * Math.PI * 2 * 0.6),
        [-1, 1],
        [-15, 15]
    );

    // Mac 屏幕轻微旋转（减小幅度，更优雅）
    const cardRotation = interpolate(
        Math.sin((frame / fps) * Math.PI * 2 * 0.3),
        [-1, 1],
        [-8, 8]
    );

    // 屏幕跟随移动
    const cardYOffset = ringYOffset * 0.7;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: "transparent",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {/* 3D 圆柱底座 */}
            <CylinderBase yOffset={ringYOffset} frame={frame} />

            {/* Mac 屏幕 */}
            <MacScreen rotation={cardRotation} yOffset={cardYOffset} frame={frame} />
        </AbsoluteFill>
    );
};
