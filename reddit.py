import praw
import pymongo
# import time
# import os

conn = pymongo.MongoClient("mongodb://localhost:27017")
posts = conn.test.posts
posts.insert_one({
    "id": [
        "comment1",
        "c2",
        "c3"
    ]
})

def scrape():
    r = praw.Reddit(username="WebsterBot",
                    password="G*c-+#6d^8V%$_6=",
                    client_id="_fRmFVzOM5jYHQ",
                    client_secret="o_jPN2Mou9UbAJzN5I3zybCaKjo",
                    user_agent="actualsnek wtwbot test 0.0")  # , conn

    for p in r.subreddit("AskReddit").top(time_filter='day'):
        if p.score > 1000:
            print(p)
            tc = []  # top comments
            for c in p.comments:
                if type(c) == praw.models.reddit.comment.Comment and c.score > p.score/40:
                    tc.append(c.body)
            # push p: {each in tc} to database


'''
{ 
  id: [
    "comment1",
    "c2",
    "c3"
  ]
}
'''
