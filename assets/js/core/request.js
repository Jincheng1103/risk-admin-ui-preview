(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  async function request(path, options) {
    const config = RiskAdmin.Config || {};
    const url = /^https?:\/\//.test(path) ? path : config.apiBase + path;
    const response = await fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      ...(options || {})
    });

    if (!response.ok) {
      throw new Error('接口请求失败：' + response.status);
    }

    return response.json();
  }

  RiskAdmin.Request = {
    get(path) {
      return request(path);
    },
    post(path, body) {
      return request(path, {
        method: 'POST',
        body: JSON.stringify(body || {})
      });
    }
  };
})(window);
