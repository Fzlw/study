from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException
import pickle
from urllib import parse
import time
from random import randrange


class MusicList163():
    result = []

    def __init__(self, urlList=[]):
        chrome = Options()
        prefs = {"profile.managed_default_content_settings.images": 2}
        chrome.add_experimental_option('prefs', prefs)
        # chrome.add_argument('--headless')
        chrome.add_argument(
            'user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) \
            AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 \
            Safari/537.36"')
        self.driver = webdriver.Chrome(
            chrome_options=chrome,
            executable_path='/Users/fullstack/Downloads/chromedriver')
        self.trans_data(urlList)

    def trans_data(self, urllist):
        loads = set()

        def trans(urllist):
            for l in urllist:
                if l.get('url') and len(l['url']) > 0:
                    loads.add(l['url'])
                if l.get('children') and len(l.get('children', [])) > 0:
                    trans(l['children'])

        trans(urllist)
        self.loads = loads

    def start(self):
        driver = self.driver
        first = self.loads.pop()
        driver.get(first)

        for i in range(2):
            # try:
            #     url = self.loads.pop()
            # except KeyError:
            #     print('没有爬取的url')
            #     self.save()
            #     break
            url = self.loads.pop()
            js = f'window.open("{url}");'
            driver.execute_script(js)
            handle = driver.current_window_handle
            self.load(handle)
            if i == 1:
                print('ok')
                self.save()

    # 接受窗口句柄
    def load(self, handle):
        item = []
        driver = self.driver
        driver.switch_to.window(handle)
        driver.switch_to.frame('contentFrame')
        # try:
        #     ul = driver.find_element_by_id('m-pl-containeroi')
        # except NoSuchElementException as msg:
        #     with open('/Users/fullstack/github/study/python/spider/log.txt', 'w') as f:
        #         f.write('查找元素异常')
        ul = driver.find_element_by_id('m-pl-container')
        lis = ul.find_elements_by_tag_name('li')
        for li in lis:
            imgUrl = li.find_element_by_css_selector('div>img.j-flag').get_attribute('src')
            count = li.find_element_by_css_selector('div.bottom span.nb').text
            a = li.find_element_by_css_selector('p.dec>a.tit')
            by = li.find_element_by_css_selector('p>a.nm')
            li_info = {
                'title': a.get_attribute('title'),
                'url': a.get_attribute('href'),
                'imgUrl': imgUrl,
                'count': count,
                'by': by.text,
                'byLink': by.get_attribute('href')
            }
            item.append(li_info)
        d = {}
        url = parse.quote_plus(driver.current_url)
        d[url] = item
        MusicList163.result.append(d)
        # 随机停止一段时间
        time.sleep(randrange(3, 5))

    def save(self):
        with open('/Users/fullstack/github/study/python/spider/data', 'wb') as f:
            pickle.dump(MusicList163.result, f)


if __name__ == "__main__":
    with open('/Users/fullstack/github/study/python/spider/music', 'rb') as f:
        data = pickle.load(f)
        music = MusicList163(data)
        music.start()