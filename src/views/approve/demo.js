const obj = {
  processConfig1: {
    "type": "start",
    "name": "发起人",
    "nodeId": "sid-startevent",
    "properties": {},
    "childNode": {
      "name": "UNKNOWN",
      "type": "approver",
      "prevId": "sid-startevent",
      "nodeId": "1918_5cd3",
      "properties": {
        "activateType": "ONE_BY_ONE",
        "agreeAll": false,
        "actionerRules": [{
          "type": "target_select",
          "multi": 1,
          "select": ["allStaff"],
          "range": {
            "approvals": [],
            "labels": [],
            "allStaff": null
          },
          "key": "manual_1918_5cd3_de98_c68d"
        }],
        "noneActionerAction": "admin"
      },
      "childNode": {
        "type": "route",
        "prevId": "1918_5cd3",
        "nodeId": "1d76_c705",
        "conditionNodes": [{
          "name": "条件1",
          "type": "condition",
          "prevId": "1d76_c705",
          "nodeId": "1a15_a4b0",
          "properties": {
            "conditions": [
              [{
                "paramKey": "dingtalk_origin_dept",
                "type": "dingtalk_actioner_dept_condition",
                "paramLabel": "发起人",
                "isEmpty": false,
                "conds": [{
                  "type": "user",
                  "value": "142634263238210868",
                  "attrs": {
                    "name": "韩晟昊",
                    "avatar": ""
                  }
                }]
              }]
            ]
          }
        }, {
          "name": "条件2",
          "type": "condition",
          "prevId": "1d76_c705",
          "nodeId": "9e07_3c93",
          "properties": {
            "conditions": []
          }
        }],
        "properties": {},
        "childNode": {
          "name": "UNKNOWN",
          "type": "notifier",
          "prevId": "1d76_c705",
          "nodeId": "23a8_0d11",
          "properties": {
            "actionerRules": [{
              "type": "target_approval",
              "approvals": [{
                "userName": "韩晟昊",
                "workNo": "142634263238210868"
              }]
            }, {
              "select": ["allStaff"],
              "range": {
                "allStaff": null
              },
              "multi": 1,
              "type": "target_select",
              "key": "manual_23a8_0d11_1669_3a84"
            }]
          }
        }
      }
    }
  },
  p2: {
    "type": "start",
    "name": "发起人",
    "nodeId": "sid-startevent",
    "properties": {},
    "childNode": {
      "type": "route",
      "prevId": "sid-startevent",
      "nodeId": "82d2_7870",
      "conditionNodes": [{
        "name": "条件1",
        "type": "condition",
        "prevId": "82d2_7870",
        "nodeId": "579f_1d36",
        "properties": {
          "conditions": [
            [{
              "paramKey": "dingtalk_origin_dept",
              "type": "dingtalk_actioner_dept_condition",
              "paramLabel": "发起人",
              "isEmpty": false,
              "conds": [{
                "type": "user",
                "value": "142634263238210868",
                "attrs": {
                  "name": "韩晟昊",
                  "avatar": ""
                }
              }]
            }]
          ]
        }
      }, {
        "name": "条件2",
        "type": "condition",
        "prevId": "82d2_7870",
        "nodeId": "1132_5c1f",
        "properties": {
          "conditions": []
        }
      }],
      "properties": {},
      "childNode": {
        "type": "route",
        "prevId": "82d2_7870",
        "nodeId": "03d7_c3a1",
        "conditionNodes": [{
          "name": "条件1",
          "type": "condition",
          "prevId": "03d7_c3a1",
          "nodeId": "08db_64bf",
          "properties": {
            "conditions": [
              [{
                "paramKey": "dingtalk_origin_dept",
                "type": "dingtalk_actioner_dept_condition",
                "paramLabel": "发起人",
                "isEmpty": false,
                "conds": [{
                  "type": "user",
                  "value": "142634263238210868",
                  "attrs": {
                    "name": "韩晟昊",
                    "avatar": ""
                  }
                }]
              }]
            ]
          }
        }, {
          "name": "条件2",
          "type": "condition",
          "prevId": "03d7_c3a1",
          "nodeId": "aa0c_fc5b",
          "properties": {
            "conditions": []
          }
        }],
        "properties": {}
      }
    }
  }
}