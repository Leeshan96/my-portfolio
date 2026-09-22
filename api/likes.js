import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS).end();
    return;
  }

  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v));

  try {
    if (req.method === 'GET') {
      const count = (await redis.get('likes')) ?? 0;
      return res.status(200).json({ count: Number(count) });
    }

    if (req.method === 'POST') {
      const count = await redis.incr('likes');
      return res.status(200).json({ count });
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('likes API error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
