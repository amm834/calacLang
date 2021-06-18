const nearley = require("nearley");
const grammar = require("./grammar.js");

/*ဖိုင်တွေ Read ဖို့ Write ဖို့လိုအပ်တဲ့အတွက် FS Module ကို Import လိုက်ပါတယ်။*/
const fs = require('fs');

// Parser Instance Object တစ်ခုတည်ဆောက်လိုက်ပါတယ်။
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

// CLI ကနေဝင်လာမဲ့ Program File Name ကိုယူလိုက်ပါတယ်။
const fileName = process.argv[2];

// Source Code တွေကို FS Module သုံးပြီးဖတ်လိုက်ပါတယ်။
const sourceCodes = fs.readFile(fileName, (err, data) => {
    if (err) throw err; // ဖိုင်ဖတ်လို့မရတဲ့အခါ Error ပြန်ပေးမှာပါ။

    /*File ကိုဖတ်လို့ရတဲ့ Data တွေကို String အဖြစ်ပြောင်းပြီး Parse ဆိုတဲ့ Function ကိုပို့ပေးလိုက်ပါတယ်။*/
    parse(data.toString())
})

/*Parse Function က Data တွေကိုလက်ခံပါတယ်။*/
const parse = (data) => {
    try {
        /*Parser ကနေ Parse လုပ်ပါတယ်။*/
        parser.feed(data);
        /*Parse လုပ်လို့အမှားမတွေ့ရင် AST အဖြစ်သိုလှောင်လိုက်တယ်။
   */ const AST = parser.results[0];

        /*Parse လုပ်တာအောင်မြင်တဲ့အခါ "FileName.ast.json" ဖိုင်ထုတ်ပေးလိုက်တယ်။မထုတ်ခင် AST ကို JSON String အဖြစ်ပြောင်းလိုက်တယ်။*/
        fs.writeFile(`${fileName}.ast.json`,
            JSON.stringify(AST, null, 4),
            (err) => {
                /*Error ရှိအခါ Error တက်ပါမယ်။*/
                if (err) return console.log(err);

                /*File Create လို့အောင်မြင်ရင်အောင်မြင်ကြောင်း Message ပြန်ပေးပါမယ်။*/
                console.log("AST Created.");
            });

    }catch(e) {
        /*Syntax Error တွေ့ရင် Error ပြပေးမှာပါ။*/
        console.log(e.message);
    }
}