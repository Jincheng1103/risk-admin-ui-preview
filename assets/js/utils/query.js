(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  function parse() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    params.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  }

  function build(base, params) {
    const search = new URLSearchParams();
    Object.keys(params || {}).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        search.set(key, value);
      }
    });
    const query = search.toString();
    return query ? base + '?' + query : base;
  }

  RiskAdmin.Query = {
    parse,
    build
  };
})(window);
