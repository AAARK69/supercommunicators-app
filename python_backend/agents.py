"""
4-Agent Pipeline Orchestration using Google Antigravity SDK.

Pipeline Flow:
Agent 0 (DuhiggResearchBot) -> Agent A (ScenarioGenerator) -> Agent B (DuhiggAuditor) -> Agent C (SchemaFormatter)
"""

import asyncio
import json
import logging
import sys
from pathlib import Path
from typing import Any, Dict, Optional

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


async def run_full_4agent_pipeline(
    topic: str = "Managing team burnout and sudden deadline shifts",
    conversation_type: str = "Emotional",
    channel: str = "Slack",
    max_audit_retries: int = 3,
) -> Dict[str, Any]:
    """Executes the full 4-agent generation workflow.

    Step 0: Agent 0 (DuhiggResearchBot) researches hidden subtext and blueprints
    scenarios. Step 1: Agent A (ScenarioGenerator) writes dialogue & MCQs. Step
    2: Agent B (DuhiggAuditor) audits scenario against Duhigg principles. Step
    3: Agent C (SchemaFormatter) serializes approved draft into Pydantic JSON.
    """

    # ----------------------------------------------------
    # Step 0: Agent 0 - DuhiggResearchBot
    # ----------------------------------------------------
    logging.info("🔬 [Agent 0: DuhiggResearchBot] Researching subtext & creating blueprint...")
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

    logging.info(f"📊 [Agent 0] Research Blueprint Created for topic: {topic}")

    # ----------------------------------------------------
    # Step 1: Agent A - ScenarioGenerator
    # ----------------------------------------------------
    logging.info("🚀 [Agent A: ScenarioGenerator] Generating draft scenario...")
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

    logging.info("📄 [Agent A] Scenario draft generated.")

    # ----------------------------------------------------
    # Step 2: Agent B - DuhiggAuditor
    # ----------------------------------------------------
    logging.info("🔍 [Agent B: DuhiggAuditor] Auditing draft scenario...")
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
            logging.warning(f"⚠️ [Agent B] REJECTED on pass {attempt}.")
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
    # Step 3: Agent C - SchemaFormatter
    # ----------------------------------------------------
    logging.info("📦 [Agent C: SchemaFormatter] Structuring into Pydantic JSON...")
    formatter_config = LocalAgentConfig(
        system_instructions=SYSTEM_PROMPT_FORMATTER,
        response_schema=ScenarioSchema,
    )

    format_prompt = f"Convert this approved scenario text into valid JSON:\n\n{approved_text}"

    async with Agent(config=formatter_config) as agent_c:
        format_response = await agent_c.chat(format_prompt)
        final_json = await format_response.structured_output()

    logging.info("✨ [Agent C] Complete 4-agent execution finished!")
    return {
        "blueprint": blueprint_data,
        "scenario": final_json
    }


async def main():
    result = await run_full_4agent_pipeline()
    print("\n" + "=" * 50)
    print("4-AGENT PIPELINE EXECUTION SUMMARY")
    print("=" * 50)
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
