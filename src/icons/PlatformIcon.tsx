import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CylinderBase } from "./shared/CylinderBase";

// 平台化 - 互联模块方块
const PlatformBlocks: React.FC<{ rotation: number; yOffset: number; frame: number }> = ({ rotation, yOffset, frame }) => {
    const blocks = [
        { x: 110, y: 50, label: "API" },
        { x: 60, y: 90, label: "支付" },
        { x: 160, y: 90, label: "账户" },
        { x: 85, y: 140, label: "风控" },
        { x: 135, y: 140, label: "数据" },
    ];
    const connections = [[0, 1], [0, 2], [1, 3], [2, 4], [1, 4], [2, 3]];

    return (
        <svg width="330" height="300" viewBox="0 0 220 200" style={{
            position: "absolute", left: "50%", top: "50%",
            transform: `translate(-50%, calc(-50% - 110px)) translateY(${yOffset}px) rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
        }}>
            <defs>
                <filter id="blockGlow"><feGaussianBlur stdDeviation="3" /></filter>
            </defs>

            {/* 连接线 */}
            {connections.map(([from, to], i) => {
                const b1 = blocks[from], b2 = blocks[to];
                const p = ((frame * 0.03 + i * 0.2) % 1);
                return (
                    <g key={i}>
                        <line x1={b1.x} y1={b1.y} x2={b2.x} y2={b2.y} stroke="#40b0e0" strokeWidth="3" opacity="0.6" />
                        <circle cx={b1.x + (b2.x - b1.x) * p} cy={b1.y + (b2.y - b1.y) * p} r="4" fill="#80f0ff" />
                    </g>
                );
            })}

            {/* 模块方块 */}
            {blocks.map((b, i) => {
                const fy = b.y + Math.sin(frame * 0.08 + i) * 3;
                return (
                    <g key={i}>
                        <path d={`M ${b.x} ${fy - 12} L ${b.x + 20} ${fy} L ${b.x} ${fy + 12} L ${b.x - 20} ${fy} Z`} fill="#50c8f0" />
                        <path d={`M ${b.x - 20} ${fy} L ${b.x} ${fy + 12} L ${b.x} ${fy + 25} L ${b.x - 20} ${fy + 13} Z`} fill="#3090b0" />
                        <path d={`M ${b.x + 20} ${fy} L ${b.x} ${fy + 12} L ${b.x} ${fy + 25} L ${b.x + 20} ${fy + 13} Z`} fill="#2080a0" />
                        <text x={b.x} y={fy + 4} fill="#fff" fontSize="9" fontFamily="system-ui" fontWeight="bold" textAnchor="middle">{b.label}</text>
                    </g>
                );
            })}

            {/* 环绕轨道 */}
            <ellipse cx="110" cy="100" rx="90" ry="70" fill="none" stroke="#50c8e0" strokeWidth="1" opacity="0.3" strokeDasharray="5,5" transform={`rotate(${frame * 0.5}, 110, 100)`} />
            {[0, 1, 2].map(i => {
                const a = (frame * 0.5 * Math.PI / 180) + i * Math.PI * 2 / 3;
                return <circle key={i} cx={110 + Math.cos(a) * 90} cy={100 + Math.sin(a) * 70} r="4" fill="#70e0ff" opacity="0.7" />;
            })}
        </svg>
    );
};

export const PlatformIcon: React.FC = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const baseRotation = (frame % 180) * 2;
    const cardRotation = interpolate(Math.sin((frame / fps) * Math.PI * 2 * 0.3), [-1, 1], [-8, 8]);

    return (
        <AbsoluteFill style={{ backgroundColor: "transparent" }}>
            <CylinderBase rotation={baseRotation} frame={frame} />
            <PlatformBlocks rotation={cardRotation} yOffset={0} frame={frame} />
        </AbsoluteFill>
    );
};
