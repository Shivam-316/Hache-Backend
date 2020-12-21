import hashlib
def getSha(answer):
    answer=answer.lower()
    salt="WCpVjZfhn5C8iCJS".encode()
    return hashlib.sha512(answer.encode() + salt).hexdigest()