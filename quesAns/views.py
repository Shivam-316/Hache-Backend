from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from .forms import AnswerForm
from .models import Question
import json
from datetime import datetime,timedelta
import time
import pytz
from .answerHashing import getSha
# Create your views here.
IST = pytz.timezone('Asia/Kolkata') 
@login_required
def answerView(request):
    global IST
    if(datetime.now(tz=IST) < datetime(2020,12,27,0,0,0,0,tzinfo=IST)):
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
                    profile.data+='<'+str(datetime.now(tz=IST).isoformat())+','+str(profile.score)+'>'
                    profile.save()
                winner=checkForWin(profile)
                if winner:
                    data={'winner':winner}
                else:
                    profileObj=getObj(profile)
                    question={'text':profileObj.question,'num':profileObj.ques_num}
                    assets=profileObj.asset
                    if(profile.ques_id == old_id):
                        data={'question':question,'winner':winner,'assets':assets,'correct':False}
                    else:
                        data={'question':question,'winner':winner,'assets':assets,'correct':True}
                return JsonResponse(data)
        else:
            if checkForWin(profile):
                return redirect(reverse_lazy('winner'))
            form=AnswerForm()
            profileObj=getObj(profile)
            question={'text':profileObj.question,'num':profileObj.ques_num}
            assets=profileObj.asset
            return render(request,'quest.html',{'question':question,'form':form,'assets':assets})
    else:
        return render(request,'conclude.html')

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