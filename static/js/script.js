document.querySelector('.check').addEventListener("click",check);
function check(e){
    let form=$('#answer-form')
    $('#answer-form #id_answer').val($('#temp-ans').val())
    $.ajax({
        type:'POST',
        url: form.attr("action"),
        data:form.serialize(),
        success:function(response){
            const response_div = document.getElementById("response");
            if(response.winner === true){
                location.reload();
            }
            else{
                if(response.correct === true){
                    response_div.innerHTML=`
                        <div class="alert alert-block alert-success">
                            <ul class="m-0">
                                <li>
                                    Great, Fetching Your Next Quest!
                                </li>
                            </ul>
                        </div>
                    `;
                    setTimeout(()=>location.reload(),2000);
                }
                else if(response.correct === false){
                    response_div.innerHTML=`
                        <div class="alert alert-block alert-danger">
                            <ul class="m-0">
                                <li>
                                    Sorry, You Must Think Like A Hacker To Get It Right.
                                </li>
                            </ul>
                        </div>
                    `;
                    setTimeout(()=>response_div.innerHTML="",5000)
                }
                else{
                    console.log('no match')
                }
            }
        },
        error: function(response){
            console.log('error')
        }
    });
};