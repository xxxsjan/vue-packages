class SuperMouse {
  constructor(vm) {
    this.vm = vm;
    this.canvas = null;
    this.p = { x: 9, y: 0, r: 20 };
    this.init();
  }
  init() {
    this.createStyle();
    this.canvas = this.createCanvas();
    this.bindEvent();
    this.render();
    if (!document.querySelector('#super-mouse')) {
      document.body.appendChild(this.canvas);
    }
  }
  createStyle() {
    const style = document.createElement('style');
    style.innerHTML = `
            #super-mouse{
              position:fixed;
              left:0;
              top:0;
              pointer-events: none;
            }`;
    style.setAttribute('type', 'text/css');
    document.querySelector('head').appendChild(style);
  }
  createCanvas() {
    let canvas = document.querySelector('#super-mouse');
    if (canvas) {
      return canvas;
    }
    const { clientWidth, clientHeight } = document.documentElement;
    canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'super-mouse');
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    return canvas;
  }
  bindEvent() {
    this.fn = this.handleMousemove.bind(this);
    this.fn2 = this.handleResize.bind(this);
    window.addEventListener('mousemove', this.fn);
    window.addEventListener('resize', this.fn2);
  }
  render() {
    const canvas = this.canvas;
    const p = this.p;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 内圆为内圆色，外圆为外圆色，中间是过渡
    const radial = ctx.createRadialGradient(p.x, p.y, p.r, p.x, p.y, p.r * 2);
    const inColor = 'rgba(255,255,255,0)';
    const outColor = 'rgba(0,0,0,0.5)';
    radial.addColorStop(0, inColor);
    radial.addColorStop(0.5, outColor);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  handleMousemove(e) {
    const p = this.p;
    const canvas = this.canvas;
    const _this = this;
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      p.x = clientX;
      p.y = clientY;
      _this.render();
    });
  }
  handleResize(e) {
    const canvas = this.canvas;
    const _this = this;
    requestAnimationFrame(() => {
      const { clientWidth, clientHeight } = document.documentElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      _this.render();
    });
  }
  remove() {
    if (!instance) {
      return;
    }
    document.body.removeChild(this.canvas);
    window.removeEventListener('mousemove', this.fn);
    window.removeEventListener('resize', this.fn2);
    this.fn = null;
    this.fn2 = null;
    instance = null;
    this.canvas = null;
  }
}
let instance = null;
export default function useSuperMouse(vm) {
  if (instance) {
    return instance;
  } else {
    instance = new SuperMouse(vm);
  }
  return instance;
}
