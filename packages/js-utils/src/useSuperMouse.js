function obj2Style(obj) {
  function tran(str) {
    let len = str;
    let num = 0;
    let res = '';
    while (str[num]) {
      let strCode = str[num].charCodeAt();
      if (strCode >= 65 && strCode <= 90) {
        res += (num === 0 ? '' : '-') + str[num].toLowerCase();
      } else if (strCode >= 97 && strCode <= 122) {
        res += str[num];
      } else {
        // 其他符号
        res += str[num];
      }
      num++;
    }
    return res;
  }
  return Object.keys(obj).reduce((pre, cur) => {
    pre += `${tran(cur)}:${obj[cur]};`;
    return pre;
  }, '');
}

export default function useSuperMouse(options) {
  let inputStyle = options?.style || {};
  let styleText = obj2Style({
    position: 'fixed',
    left: '0',
    top: '0',
    'pointer-events': 'none',
    'z-index': '100',
    ...inputStyle,
  });
  let canvas = null;
  const p = { x: 9, y: 0, r: 20 };

  init();
  function init() {
    createStyle();
    canvas = createCanvas();
    bindEvent();
    render();
    if (!document.querySelector('#super-mouse')) {
      document.body.appendChild(canvas);
    }
  }
  function createStyle() {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `#super-mouse{${styleText}}`;
    styleEl.setAttribute('type', 'text/css');
    document.querySelector('head').appendChild(styleEl);
  }
  function createCanvas() {
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

  function handleMousemove(e) {
    requestAnimationFrame(() => {
      const { clientX, clientY } = e;
      p.x = clientX;
      p.y = clientY;
      render();
    });
  }

  function handleResize(e) {
    requestAnimationFrame(() => {
      const { clientWidth, clientHeight } = document.documentElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      render();
    });
  }
  function bindEvent() {
    window.addEventListener('mousemove', handleMousemove);
    window.addEventListener('resize', handleResize);
  }
  function render() {
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

  function remove() {
    if (!canvas) {
      return;
    }
    canvas && document.body.removeChild(canvas);
    window.removeEventListener('mousemove', handleMousemove);
    window.removeEventListener('resize', handleResize);
    canvas = null;
  }

  return {
    canvas,
    remove,
  };
}
