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
  ]
};
export default components