
# Instalación de LAMP en Ubuntu

## LAMP

El comando básico para instalar el stack completo es:

```bash
sudo apt install mariadb-server mariadb-client apache2 php libapache2-mod-php php-mysql php-curl php-json php-cgi php-pear php-gd php-apcu
```

---

## Apache

Primero, habilitamos el servicio:

```bash
sudo systemctl enable apache2
sudo systemctl start apache2
sudo systemctl status apache2
```

Ahí verificamos si está iniciado correctamente. Si muestra “active (running)”, está todo bien.

Podés abrir el navegador e ingresar la IP del servidor o `localhost` para ver la página por defecto de Apache.

---

## MariaDB

Para configurar la base de datos, usamos:

```bash
sudo mysql_secure_installation
```

Le puse contraseña, eliminé lo innecesario, pero dejé el acceso remoto para el usuario root porque me facilita las cosas en entorno local.

Luego habilitamos el servicio igual que antes:

```bash
sudo systemctl enable mariadb
sudo systemctl start mariadb
```

---

## Prueba de PHP

Creamos un archivo de prueba para ver si PHP está funcionando:

```bash
sudo nano /var/www/html/index.php
```

Y escribimos lo siguiente:

```php
<?php
phpinfo();
?>
```

Guardamos el archivo, abrimos la IP del servidor en el navegador y, si todo está bien, debería mostrarse la página de información de PHP.

---

## SSL (Secure Socket Layer)

SSL es un protocolo de seguridad que cifra las comunicaciones en Internet para proteger la privacidad y la integridad de los datos, evitando que terceros los intercepten.

Vamos a activarlo y hacer que todos los sitios usen el puerto 443 antes que el 80:

```bash
sudo a2enmod ssl
sudo a2ensite default-ssl.conf
sudo systemctl restart apache2
```

Después de reiniciar Apache, entramos al sitio web.  
Al ser un certificado autofirmado, el navegador mostrará una advertencia, pero podemos continuar igual.

En ese punto ya tendremos HTTPS funcionando.

---

## Fuentes

- [Como instalar y configurar Ubuntu Server 24.04 - Tutorial COMPLETO](https://www.youtube.com/watch?v=BCVQqMnt8XE)
    

