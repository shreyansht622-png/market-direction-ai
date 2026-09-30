export default async function handler(req, res) {
  try {
    const token = process.env.GROWW_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        status: "ERROR",
        message: "GROWW_ACCESS_TOKEN is not configured"
      });
    }

    const url =
      "https://api.groww.in/v1/live-data/ltp" +
      "?segment=CASH" +
      "&exchange_symbols=NSE_NIFTY,BSE_SENSEX";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "X-API-VERSION": "1.0"
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        status: "ERROR",
        groww: data
      });
    }

    return res.status(200).json({
      status: "SUCCESS",
      data: data.payload
    });

  } catch (error) {
    return res.status(500).json({
      status: "ERROR",
      message: error.message
    });
  }
}
