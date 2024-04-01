export default function useWatermark(option) {
  const { id, text, style } = option;
  if (!id) {
    return;
  }
  let canvas;
  init(text, style);

  function init(text, style) {
    canvas = getCanvas(text, style);
    render(canvas);
  }
  function getCanvas(text, style = {}) {
    const { width = 300, height = 200, fontSize = 16, fontColor = 'hsla(0, 0%, 78%, 0.7)', rotate = -20 / 180 } = style;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.font = `${fontSize}px serif`;
    context.fillStyle = fontColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(Math.PI * rotate);
    context.fillText(text, 0, 0);
    return canvas;
  }
  function render(canvas) {
    const div = document.createElement('div');
    div.setAttribute('id', id);
    const { clientWidth, clientHeight } = document.documentElement;
    const data = canvas.toDataURL('image/png');
    div.style.cssText = `
      position: fixed;
      top: 0px;
      left: 0px;
      width: ${clientWidth}px;
      height: ${clientHeight}px;
      background: url(${data}) left top repeat;
      z-index: 9999;
      pointer-events: none;
      `;
    clear();
    document.body.appendChild(div);

    const divStyle = div.getAttribute('style');
    // 防不了控制台的document.body.removeChild(document.querySelector("#watermark-dom"))
    if (div) {
      const callback = (mutation) => {
        if (!div) {
          alert('你删水印干嘛');
          document.body.appendChild(div);
        }
        if (div.getAttribute('style') !== divStyle) {
          alert('想修改样式？劝你耗子尾汁！');
          div.setAttribute('style', divStyle);
        }
      };
      const observer = new MutationObserver(callback);
      observer.observe(div, {
        childList: true, // 观察目标子节点的变化，是否有添加或者删除
        attributes: true, // 观察属性变动
        subtree: true, // 观察后代节点，默认为 false
        attributeOldValue: true, // 旧值
      });
    }
  }

  function clear() {
    const dom = document.querySelector(`#${id}`);
    if (dom) {
      document.body.removeChild(dom);
    }
  }

  return {
    canvas,
    clear,
  };
}
