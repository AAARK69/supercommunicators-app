import json
import uuid
from pathlib import Path

seed_file = Path("/Users/rohankosur/Documents/GithubProjects/supercommunicators-app/src/data/scenarios_seed.json")

with open(seed_file, "r", encoding="utf-8") as f:
    data = json.load(f)

fixed_data = []
for item in data:
    conv_type = item.get("conversation_type") or item.get("type") or "Emotional"
    takeaway = item.get("core_takeaway") or item.get("takeaway") or "Match conversation state before shifting."
    scen_id = item.get("scenario_id") or str(uuid.uuid4())
    diff_lvl = item.get("difficulty_level") or 3

    fixed_item = {
        "scenario_id": scen_id,
        "channel": item.get("channel", "Slack"),
        "conversation_type": conv_type,
        "difficulty_level": diff_lvl,
        "context": item.get("context", ""),
        "prompt": item.get("prompt", "How do you respond to MATCH their conversation state?"),
        "options": item.get("options", []),
        "core_takeaway": takeaway
    }
    fixed_data.append(fixed_item)

with open(seed_file, "w", encoding="utf-8") as f:
    json.dump(fixed_data, f, indent=2)

print(f"Successfully fixed schema keys for all {len(fixed_data)} scenarios!")
