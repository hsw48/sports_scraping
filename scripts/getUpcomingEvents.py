import requests
from bs4 import BeautifulSoup
from datetime import datetime

def parse_date_range(date_range):
    # Example date range string: "Feb 15 - Mar 2"
    # Split the string into month_day and end_day
    month_day, end_day = date_range.split(' - ')
    
    # Further split month_day into month and start_day
    start_month, start_day = month_day.split(' ')
    
    # Get the current year
    current_year = datetime.now().year
    
    # Check if the end_day contains a space (indicating it includes a month)
    if ' ' in end_day:
        end_month, end_day = end_day.split(' ')
    else:
        end_month = start_month
    
    # Create the start date string and parse it
    start_date_str = f"{start_month} {start_day}, {current_year}"
    start_date = datetime.strptime(start_date_str, '%b %d, %Y').date()
    
    # Create the end date string and parse it
    end_date_str = f"{end_month} {end_day}, {current_year}"
    end_date = datetime.strptime(end_date_str, '%b %d, %Y').date()
    
    # Handle cases where the date range might span across two years
    if end_date < start_date:
        end_date = end_date.replace(year=current_year + 1)

    # Format the dates as strings
    start_date = start_date.strftime('%Y-%m-%d')
    end_date = end_date.strftime('%Y-%m-%d')
    
    return start_date, end_date

def convert_date(date_str):
    # Example date string: "Jul 5"
    # Split the string into month and day
    month, day = date_str.split(' ')
    
    # Get the current year
    current_year = datetime.now().year
    
    # Create the date string with the current year and parse it
    date_str = f"{month} {day}, {current_year}"
    date = datetime.strptime(date_str, '%b %d, %Y').date()
    
    # Format the date as a string in "YYYY-MM-DD" format
    formatted_date = date.strftime('%Y-%m-%d')
    
    return formatted_date


# Function to scrape upgaming events from different leagues
def scrape_upcoming_games():

    sports = ['f1', 'tennis', 'golf'] # 'mma', 'racing', 'nfl'

    # URL for ESPN's sports chedules
    for sport in sports:
        url = 'https://www.espn.com/' + sport + '/schedule'
        print(url)

        # Headers needed to bypass ESPN blocking script access
        headers = {
            'User-Agent': 'Mozilla/5.0'
        }
        # Send a request to the website
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check that the request was successful

        # Parse the HTML content using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        #List to store the events 
        events = []
        #Collect all the tables
        tables = soup.find_all('table', 'Table')
        for table in tables:
            
            events = table.find_all('tr')

            for event in events:
                event_object = {}
                event_name = None
                 # Define potential selectors for event name
                event_name_selectors = [
                    ('p', 'eventAndLocation__tournamentLink'), # Tennis, Golf
                    ('a', 'AnchorLink') # F1
                ]

                # Try each selector until we find the event name
                for tag, class_name in event_name_selectors:
                    try:
                        event_name = event.find(tag, class_=class_name).text.strip()
                        break  # Exit loop if we find the event name
                    except AttributeError:
                        continue  # Try the next selector if this one fails

                if event_name is None:
                    continue  # Skip this row is no event name

                location_selectors = [
                    ('div', 'eventAndLocation__tournamentLocation'), # Tennis, Golf
                    ('div', '') # F1
                ]

                # Try each selector until we find the location name
                for tag, class_name in location_selectors:
                    try:
                        location = event.find(tag, class_=class_name).text.strip()
                        break  # Exit loop if we find the location name
                    except AttributeError:
                        continue  # Try the next selector if this one fails

                try:
                    date = event.find('td', class_='dateRange__col Table__TD').text.strip()
                    if ' - ' in date:
                        # Indicates a date range
                        start_date, end_date = parse_date_range(date)
                    else:
                        start_date = convert_date(date)
                        end_date = start_date

                    event_object = {
                        'sport': sport,
                        'start_date': start_date,
                        'end_date': end_date,
                        'event_name': event_name,
                        'location': location
                    }

                    print(event_object)
                    print('-' * 40)
                    print()
                
                except AttributeError:
                    continue

scrape_upcoming_games()