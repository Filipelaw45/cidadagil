import { useState, useEffect } from 'react';

interface News {
  id: number;
  title: string;
  content: string;
  image: string;
  created_at: string;
  updated_at: string;
}

export function LastNews() {
  const [news, setNews] = useState<News[]>([]);
  const Token = localStorage.getItem('access_token')

  console.log(Token);
  console.log(`Bearer ${Token}`);

  

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/news/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
            'Host': 'localhost:8000'
          }
        });
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [Token]);

  return (
    <div className='container mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-center my-2'>Últimas Notícias</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {news.map((item) => (
          <div key={item.id} className='bg-white shadow-md rounded-lg p-6'>
            <img
              src={item.image}
              alt={item.title}
              className='w-full h-40 object-cover rounded-t-lg'
            />
            <h2 className='text-lg font-medium mt-2'>{item.title}</h2>
            <p className='text-gray-700'>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
