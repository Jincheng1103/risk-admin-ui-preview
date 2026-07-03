(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  function defaultText(value, fallback) {
    return value === undefined || value === null || value === '' ? (fallback || '-') : value;
  }

  function money(value) {
    if (value === undefined || value === null || value === '') {
      return '-';
    }
    const number = Number(value);
    if (Number.isNaN(number)) {
      return String(value);
    }
    return '￥' + number.toLocaleString('zh-CN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  function dateTime(value) {
    return defaultText(value);
  }

  function duration(start, end) {
    if (!start || !end) {
      return '-';
    }
    const diff = Math.max(0, new Date(end).getTime() - new Date(start).getTime());
    if (!Number.isFinite(diff)) {
      return '-';
    }
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    if (minutes <= 0) {
      return remainSeconds + '秒';
    }
    return minutes + '分' + String(remainSeconds).padStart(2, '0') + '秒';
  }

  function count(value) {
    if (value === undefined || value === null) {
      return '0';
    }
    return Number(value).toLocaleString('zh-CN');
  }

  RiskAdmin.Format = {
    defaultText,
    money,
    dateTime,
    duration,
    count
  };
})(window);
