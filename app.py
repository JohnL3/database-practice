import os
from flask import Flask, redirect, url_for, render_template
from flaskext.mysql import MySQL
import config

app = Flask(__name__)
app.config['MYSQL_DATABASE_HOST'] = config.DB_CONFIG['host']
app.config['MYSQL_DATABASE_PORT'] = 3306
app.config['MYSQL_DATABASE_USER'] = config.DB_CONFIG['user']
app.config['MYSQL_DATABASE_PASSWORD'] = config.DB_CONFIG['password']
app.config['MYSQL_DATABASE_DB'] = config.DB_CONFIG['db']


mysql = MySQL()
mysql.init_app(app)

@app.route('/')
def index():
   cur = mysql.get_db().cursor()
   print(cur)
   return 'Hello all good'


if __name__ == '__main__':
    app.run(host=os.getenv('IP'), port=int(os.getenv('PORT')))


