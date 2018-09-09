import os
from flask import Flask, redirect, url_for, render_template
from flaskext.mysql import MySQL

app = Flask(__name__)
app.config['MYSQL_DATABASE_HOST'] = ''
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = ''
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_DB'] = ''


mysql = MySQL()
mysql.init_app(app)

@app.route('/')
def index():
   #cur = mysql.get_db().cursor()
    #print(cur)
   return 'Hello all good'


if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=int(os.getenv('PORT')))


