# chat/views.py

from django.shortcuts import render
from django.http import JsonResponse
import ollama

# Pull the model to ensure it's available
ollama.pull('llama3')


def chat_with_llm(question):
    try:
        messages = [{'content': question, "role": "user"}]
        stream = ollama.chat(model="llama3", messages=messages, stream=True)
        response = ""
        for chunk in stream:
            response += chunk['message']['content']
        return response
    except Exception as e:
        print(f"An error occurred: {e}")
        return None


def chat_view(request):
    if request.method == "POST":
        user_message = request.POST.get('message')
        llm_response = chat_with_llm(user_message)
        if llm_response:
            return JsonResponse({'response': llm_response})
        else:
            return JsonResponse({'response': 'Failed to receive response from LLM.'})

    return render(request, 'chat/chat.html')
