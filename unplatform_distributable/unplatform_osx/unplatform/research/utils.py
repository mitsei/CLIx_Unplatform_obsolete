import socket

# This beast is a stand in. It returns the ip address of the host
# machine. It needs to be modified for when no IP is assigned
# It doesn't work on mac (sometimes?) and should be replaced/rewritten
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

# REMOTE_SERVER can be set to any remote server to check for internet connectivity
REMOTE_SERVER = "www.google.co.in"
def is_connected():
  try:
    host = socket.gethostbyname(REMOTE_SERVER)
    s = socket.create_connection((host, 80), 2)
    return True
  except:
     pass
  return False