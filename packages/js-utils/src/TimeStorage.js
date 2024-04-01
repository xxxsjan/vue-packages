class TimeStorage {
  storage = localStorage || window.localStorage;
  status = {
    SUCCESS: 'SUCCESS', //成功
    FAILURE: 'ERROR',
    OVERFLOW: 'OVERFLOW', //数据溢出
    TIMEOUT: 'TIMEOUT', //超市
  };

  deleteTimeOut = true; //是否删除过期数据

  constructor(deleteTimeOut = true) {
    this.deleteTimeOut = deleteTimeOut;
  }

  /**
   * @description 获取localStorage的值
   * @param key
   * @param cb
   */
  get(key, cb) {
    const status = this.status.SUCCESS;
    let value = null;
    let result = null;
    try {
      value = this.storage.getItem(key);
    } catch (e) {
      result = TimeStorage.setResult(this.status.FAILURE, null, cb);
      return result;
    }
    //如果数据不存在，直接返回失败
    if (!value) {
      result = TimeStorage.setResult(this.status.FAILURE, null, cb);
      return result;
    }

    value = JSON.parse(value);
    //如果没有设置timeOut字段，则默认未超过时间
    const time = value?.timeOut || 0;

    // 未过期
    if (time - new Date().getTime() >= 0) {
      result = TimeStorage.setResult(status, value.value || '', cb);
      return result;
    }

    //过期的时候根据deleteTimeOut 决定是否删除数据

    this.deleteTimeOut && this.remove(key);
    result = TimeStorage.setResult(this.status.TIMEOUT, null);
    return result;
  }

  /**
   * @description 向localStorage中存值，
   * @param key
   * @param value
   * @param cb
   * @param time 时间戳
   * @param day 天数
   * @param hours 小时
   * @param minutes 分钟
   */
  set({ key, value, cb, time, day, hours, minutes }) {
    // 时间都不传默认为两小时，可指定时间戳。
    // 也可以指定到具体的天、小时、分钟过期

    let status = this.status.SUCCESS;

    //获取过期时间
    const localTime = TimeStorage.getLocalTime({ time, day, hours, minutes });

    // 设置存储的数据格式
    const localData = {
      value,
      timeOut: localTime,
    };

    try {
      this.storage.setItem(key, JSON.stringify(localData));
    } catch (e) {
      status = this.status.OVERFLOW;
    }

    //操作完成后的回调
    cb && cb(status, key, localData);
  }

  /**
   * @description 删除storage，如果删除成功，返回删除的内容
   */
  remove(key, cb) {
    let value;
    value = this.get(key);
    console.log(value);
    if (!value || value.status === this.status.FAILURE) {
      return;
    }
    this.storage.removeItem(key);
    status = this.status.SUCCESS;
    value = value.status === 'SUCCESS' ? value?.value || value : null;
    cb && cb(status, value);
    return value;
  }

  /**
   * @description 设置localStorage的过期时间
   * @param param                       |
   * @returns 默认两小时 可以传递时间戳、也可以传递天、小时、分钟
   */
  static getLocalTime({ time, day, hours, minutes }) {
    //没传值，默认两小时
    if (!time && !hours && !minutes) {
      return new Date().getTime() + 1000 * 60 * 60 * 2;
    }
    if (time) {
      return new Date(time).getTime() || time.getTime();
    }
    const dataDay = day ? day * 24 * 1 : 1;
    const dataHours = hours || 1;
    const dataMinutes = minutes || 1;
    return new Date().getTime() + 1000 * dataMinutes * dataHours * dataDay;
  }
  /**
   * @description 设置返回的结果
   * @param status
   * @param value
   * @param cb
   * @returns
   */
  static setResult(status, value, cb) {
    cb && cb(status, value);

    return {
      status,
      value,
    };
  }
  clear() {
    this.storage.clear();
  }
}
