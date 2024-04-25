import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from settings import APP_PASSWORD, STATIC_FOLDER, SENDER, RECIPIENTS
import os


def send_email(subject, body, user_id):
    msg = MIMEMultipart()
    msg.attach(MIMEText(body))

    file_path = os.path.join(STATIC_FOLDER, user_id, "Musterlebenslauf.pdf")
    part = MIMEBase('application', "octet-stream")
    with open(file_path, 'rb') as file:
        part.set_payload(file.read())
    encoders.encode_base64(part)
    part.add_header(
        'Content-Disposition',
        'attachment; filename="Lebenslauf.pdf"'
    )
    msg.attach(part)
        
    msg['Subject'] = subject
    msg['From'] = SENDER
    msg['To'] = ', '.join(RECIPIENTS)
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login(SENDER, APP_PASSWORD)
       smtp_server.sendmail(SENDER, RECIPIENTS, msg.as_string())
    print("Message sent!")