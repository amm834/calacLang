const fs = require("fs");
// User ကထည့်ပေးမယ့်ဖိုင်ကိုယူပါမယ်။
const file = process.argv[2];
// ဖိုင်ရဲ့နာမည်လေးကိုခွဲထုတ်လိုက်တယ်။
const fileNameOnly = file.split(".")[0];

// AST ဖိုင်ကိုဖတ်ပါတယ်။
fs.readFile(file, (err, data) => {
    if (err) throw err; // handle the error

    // AST ဖိုင်ထဲက JSON ကို Array Object ပြန်ပြောင်းလိုက်ပါတယ်။ပြီးနောက်JS ကိုပြောင်းမယ့် Function ကို Data တွေပေးလိုက်တယ်။
    const JSCodes = transpileToJS(JSON.parse(data.toString()));

    // JS Code တွေကို JS ဖိုင်အဖြစ်ပြန်ထုတ်ပေးလိုက်ပါတယ်။
    fs.writeFile(`${fileNameOnly}.js`, JSCodes, err => {
        if (err) return console.log(err);

        console.log(`${fileNameOnly}.js Transpiled Successfully.`);
    });
})


const transpileToJS = data => {
    // JS Code ပြန်ထုတ်ပေးဖို့အတွက် ပထမဆုံး Arary အဖြစ်သတ်မှတ်ထားပါတယ်။
    let lines = [];
    // Data တွေကို Loop ပတ်ပါမယ်။
    for (statement of data) {
        // Expression တွေထွက်လာမှာဖြသ်တဲါအတွက် Expression Generator ကိုလွှဲပေးလိုက်တယ်။ပြီးမှ Return ပြန်တဲ့ ကောင်ကို Expression အဖြစ်သိမ်းလိုက်တယ်။
        let expression = generateExpression(statement);

        // Expression တွေကို JS ပြောင်းပြီး Lines Array ထဲထည့်လိုက်တယ်။
        lines.push(`console.log(${expression})`);
    }
    // Lines Array ထဲက Source Code အဖြစ်ထည့်လိုက်တဲ့ Array Element တွေကို တစ်ကြောင်းချင်းစီဖြစ်အောင်လုပ်ပေးပြီး Return ပြန်လိုက်တယ်။
    return lines.join("\n");
}


// Expression တွေကိုလက်ခံပါမယ်။
function generateExpression(expression) {
    // Expression က Object ဖြစ်မဖြစ်စစ်ပါတယ်။
    if (typeof expression === "object") {
        // Object ဖြစ်နေတဲ့အခါ Binary Expression လားလို့စစ်ပါတယ်။
        if (expression.type === "binary_expression") {
            // rop (Right Operand) က Expression ပြန်ဖြစ်နိုင်တဲ့အတွက် generateExpression ကိုပြန်ခေါ်ပေးလိုက်ပါတယ်။
            let right = generateExpression(expression.rop);
            // lop (Left Operand) က Expression ပြန်ဖြစ်နိုင်တဲ့အတွက် generateExpression ကိုပြန်ခေါ်ပေးလိုက်ပါတယ်။
            let left = generateExpression(expression.lop);

            // Operator က Operator ပဲမို့လို့ Operator တန်ဖို့းကိုပဲယူလိုက်ပါတယ်။
            let operator = expression.operator;

            // ပြီးနောက် Expression အဖြစ် Return ပြန်ပေးလိုက်ပါတယ်။
            return `${left} ${operator} ${right}`;
        }
    } else {
        // Object မဟုတ်ရင် ပေးထားတဲ့ကောင်ကိုပဲပြန် Return ပေးပါတယ်။
        return expression;
    }
}