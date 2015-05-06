from bs4 import BeautifulSoup
import urllib2
import requests

def getAttractions(pg):
    url = 'http://www.tripadvisor.com/Attractions-g35805-Activities-oa'+str(pg)+'-Chicago_Illinois.html'
    content = urllib2.urlopen(url).read()
    soup = BeautifulSoup(content)
    attractionsBox =  soup.find('div',attrs={'id':'FILTERED_LIST'})
    attractionsList = attractionsBox.find_all('div', attrs={'class':'property_title'})
    returnAttractionList=[]
    for attract in attractionsList:
        name = attract.find('a')
        n = name.text
        #print n
        returnAttractionList.append(n.encode('ascii', 'ignore'))
    return returnAttractionList
        
def GetListAttractions():
    al=[]
    for i in range(5):
        pg = i * 30
        a = getAttractions(pg)
        al=al+a
    return al
