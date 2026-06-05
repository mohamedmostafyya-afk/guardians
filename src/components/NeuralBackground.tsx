import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  color: string;
  isCircuitNode: boolean;
  depth: number; // For 3D floating effect
}

interface Connection {
  from: number;
  to: number;
}

interface Signal {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const nodes: Node[] = [];
    const connections: Connection[] = [];
    const activeSignals: Signal[] = [];

    // Helper functions
    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initTopology();
    };

    const initTopology = () => {
      nodes.length = 0;
      connections.length = 0;
      activeSignals.length = 0;

      // Adjust node density based on screen size
      const targetCount = Math.floor((width * height) / 18000);
      const nodeCount = Math.min(Math.max(targetCount, 40), 90);

      // Generate nodes
      for (let i = 0; i < nodeCount; i++) {
        const isCircuitNode = Math.random() > 0.65;
        const depth = Math.random(); // 0 is far, 1 is close
        
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18 * (depth * 0.8 + 0.2),
          vy: (Math.random() - 0.5) * 0.18 * (depth * 0.8 + 0.2),
          baseRadius: isCircuitNode ? Math.random() * 2 + 1.2 : Math.random() * 3 + 1.8,
          radius: 0,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          color: isCircuitNode
            ? '#00ffff' // Cyan circuit node
            : Math.random() > 0.4
            ? '#0072ff' // Medical blue synaptic core
            : '#ffffff', // Pure white myelinated node
          isCircuitNode,
          depth,
        });
      }

      // Build biological-electrical connection mesh
      for (let i = 0; i < nodes.length; i++) {
        // Find 2 or 3 nearest neighbors for each node
        const distances = nodes
          .map((n, idx) => ({ idx, dist: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
          .filter((item) => item.idx !== i)
          .sort((a, b) => a.dist - b.dist);

        const connectionCount = Math.floor(Math.random() * 2) + 2; // 2 to 3 connections
        for (let j = 0; j < Math.min(connectionCount, distances.length); j++) {
          const targetIdx = distances[j].idx;
          
          // Avoid duplicate connection index
          const exists = connections.some(
            (c) => (c.from === i && c.to === targetIdx) || (c.from === targetIdx && c.to === i)
          );
          
          if (!exists && distances[j].dist < 280) {
            connections.push({ from: i, to: targetIdx });
          }
        }
      }
    };

    // Handle mouse interactions with nerve structures
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const spawnSignal = () => {
      if (connections.length === 0 || activeSignals.length > 30) return;
      // Spawn a randomized action potential trigger
      const conn = connections[Math.floor(Math.random() * connections.length)];
      activeSignals.push({
        from: conn.from,
        to: conn.to,
        progress: 0,
        speed: 0.008 + Math.random() * 0.015,
      });
    };

    // Run background loop
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();
    const pulseInterval = setInterval(spawnSignal, 750);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle grid backdrop
      ctx.strokeStyle = 'rgba(0, 114, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Update and float nodes
      nodes.forEach((node) => {
        // Move nodes gently
        node.x += node.vx;
        node.y += node.vy;

        // Bounce from bounds with safety padding
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Interactive gravity from cursor
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.hypot(dx, dy);
        
        if (dist < mouseRef.current.radius) {
          const force = (1 - dist / mouseRef.current.radius) * 0.12;
          node.x -= (dx / dist) * force * (node.depth + 0.2);
          node.y -= (dy / dist) * force * (node.depth + 0.2);
        }

        // Pulse the node glowing radii
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.4;
      });

      // 3. Render connection paths (myelinated pathways / axonal sheaths)
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];
        if (!fromNode || !toNode) return;

        const distance = Math.hypot(fromNode.x - toNode.x, fromNode.y - toNode.y);
        
        // Gradient color for biological synapse lines
        const alpha = Math.max(0, 1 - distance / 280) * 0.14 * (fromNode.depth * 0.5 + 0.5);
        if (alpha <= 0) return;

        ctx.strokeStyle = `rgba(0, 114, 255, ${alpha})`;
        ctx.lineWidth = fromNode.isCircuitNode && toNode.isCircuitNode ? 0.8 : 1.2;
        ctx.beginPath();
        
        // Render biological curves vs solid technical circuits
        if (fromNode.isCircuitNode) {
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(toNode.x, toNode.y);
        } else {
          // Soft organic bezier curve to mimic biological pathways
          const midX = (fromNode.x + toNode.x) / 2;
          const midY = (fromNode.y + toNode.y) / 2 + (fromNode.depth * 15 - 7.5);
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.quadraticCurveTo(midX, midY, toNode.x, toNode.y);
        }
        ctx.stroke();
      });

      // 4. Update and Draw Action Potentials (Traveling signals)
      for (let i = activeSignals.length - 1; i >= 0; i--) {
        const sig = activeSignals[i];
        const fromNode = nodes[sig.from];
        const toNode = nodes[sig.to];

        if (!fromNode || !toNode) {
          activeSignals.splice(i, 1);
          continue;
        }

        sig.progress += sig.speed;
        if (sig.progress >= 1) {
          activeSignals.splice(i, 1);
          continue;
        }

        // Quadratic biological trajectory interpolation
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2 + (fromNode.depth * 15 - 7.5);

        // De Casteljau's algorithm for quadratic bezier point
        const t = sig.progress;
        const x1 = (1 - t) * fromNode.x + t * midX;
        const y1 = (1 - t) * fromNode.y + t * midY;
        const x2 = (1 - t) * midX + t * toNode.x;
        const y2 = (1 - t) * midY + t * toNode.y;
        
        const signalX = (1 - t) * x1 + t * x2;
        const signalY = (1 - t) * y1 + t * y2;

        const currentAlpha = Math.sin(t * Math.PI); // Fades in and out

        // Glow tail aura
        ctx.shadowColor = '#00d2ff';
        ctx.shadowBlur = 8;
        ctx.fillStyle = `rgba(0, 210, 255, ${currentAlpha * 0.95})`;
        ctx.beginPath();
        ctx.arc(signalX, signalY, 3, 0, Math.PI * 2);
        ctx.fill();

        // Secondary inner core light path
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(signalX, signalY, 1.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowBlur = 0; // Reset canvas shadows
      }

      // 5. Draw actual physical soma/junction nodes
      nodes.forEach((node) => {
        // Draw node aura/halo based on depth
        const depthAlpha = node.depth * 0.6 + 0.4;
        
        if (node.isCircuitNode) {
          // Draw geometric circuit square
          ctx.strokeStyle = `rgba(0, 210, 255, ${0.4 * depthAlpha})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(node.x - node.radius, node.y - node.radius, node.radius * 2, node.radius * 2);
          
          ctx.fillStyle = node.color;
          ctx.fillRect(node.x - node.radius * 0.5, node.y - node.radius * 0.5, node.radius, node.radius);
        } else {
          const glowAlpha = 0.18 * depthAlpha;
          const radialGrad = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            node.radius * (4 + node.depth * 3)
          );
          radialGrad.addColorStop(0, `rgba(0, 114, 255, ${glowAlpha * 1.5})`);
          radialGrad.addColorStop(0.3, `rgba(0, 210, 255, ${glowAlpha * 0.6})`);
          radialGrad.addColorStop(1, 'rgba(0, 114, 255, 0)');

          ctx.fillStyle = radialGrad;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * (4 + node.depth * 3), 0, Math.PI * 2);
          ctx.fill();

          // Physical micro core
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();

          // Subtle cyan rings for large soma
          if (node.baseRadius > 2.5) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      // 6. Draw interactive mouse ripple circle
      if (mouseRef.current.x !== -1000) {
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />;
}
