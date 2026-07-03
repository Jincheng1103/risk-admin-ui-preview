(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  async function getReport(reportId) {
    const requested = reportId || 'RPT-20260703000109';
    const report = await RiskAdmin.RiskApi.fetchReport(requested);
    return report || RiskAdmin.MockReports['RPT-20260703000109'];
  }

  RiskAdmin.ReportAdapter = {
    getReport
  };
})(window);
