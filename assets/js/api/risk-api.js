(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  async function fetchLatestInspectionBatch() {
    return RiskAdmin.MockInspection.latestBatch;
  }

  async function fetchInspectionResults() {
    return RiskAdmin.MockInspection.results || [];
  }

  async function fetchReport(reportId) {
    return (RiskAdmin.MockReports || {})[reportId] || null;
  }

  async function fetchRunRecords() {
    return RiskAdmin.MockRunRecords || [];
  }

  async function fetchFailureDetails(taskId) {
    return (RiskAdmin.MockFailureDetails || {})[taskId] || [];
  }

  RiskAdmin.RiskApi = {
    fetchLatestInspectionBatch,
    fetchInspectionResults,
    fetchReport,
    fetchRunRecords,
    fetchFailureDetails
  };
})(window);
