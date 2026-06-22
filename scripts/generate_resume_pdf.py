#!/usr/bin/env python3
"""Generate a formatted PDF resume from public/resume/Swapnil_Mishra_HR_Resume.md."""

from __future__ import annotations

import re
from pathlib import Path

try:
    from fpdf import FPDF
    from fpdf.enums import XPos, YPos
except ImportError as exc:
    raise SystemExit("Install fpdf2: pip install fpdf2") from exc

ROOT = Path(__file__).resolve().parents[1]
MD_PATH = ROOT / "public" / "resume" / "Swapnil_Mishra_HR_Resume.md"
OUT_PATH = ROOT / "public" / "resume" / "Swapnil_Mishra_HR_Resume.pdf"

MARGIN = 15
CONTENT_W = 210 - 2 * MARGIN
ACCENT = (139, 92, 246)
TEXT = (24, 24, 27)
MUTED = (113, 113, 122)
BULLET_X = MARGIN + 3
TEXT_X = MARGIN + 7
SKILL_LABEL_W = 36


def sanitize(text: str) -> str:
    replacements = {
        "\u2022": "-",
        "\u2013": "-",
        "\u2014": "-",
        "\u2018": "'",
        "\u2019": "'",
        "\u201c": '"',
        "\u201d": '"',
        "\u00a0": " ",
    }
    for src, dst in replacements.items():
        text = text.replace(src, dst)
    return text.strip()


def strip_md(text: str) -> str:
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"\*([^*]+)\*", r"\1", text)
    return sanitize(text)


def split_job_title(title: str) -> tuple[str, str]:
    for sep in (" — ", " - ", " – "):
        if sep.strip() and sep in title:
            company, role = title.split(sep, 1)
            return company.strip(), role.strip()
    return title, ""


def parse_resume(md: str) -> dict:
    lines = [line.rstrip() for line in md.splitlines()]
    data: dict = {"name": "", "contact": [], "sections": []}
    current_section: dict | None = None
    current_job: dict | None = None

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        if not line or line == "---":
            i += 1
            continue

        if line.startswith("# ") and not data["name"]:
            data["name"] = strip_md(line[2:])
            i += 1
            continue

        if line.startswith("**Contact:**") or line.startswith("**Mail:**") or line.startswith("**LinkedIn:**"):
            data["contact"].append(strip_md(line))
            i += 1
            continue

        if line.startswith("## "):
            current_job = None
            current_section = {"title": strip_md(line[3:]), "paragraphs": [], "jobs": [], "bullets": []}
            data["sections"].append(current_section)
            i += 1
            continue

        if line.startswith("### ") and current_section is not None:
            raw_title = strip_md(line[4:])
            company, role = split_job_title(raw_title)
            current_job = {"company": company, "role": role, "dates": "", "bullets": []}
            current_section["jobs"].append(current_job)
            i += 1
            continue

        if line.startswith("*") and line.endswith("*") and current_job is not None:
            current_job["dates"] = strip_md(line)
            i += 1
            continue

        if line.startswith("- ") and current_section is not None:
            bullet = strip_md(line[2:])
            if current_job is not None:
                current_job["bullets"].append(bullet)
            else:
                current_section["bullets"].append(bullet)
            i += 1
            continue

        if current_section is not None and current_job is None and not line.startswith("#"):
            current_section["paragraphs"].append(strip_md(line))
            i += 1
            continue

        i += 1

    return data


class ResumePDF(FPDF):
    def __init__(self) -> None:
        super().__init__()
        self.set_auto_page_break(auto=True, margin=MARGIN)

    def check_space(self, height: float) -> None:
        if self.get_y() + height > self.h - MARGIN:
            self.add_page()

    def section_heading(self, title: str) -> None:
        self.check_space(14)
        self.ln(4)
        self.set_font("Helvetica", "B", 10.5)
        self.set_text_color(*ACCENT)
        self.cell(CONTENT_W, 6, title.upper(), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        y = self.get_y()
        self.set_draw_color(*ACCENT)
        self.set_line_width(0.35)
        self.line(MARGIN, y, MARGIN + CONTENT_W, y)
        self.ln(3)
        self.set_text_color(*TEXT)

    def paragraph(self, text: str) -> None:
        self.set_font("Helvetica", "", 9.2)
        self.multi_cell(CONTENT_W, 4.8, text)
        self.ln(2)

    def job_block(self, company: str, role: str, dates: str) -> None:
        self.check_space(16)
        self.ln(3)

        self.set_font("Helvetica", "B", 10)
        self.set_text_color(*TEXT)
        self.cell(CONTENT_W, 5.2, company, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        self.set_font("Helvetica", "", 9)
        self.set_text_color(*TEXT)
        role_line = role if role else ""
        if dates:
            role_line = f"{role_line}   ({dates})" if role_line else dates
        self.cell(CONTENT_W, 4.8, role_line, new_x=XPos.LMARGIN, new_y=YPos.NEXT)

        self.ln(2.5)

    def draw_bullet_dot(self, y: float, line_h: float) -> None:
        self.set_fill_color(*ACCENT)
        self.circle(BULLET_X + 0.6, y + line_h / 2, 0.55, style="F")

    def bullet(self, text: str) -> None:
        line_h = 4.5
        text_w = CONTENT_W - (TEXT_X - MARGIN)
        self.set_font("Helvetica", "", 8.6)

        self.check_space(line_h + 1)
        y0 = self.get_y()
        self.draw_bullet_dot(y0, line_h)
        self.set_xy(TEXT_X, y0)
        self.multi_cell(text_w, line_h, text)
        self.ln(1.2)

    def skill_line(self, label: str, body: str) -> None:
        line_h = 4.5
        text_w = CONTENT_W - (TEXT_X - MARGIN) - SKILL_LABEL_W
        self.check_space(line_h + 1)

        y0 = self.get_y()
        self.draw_bullet_dot(y0, line_h)

        self.set_xy(TEXT_X, y0)
        self.set_font("Helvetica", "B", 8.6)
        self.set_text_color(*TEXT)
        self.cell(SKILL_LABEL_W, line_h, f"{label}:", align="L")

        self.set_font("Helvetica", "", 8.6)
        self.set_xy(TEXT_X + SKILL_LABEL_W, y0)
        self.multi_cell(text_w, line_h, body)
        self.ln(1.4)


def skill_parts(text: str) -> tuple[str, str] | None:
    match = re.match(r"^([^:]+):\s*(.+)$", text)
    if match:
        return match.group(1).strip(), match.group(2).strip()
    return None


def build_pdf(data: dict) -> ResumePDF:
    pdf = ResumePDF()
    pdf.set_margins(MARGIN, MARGIN, MARGIN)
    pdf.add_page()

    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*TEXT)
    pdf.cell(CONTENT_W, 10, data["name"], new_x=XPos.LMARGIN, new_y=YPos.NEXT)

    pdf.set_font("Helvetica", "", 8.8)
    pdf.set_text_color(*MUTED)
    contact_line = "   |   ".join(
        part.replace("Contact:", "Phone:").replace("Mail:", "Email:") for part in data["contact"]
    )
    pdf.multi_cell(CONTENT_W, 4.5, contact_line)
    pdf.ln(3)

    for section in data["sections"]:
        pdf.section_heading(section["title"])

        for paragraph in section["paragraphs"]:
            pdf.paragraph(paragraph)

        for job in section["jobs"]:
            pdf.job_block(job["company"], job["role"], job["dates"])
            for bullet in job["bullets"]:
                pdf.bullet(bullet)
            pdf.ln(1.5)

        for bullet in section["bullets"]:
            parts = skill_parts(bullet)
            if parts and section["title"].lower().startswith("soft"):
                pdf.skill_line(parts[0], parts[1])
            else:
                pdf.bullet(bullet)

    return pdf


def main() -> None:
    if not MD_PATH.exists():
        raise SystemExit(f"Markdown resume not found: {MD_PATH}")

    data = parse_resume(MD_PATH.read_text(encoding="utf-8"))
    pdf = build_pdf(data)
    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    pdf.output(str(OUT_PATH))
    print(f"Wrote {OUT_PATH}")


if __name__ == "__main__":
    main()
