from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

file_name = "Hamza_Mohsin_PhD_CV.pdf"

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

# Header
header = Table(
    [[
        Paragraph("Hamza Mohsin<br/>Human AI Interaction Researcher PhD Applicant Cybersecurity", styles["Name"]),
        Paragraph(
            "Ingolstadt Germany<br/>"
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

# Research Profile
content.extend(section("Research Profile"))
content.append(Paragraph(
    "Human AI interaction researcher with a background in user experience design and human factors. "
    "Research focuses on safety critical decision making environments, situational awareness, "
    "re engagement after interruptions, and cognitive workload. Current interests include human AI "
    "teaming in Security Operations Centers, socio technical system design for cybersecurity operations, "
    "and responsible AI support for critical infrastructures.",
    styles["Body"]
))

# Research Interests and Skills one column compact
content.extend(section("Research Interests and Skills"))

content.append(Paragraph(
    "<b>Research Interests</b><br/>"
    "Human AI teaming in cybersecurity, "
    "SOC sensemaking and decision authority, "
    "Re engagement after interruptions, "
    "Cognitive workload and trust in AI systems, "
    "Responsible AI for critical infrastructures",
    styles["Body"]
))

content.append(Spacer(1, 4))

content.append(Paragraph(
    "<b>Skills</b><br/>"
    "Human AI interaction, "
    "Situational awareness assessment SPAM SART, "
    "Cognitive workload measurement, "
    "Eye tracking studies, "
    "Experimental design, "
    "Mixed methods research, "
    "Human in the loop systems, "
    "Python Pandas SciPy, "
    "Behavioral and interaction data analysis, "
    "React, "
    "TypeScript, "
    "Experimental interface prototyping, "
    "Information dense interface design, "
    "Safety critical system design, "
    "User research, "
    "Accessibility WCAG",
    styles["Body"]
))
content.append(Spacer(1, 2))

# Education
content.extend(section("Education"))
content.append(Paragraph(
    "<b>Master of Science User Experience Design</b><br/>"
    "Technische Hochschule Ingolstadt Germany Expected March 2026<br/>"
    "Master thesis Designing a Web Based UAV Interface for Firefighting Dispatchers to Support "
    "Information Retrieval During Multitasking<br/>"
    "Research methods Experimental design Eye tracking Situational awareness assessment SPAM SART "
    "Cognitive workload measurement Mixed methods analysis",
    styles["Body"]
))

content.append(Paragraph(
    "<b>Bachelor of Science Information Technology</b><br/>"
    "Bahauddin Zakariya University Pakistan November 2018",
    styles["Body"]
))

# Research Experience
content.extend(section("Research Experience"))
content.append(Paragraph(
    "<b>Researcher Human AI Decision Support Systems Master Thesis</b><br/>"
    "Technologietransferzentrum Unbemannte Flugsysteme Ingolstadt Germany March 2025 to January 2026",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Designed and evaluated human AI decision support interfaces for emergency dispatchers operating under multitasking and interruption conditions.", styles["Body"])),
        ListItem(Paragraph("Developed interaction mechanisms combining structured interface components with AI generated summaries timelines and event prioritization.", styles["Body"])),
        ListItem(Paragraph("Designed information dense dashboards supporting situational awareness and re engagement.", styles["Body"])),
        ListItem(Paragraph("Conducted controlled laboratory studies including eye tracking behavioral logging and qualitative interviews.", styles["Body"])),
        ListItem(Paragraph("Analyzed situational awareness response time and cognitive workload data.", styles["Body"])),
        ListItem(Paragraph("Implemented research prototypes using React and TypeScript for experimental evaluation.", styles["Body"]))
    ],
    bulletType="bullet"
))

# Industry Experience
content.extend(section("Industry Experience"))
content.append(Paragraph(
    "<b>Working Student UI Developer Photonics Simulation Tools</b><br/>"
    "Keysight Technologies Böblingen Germany March 2025 to Present",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Designed and refined frontend interfaces for photonics simulation tools used in engineering workflows.", styles["Body"])),
        ListItem(Paragraph("Built information dense interface components to support clarity and workload management.", styles["Body"])),
        ListItem(Paragraph("Collaborated with engineers to translate system complexity into usable interfaces.", styles["Body"])),
        ListItem(Paragraph("Supported research oriented prototyping and evaluation of technical systems.", styles["Body"]))
    ],
    bulletType="bullet"
))

content.append(Paragraph(
    "<b>Senior Frontend Developer</b><br/>"
    "Techverx Lahore Pakistan November 2018 to September 2023",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Developed component based frontend systems for web applications.", styles["Body"])),
        ListItem(Paragraph("Collaborated with cross functional teams on interface implementation.", styles["Body"])),
        ListItem(Paragraph("Built production ready React systems with attention to usability and performance.", styles["Body"]))
    ],
    bulletType="bullet"
))

# Projects
# Projects
content.extend(section("Projects"))

# Project 1 Teleoperation paper
content.append(Paragraph(
    "<b>Enhancing Teleoperator Performance Investigating the Impact of Audio Information in Teleoperation Tasks</b><br/>"
    "Status manuscript not published",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Co authored manuscript studying auditory feedback effects on teleoperator performance and situational awareness.", styles["Body"])),
        ListItem(Paragraph("Designed and evaluated a controlled study comparing audio only audio to visual and audio and visual feedback conditions.", styles["Body"])),
        ListItem(Paragraph("Measured response time error rate and situational awareness using SART and behavioral metrics.", styles["Body"])),
        ListItem(Paragraph("Analyzed results using ANOVA and post scenario interview analysis.", styles["Body"]))
    ],
    bulletType="bullet",
    leftIndent=12,
    bulletFontSize=7,
    spaceBefore=1,
    spaceAfter=2
))

content.append(Paragraph(
    "Paper link Teleoperation audio feedback manuscript "
    "<a href='https://hamzamohsin1996.github.io/publications/teleoperation_paper.pdf'>"
    "https://hamzamohsin1996.github.io/publications/teleoperation_paper.pdf</a>",
    styles["Body"]
))

content.append(Spacer(1, 3))

# Project 2 Automotive interface paper
content.append(Paragraph(
    "<b>Enhance Automotive Interfaces to Improve Distance Perception in Foggy Conditions</b><br/>"
    "Status manuscript not published",
    styles["Body"]
))

content.append(ListFlowable(
    [
        ListItem(Paragraph("Sole author manuscript on visual interface cues for distance perception in foggy driving conditions.", styles["Body"])),
        ListItem(Paragraph("Designed a dynamic visual interface using bars and vehicle icons to communicate distance information under low visibility.", styles["Body"])),
        ListItem(Paragraph("Conducted a controlled laboratory study using simulated driving scenarios and keyboard based interaction tasks.", styles["Body"])),
        ListItem(Paragraph("Measured response time and error rate using statistical hypothesis testing.", styles["Body"]))
    ],
    bulletType="bullet",
    leftIndent=12,
    bulletFontSize=7,
    spaceBefore=1,
    spaceAfter=2
))

content.append(Paragraph(
    "Paper link Automotive interface manuscript "
    "<a href='https://hamzamohsin1996.github.io/publications/Automotive_Paper.pdf'>"
    "https://hamzamohsin1996.github.io/publications/Automotive_Paper.pdf</a>",
    styles["Body"]
))

content.append(Spacer(1, 8))

# Links and References
content.extend(section("Links"))
content.append(Paragraph("Portfolio http://hamzamohsin1996.github.io", styles["Body"]))

content.extend(section("References"))
content.append(Paragraph("Academic referees available upon request", styles["Body"]))

doc.build(content)

print("CV generated successfully as Hamza_Mohsin_PhD_CV.pdf")
