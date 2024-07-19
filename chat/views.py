from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

# Configure Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to get responses from Gemini Pro model
def get_gemini_response(question, class_level, subject):
    try:
        # Get Gemini Pro model
        model = genai.GenerativeModel("gemini-pro")
        chat = model.start_chat(history=[])

        # Send prompt and get response
        prompt = f"You are a teacher for math for Class 10, answer the following question if it is related to the given subject: {question}. If not, say 'I can't answer that or you may have chosen the wrong subject.'"
        response = chat.send_message(prompt, stream=True)
        return response
    except ValueError as e:
        print(f"Error: {str(e)}")
        return None

@csrf_exempt
def chat_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_message = data.get('message')
            print(f"Received message: {user_message}")  # Debugging print
            gem_response = get_gemini_response(user_message)
            if gem_response:
                response_text = ""
                for chunk in gem_response:
                    response_text += chunk.text
                return JsonResponse({'response': response_text})
            else:
                return JsonResponse({'response': 'Failed to receive response from Gemini.'})
        except json.JSONDecodeError as e:
            return JsonResponse({'response': f'Error decoding JSON: {str(e)}'}, status=400)
    else:
        return render(request, 'chat/chat.html')
