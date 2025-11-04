# Proyecto Server

## Introducción

Hace unos meses consegui una ThinkPad t510. Le puse 8GB de RAM y un SSD de 240GB. La use por unos meses hasta que consegui una netbook nueva. Entonces decidi usar esta ThinkPad como servidor casero.

---

## Instalación de Ubuntu Server

Elegí **[Ubuntu Server](https://ubuntu.com/download/server)** por sobre Debian básicamente porque es **el estándar más usado**, con un entorno más preparado para servidores modernos.
Por lo que leí, **Debian es la base de Ubuntu**, pero es más “a pelo”, es decir, más manual y minimalista. Ubuntu, en cambio, tiene configuraciones iniciales más amigables.

Para instalarlo:

1. **Descargué la ISO** desde la web oficial.

2. **La grabé en un pendrive con Rufus**, usando la opción **DD (muy importante)**.

3. Lo instalé en una **ThinkPad T510 (8 GB de RAM, Intel i5)**.


Durante la instalación:

- Lo dejé conectado a la red.

- Activé los **drivers de terceros**.

- **No usé servidores de mi país** (la mayoría eran lentos).

- **Borré todo el disco** para hacer una instalación limpia.

- **No instalé snaps**, porque prefiero mantener el sistema liviano.


Una vez instalado, lo primero que hice fue **configurar la IP estática**.

---

## Configuración de red

Para ver el nombre de mi interfaz Wi-Fi uso:

```bash
nmcli
```

En mi caso, la interfaz que me interesa es esta:

```
wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP>
```

Eso indica que es la conexión Wi-Fi activa.
Si estuvieras por cable, probablemente sería algo como `enp0s25`.

Después de identificar la interfaz, fui al directorio:

```bash
cd /etc/netplan
```

Abrí el archivo de configuración **como root**, y modifiqué el contenido para dejar algo así:

```yaml
network:
  version: 2
  renderer: networkd
  wifis:
    wlp3s0:
      dhcp4: no
      addresses:
        - 192.168.0.13/24
      gateway4: 192.168.0.1
      nameservers:
        addresses: [8.8.8.8, 1.1.1.1]
      access-points:
        "NombreDeTuWiFi":
          password: "TuContraseña"
```

Luego probé y apliqué la configuración con:

```bash
sudo netplan apply
```

Si todo está bien configurado, el sistema conservará esa IP cada vez que inicie.

---

## Actualización del sistema

Por costumbre, lo siguiente que hago siempre después de una instalación es **actualizar el sistema**.
Primero descargo las actualizaciones:

```bash
sudo apt update
```

Y luego las instalo de forma “inteligente”, permitiendo que Ubuntu administre bien las dependencias:

```bash
sudo apt dist-upgrade
```

Esto deja el sistema completamente actualizado y listo para trabajar.

---
