(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  function normalizeStore(raw) {
    return {
      storeId: raw.id,
      platformType: raw.platform_type,
      platformName: raw.platform_name || '',
      merchantName: raw.merchant_nickname || '-',
      shopName: raw.shop_name || '-',
      thirdShopId: raw.third_shop_id || '-',
      status: raw.status,
      isRiskBound: Number(raw.is_bind_risk_control) === 1,
      offlineStatus: raw.offline_status
    };
  }

  async function getStores() {
    const result = await RiskAdmin.StoreApi.fetchSecuredShopList();
    const rawList = result.list || result.data || [];
    return rawList.map(normalizeStore);
  }

  RiskAdmin.StoreAdapter = {
    normalizeStore,
    getStores
  };
})(window);
