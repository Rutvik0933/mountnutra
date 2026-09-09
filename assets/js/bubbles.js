/**
 * Mount Nutra - Effervescent Bubbles Engine (Light & Adaptive Theme)
 * Dynamic HTML5 Canvas particles simulating fizzy carbonation bubbles
 */

class BubblesEngine {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.bubbles = [];
    this.options = Object.assign({
      bubbleCount: 40,
      minRadius: 2,
      maxRadius: 6,
      minSpeed: 0.8,
      maxSpeed: 2.5,
      color: 'rgba(100, 116, 139, 0.25)',
      accentColor: 'rgba(2, 82, 207, 0.4)',
      interactive: true,
      spawnFromBottom: true
    }, options);

    this.mouseX = -1000;
    this.mouseY = -1000;
    this.animationId = null;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    if (this.options.interactive) {
      window.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;
      });
    }

    for (let i = 0; i < this.options.bubbleCount; i++) {
      this.bubbles.push(this.createBubble(true));
    }

    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.clientWidth;
    this.height = this.canvas.clientHeight;
    this.canvas.width = this.width * (window.devicePixelRatio || 1);
    this.canvas.height = this.height * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
  }

  createBubble(randomY = false) {
    const radius = Math.random() * (this.options.maxRadius - this.options.minRadius) + this.options.minRadius;
    return {
      x: Math.random() * this.width,
      y: randomY ? Math.random() * this.height : this.height + radius + Math.random() * 20,
      radius: radius,
      baseRadius: radius,
      speedY: Math.random() * (this.options.maxSpeed - this.options.minSpeed) + this.options.minSpeed,
      speedX: (Math.random() - 0.5) * 0.7,
      wobbleSpeed: Math.random() * 0.04 + 0.02,
      wobbleDistance: Math.random() * 1.5 + 0.5,
      wobbleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.5 + 0.3,
      isAccent: Math.random() > 0.5
    };
  }

  updateBubble(b) {
    b.y -= b.speedY;
    b.wobbleOffset += b.wobbleSpeed;
    b.x += Math.sin(b.wobbleOffset) * b.wobbleDistance + b.speedX;

    const dx = b.x - this.mouseX;
    const dy = b.y - this.mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 100) {
      const force = (100 - dist) / 100;
      b.x += (dx / dist) * force * 3;
      b.y += (dy / dist) * force * 3;
    }

    if (b.y < -b.radius * 2 || b.x < -20 || b.x > this.width + 20) {
      Object.assign(b, this.createBubble(false));
    }
  }

  drawBubble(b) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

    const grad = this.ctx.createRadialGradient(
      b.x - b.radius * 0.3,
      b.y - b.radius * 0.3,
      b.radius * 0.1,
      b.x,
      b.y,
      b.radius
    );

    const color = b.isAccent ? this.options.accentColor : this.options.color;
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    grad.addColorStop(0.5, color);
    grad.addColorStop(1, 'rgba(148, 163, 184, 0.15)');

    this.ctx.fillStyle = grad;
    this.ctx.fill();

    // Outline stroke for visibility in light theme
    this.ctx.lineWidth = 0.75;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.stroke();

    // Specular Highlight
    this.ctx.beginPath();
    this.ctx.arc(
      b.x - b.radius * 0.35,
      b.y - b.radius * 0.35,
      b.radius * 0.25,
      0,
      Math.PI * 2
    );
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    this.ctx.fill();

    this.ctx.restore();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.bubbles.length; i++) {
      this.updateBubble(this.bubbles[i]);
      this.drawBubble(this.bubbles[i]);
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  setAccentColor(color) {
    this.options.accentColor = color;
  }

  burst(count = 25, originX = null, originY = null) {
    const x = originX !== null ? originX : this.width / 2;
    const y = originY !== null ? originY : this.height * 0.8;

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * (this.options.maxRadius * 1.5 - 2) + 2;
      this.bubbles.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 20,
        radius: radius,
        baseRadius: radius,
        speedY: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 4,
        wobbleSpeed: Math.random() * 0.08 + 0.03,
        wobbleDistance: Math.random() * 2 + 1,
        wobbleOffset: Math.random() * Math.PI * 2,
        opacity: 0.8,
        isAccent: true
      });
    }

    if (this.bubbles.length > this.options.bubbleCount * 2.5) {
      this.bubbles.splice(0, count);
    }
  }
}

window.BubblesEngine = BubblesEngine;
