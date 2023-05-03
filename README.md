# **Backend Coderhouse** #


Estructura del proyecto:

### >>> main.js 

    Se crea un servidor web utilizando  Express y Socket.io para permitir la comunicación en tiempo real.

    Se utiliza un sistema de sesiones y autenticación para permitir que los usuarios inicien sesión y mantengan su información en una sesión segura mientras navegan por el servidor.

    El servidor utiliza el motor de plantillas Handlebars para renderizar las páginas web que se muestran a los usuarios.

    Se utiliza el paquete de base de datos MongoDB para almacenar y recuperar información de usuarios, productos y chats en la aplicación.

    Por último, se utiliza el módulo de clúster para crear múltiples procesos de servidor y distribuir la carga de trabajo entre ellos para mejorar el rendimiento y la escalabilidad.

### >>> Class (folder)

    Se definen las clases necesarias (DAO) para trabajar con usuarios, productos y chats, tanto en la persistencia de memoria como de base de datos (MONGODB) 

    Incluyen las funcionalidades de:
        - agregar, borrar, buscar por 'id', o   buscar todos los productos
        - agregar o buscar mensajes
        - crear o buscar usuarios 
     

    Se establece un Factory para las clases de persistencia en memoria y en MONGODB, que crea y retorna una instancia de una clase 'Dao'.

    Dependiendo si del valor de la variable 'persistence' es definida como "MEMORY", los objetos DAO se crearán a partir de la persistencia de memoria, o si es diferente a "MEMORY", se crearan a partir de la base de datos de 'MONGODB'. Esto permite cambiar fácilmente la forma en que los datos se almacenan y se acceden en la aplicación.

### >>> Controllers (folder)

    Permiten interactuar con la capa de servicio y realizar operaciones CRUD (crear, leer, actualizar y eliminar) en la base de datos.
     Hay controladores para los recursos de productos, chats y usuarios.
     
    Cada controlador tiene funciones específicas, como agregar un nuevo producto, obtener todos los productos, obtener un producto por ID y eliminar un producto. 
    
    Estos controladores utilizan los 'DTO' que se encargan de transferir los datos entre la capa de controlador y la capa de servicio. Los DTO proporcionan una forma de estandarizar los datos enviados y asegurar que se cumplan ciertas reglas de validación.


### >>> DB (folder)

    Se encuntra la configuracion de autenticacion, conexion con la base de datos y models/schemas para la misma.

    Se utiliza 'Passport' para manejar la autenticación y autorización de usuarios en una aplicación. Se define dos estrategias de autenticación, 'login' y 'signup' para buscar o crear usuarios en la base de datos. También define las funciones de serialización y deserialización de Passport, que se utilizan para convertir los objetos de usuario en identificadores únicos y viceversa.

    Se establece una conexión a una base de datos MongoAtlas y se configura una sesión de usuario. Si no hay una conexión activa, se establece una nueva y se configura una sesión, si ya hay una conexión establecida no se realiza ninguna acción adicional.

    Se definen cuatro esquemas de modelo diferentes para productos, usuarios, chats y carrito. Cada uno de ellos describe los campos y tipos de datos que se almacenan en la base de datos. 
    Luego se crean modelos de datos a partir de los esquemas definidos, lo que permite interactuar con los datos almacenados en la base de datos

### >>> dto (folder)

    Se define un conjunto de funciones CRUD  para productos, usuarios y chats, utilizando un DAO que se obtiene mediante una la funcion 'getDao', roporcionando un nivel de abstracción adicional para el manejo de datos en la aplicación, lo que facilitaría el mantenimiento y la escalabilidad del código.

### >>> enviroments

    Se definen variables mas afines a Javascript, para manejar las variables de entorno.

### >>> logger

    Se configura y exporta un objeto 'logger' que puede ser utilizado para registrar eventos y mensajes en varios archivos de registro, así como en la consola. 

    Se configuran tres archivos de registro separados para diferentes niveles de severidad (información, advertencia y error), y se configuran tres objetos de filtro de nivel para enviar los mensajes de registro correspondientes al archivo correcto. 

### >>> messages (folder)

        Se configura y exportan funciones para enviar SMS, email y whatsapp con las librerias de Twilio y Nodemailer, con sus parametros pertinentes para cada situacion.

### >>> normalizr

        Se utiliza la librería 'normalizr' para normalizar los datos de un chat, donde cada chat tiene un usuario y múltiples mensajes. 
        
        Se definen tres entidades: usuario, mensaje y chat, y luego se usa la entidad chat para normalizar los datos.

### >>> public (folder)
        
        Se encarga de realizar distintas acciones cuando se conecta al servidor y recibe datos del mismo. 
            - enviar un mensaje de desconexión al servidor cuando el usuario hace clic en un botón
            - enviar datos de un formulario al servidor cuando se hace clic en el botón de enviar
            - mostrar los productos y chats recibidos del servidor
        Tambien se encuentran los estilos CSS y los uploads de 'avatar/imagen'.

### >>> routes (folder)

    Se configuran y exportan modulos  para manejar las rutas de productos y usuarios respectivamente. Tambien se configura la ruta de información del servidor.

    El prodRouter maneja las rutas relacionadas con los productos, incluyendo su creación, lectura, actualización y eliminación, y se comunica con el controlador correspondiente para llevar a cabo estas acciones. 
    
    El sessionRouter maneja las rutas relacionadas con el inicio y cierre de sesión de los usuarios, y se configura la autenticación y el control de acceso. 
    
    El infoRouter maneja rutas que proporcionan información sobre el servidor.

### >>> views (folder)

    Se utiliza 'Handlebars' para crear la estructura de la pagina, el formato y junto a los 'partials', los formularios necesarios para la visualizacion de la pagina.

### >>> error.log | info.log | warn.log

    Se documentan los errores, advertencias o logs gestionados en el proyecto, en un archivo independiente para cada tipo de error.
    
## Desafio entregable 18 ~ GraphQL

En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL. 
Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.
Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.


## Desafio entregable 17 ~ esquema API RESTful

Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful en capas planteado en esta clase.
Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, negocio, validaciones, persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).
No hace falta realizar un cliente ya que utilizaremos tests para verificar el correcto funcionamiento de las funcionalidades desarrolladas.

Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.
Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.
Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.
Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.


----------------------------------------------------------------
## Desafio entregable 16 ~ Mejorar arquitectura de API

Modificar la capa de persistencia incorporando los conceptos de Factory, DAO, y DTO.

Los DAOs deben presentar la misma interfaz hacia la lógica de negocio de nuestro servidor.

El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con el.

Cada uno de estos casos de persistencia, deberán ser implementados usando el patrón singleton que impida crear nuevas instancias de estos mecanismos de acceso a los datos.

Comprobar que si llamo a la factory dos veces, con una misma opción elegida, devuelva la misma instancia.

Implementar el patrón Repository para la persistencia de productos y mensajes.

----------------------------------------------------------------
## Desafio Entregable 15 ~ Dividir en capas el proyecto

Dividir en capas el proyecto entregable con el que venimos trabajando (entregable clase 16: loggers y profilers), agrupando apropiadamente las capas de ruteo, controlador, lógica de negocio y persistencia.

Considerar agrupar las rutas por funcionalidad, con sus controladores, lógica de negocio con los casos de uso, y capa de persistencia.

La capa de persistencia contendrá los métodos necesarios para atender la interacción de la lógica de negocio con los propios datos.

----------------------------------------------------------------

## Tercer entrega de proyecto final

Se debe entregar:

- Un menú de registro y autenticación de usuarios basado en passport local, guardando en la base de datos las credenciales y el resto de los datos ingresados al momento del registro. 

    - El registro de usuario consiste en crear una cuenta en el servidor almacenada en la base de datos, que contenga el email y password de usuario, además de su nombre, dirección, edad, número de teléfono (debe contener todos los prefijos internacionales) y foto ó avatar. La contraseña se almacenará encriptada en la base de datos.

    - La imagen se podrá subir al servidor y se guardará en una carpeta pública del mismo a la cual se tenga acceso por url.

- Un formulario post de registro y uno de login. De modo que, luego de concretarse cualquiera de estas operaciones en forma exitosa, el usuario accederá a su home.

    - El usuario se logueará al sistema con email y password y tendrá acceso a un menú en su vista, a modo de barra de navegación. Esto le permitirá ver los productos totales con los filtros que se hayan implementado y su propio carrito de compras e información propia (datos de registro con la foto). Además, dispondrá de una opción para desloguearse del sistema.

    - Ante la incorporación de un usuario, el servidor enviará un email al administrador con todos los datos de registro y asunto 'nuevo registro', a una dirección que se encuentre por el momento almacenada en una constante global.

- Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

    - El usuario iniciará la acción de pedido en la vista del carrito.

    - Será enviado una vez finalizada la elección para la realizar la compra de productos.

    - El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

    - El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

Aspectos a incluir:

    - El servidor trabajará con una base de datos DBaaS (Ej. MongoDB Atlas) y estará preparado para trabajar en forma local o en la nube a través de la plataforma PaaS Heroku.
    - Habilitar el modo cluster para el servidor, como opcional a través de una constante global.
    - Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
    - Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.

----------------------------------------------------------------

## Desafio Entregable 14 ~ Loggers y gzip

Incorporar al proyecto de servidor de trabajo la compresión gzip.

Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro.

Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
- Ruta y método de todas las peticiones recibidas por el servidor (info)
- Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
- Errores lanzados por las apis de mensajes y productos, únicamente (error)

Considerar el siguiente criterio:
- Loggear todos los niveles a consola (info, warning y error)
- Registrar sólo los logs de warning a un archivo llamada warn.log
- Enviar sólo los logs de error a un archivo llamada error.log

Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.

Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. Además desactivaremos el child_process de la ruta '/randoms'.

Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:
1) El perfilamiento del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process. 

    Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

    Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola).

2) El perfilamiento del servidor con el modo inspector de node.js --inspect. Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección.

3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes). 

----------------------------------------------------------------

## Desafio Entregable 13 ~ Servidor con balance de carga

Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.

- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.

Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

Aspectos a incluir en el entregable:

Incluir el archivo de configuración de nginx junto con el proyecto.

Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.

Ejemplo:

    - pm2 start ./miservidor.js -- --port=8080 --modo=fork
    - pm2 start ./miservidor.js -- --port=8081 --modo=cluster
    - pm2 start ./miservidor.js -- --port=8082 --modo=fork

----------------------------------------------------------------
## Desafio Entegable 12 ~ Objeto process

Sobre el proyecto del último desafío entregable, mover todas las claves y credenciales utilizadas a un archivo .env, y cargarlo mediante la librería dotenv.

La única configuración que no va a ser manejada con esta librería va a ser el puerto de escucha del servidor. Éste deberá ser leído de los argumento pasados por línea de comando, usando alguna librería (minimist o yargs). En el caso de no pasar este parámetro por línea de comandos, conectar por defecto al puerto 8080.

Observación: por el momento se puede dejar la elección de sesión y de persistencia explicitada en el código mismo. Más adelante haremos también parametrizable esta configuración.

Agregar una ruta '/info' que presente en una vista sencilla los siguientes datos:
- Argumentos de entrada                                       
- Path de ejecución
- Nombre de la plataforma (sistema operativo)       
- Process id
- Versión de node.js                                               
- Carpeta del proyecto
- Memoria total reservada (rss)

Agregar otra ruta '/api/randoms' que permita calcular un cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query).
Por ej: /randoms?cant=20000.

Si dicho parámetro no se ingresa, calcular 100.000.000 números.

El dato devuelto al frontend será un objeto que contendrá como claves los números random generados junto a la cantidad de veces que salió cada uno. Esta ruta no será bloqueante (utilizar el método fork de child process). Comprobar el no bloqueo con una cantidad de 500.000.000 de randoms.

Observación: utilizar routers y apis separadas para esta funcionalidad.

----------------------------------------------------------------
## Desafio Entregable 11 ~ Inicio de sesion

Implementar sobre el entregable que venimos realizando un mecanismo de autenticación. Para ello:

- Se incluirá una vista de registro, en donde se pidan email y contraseña. Estos datos se persistirán usando MongoDb, en una (nueva) colección de usuarios, cuidando que la contraseña quede encriptada (sugerencia: usar la librería bcrypt).
- Una vista de login, donde se pida email y contraseña, y que realice la autenticación del lado del servidor a través de una estrategia de passport local.
- Cada una de las vistas (logueo - registro) deberá tener un botón para ser redirigido a la otra.
- Una vez logueado el usuario, se lo redirigirá al inicio, el cual ahora mostrará también su email, y un botón para desolguearse.
- Además, se activará un espacio de sesión controlado por la sesión de passport. Esta estará activa por 10 minutos y en cada acceso se recargará este tiempo.
- Agregar también vistas de error para login (credenciales no válidas) y registro (usuario ya registrado).
El resto de la funciones, deben quedar tal cual estaban el proyecto original.

----------------------------------------------------------------
## Desafio Entregable 10 ~ Log-in por formulario

Continuando con el desafío de la clase anterior, vamos a incorporar un mecanismo sencillo que permite loguear un cliente por su nombre, mediante un formulario de ingreso.

Luego de que el usuario esté logueado, se mostrará sobre el contenido del sitio un cartel con el mensaje “Bienvenido” y el nombre de usuario. Este cartel tendrá un botón de deslogueo a su derecha.

Verificar que el cliente permanezca logueado en los reinicios de la página, mientras no expire el tiempo de inactividad de un minuto, que se recargará con cada request. En caso de alcanzarse ese tiempo, el próximo request de usuario nos llevará al formulario de login.

Al desloguearse, se mostrará una vista con el mensaje de 'Hasta luego' más el nombre y se retornará automáticamente, luego de dos segundos, a la vista de login de usuario.

Detalles del entregable: 

- La solución entregada deberá persistir las sesiones de usuario en Mongo Atlas.
- Verificar que en los reinicios del servidor, no se pierdan las sesiones activas de los clientes.
- Mediante el cliente web de Mongo Atlas, revisar los id de sesión correspondientes a cada cliente y sus datos.
- Borrar una sesión de cliente en la base y comprobar que en el próximo request al usuario se le presente la vista de login.
- Fijar un tiempo de expiración de sesión de 10 minutos recargable con cada visita del cliente al sitio y verificar que si pasa ese tiempo de inactividad el cliente quede deslogueado.

----------------------------------------------------------------
## Desafio Entregable 9 ~ Mocks y normalizacion

Sobre el desafío entregable de la clase 16, crear una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con 5 productos generados al azar utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Elegir apropiadamente los temas para conformar el objeto ‘producto’ (nombre, precio y foto).

Ahora, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).
El nuevo formato de mensaje será:

    {
    author: {
        id: 'mail de usuario',
        nombre: 'nombre del usuario',
        apellido: 'apellido del usuario',
        edad: 'edad del usuario',
        alias: 'alias del usuario',
        avatar: 'url avatar (foto, logo) del usuario'
        },
    text: 'mensaje del usuario'
    }

Aspectos a incluir en el entregable: 

- Modificar la persistencia de los mensajes para que utilicen un contenedor que permita guardar objetos anidados (archivos, mongodb, firebase).

- El mensaje se envía del frontend hacia el backend, el cual lo almacenará en la base de datos elegida. Luego cuando el cliente se conecte o envie un mensaje, recibirá un array de mensajes a representar en su vista. 

- El array que se devuelve debe estar normalizado con normalizr, conteniendo una entidad de autores. Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un id para todo el array en su conjunto (podemos asignarle nosotros un valor fijo).
Ejemplo: { id: ‘mensajes’, mensajes: [ ] }

- El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.

- Considerar que se puede cambiar el nombre del id que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo:
const schemaAuthor = new schema.Entity('author',{...},{idAttribute: 'email'});
En este schema cambia el nombre del id con que se normaliza el nombre de los autores a 'email'. Más info en la web oficial.  

- Presentar en el frontend (a modo de test) el porcentaje de compresión de los mensajes recibidos. Puede ser en el título del centro de mensajes.


>> Nota: incluir en el frontend el script de normalizr de la siguiente cdn: https://cdn.jsdelivr.net/npm/normalizr@3.6.1/dist/normalizr.browser.min.js
Así podremos utilizar los mismos métodos de normalizr que en el backend. Por ejemplo:  new normalizr.schema.Entity , normalizr.denormalize(...,...,...)

----------------------------------------------------------------

## Segunda Entrega de proyecto final

Basándose en los contenedores ya desarrollados (memoria, archivos) desarrollar dos contenedores más (que cumplan con la misma interfaz) que permitan realizar las operaciones básicas de CRUD en MongoDb (ya sea local o remoto) y en Firebase. Luego, para cada contenedor, crear dos clases derivadas, una para trabajar con Productos, y otra para trabajar con Carritos.

Aspectos a incluir en el entregable: 
- A las clases derivadas de los contenedores se las conoce como DAOs (Data Access Objects), y pueden ir todas incluidas en una misma carpeta de ‘daos’.

- En la carpeta de daos, incluir un archivo que importe todas las clases y exporte una instancia de dao de productos y una de dao de carritos, según corresponda. Esta decisión se tomará en base al valor de una variable de entorno cargada al momento de ejecutar el servidor (opcional: investigar el uso de imports dinámicos).

- Incluir un archivo de configuración (config) que contenga los datos correspondientes para conectarse a las bases de datos o medio de persistencia que corresponda.

Opcional:
Hacer lo mismo para bases de datos relacionales: MariaDB/SQLite3.

----------------------------------------------------------------
## Desafio Entregable 8 ~ MONGODB

Utilizando Mongo Shell, crear una base de datos llamada ecommerce que contenga dos colecciones: mensajes y productos.

Agregar 10 documentos con valores distintos a las colecciones mensajes y productos. El formato de los documentos debe estar en correspondencia con el que venimos utilizando en el entregable con base de datos MariaDB. 

Definir las claves de los documentos en relación a los campos de las tablas de esa base. En el caso de los productos, poner valores al campo precio entre los 100 y 5000 pesos(eligiendo valores intermedios, ej: 120, 580, 900, 1280, 1700, 2300, 2860, 3350, 4320, 4990). 

Listar todos los documentos en cada colección.

Mostrar la cantidad de documentos almacenados en cada una de ellas.

Realizar un CRUD sobre la colección de productos:

- Agregar un producto más en la colección de productos 
- Realizar una consulta por nombre de producto específico:
    - Listar los productos con precio menor a 1000 pesos.
    - Listar los productos con precio entre los 1000 a 3000 pesos.
    - Listar los productos con precio mayor a 3000 pesos.
    - Realizar una consulta que traiga sólo el nombre del tercer producto más barato.

- Hacer una actualización sobre todos los productos, agregando el campo stock a todos ellos con un valor de 100.
- Cambiar el stock a cero de los productos con precios mayores a 4000 pesos. 
- Borrar los productos con precio menor a 1000 pesos 

Crear un usuario 'pepe' clave: 'asd456' que sólo pueda leer la base de datos ecommerce. Verificar que pepe no pueda cambiar la información.

----------------------------------------------------------------

## Desafio Entregable 7 ~ Primera base de datos

Tomando como base las clases Contenedor en memoria y en archivos, desarrollar un nuevo contenedor con idénticos métodos pero que funcione sobre bases de datos, utilizando Knex para la conexión. Esta clase debe recibir en su constructor el objeto de configuración de Knex y el nombre de la tabla sobre la cual trabajará. Luego, modificar el desafío entregable de la clase 11”Chat con Websocket”, y:
- cambiar la persistencia de los mensajes de filesystem a base de datos SQLite3.
- cambiar la persistencia de los productos de memoria a base de datos MariaDB.

Desarrollar también un script que utilizando knex cree las tablas necesarias para la persistencia en cuestión (tabla mensajes en sqlite3 y tabla productos en mariaDb).

>> Notas:
Definir una carpeta DB para almacenar la base datos SQLite3 llamada ecommerce

----------------------------------------------------------------

## Primera entrega de proyecto final

Consigna: Deberás entregar el estado de avance de tu aplicación eCommerce Backend, que implemente un servidor de aplicación basado en la plataforma Node.js y el módulo express. El servidor implementará dos conjuntos de rutas agrupadas en routers, uno con la url base '/productos' y el otro con '/carrito'. El puerto de escucha será el 8080 para desarrollo y process.env.PORT para producción en glitch.com

Aspectos a incluir en el entregable:

- El router base '/api/productos' implementará cuatro funcionalidades: 
    - GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores) 
    - POST: '/' - Para incorporar productos al listado (disponible para administradores) 
    - PUT: '/:id' - Actualiza un producto por su id (disponible para administradores) 
    - DELETE: '/:id' - Borra un producto por su id (disponible para administradores)

El router base '/api/carrito' implementará tres rutas disponibles para usuarios y administradores:
   - POST: '/' - Crea un carrito y devuelve su id.

   - DELETE: '/:id' - Vacía un carrito y lo elimina. 
    
   - GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito 
        
  - POST: '/:id/productos/:id_prod' - Para incorporar productos al carrito por su id de producto 
        
   - DELETE: '/:id/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto


Crear una variable booleana administrador, cuyo valor configuraremos más adelante con el sistema de login. Según su valor (true ó false) me permitirá alcanzar o no las rutas indicadas.
En el caso de recibir un request a una ruta no permitida por el perfil, devolver un objeto de error. El status http de la respuesta debe ser 403. Ejemplo: { error : -1, descripcion: ruta 'x' método 'y' no autorizada }

Un producto dispondrá de los siguientes campos: id, timestamp, nombre, descripcion, código, foto (url), precio, stock.

El carrito de compras tendrá la siguiente estructura: id, timestamp(carrito), productos: [id] El timestamp puede implementarse con Date.now()

Realizar la persistencia de productos y del carrito de compras en el filesystem.

----------------------------------------------------------------

### A tener en cuenta:

Para realizar la prueba de funcionalidad hay dos opciones: 
1. Probar con postman cada uno de los endpoints (productos y carrito) y su operación en conjunto.

2. Realizar una aplicación frontend sencilla, utilizando HTML/CSS/JS ó algún framework de preferencia, que represente el listado de productos en forma de cards.

    En cada card figuran los datos del producto, que, en el caso de ser administradores, podremos editar su información. Para este último caso incorporar los botones actualizar y eliminar. 

    También tendremos un formulario de ingreso de productos nuevos con los campos correspondientes y un botón enviar. Asimismo, construir la vista del carrito donde se podrán ver los productos agregados e incorporar productos a comprar por su id de producto. 

    Esta aplicación de frontend debe enviar los requests get, post, put y delete al servidor utilizando fetch y debe estar ofrecida en su espacio público. 

En todos los casos, el diálogo entre el frontend y el backend debe ser en formato JSON. El servidor no debe generar ninguna vista. 

En el caso de requerir una ruta no implementada en el servidor, este debe contestar un objeto de error: ej { error : -2, descripcion: ruta 'x' método 'y' no implementada}

La estructura de programación será ECMAScript, separada tres en módulos básicos (router, lógica de negocio/api y persistencia ). Más adelante implementaremos el desarrollo en capas. 
Utilizar preferentemente clases, constructores de variables let y const y arrow function. 

Realizar la prueba de funcionalidad completa en el ámbito local (puerto 8080) y en glitch.com

----------------------------------------------------------------

## Desafio Entregable 6 ~ Websockets

 Modificar el último entregable para que disponga de un canal de websocket que permita representar, por debajo del formulario de ingreso, una tabla con la lista de productos en tiempo real. Puede haber varios clientes conectados simultáneamente y en cada uno de ellos se reflejarán los cambios que se realicen en los productos sin necesidad de recargar la vista. Cuando un cliente se conecte, recibirá la lista de productos a representar en la vista. Aspectos a incluir en el entregable:

- Para construir la tabla dinámica con los datos recibidos por websocket utilizar Handlebars en el frontend. 
- Considerar usar archivos públicos para alojar
la plantilla vacía, y obtenerla usando la función fetch( ). Recordar que fetch devuelve una promesa.

Añadiremos al proyecto un canal de chat entre los clientes y el servidor. Aspectos a incluir en el entregable:

- En la parte inferior del formulario de ingreso se presentará el centro de mensajes almacenados en el servidor, donde figuren los mensajes de todos los usuarios identificados por su email.
El formato a representar será: 
    - email (texto negrita en azul) 
    - [fecha y hora (DD/MM/YYYY HH:MM:SS)] (texto normal en marrón) 
    - mensaje (texto italic en verde)

Además incorporar dos elementos de entrada: uno para que el usuario ingrese su email (obligatorio para poder utilizar el chat) y otro para ingresar mensajes y enviarlos mediante un botón.

Los mensajes deben persistir en el servidor en un archivo (ver segundo entregable).

----------------------------------------------------------------

## Desafio Entregable 5 ~ Motores de plantillas

Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:

- Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
- Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.

Ambas páginas contarán con un botón que redirija a la otra.
Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.

Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.

Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.


----------------------------------------------------------------

## Desafio Entregable 4 ~ API RESTful

Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.

En detalle, que incorpore las siguientes rutas:

- GET '/api/productos' -> devuelve todos los productos.
- GET '/api/productos/:id' -> devuelve un producto según su id.
- POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
- PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
- DELETE '/api/productos/:id' -> elimina un producto según su id.
Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }

Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.

Incorporar el Router de express en la url base '/api/productos' y configurar todas las subrutas en base a este.

Crear un espacio público de servidor que contenga un documento index.html con un formulario de ingreso de productos con los datos apropiados.

El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080 y en caso de error, representar la descripción del mismo.

Las respuestas del servidor serán en formato JSON. La funcionalidad será probada a través de Postman y del formulario de ingreso.

----------------------------------------------------------------

## Desafio Entregable 3 ~ Servidor con Express

Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:

- Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor.
- Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles.

Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.

----------------------------------------------------------------

## Desafio Entregable 2 ~ Manejo de archivos 

Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

- save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
- getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
- getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
- deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
- deleteAll(): void - Elimina todos los objetos presentes en el archivo. 


----------------------------------------------------------------

## Desafio Entregable 1 ~ Clases ##

Declarar una clase Usuario

Hacer que Usuario cuente con los siguientes atributos: 
- nombre: String 
- apellido: String
- libros: Object[]
- mascotas: String[]

 Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

Hacer que Usuario cuente con los siguientes métodos: 
- getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
- addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
- countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
- addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
- getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.

Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
