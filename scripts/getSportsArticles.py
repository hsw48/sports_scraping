import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Path to WebDriver
CHROME_DRIVER_PATH = ''

# Set up Selenium
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Run in headless mode
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
service = ChromeService(executable_path=CHROME_DRIVER_PATH)
driver = webdriver.Chrome(service=service, options=options)

leagues = {'f1': 'formula-1', 'golf': 'golf', 'tennis': 'tennis'}

def scrape_articles_from_the_score():

    for key in leagues:
        #url = 'https://thescore.com/' + leagues[key] + '/news'
        url = 'https://www.nytimes.com/athletic/' + leagues[key]

        # Load the page
        driver.get(url)

        # Get the page source and parse it with BeautifulSoup
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')
    
        articles = soup.find_all('div', class_='more-stories')

        for article in articles:

            article_details = {}
            article_details['title'] = article.find('h6').text.strip()
            article_details['url'] = article.find('a')['href']
            article_details['author'] = article.find('span', class_='hsJSom').text.strip()
            article_details['excerpt'] = article.find('span', class_='excerpt').text.strip()
            images = article.find_all('img', class_='image-next-root')

            # Multiple images due to lazy loading principles, grab the last one
            for image in images:
                best_image = image['src']

            article_details['image'] = best_image
            article_details['image-alt'] = article.find('img', class_='image-next-root')['alt']

            # Match articles to events
            matched_events = match_article_to_events(article_details, key)

            article_id = None
            if len(matched_events) > 0:
                # If we have at least one matched event, store the article
                article_id = articles_collection.insert_one(article_details)

            # Store matched articles in MongoDB
            for event in matched_events:
                articles_collection.update_one({'_id': article_id.inserted_id}, {'$push': {'events': event['_id']}})
                events_collection.update_one({'_id': event['_id']}, { '$push': {'articles': article_id.inserted_id}})

def match_article_to_events(article_details, key):
    matched_events = []
    
    for event in events_collection.find({'sport': key}):
        if event['event_nickname'] in article_details['title'] or event['event_nickname'] in article_details['excerpt']:
            matched_events.append(event)

    return matched_events

# MongoDB connection
print('Connecting to MongoDB client...')
client = MongoClient('mongodb+srv://admin:adminPassword@cluster0.vrjnhbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['harrison-woodward-interview']
events_collection = db['events']
articles_collection = db['articles']
print('Connected to MongoDB')


scrape_articles_from_the_score()
# Close the driver
driver.quit()