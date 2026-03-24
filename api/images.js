export default async function handler(req, res) {
  // Allow CORS from same origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query' });

  const PEXELS_KEY = process.env.PEXELS_API_KEY; // Set this in Vercel dashboard
  if (!PEXELS_KEY) return res.status(500).json({ error: 'API key not configured' });

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=4&orientation=landscape`,
      { headers: { Authorization: PEXELS_KEY } }
    );
    const data = await response.json();
    const photos = (data.photos || []).map(p => ({
      url: p.src.large,
      caption: p.alt || query
    }));
    res.status(200).json({ photos });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch images' });
  }
}
