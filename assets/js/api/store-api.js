(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  async function fetchSecuredShopList(params) {
    if (!RiskAdmin.Config.useRealStoreData) {
      return {
        source: 'mock',
        list: RiskAdmin.MockStores || []
      };
    }

    const search = new URLSearchParams(params || {}).toString();
    const path = '/admin/merchant.SecuredShop/index' + (search ? '?' + search : '');
    return RiskAdmin.Request.get(path);
  }

  RiskAdmin.StoreApi = {
    fetchSecuredShopList
  };
})(window);
