from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

file_name = "Hamza_Mohsin_FLYERALARM_Cover_Letter.pdf"

doc = SimpleDocTemplate(
    file_name,
    pagesize=A4,
    rightMargin=50,
    leftMargin=50,
    topMargin=50,
    bottomMargin=50
)

styles = getSampleStyleSheet()

styles.add(ParagraphStyle(
    name="Name",
    fontSize=16,
    leading=20,
    fontName="Helvetica-Bold",
    spaceAfter=6
))

styles.add(ParagraphStyle(
    name="HeaderSmall",
    fontSize=9,
    leading=12
))

styles.add(ParagraphStyle(
    name="Body",
    fontSize=10,
    leading=14,
    spaceAfter=12
))

content = []

# Header
header = Table(
    [[
        Paragraph("Hamza Mohsin", styles["Name"]),
        Paragraph(
            "Germany<br/>"
            "hamzamohsin.work@gmail.com<br/>"
            "linkedin.com/in/hamzamohsin<br/>"
            "github.com/HamzaMohsin1996<br/>"
            "hamzamohsin1996.github.io",
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
content.append(Spacer(1, 28))

# Greeting
content.append(Paragraph("Dear Hiring Team,", styles["Body"]))

# Paragraph 1
content.append(Paragraph(
    "I am applying for the Frontend Software Developer position at FLYERALARM. "
    "I have experience working on customer facing web applications in production environments "
    "and contributing to frontend systems used in both long lived products and shorter delivery focused projects.",
    styles["Body"]
))

# Paragraph 2
content.append(Paragraph(
    "In my professional experience, I have worked primarily with JavaScript and TypeScript based frontend "
    "applications, collaborating closely with backend engineers, designers, and product stakeholders. "
    "My work includes implementing frontend features, maintaining existing codebases, and refining "
    "interfaces based on team feedback and evolving requirements.",
    styles["Body"]
))

# Paragraph 3
content.append(Paragraph(
    "I have worked mainly with React and TypeScript and have exposure to VueJS through learning and project work. "
    "I am familiar with clean code practices, component based architectures, and structured code organisation, "
    "and I have worked in teams where testing, continuous integration, and code reviews are part of the development process.",
    styles["Body"]
))

# Paragraph 4
content.append(Paragraph(
    "I am interested in FLYERALARM because of its focus on large scale e commerce systems, "
    "complex product configurators, and long term software development. "
    "I am motivated to contribute to stable and maintainable frontend systems while continuing to deepen "
    "my experience with VueJS, testing practices, and DevOps topics in a production setting.",
    styles["Body"]
))

# Closing
content.append(Paragraph(
    "Thank you for considering my application. I would welcome the opportunity to discuss how my experience "
    "and approach to frontend development could fit the needs of your teams.",
    styles["Body"]
))

content.append(Spacer(1, 18))

content.append(Paragraph(
    "Kind regards,<br/>Hamza Mohsin",
    styles["Body"]
))

doc.build(content)

print("FLYERALARM cover letter generated successfully")
