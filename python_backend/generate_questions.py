"""
Antigravity Native Question Generation Pipeline

Runs the 4-agent workflow directly in Antigravity to generate high-stakes
Duhigg scenarios and seed them into the MCQ quiz database (scenarios_seed.json).
"""

import asyncio
import json
import logging
import sys
from pathlib import Path
from typing import Any, Dict, List, Optional

from google.antigravity import Agent, LocalAgentConfig

from prompts import (
    SYSTEM_PROMPT_AUDITOR,
    SYSTEM_PROMPT_FORMATTER,
    SYSTEM_PROMPT_GENERATOR,
    SYSTEM_PROMPT_RESEARCH_BOT,
)
from schema import ResearchBlueprint, ScenarioSchema

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)

SEED_FILE_PATH = Path(__file__).parent.parent / "src" / "data" / "scenarios_seed.json"


async def generate_single_scenario(
    topic: str,
    conversation_type: str = "Emotional",
    channel: str = "Slack",
    max_audit_retries: int = 3,
) -> Dict[str, Any]:
    """Runs the 4-agent pipeline for a single scenario topic."""
    
    # ----------------------------------------------------
    # Agent 0: DuhiggResearchBot
    # ----------------------------------------------------
    logging.info(f"🔬 [Agent 0: DuhiggResearchBot] Researching subtext for '{topic}'...")
    researcher_config = LocalAgentConfig(
        system_instructions=SYSTEM_PROMPT_RESEARCH_BOT,
        response_schema=ResearchBlueprint,
    )

    research_request = (
        f"Research topic: {topic}\n"
        f"Target Conversation State: {conversation_type}\n"
        f"Target Channel: {channel}"
    )

    async with Agent(config=researcher_config) as agent_0:
        res_response = await agent_0.chat(research_request)
        blueprint_data = await res_response.structured_output()

    logging.info("📊 [Agent 0] Blueprint created successfully.")

    # ----------------------------------------------------
    # Agent A: ScenarioGenerator
    # ----------------------------------------------------
    logging.info("🚀 [Agent A: ScenarioGenerator] Writing dialogue & MCQs...")
    generator_config = LocalAgentConfig(
        system_instructions=SYSTEM_PROMPT_GENERATOR
    )

    gen_prompt = (
        f"Generate a scenario based on this research blueprint:\n\n"
        f"{json.dumps(blueprint_data, indent=2)}"
    )

    async with Agent(config=generator_config) as agent_a:
        gen_response = await agent_a.chat(gen_prompt)
        draft_scenario = await gen_response.text()

    logging.info("📄 [Agent A] Draft scenario written.")

    # ----------------------------------------------------
    # Agent B: DuhiggAuditor
    # ----------------------------------------------------
    logging.info("🔍 [Agent B: DuhiggAuditor] Auditing scenario...")
    auditor_config = LocalAgentConfig(
        system_instructions=SYSTEM_PROMPT_AUDITOR
    )

    current_draft = draft_scenario
    approved_text = None

    for attempt in range(1, max_audit_retries + 1):
        logging.info(f"  Audit Pass {attempt}/{max_audit_retries}...")
        audit_prompt = f"Audit the following scenario draft:\n\n{current_draft}"

        async with Agent(config=auditor_config) as agent_b:
            audit_response = await agent_b.chat(audit_prompt)
            audit_result = await audit_response.text()

        if "STATUS: APPROVED" in audit_result:
            logging.info("✅ [Agent B] Approved without flaws!")
            approved_text = current_draft
            break
        elif "STATUS: REJECTED" in audit_result:
            logging.warning(f"⚠️ [Agent B] REJECTED on pass {attempt}. Using corrected draft.")
            approved_text = audit_result
            current_draft = audit_result
        else:
            if "APPROVED" in audit_result.upper():
                logging.info("✅ [Agent B] Approved.")
                approved_text = current_draft
                break
            current_draft = audit_result

    if not approved_text:
        approved_text = current_draft

    # ----------------------------------------------------
    # Agent C: SchemaFormatter
    # ----------------------------------------------------
    logging.info("📦 [Agent C: SchemaFormatter] Serializing into validated Pydantic JSON...")
    formatter_config = LocalAgentConfig(
        system_instructions=SYSTEM_PROMPT_FORMATTER,
        response_schema=ScenarioSchema,
    )

    format_prompt = f"Convert this approved scenario text into valid JSON:\n\n{approved_text}"

    async with Agent(config=formatter_config) as agent_c:
        format_response = await agent_c.chat(format_prompt)
        final_json = await format_response.structured_output()

    logging.info("✨ [Agent C] Scenario serialization complete!")
    return final_json


def save_scenario_to_seed_file(new_scenario: Dict[str, Any]):
    """Appends newly generated scenario to the seed JSON file."""
    existing_scenarios = []
    if SEED_FILE_PATH.exists():
        with open(SEED_FILE_PATH, "r", encoding="utf-8") as f:
            try:
                existing_scenarios = json.load(f)
            except Exception:
                existing_scenarios = []

    existing_scenarios.append(new_scenario)

    with open(SEED_FILE_PATH, "w", encoding="utf-8") as f:
        json.dump(existing_scenarios, f, indent=2)

    logging.info(f"🎉 Saved new scenario (ID: {new_scenario.get('scenario_id')}) to {SEED_FILE_PATH}")


async def main():
    if len(sys.argv) > 1:
        topic = " ".join(sys.argv[1:])
    else:
        topic = "Navigating unexpected executive budget cuts during product launch"

    scenario = await generate_single_scenario(topic=topic)
    save_scenario_to_seed_file(scenario)


if __name__ == "__main__":
    asyncio.run(main())
