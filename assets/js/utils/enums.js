(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  RiskAdmin.Enums = {
    riskLevel: {
      normal: { label: '正常', tone: 'green' },
      watch: { label: '关注', tone: 'amber' },
      high: { label: '高风险', tone: 'red' },
      critical: { label: '严重风险', tone: 'red' },
      unable: { label: '无法判断', tone: 'violet' }
    },
    dataStatus: {
      complete: { label: '完整', tone: 'green' },
      partial_missing: { label: '部分缺失', tone: 'violet' },
      critical_missing: { label: '关键缺失', tone: 'red' },
      api_failed: { label: '接口失败', tone: 'red' },
      auth_failed: { label: '授权失败', tone: 'red' },
      stale: { label: '数据过期', tone: 'amber' },
      no_report: { label: '无报告', tone: '' }
    },
    triggerType: {
      scheduled: { label: '定时巡检', tone: 'blue' },
      manual_query: { label: '手动查询', tone: '' },
      rerun: { label: '重新分析', tone: 'amber' },
      manual_trigger: { label: '手动触发', tone: 'violet' }
    },
    taskStatus: {
      success: { label: '成功', tone: 'green' },
      partial_failed: { label: '部分失败', tone: 'amber' },
      failed: { label: '失败', tone: 'red' },
      running: { label: '执行中', tone: 'blue' }
    }
  };
})(window);
