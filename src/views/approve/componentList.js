const components= {
  text: [
    {
      category: "text",
      type: "input",
      name: "单行输入框",
      id: 1,
      label: "单行输入框",
      placeholder: "请输入",
      required: false
    },
    {
      category: "text",
      type: "textArea",
      name: "多行输入框",
      id: 2,
      label: "多行输入框",
      placeholder: "请输入",
      required: false
    },
    {
      category: "text",
      type: "explain",
      name: "说明文字",
      id: 3,
      content: ""
    }
  ],
  number: [
    {
      category: 'number',
      type: "number",
      name: "数字输入框",
      id: 4,
      label: "数字输入框",
      placeholder: "请输入数字",
      unit: '个',
      required: false
    },
    {
      category: 'number',
      type: "money",
      name: "金额",
      id: 5,
      label: "金额",
      placeholder: "请输入金额",
      required: false
    },
    {
      category: 'number',
      type: "formula",
      name: "计算公式",
      id: 6,
      label: "计算公式",
      formulaList: [],
      required: false
    }
  ],
  option: [
    {
      category: "option",
      type: "radio",
      name: "单选框",
      id: 7,
      label: "单选框",
      placeholder: "请选择",
      required: false,
      optionList: [{name: ''}]
    },
    {
      category: "option",
      type: "checkbox",
      name: "多选框",
      id: 8,
      label: "多选框",
      placeholder: "请选择",
      required: false,
      optionList: [{name: ''}]
    },
  ],
  date: [
    {
      category: "date",
      type: "datepicker",
      name: "日期",
      id: 9,
      label: "日期",
      placeholder: "请选择日期",
      required: false,
      format: 'YYYY-MM-DD'
    },
    {
      category: "date",
      type: "datepickerRange",
      name: "日期区间",
      id: 10,
      label1: "开始日期",
      placeholder: "请选择日期",
      label2: "结束日期",
      required: false,
      format: 'YYYY-MM-DD',
      autoCalculate: false,
      timeLabel: '时长'
    }
  ],
  other: [
    {
      category: 'other',
      type: 'deatail',
      name: '明细表格',
      id: 11,
      label: '明细',
      required: false
    }
  ]
};
export default components