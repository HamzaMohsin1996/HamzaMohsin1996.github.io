import json
import re
from datetime import datetime
from statistics import mean, pstdev

LOG_FILE = "events.log"
OUTPUT_FILE = "results.json"

line_pattern = re.compile(
    r"^(?P<timestamp>[\d\-T:Z]+)\s+(?P<user>U\d+)\s+(?P<etype>[A-Z]+)\s+(?P<value>-?\d+)$"
)

events = []
values = []
event_counts = {}
type_counts = {}
last_timestamp_per_user = {}
anomalies = []

# ----------- PASS 1: PARSE AND CLEAN ----------
with open(LOG_FILE, "r") as f:
    for lineno, raw_line in enumerate(f, start=1):
        line = raw_line.strip()
        match = line_pattern.match(line)

        if not match:
            continue  # malformed → skip

        ts_str = match.group("timestamp")
        user = match.group("user")
        etype = match.group("etype")
        value = int(match.group("value"))

        # Validate timestamp
        try:
            ts = datetime.fromisoformat(ts_str.replace("Z", "+00:00"))
        except Exception:
            continue

        # Check timestamp order anomaly
        if user in last_timestamp_per_user and ts < last_timestamp_per_user[user]:
            anomalies.append({
                "line_number": lineno,
                "user": user,
                "type": etype,
                "value": value,
                "reason": "timestamp_order_violation"
            })

        last_timestamp_per_user[user] = ts

        events.append((lineno, ts, user, etype, value))
        values.append(value)

        # counts
        event_counts[user] = event_counts.get(user, 0) + 1
        type_counts[etype] = type_counts.get(etype, 0) + 1

# ----------- PASS 2: OUTLIERS ----------
if len(values) >= 2:
    avg = mean(values)
    sd = pstdev(values)
    threshold = avg + 3 * sd
else:
    avg = mean(values) if values else 0
    sd = 0
    threshold = float("inf")

for lineno, ts, user, etype, value in events:
    if value > threshold:
        anomalies.append({
            "line_number": lineno,
            "user": user,
            "type": etype,
            "value": value,
            "reason": "value_outlier"
        })

# ----------- RESULTS ----------
top_users = sorted(event_counts.items(), key=lambda x: x[1], reverse=True)[:3]

result = {
    "valid_event_count": len(events),
    "top_users": top_users,
    "average_value": avg,
    "event_type_distribution": type_counts,
    "anomalies": anomalies
}

with open(OUTPUT_FILE, "w") as f:
    json.dump(result, f, indent=2)

print("results.json generated.")
