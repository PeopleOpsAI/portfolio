#!/usr/bin/env python3
"""Generate Swapnil Mishra HR resume PDF from structured content."""

from pathlib import Path

try:
    from fpdf import FPDF
except ImportError:
    raise SystemExit("Install fpdf2: pip install fpdf2")

OUT = Path(__file__).resolve().parents[1] / "public" / "resume" / "Swapnil_Mishra_HR_Resume.pdf"

SECTIONS = [
    ("CAREER OBJECTIVE", [
        "HR Professional with experience in managing end-to-end HR Operations & employee lifecycle. "
        "Seeking to create a positive work culture while aligning HR practices with organizational goals.",
    ]),
    ("PROFESSIONAL EXPERIENCE", []),
]

BLUPINE = """BluPine Energy Pvt Ltd. (Jan 2025 to Present) - Senior Executive HR
• Coordination and support in recruitment for various projects; sourcing via agencies, job portals, referrals
• Spearheaded onboarding tracker; 100% compliance on verification & joining forms within T+7 days
• Day-1 readiness kits (IT, ID cards, access, welcome merchandise); 100% day-1 productivity
• Facilitated induction programs with HODs; 100% role clarity
• Employee grievance resolution; labor law & policy compliance
• GMC, GPA, GTL data preparation; HRMS for 280+ employees (attendance, leave)
• L&D support via LMS; SAP workflow configuration for HR approvals
• Payroll inputs, performance appraisal support, F&F settlements, promotions, transfers, offboarding"""

EPC = """EPC Infracon Pvt Ltd. (March 2024 to Jan 2025) - HR Executive
• Full employee lifecycle: workforce planning, TA, onboarding, engagement, performance, offboarding
• Leave & attendance monitoring; payroll for 100+ employees; PF & ESIC compliance
• ER mediation; HR policy development"""

CODEGEN = """CodeGenIT Pvt Ltd. (April 2023 to March 2024) - HR Executive
• End-to-end recruitment for IT & non-IT roles; international client hiring
• Onboarding, employee records, HR policies; Seek, Indeed, Hays, Boolean search
• Interview coordination across time zones"""

EDUCATION = """MBA in Human Resource Management (2022 - 2024)
Bachelor's in Commerce (2019 - 2022)
Intermediate, CBSE (2018 - 2019)"""

SKILLS = """Communication · Teamwork · Adaptability · Interpersonal Skills
HRMS · SAP Workflows · LMS · Payroll (PF/ESIC) · Onboarding · ATS & Job Portals"""


class ResumePDF(FPDF):
    def header(self):
        pass

    def section_title(self, title: str):
        self.ln(4)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(80, 50, 180)
        self.multi_cell(0, 6, title)
        self.set_draw_color(80, 50, 180)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(3)
        self.set_text_color(30, 30, 30)
        self.set_font("Helvetica", "", 10)

    def body_text(self, text: str):
        self.set_font("Helvetica", "", 9.5)
        self.multi_cell(0, 5, sanitize(text))
        self.ln(2)


def sanitize(text: str) -> str:
    return text.replace("\u2022", "-").replace("\u2013", "-").replace("\u2014", "-").replace("\u2019", "'")


def main():
    pdf = ResumePDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_margins(12, 12, 12)

    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(20, 20, 20)
    pdf.cell(0, 10, "Swapnil Mishra", ln=True)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(80, 80, 80)
    pdf.cell(0, 6, "Senior Executive HR | HR Operations & Employee Lifecycle", ln=True)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.cell(0, 5, "Gurgaon, India  |  +91 9119725253  |  linkedin.com/in/swapnil-mishra-hr", ln=True)
    pdf.ln(6)

    pdf.section_title("CAREER OBJECTIVE")
    pdf.body_text(SECTIONS[0][1][0])

    pdf.section_title("PROFESSIONAL EXPERIENCE")
    for block in (BLUPINE, EPC, CODEGEN):
        pdf.body_text(block)

    pdf.section_title("EDUCATION")
    pdf.body_text(EDUCATION)

    pdf.section_title("SOFT & TECHNICAL KNOWLEDGE")
    pdf.body_text(SKILLS)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT))
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
