// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
  function id(x) {
    return x[0];
  }
  var grammar = {
    Lexer: undefined,
    ParserRules: [{
      "name": "program", "symbols": ["expressions"], "postprocess": id
    },
      {
        "name": "expressions", "symbols": ["_", "expression", "_"], "postprocess":
        data => [data[1]]
      },
      {
        "name": "expressions", "symbols": ["_", "expression", "_", {
          "literal": "\n"
        }, "expressions"], "postprocess":
        data => [data[1], ...data[4]]
      },
      {
        "name": "expression", "symbols": ["unary_expression"], "postprocess": id
      },
      {
        "name": "expression", "symbols": ["binary_expression"], "postprocess": id
      },
      {
        "name": "unary_expression", "symbols": ["number"], "postprocess": id
      },
      {
        "name": "binary_expression", "symbols": ["unary_expression", "_", "operator", "_", "expression"], "postprocess":

        // ခု Expression ကရလာတဲ့ Data တွေကို Type နဲ့ Value သတ်မှတ်ပြီး Return ပြန်ပေးလိုက်ပါတယ်။
        // Data တွေရဲ့ Index No စရေတဲ့အခါ -> ရဲ့ ‌ဘာဘက်ကနေစရေရပါတယ်။
        data => {
          return {
            type: "binary_expression",
            rop: data[0],
            operator: data[2],
            lop: data[4]
          }
        }

      },
      {
        "name": "operator", "symbols": [{
          "literal": "+"
        }], "postprocess": id
      },
      {
        "name": "operator", "symbols": [{
          "literal": "-"
        }], "postprocess": id
      },
      {
        "name": "number", "symbols": ["decimal"], "postprocess": id
      },
      {
        "name": "number", "symbols": ["digit"], "postprocess": id
      },
      {
        "name": "decimal", "symbols": ["digit", {
          "literal": "."
        }, "digit"], "postprocess":

        // String ဖြစ်နေတဲ့အတွက် Number ကိုပြောင်းပေးလိုက်တာပါ။
        data => Number(data[0] + "." + data[2])

      },
      {
        "name": "digit$ebnf$1", "symbols": [/[0-9]/]},
      {
        "name": "digit$ebnf$1", "symbols": ["digit$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {
          return d[0].concat([d[1]]);
        }},
      {
        "name": "digit", "symbols": ["digit$ebnf$1"], "postprocess":

        // Parse Tree ကနေထွက်လာမယ့် ကောင်(Token)တွေက Array Element တွေဖြစ်နေတဲ့အတွက်တစ်စုတစ်စည်းတည်း Join ပြီး Number ပြောင်းပေးလိုက်ပါတယ်။
        // ဉပမာ - 123 ကို Parse လုပ်ရင်  [[['1','2','3']]] ထွင်လာမယ်။ Join လိုက်တဲ့အခါ ['123'] ဖြစ်သွားမှာဖြစ်တယ်။
        data => Number(data[0].join(''))

      },
      {
        "name": "_$ebnf$1", "symbols": []},
      {
        "name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s\t]/], "postprocess": function arrpush(d) {
          return d[0].concat([d[1]]);
        }},
      {
        "name": "_", "symbols": ["_$ebnf$1"]},
      {
        "name": "__$ebnf$1", "symbols": [/[\s]/]},
      {
        "name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": function arrpush(d) {
          return d[0].concat([d[1]]);
        }},
      {
        "name": "__", "symbols": ["__$ebnf$1"]}], ParserStart: "program"
  }
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = grammar;
  } else {
    window.grammar = grammar;
  }
})();