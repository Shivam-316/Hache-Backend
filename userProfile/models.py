  
from django.db import models
from django.contrib.auth.models import User
from quesAns.models import Question
# Create your models here.

class Profile (models.Model):
    def num_ques():
        return Question.objects.all().count()
    
    user=models.OneToOneField(User,on_delete=models.CASCADE)
    ques_id=models.IntegerField(verbose_name='Question At',default=1)
    score=models.IntegerField(default=0)
    data=models.TextField(default="<2020-12-8T20:41:00,0>")
    correct=models.IntegerField(default=0)
    total_ques=models.IntegerField(verbose_name='Total Questions',default=num_ques)
    winner=models.BooleanField(default=False)

    class Meta:
        ordering=['score']
        
    def __str__(self):
        return f'{self.user.username}\'s Profile'