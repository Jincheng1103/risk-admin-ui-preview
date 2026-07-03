(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  function $(selector, root) {
    return (root || document).querySelector(selector);
  }

  function $all(selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  }

  function escapeHtml(value) {
    return String(value === undefined || value === null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function tag(enumMap, value) {
    const item = enumMap && enumMap[value] ? enumMap[value] : { label: value || '-', tone: '' };
    const toneClass = item.tone ? ' tag-' + item.tone : '';
    return '<span class="tag' + toneClass + '">' + escapeHtml(item.label) + '</span>';
  }

  function metric(label, value, note, tone) {
    const toneClass = tone ? ' is-' + tone : '';
    return [
      '<div class="summary-card' + toneClass + '">',
      '<div class="summary-label">' + escapeHtml(label) + '</div>',
      '<div class="summary-value">' + escapeHtml(value) + '</div>',
      note ? '<div class="summary-note">' + escapeHtml(note) + '</div>' : '',
      '</div>'
    ].join('');
  }

  function setHtml(selector, html, root) {
    const element = $(selector, root);
    if (element) {
      element.innerHTML = html;
    }
  }

  function getFormValues(form) {
    const data = {};
    if (!form) {
      return data;
    }
    new FormData(form).forEach((value, key) => {
      data[key] = String(value).trim();
    });
    return data;
  }

  function paginate(items, page, pageSize) {
    const size = Number(pageSize) || 10;
    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / size));
    const current = Math.min(Math.max(Number(page) || 1, 1), totalPages);
    const start = (current - 1) * size;
    return {
      current,
      pageSize: size,
      total,
      totalPages,
      list: items.slice(start, start + size)
    };
  }

  function paginationHtml(pagination) {
    const buttons = [];
    buttons.push('<button class="page-btn page-arrow" title="上一页" data-page="' + Math.max(1, pagination.current - 1) + '"' + (pagination.current === 1 ? ' disabled' : '') + '>‹</button>');
    for (let page = 1; page <= pagination.totalPages; page += 1) {
      buttons.push('<button class="page-btn' + (page === pagination.current ? ' is-active' : '') + '" data-page="' + page + '">' + page + '</button>');
    }
    buttons.push('<button class="page-btn page-arrow" title="下一页" data-page="' + Math.min(pagination.totalPages, pagination.current + 1) + '"' + (pagination.current === pagination.totalPages ? ' disabled' : '') + '>›</button>');
    return [
      '<div class="pagination-left">',
      '<span class="pagination-total">共 ' + pagination.total + ' 条</span>',
      '</div>',
      '<div class="pagination-right">',
      '<select class="page-size" data-page-size>',
      '<option value="10"' + (pagination.pageSize === 10 ? ' selected' : '') + '>10条/页</option>',
      '<option value="20"' + (pagination.pageSize === 20 ? ' selected' : '') + '>20条/页</option>',
      '<option value="50"' + (pagination.pageSize === 50 ? ' selected' : '') + '>50条/页</option>',
      '</select>',
      '<div class="pager">',
      buttons.join(''),
      '</div>',
      '<span class="pagination-total">跳至</span>',
      '<input class="page-jump" data-page-jump type="number" min="1" max="' + pagination.totalPages + '" value="' + pagination.current + '">',
      '<span class="pagination-total">页</span>',
      '</div>'
    ].join('');
  }

  function bindPagination(root, onChange) {
    $all('[data-page]', root).forEach((button) => {
      button.addEventListener('click', () => {
        onChange({ page: Number(button.dataset.page) });
      });
    });
    const pageSize = $('[data-page-size]', root);
    if (pageSize) {
      enhanceSelect(pageSize);
      pageSize.addEventListener('change', () => {
        onChange({ page: 1, pageSize: Number(pageSize.value) });
      });
    }
    const pageJump = $('[data-page-jump]', root);
    if (pageJump) {
      pageJump.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onChange({ page: Number(pageJump.value) || 1 });
        }
      });
      pageJump.addEventListener('change', () => {
        onChange({ page: Number(pageJump.value) || 1 });
      });
    }
  }

  function closeCustomControls(except) {
    $all('.custom-control.is-open').forEach((control) => {
      if (control !== except) {
        control.classList.remove('is-open');
      }
    });
  }

  function enhanceSelect(select) {
    if (!select || select.dataset.enhanced === 'true') {
      return;
    }
    select.dataset.enhanced = 'true';
    select.classList.add('native-control-hidden');

    const control = document.createElement('div');
    control.className = 'custom-control custom-select';
    control.innerHTML = [
      '<button class="custom-trigger" type="button">',
      '<span class="custom-value"></span>',
      '<span class="custom-arrow" aria-hidden="true"></span>',
      '</button>',
      '<div class="custom-panel"></div>'
    ].join('');
    select.insertAdjacentElement('afterend', control);

    const trigger = $('.custom-trigger', control);
    const value = $('.custom-value', control);
    const panel = $('.custom-panel', control);

    function sync() {
      const selected = select.options[select.selectedIndex];
      value.textContent = selected ? selected.textContent : '';
      panel.innerHTML = Array.prototype.map.call(select.options, (option) => {
        const selectedClass = option.value === select.value ? ' is-selected' : '';
        return '<button class="custom-option' + selectedClass + '" type="button" data-value="' + escapeHtml(option.value) + '">' + escapeHtml(option.textContent) + '</button>';
      }).join('');
      $all('.custom-option', panel).forEach((button) => {
        button.addEventListener('click', () => {
          select.value = button.dataset.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
          control.classList.remove('is-open');
          sync();
        });
      });
    }

    trigger.addEventListener('click', () => {
      const open = !control.classList.contains('is-open');
      closeCustomControls(control);
      control.classList.toggle('is-open', open);
    });
    select.addEventListener('change', sync);
    const form = select.closest('form');
    if (form) {
      form.addEventListener('reset', () => window.setTimeout(sync));
    }
    sync();
  }

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function formatDateValue(date) {
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  }

  function formatDateText(value) {
    if (!value) {
      return '';
    }
    return String(value).replace(/-/g, '/');
  }

  function parseDate(value) {
    if (!value) {
      return new Date();
    }
    const parts = String(value).replace(/\//g, '-').split('-').map(Number);
    if (parts.length < 3 || parts.some(Number.isNaN)) {
      return new Date();
    }
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function enhanceDate(input) {
    if (!input || input.dataset.enhanced === 'true') {
      return;
    }
    input.dataset.enhanced = 'true';
    const initialType = input.type;
    try {
      input.type = 'hidden';
    } catch (error) {
      input.classList.add('native-control-hidden');
    }
    input.classList.add('native-control-hidden');

    const control = document.createElement('div');
    control.className = 'custom-control custom-date';
    control.innerHTML = [
      '<button class="custom-trigger" type="button">',
      '<span class="custom-value"></span>',
      '<span class="custom-calendar-icon" aria-hidden="true"></span>',
      '</button>',
      '<div class="custom-panel date-panel"></div>'
    ].join('');
    input.insertAdjacentElement('afterend', control);

    const trigger = $('.custom-trigger', control);
    const value = $('.custom-value', control);
    const panel = $('.date-panel', control);
    let viewDate = parseDate(input.value);

    function syncText() {
      const text = formatDateText(input.value);
      value.textContent = text || input.getAttribute('placeholder') || '年 / 月 / 日';
      value.classList.toggle('is-placeholder', !text);
    }

    function setValue(date) {
      input.value = formatDateValue(date);
      input.dispatchEvent(new Event('change', { bubbles: true }));
      syncText();
    }

    function renderCalendar() {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const first = new Date(year, month, 1);
      const start = new Date(year, month, 1 - first.getDay());
      const selectedValue = input.value;
      const days = [];
      for (let index = 0; index < 42; index += 1) {
        const day = new Date(start);
        day.setDate(start.getDate() + index);
        const dateValue = formatDateValue(day);
        const muted = day.getMonth() === month ? '' : ' is-muted';
        const selected = dateValue === selectedValue ? ' is-selected' : '';
        days.push('<button class="date-day' + muted + selected + '" type="button" data-date="' + dateValue + '">' + day.getDate() + '</button>');
      }
      panel.innerHTML = [
        '<div class="date-panel-head">',
        '<button class="date-nav" type="button" data-month="-1">‹</button>',
        '<div class="date-panel-title">' + year + '年' + pad(month + 1) + '月</div>',
        '<button class="date-nav" type="button" data-month="1">›</button>',
        '</div>',
        '<div class="date-week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div>',
        '<div class="date-grid">',
        days.join(''),
        '</div>'
      ].join('');

      $all('[data-month]', panel).forEach((button) => {
        button.addEventListener('click', () => {
          viewDate = new Date(year, month + Number(button.dataset.month), 1);
          renderCalendar();
        });
      });
      $all('[data-date]', panel).forEach((button) => {
        button.addEventListener('click', () => {
          setValue(parseDate(button.dataset.date));
          control.classList.remove('is-open');
          renderCalendar();
        });
      });
    }

    trigger.addEventListener('click', () => {
      const open = !control.classList.contains('is-open');
      closeCustomControls(control);
      control.classList.toggle('is-open', open);
      renderCalendar();
    });
    const form = input.closest('form');
    if (form) {
      form.addEventListener('reset', () => {
        window.setTimeout(() => {
          if (initialType === 'date' && !input.value) {
            syncText();
          } else {
            syncText();
          }
          viewDate = parseDate(input.value);
          renderCalendar();
        });
      });
    }
    syncText();
    renderCalendar();
  }

  function initCustomControls(root) {
    const scope = root || document;
    $all('select.control, select.page-size', scope).forEach(enhanceSelect);
    $all('input.control[type="date"]', scope).forEach(enhanceDate);
  }

  function openModal(title, bodyHtml, footerHtml) {
    const mask = $('#modal-mask');
    if (!mask) {
      return;
    }
    setHtml('.modal-title', title, mask);
    setHtml('.modal-body', bodyHtml, mask);
    setHtml('.modal-footer', footerHtml || '<button class="btn btn-primary" data-modal-close>知道了</button>', mask);
    mask.classList.add('is-open');
    $all('[data-modal-close]', mask).forEach((button) => {
      button.addEventListener('click', closeModal);
    });
  }

  function closeModal() {
    const mask = $('#modal-mask');
    if (mask) {
      mask.classList.remove('is-open');
    }
  }

  document.addEventListener('click', (event) => {
    if (event.target && event.target.matches('[data-modal-close]')) {
      closeModal();
    }
    if (event.target && event.target.id === 'modal-mask') {
      closeModal();
    }
    if (!event.target.closest || !event.target.closest('.custom-control')) {
      closeCustomControls();
    }
  });

  RiskAdmin.Dom = {
    $,
    $all,
    escapeHtml,
    tag,
    metric,
    setHtml,
    getFormValues,
    paginate,
    paginationHtml,
    bindPagination,
    initCustomControls,
    openModal,
    closeModal
  };
})(window);
