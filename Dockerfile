FROM ubuntu:latest

# Evitar prompts interactivos durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

#Instalar Apache, Python3, pip, WSGI y GIT
RUN apt-get update && apt-get install -y \
    apache2 \
    python3 \
    python3-pip \
    libapache2-mod-wsgi-py3 \
    git

#Instalar Beaker globalmente para las sesiones (sin conflictos de entorno)
RUN pip3 install Beaker --break-system-packages

#Habilitar el módulo WSGI en Apache 
RUN a2enmod wsgi

#Borrar la página de bienvenida por defecto de Apache
RUN rm -f /var/www/html/index.html

#Copiar todo a el directorio de trabajo
WORKDIR /var/www/html/ATI
COPY . /var/www/html/ATI/

#Configurar WSGI, el nombre del servidor y la redirección automática
RUN echo "WSGIScriptAlias /ATI/index.py /var/www/html/ATI/index.py" >> /etc/apache2/sites-available/000-default.conf && \
    echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    echo "RedirectMatch ^/$ /ATI/index.py" >> /etc/apache2/apache2.conf

#Exponer el puerto 80 y mantener Apache en primer plano
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]