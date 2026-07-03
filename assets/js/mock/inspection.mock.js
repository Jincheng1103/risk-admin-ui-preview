(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  RiskAdmin.MockInspection = {
    latestBatch: {
      batchId: 'BATCH-20260703-0300',
      taskId: 'TASK-202607030001',
      inspectionTime: '2026-07-03 03:12:30',
      snapshotTime: '2026-07-03 03:12:00',
      scopeName: '有效融资店铺'
    },
    results: [
      {
        storeId: 2356777,
        reportId: 'RPT-20260703000109',
        riskLevel: 'high',
        collectibleAssetAmount: 128600,
        loanReferenceAmount: 84000,
        dataStatus: 'partial_missing',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2356812,
        reportId: 'RPT-20260703000110',
        riskLevel: 'watch',
        collectibleAssetAmount: 216400,
        loanReferenceAmount: 151000,
        dataStatus: 'complete',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2356948,
        reportId: 'RPT-20260703000111',
        riskLevel: 'normal',
        collectibleAssetAmount: 176800,
        loanReferenceAmount: 142000,
        dataStatus: 'complete',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2357003,
        reportId: 'RPT-20260703000112',
        riskLevel: 'unable',
        collectibleAssetAmount: null,
        loanReferenceAmount: null,
        dataStatus: 'api_failed',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2357091,
        reportId: 'RPT-20260703000113',
        riskLevel: 'critical',
        collectibleAssetAmount: 58400,
        loanReferenceAmount: 0,
        dataStatus: 'critical_missing',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2357165,
        reportId: '',
        riskLevel: 'unable',
        collectibleAssetAmount: null,
        loanReferenceAmount: null,
        dataStatus: 'no_report',
        snapshotTime: '',
        scope: '非自动巡检范围'
      },
      {
        storeId: 2357288,
        reportId: 'RPT-20260703000114',
        riskLevel: 'watch',
        collectibleAssetAmount: 92400,
        loanReferenceAmount: 65000,
        dataStatus: 'stale',
        snapshotTime: '2026-07-02 21:40:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2357396,
        reportId: 'RPT-20260703000115',
        riskLevel: 'normal',
        collectibleAssetAmount: 312000,
        loanReferenceAmount: 240000,
        dataStatus: 'complete',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2357480,
        reportId: 'RPT-20260703000116',
        riskLevel: 'watch',
        collectibleAssetAmount: 146200,
        loanReferenceAmount: 98000,
        dataStatus: 'partial_missing',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      },
      {
        storeId: 2357592,
        reportId: 'RPT-20260703000117',
        riskLevel: 'normal',
        collectibleAssetAmount: 188300,
        loanReferenceAmount: 150000,
        dataStatus: 'complete',
        snapshotTime: '2026-07-03 03:12:00',
        scope: '巡检范围内'
      }
    ]
  };
})(window);
