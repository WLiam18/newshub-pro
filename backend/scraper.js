const axios = require('axios');
require('dotenv').config();

const CATEGORIES = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'];

async function fetchNews() {
    let key = process.env.MEDIASTACK_API_KEY;
    if (key) key = key.trim(); // Handle accidental spaces in Railway UI

    console.log(`[Diagnostic] MEDIASTACK_API_KEY present: ${!!key}`);
    if (key) {
        console.log(`[Diagnostic] Key starts with: ${key.substring(0, 4)}...`);
    }

    const allArticles = [];

    for (const category of CATEGORIES) {
        try {
            console.log(`Fetching category: ${category}...`);
            await new Promise(r => setTimeout(r, 1000));

            const response = await axios.get('http://api.mediastack.com/v1/news', {
                params: {
                    access_key: key,
                    categories: category,
                    languages: 'en',
                    limit: 20
                }
            });

            if (response.data && response.data.data) {
                const categoryArticles = response.data.data.map(article => ({
                    title: article.title,
                    source: article.source,
                    date: article.published_at,
                    content: article.description,
                    full_text: article.description,
                    url: article.url,
                    image_url: article.image,
                    category_hint: category.charAt(0).toUpperCase() + category.slice(1),
                    raw_json: JSON.stringify(article)
                }));
                allArticles.push(...categoryArticles);
                console.log(`Fetched ${categoryArticles.length} articles for ${category}`);
            } else if (response.data && response.data.error) {
                console.error(`[Mediastack Error] Code: ${response.data.error.code}, Message: ${response.data.error.message}`);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.error(`[Mediastack HTTP Error] Status: ${error.response.status}, Data:`, JSON.stringify(error.response.data));
            } else {
                console.error(`Error fetching category ${category} from Mediastack:`, error.message);
            }
        }
    }

    const uniqueArticles = Array.from(new Map(allArticles.map(a => [a.url, a])).values());
    return uniqueArticles;
}

module.exports = { fetchNews };
