from app import init_app
import logging


logging.basicConfig(level=logging.DEBUG)

app = init_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)