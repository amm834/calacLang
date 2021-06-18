# ကျွန်တော်တို့ရဲ့ Language Design က 1 +1 ဖြစ်တဲ့အတွက် Expression မဧနဲ့အတူတူပဲတယ်။ဒီ့အတွက် ကျွန်တော်တို့ရဲ့ Program သည် Expression တွေပဲဖြစ်ပါတယ်လို့ကြေညာလိုက်ပါတယ်။ Index 0 ကိုပဲလိုချင်တာဖြစ်လို့ {% id %} ကိုသုံးထားတာဖြစ်ပါတယ်။

program -> expressions {% id %}

# ခု Expression တွေကို သတ်မှတ်ပါမယ်။
# Expression ဆိုတာ Expression တစ်ခုသို့မဟုတ် Expression အကြောင်းများစွာပါနေတဲ့ကောင်ဖြစ်ပါတယ်။
# Pipe Sign (|) သည် OR ကိုပြောတာဖြစ်ပါတယ်။
expressions -> _ expression _ {% 
                data => [data[1]]
              %}
            |  _ expression _ "\n" expressions {%
                data => [data[1],...data[4]]
              %}

# Expression တစ်ခုသည် Unary Expression (သို့မဟုတ်) Binary Expression လည်းဖြစ်နိုင်တယ်။
# Unary Expression ဆိုတာ တစ်ခုတည်းရှိတဲ့ကောင်တွေကိုပြောတာပါ။
# ဉပမာ 1,name စသဖြင့်။
# Binary Expression ဆိုတာ Root နဲ့ Node နှစ်ခုပါတဲ့ကောင်တွေကိုပြောဖြစ်ပါတယ်။
# ဉပမာ 1 + 2 သည် Binary Expression ဖြစ်ပါတယ်။အဘယ့်ကြောင့်ဆိုသော် + Root ရဲ့ ညာဘက်မှာ 1 ၊ ဘယ်ဘက်မှာ 2 ရှိနေလို့ဖြစ်ပါတယ်။
expression -> unary_expression {% id %} | binary_expression {% id %}

# Unary Expression ဆိုတာ Number လည်းဖြစ်နိုင်တယ်။
unary_expression -> number {% id %}

# Binary Expression‌ ဆိုတာ Unary Expression Operator နဲ့ Expression ကြီးတစ်ခုလုံးလည်းဖြစ်နိုင်တယ်။
# Expression တစ်ခုလုံးဖြစ်နိုင်တယ်ဆိုတာက 1 + 2 + 3 မှာ 1 သည် Unary Expression လို့မှတ်ယူလို့ရတယ်။ 2 + 3 ကြတော့ Binary Expression ဖြစ်တယ်။ Binary Expression သည် Expression ပဲဖြစ်တဲ့အတွက် Expression လို့ပုန်ခေါ်လိုက်တာဖြစ်တယ်။ Unary Expression ကြ‌တော့တစ်ခုတည်းမို့လို့ဖြစ်ပါတယ်။

binary_expression -> unary_expression _ operator _ expression {%

# ခု Expression ကရလာတဲ့ Data တွေကို Type နဲ့ Value သတ်မှတ်ပြီး Return ပြန်ပေးလိုက်ပါတယ်။
# Data တွေရဲ့ Index No စရေတဲ့အခါ -> ရဲ့ ‌ဘာဘက်ကနေစရေရပါတယ်။
data => {
    return {
        type: "binary_expression",
        rop: data[0],
        operator: data[2],
        lop: data[4]
    }
}

%}

# Operator သည် အပေါင်း (သို့မဟုတ်) အနှုတ်ဖြစ်နိုင်တယ်လို့သတ်မှတ်လိုက်ပါတယ်။ဆိုလိုတာက နှစ်ခုလုံးလက်ခံတယ်လို့ပြောချင်တာပါ။
operator -> "+" {% id %} 
          | "-" {% id %}

# Number သည် Decimal လည်းဖြစ်နိုင်သလို Digit လည်းဖြစ်နိုင်တယ်။
number -> decimal {% id %}
        | digit {% id %}

# Decimal သည် Digit နှစ်ခုကို Dot (.) နှင့်ဆက်ထားတာဖြစ်တယ်။
decimal -> digit "." digit {%

# String ဖြစ်နေတဲ့အတွက် Number ကိုပြောင်းပေးလိုက်တာပါ။
data => Number(data[0] + "." + data[2])

%}

# Digit သည် 0 ကနေ 9 ထိတစ်လုံး (သို့မဟုတ်) တစ်လုံးထက်ပိုမယ်လို့သတ်မှတ်လိုက်တာပါ။
digit -> [0-9]:+ {%

# Parse Tree ကနေထွက်လာမယ့် ကောင်(Token)တွေက Array Element တွေဖြစ်နေတဲ့အတွက်တစ်စုတစ်စည်းတည်း Join ပြီး Number ပြောင်းပေးလိုက်ပါတယ်။
# ဉပမာ - 123 ကို Parse လုပ်ရင်  [[['1','2','3']]] ထွင်လာမယ်။ Join လိုက်တဲ့အခါ ['123'] ဖြစ်သွားမှာဖြစ်တယ်။
data => Number(data[0].join(''))

%}

# _ (Optional White Space) သည်  Space (သို့မဟုတ်) Tab ပါလည်းရတယ်။မပါလည်းရတယ်။
_ -> [\s\t]:*

# __ (Space) အနည်းဆုံးတစ်ခုနှင့်တစ်ခုထက်ပိုရှိဖို့လိုအပ်တယ်။
__ -> [\s]:+