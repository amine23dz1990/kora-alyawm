JavaScript
exports.handler = async (event) => {
  const key = process.env.API_FOOTBALL_KEY;

  if (!key) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "مفتاح API_FOOTBALL_KEY غير موجود في إعدادات Netlify"
      })
    };
  }

  const type = event.queryStringParameters?.type || "today";
  const league = "ALG.1";
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Algiers",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);

  let endpoint;

  if (type === "standings") {
    endpoint =
      `https://v3.football.api-sports.io/standings?league=186&season=${now.getFullYear()}`;
  } else {
    let params = `league=186&season=${now.getFullYear()}`;

    if (type === "live") {
      params += "&live=all";
    } else if (type === "upcoming") {
      params += `&from=${date}&to=${date}`;
    } else {
      params += `&date=${date}`;
    }

    endpoint = `https://v3.football.api-sports.io/fixtures?${params}`;
  }

  try {
    const response = await fetch(endpoint, {
      headers: { "x-apisports-key": key }
    });

    const data = await response.json();

    if (!response.ok || data.errors && Object.keys(data.errors).length) {
      return {
        statusCode: response.ok ? 502 : response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "تعذر جلب البيانات من API-Football",
          details: data.errors || data.message || "خطأ من مصدر البيانات"
        })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=60"
      },
      body: JSON.stringify({ results: data.response || [] })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "حدث خطأ أثناء الاتصال بمصدر المباريات" })
    };
  }
};
