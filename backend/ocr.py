import sys
import pytesseract
from pdf2image import convert_from_path
from PIL import Image

# 🔥 IMPORTANT (Windows path)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

file_path = sys.argv[1]

text = ""

try:
    # PDF case
    if file_path.endswith(".pdf"):
        images = convert_from_path(file_path)
        for img in images:
            text += pytesseract.image_to_string(img)
    else:
        img = Image.open(file_path)
        text = pytesseract.image_to_string(img)

    print(text)

except Exception as e:
    print("ERROR:", str(e))