(function (window) {
  const RiskAdmin = window.RiskAdmin;
  const Dom = RiskAdmin.Dom;
  const Format = RiskAdmin.Format;
  const Enums = RiskAdmin.Enums;

  const state = {
    rows: [],
    page: 1,
    pageSize: RiskAdmin.Config.pageSize,
    filters: {}
  };

  function renderSummary(rows) {
    const batch = RiskAdmin.MockInspection.latestBatch;
    const summary = RiskAdmin.InspectionAdapter.summary(rows);
    Dom.setHtml('#latest-inspection-time', '最新巡检时间：' + batch.inspectionTime);
    Dom.setHtml('#summary-grid', [
      Dom.metric('巡检范围', Format.count(summary.total), batch.scopeName),
      Dom.metric('完成巡检', Format.count(summary.completed), '生成报告的店铺', 'green'),
      Dom.metric('高风险', Format.count(summary.high), '需人工核实', 'amber'),
      Dom.metric('严重风险', Format.count(summary.critical), '建议暂停参考额度', 'red'),
      Dom.metric('数据不足', Format.count(summary.dataIssue), '不等同商户风险', 'violet')
    ].join(''));
  }

  function rowHtml(row) {
    const reportHref = row.reportId
      ? RiskAdmin.Query.build('report-detail.html', { reportId: row.reportId })
      : '';
    const action = row.reportId
      ? '<a class="btn btn-text" href="' + reportHref + '">查看报告</a>'
      : '<span class="btn is-disabled">无报告</span>';

    return [
      '<tr>',
      '<td><div class="cell-main"><div class="cell-title">' + Dom.escapeHtml(row.shopName) + '</div><div class="cell-sub">' + Dom.escapeHtml(row.merchantName) + ' · 店铺ID ' + Dom.escapeHtml(row.storeId) + '</div></div></td>',
      '<td>' + Dom.escapeHtml(row.platformName) + '</td>',
      '<td>' + Dom.tag(Enums.riskLevel, row.riskLevel) + '</td>',
      '<td><span class="amount">' + Format.money(row.collectibleAssetAmount) + '</span></td>',
      '<td><span class="amount">' + Format.money(row.loanReferenceAmount) + '</span></td>',
      '<td>' + Dom.tag(Enums.dataStatus, row.dataStatus) + '</td>',
      '<td><span class="muted">' + Format.dateTime(row.snapshotTime) + '</span></td>',
      '<td><div class="action-list">' + action + '</div></td>',
      '</tr>'
    ].join('');
  }

  function renderTable() {
    const filtered = RiskAdmin.InspectionAdapter.filterRows(state.rows, state.filters)
      .filter((row) => row.scope === '巡检范围内');
    const page = Dom.paginate(filtered, state.page, state.pageSize);
    const bodyHtml = page.list.length
      ? page.list.map(rowHtml).join('')
      : '<tr><td colspan="8"><div class="empty">暂无符合条件的巡检结果</div></td></tr>';

    Dom.setHtml('#inspection-table-body', bodyHtml);
    Dom.setHtml('#inspection-pagination', Dom.paginationHtml(page));
    Dom.bindPagination(Dom.$('#inspection-pagination'), (next) => {
      state.page = next.page || state.page;
      state.pageSize = next.pageSize || state.pageSize;
      renderTable();
    });
  }

  function bindFilters() {
    const form = Dom.$('#inspection-filter');
    if (!form) {
      return;
    }
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      state.filters = Dom.getFormValues(form);
      state.page = 1;
      renderTable();
    });
    form.addEventListener('reset', () => {
      window.setTimeout(() => {
        state.filters = {};
        state.page = 1;
        renderTable();
      });
    });
  }

  async function init() {
    Dom.initCustomControls();
    state.rows = await RiskAdmin.InspectionAdapter.getInspectionRows();
    renderSummary(state.rows);
    renderTable();
    bindFilters();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
