from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

# Output file
file_name = "Hamza_Mohsin_UX_Researcher_GitLab.pdf"

doc = SimpleDocTemplate(
    file_name,
    pagesize=A4,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    name="Name",
    fontSize=18,
    leading=21,
    spaceAfter=4,
    fontName="Helvetica-Bold"
))

styles.add(ParagraphStyle(
    name="HeaderSmall",
    fontSize=8.5,
    leading=11
))

styles.add(ParagraphStyle(
    name="Section",
    fontSize=11.5,
    leading=14,
    spaceBefore=10,
    spaceAfter=4,
    fontName="Helvetica-Bold"
))

styles.add(ParagraphStyle(
    name="Body",
    fontSize=9.5,
    leading=12,
    spaceAfter=3
))

def section(title):
    return [
        Paragraph(title, styles["Section"]),
        Table([[""]], colWidths=[500], rowHeights=[1],
              style=[("BACKGROUND", (0, 0), (-1, -1), colors.black)]),
        Spacer(1, 6)
    ]

content = []

# Header (kept structure, updated title only)
header = Table(
    [[
        Paragraph("Hamza Mohsin<br/>UX Researcher for Technical and Enterprise Systems", styles["Name"]),
        Paragraph(
            "Ingolstadt, Germany<br/>"
            "hamzamohsin.work@gmail.com<br/>"
            "linkedin.com/in/hamzamohsin<br/>"
            "github.com/HamzaMohsin1996<br/>"
            "+49 176 27811530",
            styles["HeaderSmall"]
        )
    ]],
    colWidths=[300, 200]
)

header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ALIGN", (1, 0), (1, 0), "RIGHT")
]))

content.append(header)
content.append(Spacer(1, 12))

# Research Profile (kept section, updated content)
content.extend(section("Research Profile"))
content.append(Paragraph(
    "UX researcher with a background in human computer interaction and user experience design, working on "
    "complex and technical systems. Experience includes decision support interfaces, security related workflows, "
    "and information dense enterprise tools. Work focuses on understanding user workflows, identifying breakdowns "
    "in interaction, and supporting product decisions through qualitative and quantitative research. "
    "Works with designers, product managers, and engineers to plan studies, share findings, and support iteration.",
    styles["Body"]
))

# Research Interests and Skills (kept section, updated content)
content.extend(section("Research Interests and Skills"))

content.append(Paragraph(
    "<b>Research Interests</b><br/>"
    "UX research for enterprise and developer tools, "
    "Workflow and task analysis, "
    "Human AI assisted decision making, "
    "Information seeking and sensemaking, "
    "Usability and interaction breakdowns, "
    "Cognitive workload in technical systems",
    styles["Body"]
))

content.append(Spacer(1, 4))

content.append(Paragraph(
    "<b>Technical and Research Skills</b><br/>"
    "Mixed methods UX research, "
    "Usability testing and evaluative studies, "
    "Contextual inquiry and interviews, "
    "Survey design and behavioral analysis, "
    "Situational awareness measures SPAM and SART, "
    "Research synthesis and reporting, "
    "Remote research execution, "
    "Python Pandas SciPy, "
    "Interaction and log data analysis, "
    "React and TypeScript for prototype literacy, "
    "Experiment instrumentation and logging, "
    "Version control and reproducible research workflows",
    styles["Body"]
))

# Education (kept section and details, minor wording only)
content.extend(section("Education"))
content.append(Paragraph(
    "<b>Master of Science in User Experience Design</b><br/>"
    "Technische Hochschule Ingolstadt, Germany — Expected March 2026<br/>"
    "Master Thesis: Designing a Web Based UAV Interface for Firefighting Dispatchers to Support "
    "Information Retrieval During Multitasking<br/>"
    "Relevant coursework: Augmented and Virtual Reality Applications (Unity, C#), "
    "Programming for Multimodal Interactive Systems, "
    "Natural User Interfaces, "
    "Audio and Video Processing and 3D Animation",
    styles["Body"]
))

content.append(Paragraph(
    "<b>Bachelor of Science in Information Technology</b><br/>"
    "Bahauddin Zakariya University, Pakistan — November 2018",
    styles["Body"]
))

# Research Experience (kept section, updated role label and bullets to UX Research framing)
content.extend(section("Research Experience"))
content.append(Paragraph(
    "<b>UX Researcher Human AI Decision Support Systems</b><br/>"
    "Technologietransferzentrum Unbemannte Flugsysteme, Ingolstadt, Germany — March 2025 to January 2026",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Conducted mixed methods UX research on decision support interfaces used in operational workflows.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Planned and ran interviews, usability studies, and controlled experiments.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Analyzed interaction logs, response time, and questionnaire data.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Synthesized findings into research summaries to support interface decisions.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Collaborated with designers and engineers during iteration and evaluation.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Built and instrumented research prototypes using React and TypeScript.",
            styles["Body"]
        ))
    ],
    bulletType="bullet"
))

# Industry Experience (kept section, updated bullets slightly)
content.extend(section("Industry Experience"))
content.append(Paragraph(
    "<b>Working Student UI Developer Photonics Simulation Tools</b><br/>"
    "Keysight Technologies, Böblingen, Germany — March 2025 to Present",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Worked on user interfaces for technical simulation tools used in engineering workflows.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Implemented interface changes informed by internal feedback and usability reviews.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Collaborated with engineers on integrating interface components into existing systems.",
            styles["Body"]
        ))
    ],
    bulletType="bullet"
))

content.append(Paragraph(
    "<b>Senior Frontend Developer</b><br/>"
    "Techverx, Lahore, Pakistan — November 2018 to September 2023",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Developed web application interfaces in collaboration with product and design teams.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Worked in iterative development cycles with regular feedback and refinement.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Built frontend systems with attention to usability and maintainability.",
            styles["Body"]
        ))
    ],
    bulletType="bullet"
))

# Projects (kept section, updated framing; kept both projects)
content.extend(section("Selected Research and XR Projects"))

# Teleoperation Project
content.append(Paragraph(
    "<b>Teleoperation Feedback Study</b><br/>"
    "UX Research Project",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Conducted UX research on feedback modalities in remote operation tasks.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Compared audio, visual, and combined feedback conditions.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Collected behavioral and questionnaire data to evaluate user performance.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Reported findings related to operator performance and coordination.",
            styles["Body"]
        ))
    ],
    bulletType="bullet"
))

content.append(Paragraph(
    "Research summary: "
    "<a href='https://hamzamohsin1996.github.io/publications/teleoperation_paper.pdf'>"
    "https://hamzamohsin1996.github.io/publications/teleoperation_paper.pdf</a>",
    styles["Body"]
))

content.append(Spacer(1, 6))

# AR VR Project
content.append(Paragraph(
    "<b>Virtual Reality Environment with Interactive and Audio Visual Feedback</b><br/>"
    "Course Project Augmented and Virtual Reality Applications",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Built and evaluated a Unity based prototype to study spatial interaction.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Developed interactive tasks to support exploration and task completion.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Implemented audio feedback synchronized with user actions and position.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Used iterative testing to refine interaction behavior and usability issues.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Documented design, implementation, and evaluation outcomes.",
            styles["Body"]
        ))
    ],
    bulletType="bullet"
))

content.append(Paragraph(
    "Project demo: "
    "<a href='https://hamzamohsin1996.github.io/button-mystery.html'>"
    "https://hamzamohsin1996.github.io/button-mystery.html</a>",
    styles["Body"]
))

# Links (kept)
content.extend(section("Links"))
content.append(Paragraph("Portfolio: http://hamzamohsin1996.github.io", styles["Body"]))

# References (kept)
content.extend(section("References"))
content.append(Paragraph("References available upon request", styles["Body"]))

doc.build(content)

print("CV generated successfully as Hamza_Mohsin_UX_Researcher_GitLab.pdf")
