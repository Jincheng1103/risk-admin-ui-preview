(function (window) {
  const RiskAdmin = window.RiskAdmin = window.RiskAdmin || {};

  RiskAdmin.MockStores = [
    {
      id: 2356777,
      platform_type: 1,
      platform_name: '抖音',
      merchant_nickname: '星澜贸易',
      shop_name: '星澜生鲜优选',
      third_shop_id: 'DY2356777',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2356812,
      platform_type: 1,
      platform_name: '抖音',
      merchant_nickname: '云栖食品',
      shop_name: '云栖零食旗舰店',
      third_shop_id: 'DY2356812',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2356948,
      platform_type: 2,
      platform_name: '快手',
      merchant_nickname: '秋禾日用',
      shop_name: '秋禾百货严选',
      third_shop_id: 'KS2356948',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2357003,
      platform_type: 3,
      platform_name: '拼多多',
      merchant_nickname: '栖木家居',
      shop_name: '栖木家居生活馆',
      third_shop_id: 'PDD2357003',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 1
    },
    {
      id: 2357091,
      platform_type: 1,
      platform_name: '抖音',
      merchant_nickname: '青舟服饰',
      shop_name: '青舟女装精选',
      third_shop_id: 'DY2357091',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2357165,
      platform_type: 2,
      platform_name: '快手',
      merchant_nickname: '良田农业',
      shop_name: '良田农品直营店',
      third_shop_id: 'KS2357165',
      status: 1,
      is_bind_risk_control: 0,
      offline_status: 0
    },
    {
      id: 2357288,
      platform_type: 1,
      platform_name: '抖音',
      merchant_nickname: '北桥数码',
      shop_name: '北桥数码专营店',
      third_shop_id: 'DY2357288',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2357396,
      platform_type: 3,
      platform_name: '拼多多',
      merchant_nickname: '悦己美妆',
      shop_name: '悦己美妆集合店',
      third_shop_id: 'PDD2357396',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2357480,
      platform_type: 1,
      platform_name: '抖音',
      merchant_nickname: '晴川母婴',
      shop_name: '晴川母婴优选',
      third_shop_id: 'DY2357480',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    },
    {
      id: 2357592,
      platform_type: 2,
      platform_name: '快手',
      merchant_nickname: '森屿户外',
      shop_name: '森屿户外装备店',
      third_shop_id: 'KS2357592',
      status: 1,
      is_bind_risk_control: 1,
      offline_status: 0
    }
  ];

  RiskAdmin.MockPlatforms = [
    { value: 1, label: '抖音' },
    { value: 2, label: '快手' },
    { value: 3, label: '拼多多' }
  ];
})(window);
