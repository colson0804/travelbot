# -*- coding: utf-8 -*-
import urllib2, json, csv, wikipedia

def getVenueID(place):
    query =  place.replace(' ', '%20')
    print query
    CLIENT_ID='DL0RYL4VDZL35BRHYATXJOY1WYISXORJJRH5XEMWYSDFP3K4'
    CLIENT_SECRET ='TYGLVONOGYMALBNK44SAW5EMSTDUEB4DCV25ZURX0EETTC0D'
    url = 'https://api.foursquare.com/v2/venues/search?client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET+'&near=chicago&query='+query+'&v=20140806&m=foursquare'
    #print url
    response = urllib2.urlopen(url);
    data = json.loads(response.read())
    a=data['response']
    b=a['venues']
    ret=[b[0]['name'].encode('ascii', 'ignore'),b[0]['id'].encode('ascii', 'ignore')]
    #print json.dumps(data[0], indent=4, sort_keys=True)
    print 'got ID '+ret[1]
    return ret
    #return data


#function to read in locations from csv return

#

def readCSVFile():
    retList=[]
    #with open('AttractionsList.csv', 'rb') as f:
    reader = csv.reader(open('AttractionsList.csv', 'rU'), dialect=csv.excel_tab)
        #reader = csv.reader(f)
    for row in reader:
        #print row
        retList.append(row)
    rList=[]
    for i in range(len(retList)):
        rList.append(retList[i][0])
    return rList
            
    
def getVenueInfo(ID):
    CLIENT_ID='DL0RYL4VDZL35BRHYATXJOY1WYISXORJJRH5XEMWYSDFP3K4'
    CLIENT_SECRET = 'TYGLVONOGYMALBNK44SAW5EMSTDUEB4DCV25ZURX0EETTC0D'
    url = 'https://api.foursquare.com/v2/venues/'+ID+'?client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET+'&v=20140806&m=foursquare'
    #print url
    response = urllib2.urlopen(url);
    data = json.loads(response.read())
    a=data['response']
    b=a['venue']
    key=b.keys()
    retList=[]
    if 'url' in key:
        retList.append(b['url'].encode('ascii', 'ignore'))
        print 'got url'
    else:
        retList.append('No Url')
        print 'no url'
    size='500x300'
    prefix='https://irs0.4sqi.net/img/general/'+size
    if 'photos' in key:
        p=b['photos']
        p=p['groups']
        p=p[0]
        p=p['items']
        p=p[0]
        retList.append(prefix+p['suffix'].encode('ascii', 'ignore'))
        print 'got photo'
    else:
        retList.append('No Pic')
        print 'no pic found'
    return retList

def getDescription(name):
    try:
        d=wikipedia.summary('cuvee chicago',sentences=5)
    except:
        d='No Description'
        #print "exception happened!"
    return d
    

def VenueInfo():
    venueNames = readCSVFile()
    retList=[]
    for name in venueNames:
        d={}
        try:
            ID=getVenueID(name)
            d['name']=ID[0]
        except:
            print 'problem with ID for '+name
        try:
            info = getVenueInfo(ID[1])
            d['url']=info[0]
            d['picture']=info[1]
            descrip = getDescription(name)
            d['description']= descrip
        except:
            print 'problem with info for '+name
        retList.append(d)
    return retList
        
        
        
