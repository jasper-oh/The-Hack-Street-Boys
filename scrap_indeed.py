from selenium import webdriver
import requests
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from fake_useragent import UserAgent
from selenium.webdriver.chrome.options import Options




def extract_job(job):
    name = job.find("span")['title']
    url = "https://ca.indeed.com/viewjob?jk=" + job.find("a")['data-jk']
    website = "Indeed"
    comapany = job.find("span" , {"class" : "companyName"} ).text
    return {
        "name" : name,
        "company" : comapany,
        "url" : url,
        "website" : website
    }

def get_jobs(lang_name):
    jobs = []

    options = Options()
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    browser = webdriver.Chrome(options=options)
    browser.execute_script('window.focus();')
    URL = f'https://ca.indeed.com/jobs?q={lang_name}&l=Vancouver'
    browser.get(URL)
    soup = BeautifulSoup(browser.page_source, "html.parser")
    job_collect = soup.find_all("td",{"class":"resultContent"})
    

    for job in job_collect:
        job_info = extract_job(job)
        jobs.append(job_info)
    return jobs
        
        

        
        


