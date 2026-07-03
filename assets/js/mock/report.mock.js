(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  const baseReport = {
    reportId: 'RPT-20260703000109',
    batchId: 'BATCH-20260703-0300',
    storeId: 2356777,
    shopName: '星澜生鲜优选',
    merchantName: '星澜贸易',
    platformName: '抖音',
    thirdShopId: 'DY2356777',
    snapshotTime: '2026-07-03 03:12:00',
    riskLevel: 'high',
    dataStatus: 'partial_missing',
    action: '谨慎放款 / 人工核实',
    exposureAmount: 42000,
    collectibleAssetAmount: 128600,
    loanReferenceAmount: 84000,
    conclusion: '今日巡检结论为高风险。规则引擎识别到售后退款风险上升，并且部分结算数据存在缺失；本报告保留可计算结果，同时在数据缺失处标记无法估算原因。近 7 日售后退款金额较近 30 日均值明显上行，可能导致待结算货款实际可回款规模下降；同时平台扣款、冻结及结算明细存在部分字段缺失，本次未将数据缺失直接认定为商户风险，但会降低报告结论确定性。以下金额和建议仅作为业务流程中的放款参考，最终动作仍需结合授信、审批和运营核实结果；如运营核实后确认退款集中在特定订单批次，建议同步更新可回款资产口径并重新生成单店报告。',
    amountBasis: [
      { label: '待结算货款', value: 186000, desc: '来自本次数据快照，可用于资产口径计算。' },
      { label: '预计风险扣减', value: 22400, desc: '售后退款风险导致的预计扣减，在规则引擎结果展示。' },
      { label: '可回款资产', value: 128600, desc: '扣除风险影响和配置口径后的可参考资产。' },
      { label: '已放款敞口', value: 42000, desc: '当前已放款但未完全回收的资金敞口。' },
      { label: '放款参考金额', value: 84000, desc: '基于可回款资产和风控规则输出的参考值。' }
    ],
    riskEvents: [
      {
        code: 'R05',
        title: '售后退款风险上升',
        level: 'high',
        desc: '近 7 日售后退款率高于近 30 日均值，规则引擎判断可能影响可回款资产质量。',
        evidence: [
          { label: '影响类型', value: '金额缩水' },
          { label: '影响金额', value: '￥22,400' },
          { label: '数据时间', value: '2026-07-03 03:12' }
        ]
      },
      {
        code: 'R18',
        title: '平台扣款与结算待确认',
        level: 'watch',
        desc: '部分平台扣款或冻结账款未完整返回，本次不直接确认为商户风险，但降低结论确定性。',
        evidence: [
          { label: '影响类型', value: '数据不足' },
          { label: '影响金额', value: '无法估算' },
          { label: '数据时间', value: '2026-07-03 03:12' }
        ]
      },
      {
        code: 'R30',
        title: '数据质量风险',
        level: 'unable',
        desc: '结算明细存在字段缺失，报告已标记缺失字段和影响说明。',
        evidence: [
          { label: '缺失范围', value: '结算明细' },
          { label: '处理方式', value: '简化说明' },
          { label: '数据时间', value: '2026-07-03 03:12' }
        ]
      }
    ],
    verifyItems: [
      '核实近 7 日售后退款是否继续扩大，并确认退款是否集中在核心商品或特定订单批次。',
      '核实结算数据缺失原因，确认是否为接口延迟、授权问题或平台侧结算状态变化。',
      '核对相关订单是否仍可作为放款参考资产，避免重复扣减或重复融资。'
    ],
    dataIssues: [
      { title: '结算明细字段缺失', desc: '平台返回的结算明细缺少部分字段，本次报告保留可计算结果。', status: '部分缺失' },
      { title: '平台扣款证据不足', desc: '扣款数据存在延迟，当前不直接认定为商户风险。', status: '证据不足' }
    ],
    moreInfo: [
      {
        title: '影响对象',
        summary: '售后退款订单、售后金额、账户可回款资金。',
        content: '本次主要影响对象为近 7 日发生售后退款的订单、相关售后金额，以及受退款、扣款或冻结影响的账户可回款资金。该部分对象用于解释可回款资产扣减来源，不直接代表商户整体信用风险。'
      },
      {
        title: '历史变化',
        summary: '近三次巡检风险由关注上升为高风险。',
        content: '最近三次巡检中，该店铺风险等级由关注上升为高风险，主要变化来自售后退款风险扩大和结算字段缺失。历史变化仅用于辅助判断风险趋势，最终仍以后端结构化报告结果为准。'
      },
      {
        title: '报告生成信息',
        summary: '由规则结果和结构化报告服务生成。',
        content: '本报告由规则引擎结果、资产口径计算结果和结构化报告服务组合生成。前端仅展示后端返回的结论、金额、风险事件和证据，不在页面侧计算风险等级或放款参考金额。版本信息待后端接口确认后再展示。'
      }
    ]
  };

  const reports = {};
  (RiskAdmin.MockInspection.results || []).forEach((item) => {
    if (!item.reportId) {
      return;
    }
    reports[item.reportId] = {
      ...baseReport,
      reportId: item.reportId,
      storeId: item.storeId,
      riskLevel: item.riskLevel,
      dataStatus: item.dataStatus,
      collectibleAssetAmount: item.collectibleAssetAmount,
      loanReferenceAmount: item.loanReferenceAmount,
      snapshotTime: item.snapshotTime || baseReport.snapshotTime
    };
  });
  reports[baseReport.reportId] = baseReport;

  RiskAdmin.MockReports = reports;
})(window);
