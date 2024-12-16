import feedparser
import json
from datetime import datetime

def parse_rss_feed(feed_url):
    """
    Parse an RSS feed and extract key information from its entries.
    
    Args:
        feed_url (str): The URL of the RSS feed to parse
    
    Returns:
        dict: A dictionary containing parsed feed information
    """
    # Parse the feed
    feed = feedparser.parse(feed_url)
    
    # Prepare a dictionary to store parsed entries
    parsed_entries = []
    
    # Extract key information from each entry
    for entry in feed.entries:
        # Create a dictionary for each entry with standardized fields
        parsed_entry = {
            'title': entry.get('title', 'No Title'),
            'link': entry.get('link', ''),
            'description': entry.get('description', 'No description'),
            'published': entry.get('published', 'No publication date'),
            'published_parsed': None
        }
        
        # Convert parsed time to a more usable format if available
        if entry.get('published_parsed'):
            try:
                parsed_time = datetime(*entry.published_parsed[:6])
                parsed_entry['published_parsed'] = parsed_time.isoformat()
            except Exception as e:
                print(f"Error parsing date: {e}")
        
        # Add any additional metadata you might want
        parsed_entries.append(parsed_entry)
    
    # Prepare feed metadata
    feed_info = {
        'feed_title': feed.get('feed', {}).get('title', 'Unknown Feed'),
        'feed_link': feed.get('feed', {}).get('link', ''),
        'total_entries': len(parsed_entries),
        'entries': parsed_entries
    }
    
    return feed_info

def main():
    # Example usage - replace with the actual feed URL
    feed_url = 'https://feeds.content.dowjones.io/public/rss/mw_realtimeheadlines'
    
    try:
        # Parse the feed
        parsed_feed = parse_rss_feed(feed_url)
        
        # Pretty print the results
        print(json.dumps(parsed_feed, indent=2))
    
    except Exception as e:
        print(f"An error occurred while parsing the feed: {e}")

if __name__ == '__main__':
    main()

# Note: Before running this script, install feedparser
# You can install it using:
# pip install feedparser
