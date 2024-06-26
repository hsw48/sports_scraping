import requests
from bs4 import BeautifulSoup

# Initial implementation of a script to get upcoming games for different leagues
# Ended up not being relevant to the project, but didn't seem worth it to delete it.
# Takes 3 leagues (MLB, Soccer, WNBA) and prints relevant info about each game to the console

# Function to scrape and print upcoming games
def scrape_upcoming_games():
    # Headers needed to bypass ESPN blocking script access
    headers = {
        'User-Agent': 'Mozilla/5.0'
    }

    leagues = ['mlb', 'soccer', 'wnba']
    dates = ['20240627', '20240628', '20240629', '20240630', '20240701', '20240702', '20240703']

    # URL for ESPN's upcoming events
    for league in leagues:
        for date in dates:
            url = 'https://www.espn.com/' + league + '/schedule/_/date/' + date
            print(url)

            # Send a request to the website
            response = requests.get(url, headers=headers)
            response.raise_for_status()  # Check that the request was successful

            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            #List to store the rows 
            games = []
            #Collect all the tables
            tables = soup.find_all('table', 'Table')
            for table in tables:
                rows = table.find_all('tr')
                #rows = iter(rows)
                row_item = []
                game_object = {}
                for row in rows:
                    #Collect all 'td' elements from the 'row' & append them to a list 'row_item'
                    data_items = row.find_all('td')
                    for data_item in data_items: 
                        #Remove special characters assosicated with logos, @, and v
                        #And add all data to row_item array
                        s = data_item.text
                        s = s.replace('@', '').strip()
                        s = s.replace('v ', '').strip()
                        row_item.append(s)
            
                    for item in row_item:
                        #Take data from row item and create event object
                        if league == 'soccer':
                            #Data is slightly different depending on sport
                            home_team = row_item[0]
                            away_team = row_item[1]
                            time = row_item[2]
                            network = row_item[3]
                            location = row_item[4]
                            game_object = {'leauge': league, 'home_team': home_team, 'away_team': away_team, 'time': time, 'network': network, 'location': location, 'date': date}
                        elif league == 'mlb':
                            away_team = row_item[0]
                            home_team = row_item[1]
                            time = row_item[2]
                            network = row_item[3]
                            pitching_matchup = row_item[4]
                            game_object = {'league': league, 'away_team': away_team, 'home_team': home_team, 'time': time, 'network': network, 'pitching_matchup': pitching_matchup, 'date': date}
                        else:
                            away_team = row_item[0]
                            home_team = row_item[1]
                            time = row_item[2]
                            network = row_item[3]
                            game_object = {'league': league, 'away_team': away_team, 'home_team': home_team, 'time': time, 'network': network, 'date': date}

                    games.append(game_object)
                    row_item = []

            for game in games:
                print()
                print(game)

scrape_upcoming_games()