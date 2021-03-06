# Written by Mottel Zirkind
# February 9, 2019
# A simple program that runs in terminal and reads the card number of things scanned with a card reader.

import requests  # Used to make the HTTP request
import getch  # Used to read in chars as they appear
import re  # Used for some very basic pattern matching

card_number = '' # The card number we want to read

while True:  # Run forever
    
    # getche() will also print it to screen.
    # getch() will just read it in.
    next_char = getch.getche()
    
    # The expected pattern is ;123456789?
    # If the end character changes, change it here.
    if next_char == '?':
        # Make sure the URL here matches whatever port number the web app is using.
        url = 'http://localhost:3000/checkin?card_number=' + card_number
        response = requests.get(url)
        print(response.text)
        card_number = ''
    # If card numbers are changed to add something like a dash, update the pattern here.
    elif re.match('[0-9]', next_char):
        card_number += next_char
    # If the start of the pattern changes, update the character here.
    elif next_char == ';':
        card_number = ''
    
    # else:
        # print("Something went wrong. Please scan your card again.")

