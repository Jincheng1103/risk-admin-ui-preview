(function (window) {
  const RiskAdmin = window.RiskAdmin;
  const Dom = RiskAdmin.Dom;
  const Format = RiskAdmin.Format;
  const Enums = RiskAdmin.Enums;

  const state = {
    records: [],
    page: 1,
    pageSize: RiskAdmin.Config.pageSize,
    filters: {}
  };

  function compactDateTime(value) {
    if (!value) {
      return '-';
    }
    return String(value);
  }

  function renderSummary(records) {
    const summary = RiskAdmin.RunRecordAdapter.summary(records);
    Dom.setHtml('#records-summary', [
      Dom.metric('今日任务', Format.count(summary.today), '2026-07-03'),
      Dom.metric('成功', Format.count(summary.success), '全部对象完成', 'green'),
      Dom.metric('部分失败', Format.count(summary.partialFailed), '有失败对象', 'amber'),
      Dom.metric('失败', Format.count(summary.failed), '未生成报告', 'red')
    ].join(''));
  }

  function actionHtml(record) {
    if (record.triggerType === 'scheduled') {
      return '<a class="btn btn-text" href="' + RiskAdmin.Query.build('auto-inspection.html', { batchId: record.batchId }) + '">查看巡检</a>';
    }
    if (record.reportId) {
      return '<a class="btn btn-text" href="' + RiskAdmin.Query.build('report-detail.html', { reportId: record.reportId }) + '">查看报告</a>';
    }
    return '<span class="btn is-disabled">无报告</span>';
  }

  function rowHtml(record) {
    const failureAction = record.failureCount
      ? '<button class="btn btn-text" data-failure="' + Dom.escapeHtml(record.taskId) + '">失败明细</button>'
      : '<span class="btn is-disabled">失败明细</span>';
    return [
      '<tr>',
      '<td><div class="cell-main"><div class="cell-title">' + Dom.escapeHtml(record.taskId) + '</div><div class="cell-sub">' + Dom.escapeHtml(record.batchId || '-') + '</div></div></td>',
      '<td>' + Dom.tag(Enums.triggerType, record.triggerType) + '</td>',
      '<td>' + Dom.escapeHtml(record.scope) + '</td>',
      '<td>' + Dom.tag(Enums.taskStatus, record.status) + '</td>',
      '<td>' + Dom.escapeHtml(record.resultText) + '</td>',
      '<td>' + Dom.escapeHtml(record.reportText) + '</td>',
      '<td><span class="muted">' + Dom.escapeHtml(record.snapshotTime) + '</span></td>',
      '<td><div class="cell-sub record-time">' + Dom.escapeHtml(compactDateTime(record.startTime)) + ' - ' + Dom.escapeHtml(compactDateTime(record.endTime)) + '</div></td>',
      '<td><span class="muted">' + Dom.escapeHtml(record.failureReason || '-') + '</span></td>',
      '<td><div class="action-list">' + actionHtml(record) + failureAction + '</div></td>',
      '</tr>'
    ].join('');
  }

  function renderTable() {
    const filtered = RiskAdmin.RunRecordAdapter.filterRecords(state.records, state.filters);
    const page = Dom.paginate(filtered, state.page, state.pageSize);
    const bodyHtml = page.list.length
      ? page.list.map(rowHtml).join('')
      : '<tr><td colspan="10"><div class="empty">暂无符合条件的运行记录</div></td></tr>';

    Dom.setHtml('#records-table-body', bodyHtml);
    Dom.setHtml('#records-pagination', Dom.paginationHtml(page));
    Dom.bindPagination(Dom.$('#records-pagination'), (next) => {
      state.page = next.page || state.page;
      state.pageSize = next.pageSize || state.pageSize;
      renderTable();
    });
    bindFailure();
  }

  function failureCardHtml(item) {
    return [
      '<div class="failure-card">',
      '<div class="failure-card-title"><span>' + Dom.escapeHtml(item.object) + '</span><span class="tag tag-red">' + Dom.escapeHtml(item.type) + '</span></div>',
      '<div class="detail-grid">',
      '<div class="detail-item"><div class="detail-label">失败阶段</div><div class="detail-value">' + Dom.escapeHtml(item.stage) + '</div></div>',
      '<div class="detail-item"><div class="detail-label">失败原因</div><div class="detail-value">' + Dom.escapeHtml(item.reason) + '</div></div>',
      '<div class="detail-item"><div class="detail-label">影响范围</div><div class="detail-value">' + Dom.escapeHtml(item.impact) + '</div></div>',
      '<div class="detail-item"><div class="detail-label">处理结果</div><div class="detail-value">' + Dom.escapeHtml(item.result) + '</div></div>',
      '</div>',
      '</div>'
    ].join('');
  }

  function bindFailure() {
    Dom.$all('[data-failure]').forEach((button) => {
      button.addEventListener('click', async () => {
        const taskId = button.dataset.failure;
        const details = await RiskAdmin.RunRecordAdapter.getFailureDetails(taskId);
        const body = details.length
          ? '<div class="failure-list">' + details.map(failureCardHtml).join('') + '</div>'
          : '<div class="empty">暂无失败明细</div>';
        Dom.openModal('失败明细：' + taskId, body, '<button class="btn btn-primary" data-modal-close>关闭</button>');
      });
    });
  }

  function bindFilters() {
    const form = Dom.$('#records-filter');
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
    state.records = await RiskAdmin.RunRecordAdapter.getRecords();
    renderSummary(state.records);
    renderTable();
    bindFilters();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
