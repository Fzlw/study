import requests

headers = {
    'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
    'Chrome/61.0.3163.100 Safari/537.36 '
}

r = requests.get('http://p1.music.126.net/ZjO_TFaksl4qjbLhqXcJzA==/109951163641657295.jpg?param=140y140', headers=headers)

print(r)
print(r.headers['content-type'])

with open('/Users/fullstack/github/study/python/spider/data.jpg', 'wb') as f:
    f.write(r.content) 