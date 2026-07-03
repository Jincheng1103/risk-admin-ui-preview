(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  async function getRecords() {
    return RiskAdmin.RiskApi.fetchRunRecords();
  }

  function filterRecords(records, filters) {
    const values = filters || {};
    const keyword = (values.keyword || '').toLowerCase();
    return records.filter((record) => {
      const matchKeyword = !keyword || [
        record.taskId,
        record.batchId,
        record.scope,
        record.failureReason
      ].some((value) => String(value || '').toLowerCase().includes(keyword));
      const matchTrigger = !values.triggerType || record.triggerType === values.triggerType;
      const matchStatus = !values.taskStatus || record.status === values.taskStatus;
      const matchDate = !values.taskDate || String(record.startTime || '').slice(0, 10) === values.taskDate;
      return matchKeyword && matchTrigger && matchStatus && matchDate;
    });
  }

  function summary(records) {
    return {
      today: records.filter((record) => String(record.startTime || '').startsWith('2026-07-03')).length,
      success: records.filter((record) => record.status === 'success').length,
      partialFailed: records.filter((record) => record.status === 'partial_failed').length,
      failed: records.filter((record) => record.status === 'failed').length
    };
  }

  async function getFailureDetails(taskId) {
    return RiskAdmin.RiskApi.fetchFailureDetails(taskId);
  }

  RiskAdmin.RunRecordAdapter = {
    getRecords,
    filterRecords,
    summary,
    getFailureDetails
  };
})(window);
