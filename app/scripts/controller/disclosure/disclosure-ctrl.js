'use strict';
angular.module('hongcaiApp')
  .controller('disclosureCtrl', ['$scope', '$state', '$rootScope', '$location', 'AboutUsService', 'config', function($scope, $state, $rootScope, $location, AboutUsService, config) {
    $scope.showFirstArrow = false
    $scope.showLastArrow = true
    var indexActive = 1
    $scope.toggleOperating = function (direction, opeeratingLength) {
      if (direction == 'prev') {
        if (indexActive === 1) {
          $scope.showFirstArrow = false
          return
        }
        indexActive -= 1
       $scope.showFirstArrow = true
       $scope.showLastArrow = true
      } else {
        if (indexActive === opeeratingLength - 1) {
          $scope.showLastArrow = false
          return
        }
        indexActive += 1
        $scope.showFirstArrow = true
      }
    }
    $scope.menus = {
      'left': [{
        'href': '/disclosure/bank-disclosure',
        'link': 'root.disclosure.bank-disclosure',
        'text': '承诺函'
      },{
        'href': '/disclosure/information',
        'link': 'root.disclosure.information',
        'text': '备案信息'
      },
      {
        'href': '/disclosure/organization',
        'link': 'root.disclosure.organization',
        'text': '组织信息'
      },
      {
        'href': '/disclosure/risk-management',
        'link': 'root.disclosure.risk-management',
        'text': '审核信息'
      },
      {
        'href': '/disclosure/business-information',
        'link': 'root.disclosure.business-information',
        'text': '经营信息'
      },
      {
        'href': '/disclosure/policies-regulations',
        'link': 'root.disclosure.policies-regulations',
        'text': '其他信息'
      },
      {
        'href': '/disclosure/operating-report-2016',
        'link': 'root.disclosure.operating-report-2016',
        'text': ''
      },
      {
        'href': '/disclosure/operating-report-2017',
        'link': 'root.disclosure.operating-report-2017',
        'text': ''
      }]
    };
    $scope.businessInfo = [
      {
        name: '平台名称',
        content: '宏财网'
      },
      {
        name: '公司名称',
        content: '北京竞财投资服务有限公司'
      },
      {
        name: '公司简称',
        content: '北京竞财；竞财'
      },
      {
        name: '统一社会信用代码',
        content: '91110107330246732H'
      },
      {
        name: '公司注册资本',
        content: '1000万'
      },
      {
        name: '公司实缴资本',
        content: '1300万'
      },
      {
        name: '公司注册地',
        content: '北京市工商行政管理局石景山分局'
      },
      {
        name: '公司经营地',
        content: '北京市海淀区中关村南二条一号中科院国家空间中心九章大厦B座'
      },
      {
        name: '公司成立时间',
        content: '2015-1-23'
      },
      {
        name: '官网网站正式上线运营时间',
        content: '2015-2-2'
      },
      {
        name: 'APP上线运营时间',
        content: '2017-3-13'
      },
      {
        name: '公司经营期限',
        content: '2015-1-23至2035-1-22'
      },
      {
        name: '公司经营状态',
        content: '开业'
      },
      {
        name: '公司法定代表人',
        content: '刘刚'
      },
      {
        name: '实际控制人',
        content: '刘刚'
      },
      {
        name: '董事',
        content: '刘刚；王斌；邓铁军'
      },
      {
        name: '监事',
        content: '华桂章'
      },
      {
        name: 'CEO',
        content: '王斌'
      },
      {
        name: '公司经营范围',
        content: '投资咨询；投资管理；资产管理；财务咨询（不得开展审计、验资、查账、评估、会计咨询、代理记账等需经专项审批的业务，不得出具相应的审计报告、验资报告、查账报告、评估报告等文字材料）；项目投资；企业管理咨询；公关策划；经济信息咨询；市场调查'
      }
    ],
    $scope.cumulative = {
      totalTransactionAmount: 0, // 累计交易总额
      totalTransactionCount: 0, // 累计交易笔数
      userCount: 0, // 累计注册会员数
      loanBalance: 0, // 借贷余额
      loanBalanceCreditRightCount: 0, // 借贷余额笔数
      loanInterestBalance: 0,
      numOfLends: 0, // 累计出借人数
      numOfBorrows: 0, // 累计借款人数
      currentNumOfLends: 0, // 当前出借人数
      currentNumOfBorrows: 0, // 当前借款人数
      topTenBorrowerRemainPrincipalPercent: 0, // 前十大借款人待还金额占比
      topOneBorrowerRemainPrincipalPercent: 0, // 最大单一借款人待还金额占比
      relationshipLoanBalance: 0, // 关联关系借款余额
      relationshipLoanCount: 0, // 关联关系借款笔数
      overdueAmount: 0, // 逾期金额
      overdueCount: 0, // 逾期笔数
      overdue90Amount: 0, // 逾期90天以上的金额
      overdue90Count: 0, // 逾期90天以上的笔数
      compensatoryAmount: 0, // 代偿金额
      compensatoryCount: 0, // 代偿笔数
      projectOverduePercent: 0, // 项目逾期率
      projectOverdueIn90Percent: 0, // 项目分级逾期率（逾期90天内）
      projectOverdueIn180Percent: 0, // 项目分级逾期率（逾期90天以上至180天）
      projectOverdue180Percent: 0, // 项目分级逾期率（逾期180天以上)
      overdueAmountPercent: 0, // 金额逾期率
      overdueIn90AmountPercent: 0, // 金额分级逾期率（逾期90天内）
      overdueIn180AmountPercent: 0, // 金额分级逾期率（逾期90天以上至180天）
      overdue180AmountPercent: 0, // 金额分级逾期率（逾期180天以上）
      borrowerTotalAmountPerCapital: 0, // 人均累计借款金额
      lenderTotalAmountPerCapital: 0, // 人均累计出借金额
      topOneLendAmountPercent: 0, // 最大单户出借余额占比
      topTenLendAmountPercent: 0 // 最大十户出借余额占比
    },
    $scope.policiesList = [
      {
        title: '中华人民共和国电子签名法',
        link: 'http://www.gov.cn/flfg/2005-06/27/content_9785.htm'
      },
      {
        title: '中华人民共和国网络安全法',
        link: 'http://www.gov.cn/xinwen/2016-11/07/content_5129723.htm'
      },
      {
        title: '中华人民共和国反洗钱法',
        link: 'http://www.gov.cn/flfg/2006-10/31/content_429381.htm'
      },
      {
        title: '最高人民法院关于审理民间借贷案件适用法律若干问题的规定',
        link: 'http://www.court.gov.cn/fabu-xiangqing-15146.html'
      },
      {
        title: '中国人民银行等十部委发布《关于促进互联网金融健康发展的指导意见》',
        link: 'http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/DD36A6654C7E4D0D9D658E712BFB46C5.html'
      },
      {
        title: '网络借贷信息中介机构业务活动管理暂行办法',
        link: 'http://www.cbrc.gov.cn/govView_37D312933F1A4CECBC18F9A96293F450.html'
      },
      {
        title: 'P2P网络借贷风险专项整治工作实施方案',
        link: 'http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D81B52D3D20A49A99522C48FA8F1C752.html'
      },
      {
        title: '网络借贷信息中介机构备案登记管理指引',
        link: config.domain + '/policies'
      },
      {
        title: '网络借贷资金存管业务指引',
        link: 'http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html'
      },
      {
        title: '网络借贷信息中介机构业务活动信息披露指引',
        link: 'http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html'
      }
    ]
    $scope.gotopoliciesWeb = function (link) {
      window.location.href = link
    }
    $rootScope.selectPage = $location.path().split('/')[1];
    $scope.updateDate = '2017-11-9';
    $scope.yearList = [];
    $scope.monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    $scope.showYearList = false;
    $scope.showMonthList = false;
    $scope.startYear = 2018;
    $scope.startMonth = 4;
    $scope.getPlatformData = function (dataTime) {
      AboutUsService.dataStat.get({
        dataTime: dataTime
      }, function (response) {
        if (response && response.ret !== -1) {
          $scope.cumulative = response.disclosureInformationDetail
          $scope.updateDate = response.systemDataTime
          if (!dataTime) {
            $scope.currentYear = new Date(response.systemDataTime).getFullYear();
            $scope.currentMonth = new Date(response.systemDataTime).getMonth() + 1;
            for (var i = $scope.startYear; i <= $scope.currentYear; i++) {
              $scope.yearList.push(i)
            }
          }
          $scope.selectedYear = new Date(response.systemDataTime).getFullYear();
          $scope.selectedMonth = new Date(response.systemDataTime).getMonth() + 1;
          $scope.selectedYearText = $scope.selectedYear + '年';
          $scope.selectedMonthText = $scope.selectedMonth + '月';
          $scope.managementInfo = [
            {
              name: '借贷余额', 
              content: $scope.cumulative.loanBalance,
              type: '元' 
            },
            {
              name: '借贷余额笔数',
              content: $scope.cumulative.loanBalanceCreditRightCount,
              type: '笔'
            },
            {
              name: '利息余额',
              content: $scope.cumulative.loanInterestBalance,
              type: '元'
            },
            {
              name: '累计注册会员数',
              content: $scope.cumulative.userCount,
              type: '人'
            },
            {
              name: '累计借款人数',
              content: $scope.cumulative.numOfBorrows,
              type: '人'
            },
            {
              name: '累计出借人数',
              content: $scope.cumulative.numOfLends,
              type: '人'
            },
            {
              name: '当前借款人数',
              content: $scope.cumulative.currentNumOfBorrows,
              type: '人'
            },
            {
              name: '当前出借人数',
              content: $scope.cumulative.currentNumOfLends,
              type: '人'
            },
            {
              name: '前十大借款人待还金额占比',
              content: $scope.cumulative.topTenBorrowerRemainPrincipalPercent,
              type: '%'
            },
            {
              name: '最大单一借款人待还金额占比',
              content: $scope.cumulative.topOneBorrowerRemainPrincipalPercent,
              type: '%'
            },
            {
              name: '关联关系借款余额',
              content: $scope.cumulative.relationshipLoanBalance,
              type: '元'
            },
            {
              name: '关联关系借款笔数',
              content: $scope.cumulative.relationshipLoanCount,
              type: '笔'
            },
            {
              name: '逾期金额',
              content: $scope.cumulative.overdueAmount,
              type: '元'
            },
            {
              name: '逾期笔数',
              content: $scope.cumulative.overdueCount,
              type: '笔'
            },
            {
              name: '逾期90天以上的金额',
              content: $scope.cumulative.overdue90Amount,
              type: '元'
            },
            {
              name: '逾期90天以上的笔数',
              content: $scope.cumulative.overdue90Count,
              type: '笔'
            },
            {
              name: '代偿金额',
              content: $scope.cumulative.compensatoryAmount,
              type: '元'
            },
            {
              name: '代偿笔数',
              content: $scope.cumulative.compensatoryCount,
              type: '笔'
            },
            {
              name: '项目逾期率',
              content: $scope.cumulative.projectOverduePercent,
              type: '%'
            },
            {
              name: '项目分级逾期率（逾期90天内）',
              content: $scope.cumulative.projectOverdueIn90Percent,
              type: '%'
            },
            {
              name: '项目分级逾期率（逾期90天以上至180天）',
              content: $scope.cumulative.projectOverdueIn180Percent,
              type: '%'
            },
            {
              name: '项目分级逾期率（逾期180天以上)',
              content: $scope.cumulative.projectOverdue180Percent,
              type: '%'
            },
            {
              name: '金额逾期率',
              content: $scope.cumulative.overdueAmountPercent,
              type: '%'
            },
            {
              name: '金额分级逾期率（逾期90天内）',
              content: $scope.cumulative.overdueIn90AmountPercent,
              type: '%'
            },
            {
              name: '金额分级逾期率（逾期90天以上至180天）',
              content: $scope.cumulative.overdueIn180AmountPercent,
              type: '%'
            },
            {
              name: '金额分级逾期率（逾期180天以上）',
              content: $scope.cumulative.overdue180AmountPercent,
              type: '%'
            },
            {
              name: '人均累计借款金额',
              content: $scope.cumulative.borrowerTotalAmountPerCapital,
              type: '元'
            },
            {
              name: '人均累计出借金额',
              content: $scope.cumulative.lenderTotalAmountPerCapital,
              type: '元'
            },
            {
              name: '最大单户出借余额占比',
              content: $scope.cumulative.topOneLendAmountPercent,
              type: '%'
            },
            {
              name: '最大十户出借余额占比',
              content: $scope.cumulative.topTenLendAmountPercent,
              type: '%'
            },
            {
              name: '平台向借款人收取服务费的标准',
              content: $scope.cumulative.loanServiceFeeStandard
            }
          ]
        } else {
          alert(response.msg)
        }
      })
    }
    $scope.getPlatformData()
    $scope.riskList = [
      {
        num: '01',
        type: '还款提醒',
        content: '还款日前3天，对借款人通过短信、邮件、电话等方式提醒还款'
      },
      {
        num: '02',
        type: '早期催收',
        content: '还款日当天通过短信、邮件、电话等方式再次提醒还款'
      },
      {
        num: '03',
        type: '中期催收',
        content: '对逾期未还的借款人通过短信、电话、邮件等方式进行催收'
      },
      {
        num: '04',
        type: '委外催收',
        content: '对逾期超过7天的借款人，通过上门催收、委外催收等多种方式不断催收'
      },
      {
        num: '05',
        type: ' 日常预警管理',
        content: '如以上方式均无效将进行法律诉讼'
      }
    ]
    $scope.payList = [
      {
        type: '业务类型',
        txt: '收费标准'
      },
      {
        type: '会员注册',
        txt: '免费'
      },
      {
        type: '开通存管账户',
        txt: '免费'
      },
      {
        type: '投标（出借）',
        txt: '免费'
      },
      {
        type: '债权转让',
        txt: '转让手续费=转让金额*1%，最低3元'
      },
      {
        type: '充值',
        txt: '免费'
      },
      {
        type: '提现',
        txt: '2元/笔'
      }
    ]
    $scope.importList = ['公司减资、合并、分立、解散或申请破产', '公司依法进入破产程序', '公司被责令停业、整顿、关闭', '公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚', '公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施', '公司主要或者全部业务陷入停顿', '存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项']
    // 经营信息 日期选择菜单
    $scope.selectYear = function () {
      $scope.showMonthList ? $scope.showMonthList = false : null;
      $scope.showYearList = !$scope.showYearList;
    }
    $scope.selectMonth = function () {
      $scope.showYearList ? $scope.showYearList = false : null;
      $scope.showMonthList = !$scope.showMonthList;
    }
    $scope.changeYear = function (year) {
      $scope.selectedYear = year;
      $scope.showYearList = false;
      $scope.selectedYearText = $scope.selectedYear + '年';
    }
    $scope.changeMonth = function (month) {
      if ($scope.selectedYear <= $scope.startYear && month < $scope.startMonth || $scope.selectedYear >= $scope.currentYear && month > $scope.currentMonth) {
        return;
      }
      $scope.selectedMonth = month;
      $scope.showMonthList = false;
      $scope.selectedMonthText = $scope.selectedMonth + '月';
    }
    $scope.blurUl = function($event) {
      var years = angular.element('.years');   // 设置目标区域
      var months = angular.element('.months');   // 设置目标区域
      if(!years.is($event.target) && years.has($event.target).length === 0 && !months.is($event.target) && months.has($event.target).length === 0){ 
        $scope.showYearList = false;
        $scope.showMonthList = false;
      }
    }
    $scope.search = function (selectedYear, selectedMonth) {
      var dataTime = selectedYear + '-' + (selectedMonth >= 10 ? String(selectedMonth) : '0' + selectedMonth);
      $scope.getPlatformData(dataTime);
    }
  }]);
