# http://docs.python-requests.org/zh_CN/latest/user/quickstart.html
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import pickle

# 获取网易云音乐所有音乐列表  TODO
url = 'https://music.163.com/#/discover/playlist'

chrome_options = Options()
# 设置浏览器参数
prefs = {"profile.managed_default_content_settings.images": 2}
chrome_options.add_experimental_option('prefs', prefs)
chrome_options.add_argument('--headless')
chrome_options.add_argument('user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36"')

browser = webdriver.Chrome(chrome_options=chrome_options, executable_path='/Users/fullstack/Downloads/chromedriver')
browser.get(url)

# 音乐分类在frame[name='contentFrame']下
browser.switch_to.frame('contentFrame')
# 触发点击事件
a_cateToggleLink = browser.find_element_by_id('cateToggleLink').click()

f_cb_list = browser.find_elements_by_css_selector('#cateListBox dl.f-cb')
music_list = []
for fcb in f_cb_list:
    item = { 
        'title': '',
        'children': []
     }
    dt = fcb.find_element_by_tag_name('dt').text
    item['title'] = dt
    # 获取所有子类目
    sfc_list = fcb.find_elements_by_css_selector('a.s-fc1')
    for sfc in sfc_list:
        chil = {}
        chil['title'] = sfc.text
        chil['url'] = sfc.get_attribute('href')
        item['children'].append(chil)
    music_list.append(item)


with open('/Users/fullstack/github/study/python/spider/music', 'wb') as f:
    pickle.dump(music_list, f)

