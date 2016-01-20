import socket

from django.conf import settings


# This beast returns the ip address of the host machine
def get_host_ip():
    return [l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 80)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip



def get_session_id(request):
    if not request.session.get('has_session'):
        request.session['has_session'] = True
    return request.session.session_key

# ,'session_id':get_session_id(request)}
