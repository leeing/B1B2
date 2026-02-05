import React from "react";

// 动态光环效果
const GlowRings: React.FC<{ frame: number; cx: number; cy: number }> = ({ frame, cx, cy }) => {
    const rings = [0, 1, 2].map((i) => {
        const delay = i * 30;
        const progress = ((frame + delay) % 90) / 90;
        const scale = 0.5 + progress * 0.8;
        const opacity = 0.4 * (1 - progress);

        return (
            <ellipse
                key={i}
                cx={cx}
                cy={cy}
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
const TechParticles: React.FC<{ frame: number; cx: number; cy: number }> = ({ frame, cx, cy }) => {
    const particles = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + (frame * 0.02);
        const radius = 180 + Math.sin(frame * 0.05 + i) * 20;
        const x = cx + Math.cos(angle) * radius;
        const y = cy - 120 + Math.sin(angle) * radius * 0.3;
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

// 共享的3D圆柱底座组件
export const CylinderBase: React.FC<{ rotation: number; frame: number }> = ({ rotation, frame }) => {
    const glowIntensity = 0.3 + Math.sin(frame * 0.08) * 0.15;

    // 光点绕圆柱表面旋转的位置计算
    const spinAngle = (frame * 2) * Math.PI / 180; // 每帧2度
    const highlightX1 = 300 + Math.cos(spinAngle) * 120;
    const highlightX2 = 300 + Math.cos(spinAngle + Math.PI * 0.5) * 100;
    const highlightX3 = 300 + Math.cos(spinAngle + Math.PI) * 110;
    const highlightX4 = 300 + Math.cos(spinAngle + Math.PI * 1.5) * 90;

    return (
        <svg
            width="750"
            height="500"
            viewBox="0 0 600 400"
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
            }}
        >
            <defs>
                {/* 主圆柱渐变 */}
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

                {/* 内凹渐变 */}
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
            <GlowRings frame={frame} cx={300} cy={320} />

            {/* 透明底盘 */}
            <ellipse cx="300" cy="320" rx="240" ry="40" fill="url(#basePlateGradient)" />
            <ellipse cx="300" cy="320" rx="240" ry="40" fill="none" stroke="#50b8e0" strokeWidth="2" opacity={0.3 + glowIntensity} />

            {/* 科技粒子 */}
            <TechParticles frame={frame} cx={300} cy={320} />

            {/* 圆柱主体 */}
            <path
                d="M 100 280 L 100 200 A 200 55 0 0 1 500 200 L 500 280 A 200 55 0 0 1 100 280"
                fill="url(#cylinderBodyGradient)"
            />

            {/* 白色环带 */}
            <path
                d="M 110 275 L 110 255 A 190 50 0 0 1 490 255 L 490 275 A 190 50 0 0 1 110 275"
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

            {/* 旋转的高光点 - 模拟自转效果 */}
            <circle cx={highlightX1} cy="190" r="3" fill="#90e8ff" opacity={Math.cos(spinAngle) > 0 ? 0.7 : 0.2} />
            <circle cx={highlightX2} cy="195" r="2.5" fill="#70d8f8" opacity={Math.cos(spinAngle + Math.PI * 0.5) > 0 ? 0.6 : 0.15} />
            <circle cx={highlightX3} cy="188" r="2" fill="#80e0ff" opacity={Math.cos(spinAngle + Math.PI) > 0 ? 0.5 : 0.1} />
            <circle cx={highlightX4} cy="192" r="1.5" fill="#60d0f0" opacity={Math.cos(spinAngle + Math.PI * 1.5) > 0 ? 0.5 : 0.1} />

            {/* 顶部移动高光 */}
            <ellipse
                cx={200 + Math.cos(spinAngle) * 60}
                cy={175}
                rx="60"
                ry="12"
                fill="rgba(255,255,255,0.25)"
            />
        </svg>
    );
};

