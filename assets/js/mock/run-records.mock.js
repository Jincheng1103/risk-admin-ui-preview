(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  RiskAdmin.MockRunRecords = [
    {
      taskId: 'TASK-202607030001',
      batchId: 'BATCH-20260703-0300',
      triggerType: 'scheduled',
      scope: '有效融资店铺',
      status: 'partial_failed',
      resultText: '完成 9，失败 1',
      reportText: '生成 9 份',
      snapshotTime: '2026-07-03 03:12:00',
      startTime: '2026-07-03 03:00:00',
      endTime: '2026-07-03 03:12:30',
      failureReason: '1 家店铺结算接口失败',
      failureCount: 1
    },
    {
      taskId: 'TASK-202607020001',
      batchId: 'BATCH-20260702-0300',
      triggerType: 'scheduled',
      scope: '有效融资店铺',
      status: 'success',
      resultText: '完成 10，失败 0',
      reportText: '生成 10 份',
      snapshotTime: '2026-07-02 03:10:00',
      startTime: '2026-07-02 03:00:00',
      endTime: '2026-07-02 03:10:18',
      failureReason: '',
      failureCount: 0
    },
    {
      taskId: 'TASK-202607011536',
      batchId: '',
      triggerType: 'rerun',
      scope: '星澜生鲜优选',
      status: 'success',
      resultText: '完成 1，失败 0',
      reportText: '生成 1 份',
      snapshotTime: '2026-07-01 15:34:20',
      startTime: '2026-07-01 15:34:20',
      endTime: '2026-07-01 15:36:02',
      reportId: 'RPT-20260703000109',
      failureReason: '',
      failureCount: 0
    },
    {
      taskId: 'TASK-202606301528',
      batchId: '',
      triggerType: 'rerun',
      scope: '栖木家居生活馆',
      status: 'failed',
      resultText: '完成 0，失败 1',
      reportText: '无报告',
      snapshotTime: '2026-06-30 15:27:00',
      startTime: '2026-06-30 15:27:00',
      endTime: '2026-06-30 15:28:11',
      failureReason: '平台授权失效',
      failureCount: 1
    }
  ];

  RiskAdmin.MockFailureDetails = {
    'TASK-202607030001': [
      {
        object: '栖木家居生活馆',
        stage: '结算数据读取',
        type: '接口失败',
        reason: '平台结算接口返回失败，未生成完整资产口径。',
        impact: '该店铺本次结果标记为无法判断。',
        result: '等待下次巡检或人工重新分析。'
      }
    ],
    'TASK-202606301528': [
      {
        object: '栖木家居生活馆',
        stage: '平台授权校验',
        type: '授权失败',
        reason: '平台授权状态失效，无法读取订单和结算数据。',
        impact: '未生成风险报告。',
        result: '需要业务侧确认授权状态后再重新分析。'
      }
    ]
  };
})(window);
