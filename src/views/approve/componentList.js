const components= {
  // text: [
  //   {
  //     category: "text",
  //     type: "input",
  //     name: "单行输入框",
  //     id: 'c1',
  //     label: "单行输入框",
  //     placeholder: "请输入",
  //     required: false
  //   },
  //   {
  //     category: "text",
  //     type: "textArea",
  //     name: "多行输入框",
  //     id: 'c2',
  //     label: "多行输入框",
  //     placeholder: "请输入",
  //     required: false
  //   },
  //   {
  //     category: "text",
  //     type: "explain",
  //     name: "说明文字",
  //     id: 'c3',
  //     content: ""
  //   }
  // ],
  number: [
    {
      category: 'number',
      type: "number",
      name: "数字输入框",
      id: 'c4',
      label: "数字输入框",
      placeholder: "请输入数字",
      unit: '个',
      required: false
    },
    {
      category: 'number',
      type: "money",
      name: "金额",
      id: 'c5',
      label: "金额",
      placeholder: "请输入金额",
      required: false
    },
    {
      category: 'number',
      type: "formula",
      name: "计算公式",
      id: 'c6',
      label: "计算公式",
      formulaList: [],
      required: false
    }
  ],
  // option: [
  //   {
  //     category: "option",
  //     type: "radio",
  //     name: "单选框",
  //     id: 'c7',
  //     label: "单选框",
  //     placeholder: "请选择",
  //     required: false,
  //     optionList: [{name: ''}]
  //   },
  //   {
  //     category: "option",
  //     type: "checkbox",
  //     name: "多选框",
  //     id: 'c8',
  //     label: "多选框",
  //     placeholder: "请选择",
  //     required: false,
  //     optionList: [{name: ''}]
  //   },
  // ],
  // date: [
  //   {
  //     category: "date",
  //     type: "datepicker",
  //     name: "日期",
  //     id: 'c9',
  //     label: "日期",
  //     placeholder: "请选择日期",
  //     required: false,
  //     format: 'YYYY-MM-DD'
  //   },
  //   {
  //     category: "date",
  //     type: "datepickerRange",
  //     name: "日期区间",
  //     id: 'c10',
  //     label1: "开始日期",
  //     placeholder: "请选择日期",
  //     label2: "结束日期",
  //     required: false,
  //     format: 'YYYY-MM-DD',
  //     autoCalculate: false,
  //     timeLabel: '时长'
  //   }
  // ],
  // other: [
  //   {
  //     category: 'other',
  //     type: 'detail',
  //     name: '明细/表格',
  //     id: 'c11',
  //     label: '明细',
  //     required: false
  //   },
  //   {
  //     category: 'other',
  //     type: 'address',
  //     name: '省市区',
  //     id: 'c12',
  //     label: '省市区',
  //     required: false,
  //     format: 'ssq'
  //   },
  //   {
  //     category: 'other',
  //     type: 'picture',
  //     name: '图片',
  //     id: 'c13',
  //     label: '图片',
  //     required: false,
  //   },
  //   {
  //     category: "other",
  //     type: "contact",
  //     name: "联系人",
  //     id: 'c14',
  //     label: "联系人",
  //     placeholder: "请选择",
  //     required: false,
  //     canChooseMe: false,
  //     canChooseMore: false,
  //   },
  //   {
  //     category: "other",
  //     type: "department",
  //     name: "部门",
  //     id: 'c15',
  //     label: "部门",
  //     placeholder: "请选择",
  //     required: false,
  //     canChooseMore: false,
  //   },
  //   {
  //     category: 'other',
  //     type: 'annex',
  //     name: '附件',
  //     id: 'c16',
  //     label: '附件',
  //     required: false,
  //   },
  // ],
  attendance: [
    {
      category: 'attendance',
      type: 'leave',
      name: '请假/调休套件',
      id: 'c17',
      required: false,
    },
    {
      category: 'attendance',
      type: 'repalcement',
      name: '补卡套件',
      id: 'c18',
    }
  ]
};
export default components