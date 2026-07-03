(function (window) {
  const RiskAdmin = window.RiskAdmin;
  const Dom = RiskAdmin.Dom;
  const Format = RiskAdmin.Format;
  const Enums = RiskAdmin.Enums;

  function renderHeader(report) {
    Dom.setHtml('#report-title', Dom.escapeHtml(report.shopName));
    Dom.setHtml('#report-subtitle', [
      Dom.escapeHtml(report.platformName),
      '商户：' + Dom.escapeHtml(report.merchantName),
      '第三方店铺ID：' + Dom.escapeHtml(report.thirdShopId),
      '巡检批次：' + Dom.escapeHtml(report.batchId),
      '数据状态：' + Dom.escapeHtml(Enums.dataStatus[report.dataStatus].label)
    ].join(' · '));
    Dom.setHtml('#report-snapshot', '数据快照时间：' + Format.dateTime(report.snapshotTime));
  }

  function renderConclusion(report) {
    Dom.setHtml('#conclusion-panel', [
      '<div class="panel conclusion" id="conclusion-card">',
      '<div class="panel-header">',
      '<div class="conclusion-head">',
      '<h2 class="panel-title">今日结论</h2>',
      Dom.tag(Enums.riskLevel, report.riskLevel),
      '</div>',
      '</div>',
      '<div class="panel-body">',
      '<div class="conclusion-text">' + Dom.escapeHtml(report.conclusion) + '</div>',
      '<div class="conclusion-footer"><button class="btn btn-text" id="conclusion-toggle">展开全文</button></div>',
      '</div>',
      '</div>'
    ].join(''));
    const button = Dom.$('#conclusion-toggle');
    const card = Dom.$('#conclusion-card');
    const text = Dom.$('.conclusion-text', card);
    if (!button || !card || !text) {
      return;
    }
    window.requestAnimationFrame(() => {
      if (text.scrollHeight > text.clientHeight + 2) {
        card.classList.add('has-overflow');
      }
    });
    button.addEventListener('click', () => {
      card.classList.toggle('is-expanded');
      button.textContent = card.classList.contains('is-expanded') ? '收起全文' : '展开全文';
    });
  }

  function renderAmountBasis(report) {
    const html = report.amountBasis.map((item) => [
      '<div class="amount-cell">',
      '<div class="summary-label">' + Dom.escapeHtml(item.label) + '</div>',
      '<div class="summary-value">' + Format.money(item.value) + '</div>',
      '<div class="amount-desc">' + Dom.escapeHtml(item.desc) + '</div>',
      '</div>'
    ].join('')).join('');
    Dom.setHtml('#amount-basis', html);
  }

  function renderRiskEvents(report) {
    const html = report.riskEvents.map((event) => [
      '<div class="risk-card">',
      '<div class="risk-card-head"><div class="risk-title">' + Dom.escapeHtml(event.code) + ' ' + Dom.escapeHtml(event.title) + '</div>' + Dom.tag(Enums.riskLevel, event.level) + '</div>',
      '<div class="risk-desc">' + Dom.escapeHtml(event.desc) + '</div>',
      '<div class="evidence-grid">',
      event.evidence.map((item) => [
        '<div class="detail-item">',
        '<div class="detail-label">' + Dom.escapeHtml(item.label) + '</div>',
        '<div class="detail-value">' + Dom.escapeHtml(item.value) + '</div>',
        '</div>'
      ].join('')).join(''),
      '</div>',
      '</div>'
    ].join('')).join('');
    Dom.setHtml('#risk-events', html);
  }

  function renderVerifyItems(report) {
    const html = report.verifyItems.map((item, index) => [
      '<div class="verify-item">',
      '<span class="index-badge">' + (index + 1) + '</span>',
      '<span>' + Dom.escapeHtml(item) + '</span>',
      '</div>'
    ].join('')).join('');
    Dom.setHtml('#verify-items', html);
  }

  function renderDataIssues(report) {
    const html = report.dataIssues.map((item) => [
      '<div class="issue-item">',
      '<span class="index-badge">!</span>',
      '<span><strong>' + Dom.escapeHtml(item.title) + '</strong><br>' + Dom.escapeHtml(item.desc) + ' <span class="tag tag-violet">' + Dom.escapeHtml(item.status) + '</span></span>',
      '</div>'
    ].join('')).join('');
    Dom.setHtml('#data-issues', html);
  }

  function renderMoreInfo(report) {
    const html = report.moreInfo.map((item) => [
      '<div class="fold-row" data-fold-row>',
      '<div class="fold-row-head">',
      '<div class="fold-row-title">' + Dom.escapeHtml(item.title) + '</div>',
      '<div class="fold-row-summary">' + Dom.escapeHtml(item.summary || '点击展开查看详情') + '</div>',
      '<button class="btn btn-secondary" type="button" data-fold-toggle>展开</button>',
      '</div>',
      '<div class="fold-row-content">' + Dom.escapeHtml(item.content) + '</div>',
      '</div>'
    ].join('')).join('');
    Dom.setHtml('#more-info', html);
    Dom.$all('[data-fold-toggle]').forEach((button) => {
      button.addEventListener('click', () => {
        const row = button.closest('[data-fold-row]');
        row.classList.toggle('is-expanded');
        button.textContent = row.classList.contains('is-expanded') ? '收起' : '展开';
      });
    });
  }

  function bindBack() {
    const button = Dom.$('#back-button');
    if (!button) {
      return;
    }
    button.addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = 'auto-inspection.html';
      }
    });
  }

  async function init() {
    const query = RiskAdmin.Query.parse();
    const report = await RiskAdmin.ReportAdapter.getReport(query.reportId);
    renderHeader(report);
    renderConclusion(report);
    renderAmountBasis(report);
    renderRiskEvents(report);
    renderVerifyItems(report);
    renderDataIssues(report);
    renderMoreInfo(report);
    bindBack();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
