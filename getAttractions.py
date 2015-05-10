from bs4 import BeautifulSoup
import urllib2
import requests

def getAttractions(pg):
    url = 'http://www.tripadvisor.com/Attractions-g35805-Activities-oa'+str(pg)+'-Chicago_Illinois.html'
    content = urllib2.urlopen(url).read()
    soup = BeautifulSoup(content)
    attractionsBox =  soup.find('div',attrs={'id':'FILTERED_LIST'})
    picLinks = attractionsBox.find_all('a', attrs={'class':'photo_link'})
    attractionsList = attractionsBox.find_all('div', attrs={'class':'property_title'})
    returnInfo=[]

    for attractNum in range(len(attractionsList)):
        d={}
        name = attractionsList[attractNum].find('a')
        u = name.get('href')
        descrip = getDescription('http://www.tripadvisor.com'+u)
        img = picLinks[attractNum].find('img').get('src')
        #print img
        n = name.text
        #print n
        d['attractionName'] = n.encode('ascii', 'ignore')
        d['imageLink'] = img
        d['description'] = descrip
        returnInfo.append(d)
    return returnInfo
        
def GetListAttractions():
    al=[]
    for i in range(5):
        pg = i * 30
        a = getAttractions(pg)
        al=al+a
    return al

def getDescription(url):
    content = urllib2.urlopen(url).read()
    soup = BeautifulSoup(content)
    infoBox = soup.find('div', attrs={'class':'above_the_fold_container scroll_tabs'})
    c = infoBox.find('div', attrs={'class':'listing_details'})
    descript = c.text
    description = descript.encode('ascii', 'ignore')
    description = description.replace('\n','')
    return description
    
