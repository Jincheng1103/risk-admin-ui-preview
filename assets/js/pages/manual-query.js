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

  function rowHtml(row) {
    const reportAction = row.reportId
      ? '<a class="btn btn-text" href="' + RiskAdmin.Query.build('report-detail.html', { reportId: row.reportId }) + '">查看报告</a>'
      : '<span class="btn is-disabled">无报告</span>';

    return [
      '<tr>',
      '<td><div class="cell-main"><div class="cell-title">' + Dom.escapeHtml(row.shopName) + '</div><div class="cell-sub">' + Dom.escapeHtml(row.merchantName) + ' · 店铺ID ' + Dom.escapeHtml(row.storeId) + '</div></div></td>',
      '<td>' + Dom.escapeHtml(row.platformName) + '</td>',
      '<td><span class="muted">' + Dom.escapeHtml(row.thirdShopId) + '</span></td>',
      '<td>' + Dom.escapeHtml(row.scope) + '</td>',
      '<td>' + Dom.tag(Enums.riskLevel, row.riskLevel) + '</td>',
      '<td><span class="amount">' + Format.money(row.loanReferenceAmount) + '</span></td>',
      '<td>' + Dom.tag(Enums.dataStatus, row.dataStatus) + '</td>',
      '<td><span class="muted">' + Format.dateTime(row.snapshotTime) + '</span></td>',
      '<td><div class="action-list">' + reportAction + '<button class="btn btn-text" data-rerun="' + Dom.escapeHtml(row.storeId) + '">重新分析</button></div></td>',
      '</tr>'
    ].join('');
  }

  function renderTable() {
    const filtered = RiskAdmin.InspectionAdapter.filterRows(state.rows, state.filters);
    const page = Dom.paginate(filtered, state.page, state.pageSize);
    const bodyHtml = page.list.length
      ? page.list.map(rowHtml).join('')
      : '<tr><td colspan="9"><div class="empty">暂无符合条件的店铺</div></td></tr>';

    Dom.setHtml('#manual-table-body', bodyHtml);
    Dom.setHtml('#manual-pagination', Dom.paginationHtml(page));
    Dom.bindPagination(Dom.$('#manual-pagination'), (next) => {
      state.page = next.page || state.page;
      state.pageSize = next.pageSize || state.pageSize;
      renderTable();
    });
    bindRerun();
  }

  function bindRerun() {
    Dom.$all('[data-rerun]').forEach((button) => {
      button.addEventListener('click', () => {
        const storeId = Number(button.dataset.rerun);
        const row = state.rows.find((item) => Number(item.storeId) === storeId);
        const body = [
          '<div class="rerun-message">',
          '<div class="notice">当前第一阶段不调用任何写接口，因此不会真实创建重新分析任务。后续后端确认接口、权限和二次确认规则后，再接入该操作。</div>',
          '<div class="detail-grid">',
          '<div class="detail-item"><div class="detail-label">店铺</div><div class="detail-value">' + Dom.escapeHtml(row ? row.shopName : '-') + '</div></div>',
          '<div class="detail-item"><div class="detail-label">平台</div><div class="detail-value">' + Dom.escapeHtml(row ? row.platformName : '-') + '</div></div>',
          '<div class="detail-item"><div class="detail-label">第三方店铺ID</div><div class="detail-value">' + Dom.escapeHtml(row ? row.thirdShopId : '-') + '</div></div>',
          '<div class="detail-item"><div class="detail-label">当前状态</div><div class="detail-value">未触发</div></div>',
          '</div>',
          '</div>'
        ].join('');
        Dom.openModal('重新分析', body);
      });
    });
  }

  function bindFilters() {
    const form = Dom.$('#manual-filter');
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
    Dom.setHtml('#manual-total', '共 ' + state.rows.length + ' 家店铺');
    renderTable();
    bindFilters();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
