import json
import os
from urllib.parse import parse_qs
from beaker.middleware import SessionMiddleware

# Opciones de sesión de Beaker
session_opts = {
    'session.type': 'file',
    'session.cookie_expires': True,
    'session.data_dir': '/tmp/sessions',
    'session.auto': True
}

#Calcular la ruta absoluta de esta carpeta de forma segura
BASE_DIR = os.path.dirname(__file__)

def application_logic(environ, start_response):
    # Sesiones
    session = environ['beaker.session']
    if 'visitas' not in session:
        session['visitas'] = 1
    else:
        session['visitas'] += 1
    session.save()

    query_string = environ.get('QUERY_STRING', '')
    parametros = parse_qs(query_string)
    
    #Petición AJAX  para los perfiles
    if 'fetch_data' in parametros:
        ci = parametros['fetch_data'][0]
        try:
            ruta_perfil = os.path.join(BASE_DIR, f'Profiles/{ci}/profile.json')
            with open(ruta_perfil, 'r', encoding='utf-8') as f:
                datos = f.read()
            start_response('200 OK', [('Content-Type', 'application/json')])
            return [datos.encode('utf-8')]
        except FileNotFoundError:
            start_response('404 Not Found', [('Content-Type', 'application/json')])
            return [b'{"error": "No encontrado"}']

    #Carga normal del index.html
    try:
        ruta_index = os.path.join(BASE_DIR, 'index.html')
        with open(ruta_index, 'r', encoding='utf-8') as f:
            html = f.read()
        start_response('200 OK', [('Content-Type', 'text/html; charset=utf-8')])
        return [html.encode('utf-8')]
    except Exception as e:
        start_response('500 Internal Server Error', [('Content-Type', 'text/plain')])
        return [f'Error interno de Python: {str(e)}'.encode('utf-8')]

application = SessionMiddleware(application_logic, session_opts)