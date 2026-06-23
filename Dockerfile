FROM ubuntu:latest

# Evitar que la consola pida la zona horaria
ENV DEBIAN_FRONTEND=noninteractive

# Instalar Apache, Python3, pip y el módulo WSGI
RUN apt-get update && apt-get install -y \
    apache2 \
    python3 \
    python3-pip \
    libapache2-mod-wsgi-py3

# Instalar la librería Beaker
RUN pip3 install Beaker --break-system-packages

# Habilitar el módulo WSGI en Apache 
RUN a2enmod wsgi

# Borrar la página de bienvenida por defecto de Apache
RUN rm -f /var/www/html/index.html

# Copiar  al directorio de Apache
WORKDIR /var/www/html/ATI
COPY . /var/www/html/ATI/

RUN echo "WSGIScriptAlias /ATI/index.py /var/www/html/ATI/index.py" >> /etc/apache2/sites-available/000-default.conf
RUN echo "RedirectMatch ^/$ /ATI/index.py" >> /etc/apache2/apache2.conf

# Exponer el puerto 80 y mantener Apache en primer plano
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]