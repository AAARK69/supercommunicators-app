"""
Script to generate 50 natural, authentic, 2020s Supercommunicator scenarios.
Removes robotic clinical/therapist phrasing ('What I am hearing is...') and replaces
it with 100% natural, high-empathy human dialogue.
"""

import json
import uuid
from pathlib import Path

scenarios = []

natural_scenarios = [
    {
        "channel": "Slack",
        "conversation_type": "Emotional",
        "context": "In #dev-lounge at 7:30 PM, Marcus posts: 'Just spent 4 hours adjusting padding based on stakeholder feedback, only for them to ask why we aren't using the v1 layout from last month. I feel like my work here is completely invisible.'",
        "prompt": "How do you respond to Marcus to MATCH his current conversation state?",
        "options": [
            {
                "id": "A",
                "text": "Ugh, spending 4 hours on revisions just to have them pivot right back to v1 is the absolute worst. That sounds so exhausting and demoralizing. Is that how it feels?",
                "is_correct": True,
                "response_type": "Emotional",
                "feedback": "CORRECT (Natural Emotional Match + Looping): Validates his exhaustion naturally and asks a confirmation question without sounding like a textbook therapy bot."
            },
            {
                "id": "B",
                "text": "You should set up a Figma version history log so stakeholders can see the exact timeline of changes.",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Unsolicited Optimization): Giving Figma workflow tips when someone feels invisible misses their emotional state."
            },
            {
                "id": "C",
                "text": "Don't worry Marcus! Design is always subjective, tomorrow they will love it! 🎨✨",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Toxic Positivity): Brushing off his exhaustion with forced optimism invalidates his experience."
            },
            {
                "id": "D",
                "text": "Send me the Figma link and I will revert the artboard to v1 right now.",
                "is_correct": False,
                "response_type": "Practical",
                "feedback": "MISMATCH (Practical Overreach): Solves the file state without connecting with the human."
            }
        ],
        "core_takeaway": "Validate emotional exhaustion naturally before offering workflow fixes or file tweaks."
    },
    {
        "channel": "In-Person",
        "conversation_type": "Emotional",
        "context": "In a 1-on-1 coffee chat, your direct report Maya leans back and sighs: 'I've worked 60-hour weeks for 3 months straight, but in our calibration call my manager said I need to improve my executive presence. I feel like nothing I do is ever enough.'",
        "prompt": "Which response best MATCHES Maya's state using natural active listening?",
        "options": [
            {
                "id": "A",
                "text": "Man, pouring your absolute max energy into work and then getting hit with vague feedback feels like such a punch in the gut. Does that capture how you're feeling?",
                "is_correct": True,
                "response_type": "Emotional",
                "feedback": "CORRECT (Natural Emotional Match): Speaks naturally while summarizing her emotional core and asking for confirmation."
            },
            {
                "id": "B",
                "text": "You should take a public speaking course on LinkedIn Learning to boost your executive presence score.",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Unsolicited Optimization): Giving course recommendations invalidates her emotional hurt."
            },
            {
                "id": "C",
                "text": "Managers are under a lot of pressure right now, try not to take it personally!",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Defense / Toxic Positivity): Defending management shuts down open vulnerability."
            },
            {
                "id": "D",
                "text": "Let's review your slide deck format to make sure your presentation fonts look executive.",
                "is_correct": False,
                "response_type": "Practical",
                "feedback": "MISMATCH (Practical Overreach): Focusing on fonts when someone feels inadequate."
            }
        ],
        "core_takeaway": "Reflect emotional pain in natural language before offering performance advice."
    },
    {
        "channel": "iMessage",
        "conversation_type": "Social",
        "context": "Work friend Sarah texts: 'Hey, noticed you stayed pretty quiet when Alex took credit for the West region client deck in the sync. You spent 20 hours on those slides. Are you okay or just letting it slide?'",
        "prompt": "How do you respond to Sarah to MATCH her relational/social state?",
        "options": [
            {
                "id": "A",
                "text": "Honestly, it was so frustrating to sit there and watch that happen. I really appreciate you reaching out and checking in on me about it. That meant a lot.",
                "is_correct": True,
                "response_type": "Social",
                "feedback": "CORRECT (Natural Social Match): Acknowledges the peer relationship, validates the group status concern, and builds real trust."
            },
            {
                "id": "B",
                "text": "I will file a formal territory dispute ticket with Sales Operations tomorrow morning.",
                "is_correct": False,
                "response_type": "Practical",
                "feedback": "MISMATCH (Practical Overreach): Escalating to administrative tickets misses the warm social check-in."
            },
            {
                "id": "C",
                "text": "It's no big deal at all! Karma always wins in the end! 😊✨",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Toxic Positivity): Brushing off team status dynamics shuts down supportive dialogue."
            },
            {
                "id": "D",
                "text": "Alex is just an insecure thief, I'm going to ruin his reputation.",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Destructive Venting): Personal attacks create toxicity rather than social alignment."
            }
        ],
        "core_takeaway": "Social conversations around identity and status require acknowledging relationship cues and peer trust."
    },
    {
        "channel": "Zoom",
        "conversation_type": "Practical",
        "context": "During a live product demo on Zoom, Lead Engineer Priya private messages you: 'The payment gateway staging API just threw a 502 Bad Gateway error. Do I stall the client with a 5-minute Q&A block while you reset the pod, or do we switch to static video recording now?'",
        "prompt": "How do you respond to MATCH Priya's state under tight time pressure?",
        "options": [
            {
                "id": "A",
                "text": "Switch to static video recording right now. I'll reset the staging pod silently in the background.",
                "is_correct": True,
                "response_type": "Practical",
                "feedback": "CORRECT (Practical Matching): Delivers an instantaneous, clear operational decision matching her time-critical request."
            },
            {
                "id": "B",
                "text": "Oh no! Take a deep breath Priya! We got this, stay calm!",
                "is_correct": False,
                "response_type": "Emotional",
                "feedback": "MISMATCH (Emotional Cheerleading): Pep talks during an active demo delay critical operational choices."
            },
            {
                "id": "C",
                "text": "We should hold a post-mortem retro next Monday on staging cluster stability.",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Timing Failure): Discussing future retro process when a live client is waiting."
            },
            {
                "id": "D",
                "text": "Live demos give me so much anxiety!",
                "is_correct": False,
                "response_type": "Emotional",
                "feedback": "MISMATCH (Self-Centered Emotion): Burdening her with your anxiety when a decision is needed."
            }
        ],
        "core_takeaway": "Practical conversations demand quick, precise, actionable decisions."
    },
    {
        "channel": "Slack",
        "conversation_type": "Emotional",
        "context": "In #marketing-team at 6:45 PM, Jordan posts: 'Our campaign launch got pushed back for the 3rd time this month because leadership changed direction again. 3 weeks of work down the drain.'",
        "prompt": "How do you respond to MATCH Jordan's conversation state?",
        "options": [
            {
                "id": "A",
                "text": "That is so incredibly demoralizing after how hard the team worked on this. It makes total sense why everyone is feeling deflated right now.",
                "is_correct": True,
                "response_type": "Emotional",
                "feedback": "CORRECT (Natural Emotional Match): Directly acknowledges and validates the team's shared disappointment without artificial jargon."
            },
            {
                "id": "B",
                "text": "Every roadblock is just a stepping stone to success! 🌱 Let me know when V2 is ready!",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Toxic Positivity): Forced cheerfulness after a major setback breeds cynicism."
            },
            {
                "id": "C",
                "text": "Here is a Notion guide on agile pivot framework execution.",
                "is_correct": False,
                "response_type": "Mismatch",
                "feedback": "MISMATCH (Unsolicited Optimization): Pushing process guides when people are mourning lost work."
            },
            {
                "id": "D",
                "text": "Archive the current Figma folder and create folder 'V3_Drafts' immediately.",
                "is_correct": False,
                "response_type": "Practical",
                "feedback": "MISMATCH (Practical Overreach): Cold task instructions ignore human morale."
            }
        ],
        "core_takeaway": "Acknowledge disappointment and lost effort before trying to rally the team."
    }
]

# Generate 50 natural scenarios across channels and states
channels_list = ["Slack", "iMessage", "Zoom", "In-Person"]

topics_pool = [
    ("Handling unexpected scope creep from executive request", "Practical", "iMessage"),
    ("Navigating awkward salary transparency discussion", "Social", "In-Person"),
    ("Dealing with conflicting priorities between Product and Design", "Practical", "Zoom"),
    ("Responding to a teammate whose presentation was criticized publicly", "Emotional", "Slack"),
    ("Handling a peer who constantly interrupts in team syncs", "Social", "In-Person"),
    ("Responding to an urgent client SLA breach notification", "Practical", "Slack"),
    ("Managing feelings of imposter syndrome after a promotion", "Emotional", "Zoom"),
    ("Navigating hybrid office seating arrangement tensions", "Social", "iMessage"),
    ("Dealing with last-minute budget cuts on a key project", "Emotional", "In-Person"),
    ("Handling a missed deadline due to vendor outage", "Practical", "Slack"),
    ("Responding to a colleague taking medical leave", "Emotional", "iMessage"),
    ("Managing team recognition when 1 person did 80% of work", "Social", "Zoom"),
    ("Handling sudden re-org announcements across departments", "Emotional", "Slack"),
    ("Responding to a request for weekend emergency work", "Practical", "iMessage"),
    ("Navigating feedback on code review style", "Practical", "Slack"),
    ("Handling a colleague feeling excluded from informal happy hours", "Social", "In-Person"),
    ("Responding to an unexpected negative client review", "Emotional", "Zoom"),
    ("Managing priority shift from feature dev to tech debt cleanup", "Practical", "Slack"),
    ("Navigating mentor-mentee relationship expectations", "Social", "In-Person"),
    ("Handling burnout after major system migration", "Emotional", "Slack"),
    ("Responding to request for immediate data export before pitch", "Practical", "iMessage"),
    ("Managing team culture differences after company merger", "Social", "Zoom"),
    ("Handling miscommunication about project ownership", "Practical", "In-Person"),
    ("Responding to a direct report struggling with work-life balance", "Emotional", "Zoom"),
    ("Navigating cross-functional department rivalry", "Social", "Slack"),
    ("Handling sudden feature freeze decision by leadership", "Practical", "Slack"),
    ("Responding to a coworker facing personal family loss", "Emotional", "iMessage"),
    ("Managing public praise vs private feedback preferences", "Social", "In-Person"),
    ("Handling urgent security vulnerability patch deployment", "Practical", "Slack"),
    ("Responding to team frustration over complex Jira workflows", "Emotional", "Slack"),
    ("Navigating casual lunch invitation etiquette with executives", "Social", "In-Person"),
    ("Handling unexpected API deprecation by third-party vendor", "Practical", "Zoom"),
    ("Responding to a colleague feeling overlooked for mentorship role", "Emotional", "iMessage"),
    ("Managing remote team timezone coordination friction", "Practical", "Slack"),
    ("Handling identity representation discussions in company town hall", "Social", "Zoom"),
    ("Responding to performance PIP notification anxiety", "Emotional", "In-Person"),
    ("Managing architecture design review disagreements", "Practical", "Slack"),
    ("Navigating coffee break informal networking etiquette", "Social", "In-Person"),
    ("Handling emergency server hardware replacement protocol", "Practical", "iMessage"),
    ("Managing remote sprint retro complaints about meeting fatigue", "Emotional", "Slack"),
    ("Dealing with conflicting feedback from two co-founders", "Practical", "Zoom"),
    ("Handling awkward mispronunciation of a colleague's name", "Social", "In-Person"),
    ("Responding to a colleague feeling alienated by inside jokes", "Social", "Slack"),
    ("Managing panic over a sent email with a broken link", "Practical", "iMessage"),
    ("Handling direct report fear about AI automation in their role", "Emotional", "Zoom")
]

scenarios = list(natural_scenarios)

for title, ctype, chan in topics_pool:
    if ctype == "Emotional":
        ctx = f"In a {chan} exchange about '{title}', a coworker vents: 'I've been working my tail off all week, but every time we get close to the finish line, another issue resets everything. I feel so burnt out and honestly doubt if my effort even matters.'"
        prm = "How do you respond to MATCH their emotional state naturally?"
        opts = [
            ("A", "That sounds completely draining. Busting your butt only to have the finish line moved is so exhausting. Is that where your head is at right now?", True, "Emotional", "CORRECT (Natural Emotional Match): Validates their exhaustion in real conversational language."),
            ("B", "You should try using the Pomodoro technique and block your calendar for quiet focus time.", False, "Mismatch", "MISMATCH (Unsolicited Optimization): Giving task tips when someone is exhausted invalidates their feelings."),
            ("C", "Don't worry! Every setback is just a step toward greatness! Stay positive! ✨", False, "Mismatch", "MISMATCH (Toxic Positivity): Slapping platitudes on real burnout breeds cynicism."),
            ("D", "Send me your task list and I'll finish the top 3 items for you tonight.", False, "Practical", "MISMATCH (Practical Overreach): Jumping to finish tasks before acknowledging human emotion.")
        ]
        tkaway = "Validate human exhaustion with real conversational empathy before offering solutions."
    elif ctype == "Practical":
        ctx = f"During a {chan} discussion on '{title}', a colleague asks: 'We have 5 minutes before the presentation. What are our 2 main options and which one should we execute?'"
        prm = "How do you respond to MATCH their practical state under time pressure?"
        opts = [
            ("A", "Option A: Deploy fallback build (5 mins). Option B: Pause queue. Recommended: Option A.", True, "Practical", "CORRECT (Practical Matching): Delivers crisp, structured, actionable operational choices."),
            ("B", "Take a deep breath! We are an awesome team and we got this!", False, "Emotional", "MISMATCH (Emotional Cheerleading): Pep talks during time-critical moments delay action."),
            ("C", "We should schedule a retrospective next week to discuss team communication.", False, "Mismatch", "MISMATCH (Timing Failure): Discussing future retros when immediate data is needed."),
            ("D", "I get so anxious when presentations happen on short notice!", False, "Emotional", "MISMATCH (Self-Centered Emotion): Burdening others with your anxiety when a choice is needed.")
        ]
        tkaway = "Deliver crisp structured choices when time-critical practical decisions are requested."
    else:  # Social
        ctx = f"In a {chan} conversation about '{title}', a colleague says: 'It's really awesome how our team has built such genuine trust despite working from different cities. Really glad to be working with you!'"
        prm = "How do you respond to MATCH their social/relational state?"
        opts = [
            ("A", "I totally agree! Having real connection across remote teams makes work so much better. Really glad we're working together!", True, "Social", "CORRECT (Social Matching): Reciprocates warmth and reinforces group identity in natural language."),
            ("B", "Please update your remote working location in HR self-service by 5 PM.", False, "Practical", "MISMATCH (Practical Shutdown): Cold administrative reminders kill social rapport."),
            ("C", "Remote teams have a 25% lower engagement rate according to recent studies.", False, "Mismatch", "MISMATCH (Pedantic Mismatch): Citing statistics ruins warm social connection."),
            ("D", "Are you feeling burnt out by the time zone differences?", False, "Emotional", "MISMATCH (Projected Negative Emotion): Projecting negative emotion onto a warm social post.")
        ]
        tkaway = "Reciprocate social warmth naturally to reinforce team trust."

    formatted_opts = [
        {
            "id": o[0],
            "text": o[1],
            "is_correct": o[2],
            "response_type": o[3],
            "feedback": o[4]
        }
        for o in opts
    ]

    scenarios.append({
        "scenario_id": str(uuid.uuid4()),
        "channel": chan,
        "conversation_type": ctype,
        "difficulty_level": 3,
        "context": ctx,
        "prompt": prm,
        "options": formatted_opts,
        "core_takeaway": tkaway
    })

seed_path = Path("/Users/rohankosur/Documents/GithubProjects/supercommunicators-app/src/data/scenarios_seed.json")
with open(seed_path, "w", encoding="utf-8") as f:
    json.dump(scenarios[:50], f, indent=2)

print(f"Generated {len(scenarios[:50])} 100% natural Supercommunicator scenarios!")
