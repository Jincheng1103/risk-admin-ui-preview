(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  function mergeStoreResult(store, result) {
    const inspection = result || {};
    return {
      ...store,
      reportId: inspection.reportId || '',
      riskLevel: inspection.riskLevel || 'unable',
      collectibleAssetAmount: inspection.collectibleAssetAmount,
      loanReferenceAmount: inspection.loanReferenceAmount,
      dataStatus: inspection.dataStatus || 'no_report',
      snapshotTime: inspection.snapshotTime || '',
      scope: inspection.scope || (store.isRiskBound ? '巡检范围内' : '非自动巡检范围')
    };
  }

  async function getInspectionRows() {
    const stores = await RiskAdmin.StoreAdapter.getStores();
    const results = await RiskAdmin.RiskApi.fetchInspectionResults();
    const resultMap = {};
    results.forEach((item) => {
      resultMap[item.storeId] = item;
    });
    return stores.map((store) => mergeStoreResult(store, resultMap[store.storeId]));
  }

  function filterRows(rows, filters) {
    const values = filters || {};
    const keyword = (values.keyword || '').toLowerCase();
    return rows.filter((row) => {
      const matchKeyword = !keyword || [
        row.shopName,
        row.merchantName,
        row.thirdShopId,
        String(row.storeId)
      ].some((value) => String(value || '').toLowerCase().includes(keyword));
      const matchPlatform = !values.platform || row.platformName === values.platform;
      const matchRisk = !values.riskLevel || row.riskLevel === values.riskLevel;
      const matchData = !values.dataStatus || row.dataStatus === values.dataStatus;
      const matchScope = !values.scope || row.scope === values.scope;
      return matchKeyword && matchPlatform && matchRisk && matchData && matchScope;
    });
  }

  function summary(rows) {
    return {
      total: rows.filter((row) => row.scope === '巡检范围内').length,
      completed: rows.filter((row) => row.reportId).length,
      high: rows.filter((row) => row.riskLevel === 'high').length,
      critical: rows.filter((row) => row.riskLevel === 'critical').length,
      dataIssue: rows.filter((row) => ['partial_missing', 'critical_missing', 'api_failed', 'auth_failed', 'stale', 'no_report'].includes(row.dataStatus)).length
    };
  }

  RiskAdmin.InspectionAdapter = {
    getInspectionRows,
    filterRows,
    summary
  };
})(window);
