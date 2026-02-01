from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import A4

file_name = "Hamza_Mohsin_Motivation_Letter_NTNU.pdf"

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
    name="Title",
    fontSize=14,
    leading=18,
    spaceAfter=12,
    fontName="Helvetica-Bold"
))

styles.add(ParagraphStyle(
    name="Body",
    fontSize=10,
    leading=14,
    spaceAfter=10
))

content = []

content.append(Paragraph("Motivation Letter", styles["Title"]))

letter_paragraphs = [
    "I am applying for the PhD position in Cybersecurity and Human AI Teaming within the HAT CI project at the Norwegian University of Science and Technology. I am interested in doctoral research that examines how humans and AI systems work together in Security Operations Centers, particularly in contexts where decisions affect critical infrastructure systems and require clear responsibility and oversight.",

    "I completed a Master’s degree in User Experience Design at Technische Hochschule Ingolstadt. My Master’s thesis focused on human AI decision support in safety critical environments. The work examined how information retrieval interfaces support re engagement, situational awareness, and decision making during interruptions. I conducted controlled experiments, eye tracking studies, and qualitative interviews. This work provided experience with experimental design, mixed methods analysis, and evaluation of AI supported interfaces.",

    "My research interests focus on human AI collaboration in cybersecurity operations. I am interested in how analysts interact with AI support during alert triage, how decisions such as dismissal or escalation are made, and how responsibility and decision authority are maintained when AI recommendations are present. I am also interested in how interaction design can support understanding of system behavior rather than replacing human judgment. These interests align with the goals of the HAT CI project, which focuses on human AI teaming in Security Operations Centers that protect critical infrastructure.",

    "The proposed PhD project builds on my previous research experience and methodological background. I plan to study analyst workflows through observation and interviews, to design interaction mechanisms that allow analysts to influence and interpret AI output, and to evaluate these mechanisms through controlled studies. My experience with interface prototyping using React and with designing information dense systems is relevant for developing and testing research prototypes in this context.",

    "I am applying to NTNU because of its research focus on cybersecurity, human computer interaction, and applied research. The collaboration between NTNU, the Institute for Energy Technology, and industry partners within the HAT CI project provides an opportunity to study operational challenges in Security Operations Centers. I am interested in contributing to research that informs the design of SOC tools while keeping human responsibility and governance central.",

    "Through doctoral training at NTNU, I aim to develop the skills required to conduct independent research on human AI collaboration in cybersecurity. I am motivated to participate actively in the PhD programme and to contribute to the HAT CI research activities.",

    "Sincerely,<br/>Hamza Mohsin"
]

for para in letter_paragraphs:
    content.append(Paragraph(para, styles["Body"]))

doc.build(content)

print("Motivation letter PDF generated successfully.")
