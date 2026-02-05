import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CylinderBase } from "./shared/CylinderBase";

// 生态化 - 互联节点网络
const EcosystemNetwork: React.FC<{ rotation: number; yOffset: number; frame: number }> = ({ rotation, yOffset, frame }) => {
    // 中心节点和周围节点
    const centerX = 110, centerY = 100;
    const orbitNodes = Array.from({ length: 6 }, (_, i) => {
        const baseAngle = (i / 6) * Math.PI * 2;
        const angle = baseAngle + frame * 0.01;
        const radius = 60;
        return { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius * 0.6, i };
    });

    const outerNodes = Array.from({ length: 8 }, (_, i) => {
        const baseAngle = (i / 8) * Math.PI * 2 + Math.PI / 8;
        const angle = baseAngle - frame * 0.008;
        const radius = 95;
        return { x: centerX + Math.cos(angle) * radius, y: centerY + Math.sin(angle) * radius * 0.6, i };
    });

    return (
        <svg width="330" height="300" viewBox="0 0 220 200" style={{
            position: "absolute", left: "50%", top: "50%",
            transform: `translate(-50%, calc(-50% - 110px)) translateY(${yOffset}px) rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
        }}>
            <defs>
                <radialGradient id="ecoGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#60e0ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#60e0ff" stopOpacity="0" />
                </radialGradient>
                <filter id="nodeGlow"><feGaussianBlur stdDeviation="3" /></filter>
            </defs>

            {/* 背景光晕 */}
            <ellipse cx={centerX} cy={centerY} rx="100" ry="70" fill="url(#ecoGlow)" />

            {/* 轨道环 */}
            <ellipse cx={centerX} cy={centerY} rx="60" ry="36" fill="none" stroke="#40a0d0" strokeWidth="1" opacity="0.4" />
            <ellipse cx={centerX} cy={centerY} rx="95" ry="57" fill="none" stroke="#40a0d0" strokeWidth="1" opacity="0.3" />

            {/* 连接到中心的线 */}
            {orbitNodes.map((n, i) => (
                <line key={`c${i}`} x1={centerX} y1={centerY} x2={n.x} y2={n.y} stroke="#50b8e0" strokeWidth="2" opacity="0.5" />
            ))}

            {/* 节点间的连接 */}
            {orbitNodes.map((n, i) => {
                const next = orbitNodes[(i + 1) % 6];
                const outer = outerNodes[i];
                return (
                    <g key={`l${i}`}>
                        <line x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#40a8d0" strokeWidth="1.5" opacity="0.4" />
                        {outer && <line x1={n.x} y1={n.y} x2={outer.x} y2={outer.y} stroke="#40a8d0" strokeWidth="1" opacity="0.3" />}
                    </g>
                );
            })}

            {/* 中心大节点 */}
            <g filter="url(#nodeGlow)">
                <circle cx={centerX} cy={centerY} r={18 + Math.sin(frame * 0.1) * 2} fill="#40c8f0" />
                <circle cx={centerX} cy={centerY} r="10" fill="#70e8ff" />
                <text x={centerX} y={centerY + 4} fill="#fff" fontSize="10" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">招行</text>
            </g>

            {/* 内环节点 */}
            {orbitNodes.map((n, i) => {
                const pulse = 1 + Math.sin(frame * 0.12 + i) * 0.2;
                const labels = ["银行", "保险", "基金", "证券", "信托", "支付"];
                return (
                    <g key={`on${i}`} filter="url(#nodeGlow)">
                        <circle cx={n.x} cy={n.y} r={10 * pulse} fill="#50c8f0" />
                        <circle cx={n.x} cy={n.y} r={5 * pulse} fill="#90f0ff" />
                        <text x={n.x} y={n.y + 3} fill="#fff" fontSize="6" fontFamily="system-ui" textAnchor="middle">{labels[i]}</text>
                    </g>
                );
            })}

            {/* 外环节点 */}
            {outerNodes.map((n, i) => {
                const pulse = 0.8 + Math.sin(frame * 0.1 + i * 0.8) * 0.2;
                return (
                    <g key={`out${i}`}>
                        <circle cx={n.x} cy={n.y} r={6 * pulse} fill="#60d0f0" opacity="0.8" />
                        <circle cx={n.x} cy={n.y} r={3 * pulse} fill="#a0f0ff" />
                    </g>
                );
            })}

            {/* 流动粒子 */}
            {[0, 1, 2].map(i => {
                const progress = ((frame * 0.02 + i * 0.33) % 1);
                const node = orbitNodes[i * 2];
                const px = centerX + (node.x - centerX) * progress;
                const py = centerY + (node.y - centerY) * progress;
                return <circle key={`p${i}`} cx={px} cy={py} r="3" fill="#80f8ff" opacity={0.8} />;
            })}
        </svg>
    );
};

export const EcosystemIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const baseRotation = (frame % 180) * 2;
    const cardRotation = interpolate(Math.sin((frame / fps) * Math.PI * 2 * 0.3), [-1, 1], [-8, 8]);

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            <CylinderBase rotation={baseRotation} frame={frame} />
            <EcosystemNetwork rotation={cardRotation} yOffset={0} frame={frame} />
        </AbsoluteFill>
    );
};
