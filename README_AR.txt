كورة اليوم — نسخة API-Football الآمنة

مهم: لا تكتب مفتاح API داخل index.html ولا ترسله في المحادثة. هذه النسخة تقرأه من متغير بيئة في Netlify عبر Netlify Function.

المحتويات:
- index.html: واجهة الموقع.
- netlify/functions/football.js: وسيط آمن يطلب البيانات من API-Football.
- netlify.toml: إعدادات Netlify Functions.

طريقة الربط:
1) ارفع ملفات المجلد إلى مستودع GitHub جديد، مع الحفاظ على المجلد netlify/functions والملف netlify.toml في جذر المشروع. يمكنك فك الضغط ثم رفع الملفات من متصفح الكمبيوتر؛ إنشاء المستودع ورفع مجلدات متداخلة من الهاتف قد يكون أصعب.
2) في Netlify افتح Add new site > Import an existing project، واربط مستودع GitHub.
3) في إعدادات الموقع: Site configuration > Environment variables (قد يختلف الاسم قليلًا)، أضف:
   Key: API_FOOTBALL_KEY
   Value: الصق مفتاح API-Football هنا داخل Netlify فقط.
4) احفظ ثم أعد النشر (Deploys > Trigger deploy > Deploy site).
5) افتح رابط الموقع واختبر تبويبات مباريات اليوم، مباشر الآن، المباريات القادمة، والترتيب.

تنبيه:
- هذه النسخة تستخدم league ID = 186 والموسم 2026 كإعداد أولي. إن لم تظهر بيانات، اختبر League ID والموسم والتغطية من API-Football Dashboard. قد يختلف الموسم الذي توفره واجهة API حسب جدول الدوري.
- الخطة المجانية محدودة بعدد الطلبات؛ الموقع يستخدم تخزينًا مؤقتًا بسيطًا لتقليل الاستهلاك، لكنه لا يضمن البقاء ضمن الحصة إذا زاد الزوار.
- نشر الموقع بسحب ملف HTML وحده إلى Netlify لا يكفي لتشغيل الدالة. يجب نشر المجلد عبر Git متصل بـ Netlify أو Netlify CLI.
- لا تضع المفتاح في لقطة شاشة عامة، HTML، JavaScript، GitHub، أو ترسله لي.
