import praw
# import pymongo
# import time
# import os

# start mongo server: mongod --dbpath=/var/lib/mongodb
# conn = pymongo.MongoClient("mongodb://localhost:27017")
# posts = conn.test.posts

r = praw.Reddit(username="WebsterBot",
                password="G*c-+#6d^8V%$_6=",
                client_id="_fRmFVzOM5jYHQ",
                client_secret="o_jPN2Mou9UbAJzN5I3zybCaKjo",
                user_agent="actualsnek wtwbot test 0.0")  # , conn

for p in r.subreddit("AskReddit").top(time_filter='week'):
    if p.score > 3000:
        tc = []  # top comments
        for c in p.comments:
            if type(c) == praw.models.reddit.comment.Comment and c.score > p.score/4 and len(tc) < 15:
                tc.append(c.body)
        # posts.insert_one({"data": [p.id, p.title, tc]})
        print({"data": [p.id, p.title, tc]})

'''
- x of reddit
- [edited], [deleted]
- Edit:
'''
