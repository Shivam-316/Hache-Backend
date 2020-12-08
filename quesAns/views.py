from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from .forms import AnswerForm
from .models import Question
import json
from datetime import datetime
import time
# Create your views here.

@login_required
def answerView(request):
    profile=request.user.profile
    old_id = profile.ques_id
    if request.is_ajax() and request.method=="POST":
        form=AnswerForm(request.POST)
        if form.is_valid():
            tempAnswer=form.cleaned_data.get('answer')
            actualAnswer=getObj(profile).answer
            if  tempAnswer.lower() == actualAnswer.lower():
                profile.ques_id+=1
                profile.correct+=1
                profile.score+=10
                profile.data+='<'+str(datetime.now().isoformat())+','+str(profile.score)+'>'
                profile.save()
            winner=checkForWin(profile)
            if winner:
                data={'winner':winner}
            else:
                question=getObj(profile).question
                assets=getAssets(profile.ques_id)
                if(profile.ques_id == old_id):
                    data={'question':question,'winner':winner,'assets':assets,'correct':False}
                else:
                    data={'question':question,'winner':winner,'assets':assets,'correct':True}
            return JsonResponse(data)
    else:
        if checkForWin(profile):
            return redirect(reverse_lazy('winner'))
        form=AnswerForm()
        question=getObj(profile).question
        assets=getAssets(profile.ques_id)
        return render(request,'quest.html',{'question':question,'form':form,'assets':assets})

@login_required
def getObj(profile):
    while True:
        try:
            quesObj=Question.objects.get(pk=profile.ques_id)
        except ObjectDoesNotExist:
            profile.ques_id+=1
            profile.save()
            continue
        else:
            break
    return quesObj
    
@login_required
def checkForWin(profile):
    if profile.correct == profile.total_ques:
        profile.winner=True
        profile.save()
        return True
    else:
        return False

def getAssets(id):
    # with open("assets/assets.json") as assetsData:
    #     data=assetsData.read()
    # obj = json.loads(data)
    obj = {
        1:[
            {"text":"this text1","link":"this link1"},
            {"text":"this text2","link":"this link2"},
        ],
        2:[
            {"text":"this text","link":"this link"},
            {"text":"this text","link":"this link"},
        ],
        3:[
            {"text":"this text","link":"this link"},
            {"text":"this text","link":"this link"},
        ],
        }
    return obj[id]