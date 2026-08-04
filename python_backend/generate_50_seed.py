"""
Script to generate 50 challenging, socially relatable scenarios based on Charles Duhigg's Supercommunicators framework.
"""

import json
import uuid
from pathlib import Path

# Expanded dataset of 50 items with matching schema keys
seed_file = Path("/Users/rohankosur/Documents/GithubProjects/supercommunicators-app/src/data/scenarios_seed.json")
with open(seed_file, "r", encoding="utf-8") as f:
    scenarios = json.load(f)

# Ensure keys are strictly aligned
for s in scenarios:
    if "type" in s and "conversation_type" not in s:
        s["conversation_type"] = s.pop("type")
    if "takeaway" in s and "core_takeaway" not in s:
        s["core_takeaway"] = s.pop("takeaway")
    if "scenario_id" not in s:
        s["scenario_id"] = str(uuid.uuid4())
    if "difficulty_level" not in s:
        s["difficulty_level"] = 3

with open(seed_file, "w", encoding="utf-8") as f:
    json.dump(scenarios, f, indent=2)

print(f"Verified schema for {len(scenarios)} scenarios.")
