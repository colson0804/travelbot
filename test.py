# -*- coding: utf-8 -*-
import urllib2, json, csv, wikipedia, pymongo, simplejson, pickle, ssl
from random import randint
from pymongo import MongoClient

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
    #f = open('AttractionsList.csv', 'rU')
    reader = csv.reader(open('AttractionsList.csv', 'rU'), dialect=csv.excel_tab)
    #reader = csv.reader(f)
    rList=[]
    for row in reader:
        #print row
        r = row[0].split(',')
        name = r[0]
        iconic = r[1]
        tags = r[2:5]
        timeTags = r[5:7]
        description = r[7].replace('"','')
        ret = [name, iconic, tags, timeTags, description]
        rList.append(ret)
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

def populateDatabase(venueList):
   # # Connect to running mongodb database
   # client = pymongo.MongoClient()
   # db = client['travelbot-dev']
   # places = db.places
   # places.remove({})
   # places.insert(venueList)

   # #close connection
   # client.close()

   connection = pymongo.MongoClient("ds041032.mongolab.com", 41032)
   db = connection['travelbot']
   places = db.places
   places.remove({})
   places.insert(venueList)

   connection.close()

def VenueInfo():
    try:
        tempf = open('ListOfDictionaries.txt','rb')
        tempu = pickle.Unpickler(tempf)
        retList = tempu.load()
        tempf.close()
    except:
        venueNamesTags = readCSVFile()
        inc = 0
        retList=[]
        for i in range(len(venueNamesTags)):
            d={}

            iconic=venueNamesTags[i][1]
            if iconic == 'Iconic':
                d['iconic'] = 1
            else:
                d['iconic'] = 0
                
            d['tags']=venueNamesTags[i][2]
            
            d['TimeTags']=venueNamesTags[i][3]
            d['description']=venueNamesTags[i][4]
            name = venueNamesTags[i][0]
            d['name'] = name
            try:
                # Get ID from Foursquare
                ID=getVenueID(name)
                #d['name']=ID[0]
            except:
                print 'problem with ID for '+ name
                print 'getting google img for ' +name
                img = googleImageSearch(name, inc)
                inc+=1
                d['img']=img
                saveImage(img,name)
            try:
                info = getVenueInfo(ID[1])
                d['url']=info[0]
                d['img']=info[1]
                saveImage(info[1],name)
            except:
                print 'problem with info for '+ name
                img = googleImageSearch(name, inc)
                inc+=1
                d['img']=img
                print img
                saveImage(img,name)
            retList.append(d)
        pickle.dump(retList,open('ListOfDictionaries.txt','wb'))
    return retList

def googleImageSearch(query, num=0):
    query=query.replace(' ','+')+'+chicago'
    #print query
    i = str(num)
    url = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+query+'&start='+i+'&userip=MyIP'
    print url
    request = urllib2.Request(url,None,{'Referer':'testing'})
    response = urllib2.urlopen(request)
    results = simplejson.load(response)
    a=results['responseData']
    b=a['results']
    imageUrl=b[0]["unescapedUrl"]
    return imageUrl
    
def saveImage(url, name):
    context = ssl._create_unverified_context()
    req = urllib2.Request(url, headers={'User-Agent' : "Magic Browser"})
    im=urllib2.urlopen(req, context=context)
    fil=open('client/assets/images/'+name, 'w')
    fil.write(im.read())

    

if __name__ == "__main__":
  venueList = VenueInfo()
  populateDatabase(venueList)
  print venueList   
       
       
       
