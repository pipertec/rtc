import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const RSSFeedViewer = () => {
  const [feedData, setFeedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to parse RSS feed
  const parseFeed = async (feedUrl) => {
    setIsLoading(true);
    setError(null);

    try {
      // Use a CORS proxy to fetch the RSS feed
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(feedUrl)}`;
      
      // Fetch the feed content
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const xmlText = await response.text();

      // Parse XML using DOMParser
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
      
      // Extract feed items
      const items = Array.from(xmlDoc.querySelectorAll('item')).map(item => ({
        title: item.querySelector('title')?.textContent || 'No Title',
        link: item.querySelector('link')?.textContent || '',
        description: item.querySelector('description')?.textContent || 'No Description',
        pubDate: item.querySelector('pubDate')?.textContent || 'No Date'
      }));

      // Extract feed metadata
      const feedTitle = xmlDoc.querySelector('channel > title')?.textContent || 'Unknown Feed';
      
      setFeedData({
        feedTitle,
        totalEntries: items.length,
        entries: items
      });
    } catch (err) {
      console.error('Error parsing RSS feed:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to fetch feed on component mount
  useEffect(() => {
    const feedUrl = 'https://feeds.content.dowjones.io/public/rss/mw_realtimeheadlines';
    parseFeed(feedUrl);
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading RSS Feed...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4>Error Fetching Feed</h4>
          <p>{error}</p>
          <Button onClick={() => parseFeed('https://feeds.content.dowjones.io/public/rss/mw_realtimeheadlines')}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  // Render feed data
  return (
    <div className="container mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="d-flex justify-content-between align-items-center">
            {feedData?.feedTitle || 'RSS Feed'}
            <span className="badge bg-primary">
              {feedData?.totalEntries || 0} Entries
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feedData?.entries?.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.title}</TableCell>
                  <TableCell>{entry.pubDate}</TableCell>
                  <TableCell>
                    <a 
                      href={entry.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-sm btn-outline-primary"
                    >
                      Read More
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default RSSFeedViewer;

// Note: This component requires the following dependencies:
// 1. React
// 2. shadcn/ui components (Card, Table, Button)
// 3. Bootstrap CSS for additional styling
