from flask import Flask, render_template, request
class Temperature:
    app = Flask(__name__)

    @app.route('/temperature')
    def get_temp():
        temperature = requests.get('UNKNOWN_REPLACE.com').content
        return render_template('temp_template.html', temperature = temperature)

    if __name__ == '__main__':
        app.run(debug = True)