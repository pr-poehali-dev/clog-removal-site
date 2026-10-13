import json
import os
import smtplib
from email.mime.text import MIMEText

import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token, X-Session-Id',
    'Access-Control-Max-Age': '86400',
}

TO_EMAIL = 'zasor27@gmail.com'


def resp(status: int, data: dict) -> dict:
    return {
        'statusCode': status,
        'headers': {**CORS, 'Content-Type': 'application/json'},
        'body': json.dumps(data, ensure_ascii=False),
    }


def send_email(name: str, phone: str, message: str) -> None:
    password = os.environ.get('SMTP_PASSWORD')
    if not password:
        return
    body = f'Новая заявка с сайта Засор 27\n\nИмя: {name}\nТелефон: {phone}\nСообщение: {message or "—"}'
    msg = MIMEText(body, 'plain', 'utf-8')
    msg['Subject'] = f'Новая заявка: {name}, {phone}'
    msg['From'] = TO_EMAIL
    msg['To'] = TO_EMAIL
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=4) as server:
        server.login(TO_EMAIL, password)
        server.send_message(msg)


def handler(event: dict, context) -> dict:
    """Приём заявки с сайта: сохраняет в базу данных и отправляет на почту владельца."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}
    if event.get('httpMethod') != 'POST':
        return resp(405, {'error': 'Method not allowed'})

    data = json.loads(event.get('body') or '{}')
    name = str(data.get('name', '')).strip()[:200]
    phone = str(data.get('phone', '')).strip()[:50]
    message = str(data.get('message', '')).strip()[:2000]
    consent = data.get('consent') is True

    if not name or not phone:
        return resp(400, {'error': 'Укажите имя и телефон'})
    if not consent:
        return resp(400, {'error': 'Требуется согласие на обработку персональных данных'})

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.leads (name, phone, message, consent) VALUES (%s, %s, %s, TRUE) RETURNING id",
        (name, phone, message),
    )
    lead_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    email_sent = False
    try:
        send_email(name, phone, message)
        email_sent = bool(os.environ.get('SMTP_PASSWORD'))
    except Exception as e:
        print(f'email error: {e}')

    return resp(200, {'ok': True, 'id': lead_id, 'email_sent': email_sent})
