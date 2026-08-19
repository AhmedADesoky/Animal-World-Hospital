import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()
conn = psycopg2.connect(os.environ["DATABASE_URL"])
conn.autocommit = True
sql = open("sql/schema.sql", encoding="utf-8").read()
with conn.cursor() as cur:
    cur.execute(sql)
print("Schema applied successfully.")
conn.close()
