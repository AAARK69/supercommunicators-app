import uuid
from typing import List, Literal, Optional
from pydantic import BaseModel, Field


class Option(BaseModel):
    id: Literal["A", "B", "C", "D"]
    text: str
    is_correct: bool
    response_type: Literal["Practical", "Emotional", "Social", "Mismatch"]
    feedback: str


class ScenarioSchema(BaseModel):
    scenario_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    channel: Literal["iMessage", "Slack", "Zoom", "In-Person"]
    conversation_type: Literal["Practical", "Emotional", "Social"]
    difficulty_level: Literal[1, 2, 3]
    context: str
    prompt: str
    options: List[Option]
    core_takeaway: str


class ResearchBlueprint(BaseModel):
    research_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    topic: str
    target_state: Literal["Practical", "Emotional", "Social"]
    channel: Literal["iMessage", "Slack", "Zoom", "In-Person"]
    underlying_conflict: str
    hidden_subtext_cues: List[str]
    suggested_trap_type: Literal[
        "Toxic Positivity", "Unsolicited Optimization", "Practical Overreach", "Social Misalignment"
    ]
    research_notes: str


class AuditResult(BaseModel):
    status: Literal["APPROVED", "REJECTED"]
    explanation: str
    flaws_detected: List[str] = Field(default_factory=list)
    corrected_scenario: Optional[str] = None
