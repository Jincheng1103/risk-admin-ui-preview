(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  async function fetchPlatformTypes() {
    if (!RiskAdmin.Config.useRealStoreData) {
      return {
        source: 'mock',
        list: RiskAdmin.MockPlatforms || []
      };
    }

    return RiskAdmin.Request.get('/admin/risk.RiskReport/riskPlatformType');
  }

  RiskAdmin.PlatformApi = {
    fetchPlatformTypes
  };
})(window);
