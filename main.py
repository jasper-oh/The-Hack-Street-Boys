from flask import Flask, request, render_template, redirect, send_file
from scrap_indeed import get_jobs as get_indeed
from scrap_wework import get_jobs as get_wework
from scrap_remoteok import get_jobs as get_remoteok
from exporter import save_to_file

app = Flask("Reddit-Reader")

db = {}

# footer and navbar
@app.route("/footer")
def footer():
    return render_template('footer.html')

@app.route("/navbar")
def navbar():
    return render_template('navbar.html')
# footer and navbar end

@app.route("/")
def home_page():
    return render_template("index.html")

@app.route("/aboutus")
def about_us():
    return render_template("aboutus.html")

@app.route("/help")
def help():
    return render_template("help.html")


@app.route("/resumeroaster")
def resume_roaster():
    return render_template("resumeroaster.html")


@app.route("/checkjob")
def check_job():
    return render_template("checkjob.html")

@app.route("/lang_search")
def search_result():
    lang_name = request.args.get("lang_name")
    if lang_name:
        lang_name = lang_name.lower()
        past_search = db.get(lang_name)
        if past_search:
            jobs = db[lang_name]
        else:                    
            jobs = get_indeed(lang_name) + get_wework(lang_name) + get_remoteok(lang_name)
            db[lang_name] = jobs
        result_value = len(jobs)
    else:
        return redirect("/checkjob")
    return render_template("result.html", lang_name=lang_name, jobs=jobs, result_value=result_value)


@app.route("/download")
def save_as():
    try:
        lang_name = request.args.get("keyword")
        print(lang_name)
        if not lang_name:
            raise Exception()
        lang_name = lang_name.lower()
        jobs = db.get(lang_name)
        if not jobs:            
            raise Exception()
        save_to_file(jobs)
        return send_file('jobs.csv')
    except:
        print("Some error occured")
        return redirect("/")


app.run(host="0.0.0.0" , port=8003)
