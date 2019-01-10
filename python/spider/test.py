# http://docs.python-requests.org/zh_CN/latest/user/quickstart.html
import requests
from selenium import webdriver
from bs4 import BeautifulSoup


# 获取网易云音乐所有音乐列表  TODO
url = 'https://music.163.com/#/discover/playlist'
executable_path = '/Users/fullstack/phantomjs-2.1.1-macosx/bin/phantomjs'
driver = webdriver.PhantomJS(executable_path)
driver.get(url)

# with open('/Users/fullstack/github/study/python/spider/data.html', 'w') as f:
#     f.write(driver.page_source)
#     driver.quit()

# soup = BeautifulSoup(driver.page_source, 'html.parser')
# driver.find_element_by_id('cateToggleLink').click()

# cateListBox = soup.find(id='cateListBox')


with open('/Users/fullstack/github/study/python/spider/data.html', 'w') as f:
    f.write(driver.page_source)