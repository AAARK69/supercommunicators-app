import json
from pathlib import Path

seed_file = Path("/Users/rohankosur/Documents/GithubProjects/supercommunicators-app/src/data/scenarios_seed.json")

with open(seed_file, "r", encoding="utf-8") as f:
    scenarios = json.load(f)

for scenario in scenarios:
    raw_options = scenario.get("options", [])
    formatted_options = []
    
    for opt in raw_options:
        if isinstance(opt, dict):
            # Already a dict
            formatted_options.append({
                "id": opt.get("id", "A"),
                "text": opt.get("text", ""),
                "is_correct": opt.get("is_correct", False),
                "response_type": opt.get("response_type", "Emotional"),
                "feedback": opt.get("feedback", "")
            })
        elif isinstance(opt, (list, tuple)) and len(opt) >= 5:
            # Convert list/tuple to dict
            formatted_options.append({
                "id": str(opt[0]),
                "text": str(opt[1]),
                "is_correct": bool(opt[2]),
                "response_type": str(opt[3]),
                "feedback": str(opt[4])
            })
    
    scenario["options"] = formatted_options

with open(seed_file, "w", encoding="utf-8") as f:
    json.dump(scenarios, f, indent=2)

print(f"Successfully converted option structures for {len(scenarios)} scenarios!")
