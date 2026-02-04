from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    ListFlowable, ListItem, PageBreak
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

file_name = "Hamza_Mohsin_CV_HCI_PhD_University_of_Konstanz.pdf"

doc = SimpleDocTemplate(
    file_name,
    pagesize=A4,
    rightMargin=40,
    leftMargin=40,
    topMargin=40,
    bottomMargin=40
)

styles = getSampleStyleSheet()

# =======================
# Styles
# =======================

styles.add(ParagraphStyle(
    name="Name",
    fontSize=18,
    leading=21,
    fontName="Helvetica-Bold",
    spaceAfter=6
))

styles.add(ParagraphStyle(
    name="HeaderSmall",
    fontSize=9,
    leading=11
))

styles.add(ParagraphStyle(
    name="Section",
    fontSize=11.5,
    leading=14,
    spaceBefore=14,
    spaceAfter=6,
    fontName="Helvetica-Bold"
))

styles.add(ParagraphStyle(
    name="Body",
    fontSize=9.6,
    leading=12.4,
    spaceAfter=2
))

styles.add(ParagraphStyle(
    name="Date",
    fontSize=9.2,
    leading=11,
    alignment=2
))

# =======================
# Helpers
# =======================

def section(title):
    return [
        Paragraph(title, styles["Section"]),
        Table([[""]], colWidths=[500], rowHeights=[1.5],
              style=[("BACKGROUND", (0, 0), (-1, -1), colors.black)]),
        Spacer(1, 8)
    ]

def entry(left, right):
    return Table(
        [[Paragraph(left, styles["Body"]), Paragraph(right, styles["Date"])]],
        colWidths=[380, 120],
        style=[("VALIGN", (0, 0), (-1, -1), "TOP"),
               ("BOTTOMPADDING", (0, 0), (-1, -1), 4)]
    )

content = []

# =======================
# Header
# =======================

header = Table(
    [[
        Paragraph("Hamza Mohsin<br/>Human Computer Interaction Researcher", styles["Name"]),
        Paragraph(
            "Germany<br/>"
            "hamzamohsin.work@gmail.com<br/>"
            "linkedin.com/in/hamzamohsin<br/>"
            "hamzamohsin1996.github.io<br/>"
            "github.com/HamzaMohsin1996",
            styles["HeaderSmall"]
        )
    ]],
    colWidths=[320, 180]
)

header.setStyle(TableStyle([
    ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("ALIGN", (1, 0), (1, 0), "RIGHT")
]))

content.append(header)
content.append(Spacer(1, 16))

# =======================
# Research Profile
# =======================

content.extend(section("Research Profile"))
content.append(Paragraph(
    "Research focus on Human Computer Interaction with emphasis on interactive systems for "
    "Mixed Reality, teleoperation, and Human AI interaction. Experience in designing, "
    "implementing, and evaluating immersive interfaces using controlled laboratory studies "
    "and mixed method analysis.",
    styles["Body"]
))

# =======================
# Research Interests
# =======================

content.extend(section("Research Interests"))
content.append(Paragraph(
    "Human Computer Interaction, Mixed Reality, Virtual Reality, Augmented Reality, "
    "teleoperation interfaces, multimodal interaction, situational awareness, "
    "experimental evaluation, and user perception.",
    styles["Body"]
))

# =======================
# Education
# =======================

content.extend(section("Education"))

content.append(entry(
    "<b>Master of Science in User Experience Design</b><br/>"
    "Technische Hochschule Ingolstadt, Germany",
    "Oct 2023 to Feb 2026"
))

content.append(Paragraph(
    "<b>Master Thesis</b>: Designing a Web Based UAV Interface for Firefighting Dispatchers "
    "to Support Information Retrieval During Multitasking and Interruptions",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Designed an interactive UAV monitoring and simulation system.", styles["Body"])),
        ListItem(Paragraph("Implemented experimental interfaces for interruption and re engagement scenarios.", styles["Body"])),
        ListItem(Paragraph("Conducted a within subject laboratory study with 29 participants.", styles["Body"])),
        ListItem(Paragraph("Collected performance metrics, situational awareness measures, eye tracking data, and interviews.", styles["Body"])),
        ListItem(Paragraph("Performed statistical analysis and qualitative thematic analysis.", styles["Body"])),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceAfter=6
))

content.append(Paragraph(
    "Supervisors: Prof. Dr. Simon Schwerd; Priv. Doz. Dr. techn. Andreas Riener",
    styles["Body"]
))

content.append(entry(
    "<b>Bachelor of Science in Information Technology</b><br/>"
    "Bahauddin Zakariya University, Pakistan",
    "Sept 2014 to Nov 2018"
))

# =======================
# Research Experience

# =======================

# =======================
# Research Experience
# =======================

content.extend(section("Research Experience"))

content.append(entry(
    "<b>Master’s Thesis Student</b><br/>Technische Hochschule Ingolstadt",
    "Mar 2025 to Jan 2026"
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Designed and implemented an interactive UAV monitoring and simulation system as part of a master’s thesis.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Developed experimental interfaces to study multitasking and re engagement after interruptions.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Implemented Unity based simulation components and a web based frontend using React and TypeScript.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Designed study procedures, tasks, and scenarios for a controlled laboratory experiment.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Collected and analyzed quantitative performance measures, situational awareness data, eye tracking data, and interview data.",
            styles["Body"]
        )),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceAfter=6
))


# =======================
# Publications and Projects
# =======================
# =======================
# Research Project Reports
# =======================

content.extend(section("Research Project Reports"))

# --- Teleoperation project ---

content.append(Paragraph(
    "<b>Enhancing Teleoperator Performance: Impact of Audio Information in Teleoperation Tasks</b><br/>"
    "Research project report, course based project, co authored",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Designed and implemented an interactive teleoperation interface to examine how audio information influences remote task execution and operator interaction.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Developed a controlled experimental setup with multiple audio conditions to study user behavior and task performance during teleoperation.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Collected and analyzed quantitative performance measures and questionnaire data to evaluate interaction effects and inform interface design decisions.",
            styles["Body"]
        )),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceBefore=2,
    spaceAfter=4
))

content.append(Paragraph(
    "https://hamzamohsin1996.github.io/publications/teleoperation_paper.pdf",
    styles["Body"]
))

content.append(Spacer(1, 6))

# --- Automotive interface project (solo) ---

content.append(Paragraph(
    "<b>Enhancing Automotive Interfaces to Improve Distance Perception in Foggy Conditions</b><br/>"
    "Research project report, Master’s program, sole author",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Designed and implemented an interactive visual interface concept to support distance perception in low visibility driving scenarios.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Created a simulated driving environment and experimental procedure to study user behavior and response times with and without interface support.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Collected and analyzed quantitative performance data and user experience questionnaire responses to evaluate perceptual effects and guide future interface development.",
            styles["Body"]
        )),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceBefore=2,
    spaceAfter=4
))

content.append(Paragraph(
    "https://hamzamohsin1996.github.io/publications/Automotive_Paper.pdf",
    styles["Body"]
))

# =======================
# Technical Skills
# =======================

# =======================
# Projects
# =======================

content.extend(section("Projects"))

content.append(Paragraph(
    "<b>Button Mystery</b><br/>"
    "Virtual reality project implemented in Unity",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph(
            "Designed and implemented an interactive virtual reality environment using Unity, focusing on spatial layout, navigation, and interaction mechanics.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Developed interactive elements including puzzles, object interactions, and audio feedback to study user exploration and engagement in immersive environments.",
            styles["Body"]
        )),
        ListItem(Paragraph(
            "Iteratively refined visual, spatial, and audio components based on user feedback and testing to improve usability and clarity of interaction.",
            styles["Body"]
        )),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceBefore=2,
    spaceAfter=4
))

content.append(Paragraph(
    "https://hamzamohsin1996.github.io/button-mystery.html",
    styles["Body"]
))


content.extend(section("Technical Skills"))

content.append(Paragraph(
    "<b>Interactive Systems Development</b>: Unity, Unity XR, Web interfaces, React, TypeScript, "
    "JavaScript, HTML, CSS.",
    styles["Body"]
))

content.append(Paragraph(
    "<b>HCI Methods</b>: User centered design, prototyping, usability testing, "
    "controlled laboratory studies, interviews.",
    styles["Body"]
))

content.append(Paragraph(
    "<b>Data Analysis</b>: Within subject and between group studies, SPAM, DRT, SART, SUS, "
    "eye tracking analysis, Python based statistical analysis.",
    styles["Body"]
))

# =======================
# Professional Experience
# =======================

content.extend(section("Professional Experience"))

content.append(entry(
    "<b>Working Student UI Developer</b><br/>Keysight Technologies, Germany",
    "2025 to Present"
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Developed web based user interfaces for engineering tools.", styles["Body"])),
        ListItem(Paragraph("Collaborated with researchers and engineers on interface implementation.", styles["Body"])),
        ListItem(Paragraph("Supported interface testing and documentation.", styles["Body"])),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceAfter=6
))

content.append(entry(
    "<b>Frontend Developer</b><br/>Techverx, Pakistan",
    "2018 to 2023"
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Developed and maintained complex web interfaces.", styles["Body"])),
        ListItem(Paragraph("Worked with designers and backend engineers.", styles["Body"])),
        ListItem(Paragraph("Supported iterative development processes.", styles["Body"])),
    ],
    bulletType="bullet",
    leftIndent=14,
    spaceAfter=6
))

# =======================
# Languages
# =======================

content.extend(section("Languages"))
content.append(Paragraph(
    "English fluent; German basic.",
    styles["Body"]
))

# =======================
# References
# =======================
# =======================
# Portfolio
# =======================

content.extend(section("Portfolio"))

content.append(Paragraph(
    "https://hamzamohsin1996.github.io/index.html",
    styles["Body"]
))

doc.build(content)

print("Strong Konstanz aligned HCI PhD CV generated successfully.")
