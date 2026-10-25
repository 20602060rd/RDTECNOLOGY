import { FaultCategory } from '../types';

export const FAULT_CATEGORIES: FaultCategory[] = [
  {
    id: 'sistema-agua',
    name: 'Sistema de agua',
    totalFaults: 7,
    iconName: 'Droplets',
    description: 'Electroválvulas, presostatos, bombas de desagüe, mangueras y trampas de motas.',
    faults: [
      {
        id: 'agua-1',
        title: 'No entra agua a la tina',
        symptom: 'La máquina zumba suavemente al iniciar pero no ingresa agua.',
        quickCheck: 'Verificar filtros de malla de electroválvulas y presión de grifo.',
        probableCause: 'Bobina de electroválvula quemada o filtro tapado de sarro/sedimento.',
        recommendedPart: 'Electroválvula doble 110V/220V',
        guideId: 'no-llena-agua'
      },
      {
        id: 'agua-2',
        title: 'Llenado lento de agua',
        symptom: 'Tarda más de 20 minutos en llenar y marca código IE o 4E.',
        quickCheck: 'Retirar manguera y limpiar tamiz de plástico.',
        probableCause: 'Sedimentos de tubería taponando el filtro de entrada.',
        recommendedPart: 'Filtro tamiz para válvula / Electroválvula',
        guideId: 'no-llena-agua'
      },
      {
        id: 'agua-3',
        title: 'Sobrellenado o desborde de agua',
        symptom: 'El agua nunca corta y se derrama por el borde superior de la cuba.',
        quickCheck: 'Revisar si la manguerita transparente del presostato está rota o suelta.',
        probableCause: 'Manguera de presostato rajada, cámara de aire con jabón seco o diafragma de electroválvula trabado abierto.',
        recommendedPart: 'Manguera presostato siliconada / Presostato electrónico'
      },
      {
        id: 'agua-4',
        title: 'No desagua / No vacía el agua',
        symptom: 'Queda agua atrapada al llegar al enjuague o centrifugado con error OE o 5E.',
        quickCheck: 'Abrir tapón del filtro inferior y girar hélice de bomba con la mano.',
        probableCause: 'Bomba de drenaje quemada (bobina abierta) u obstrucción con monedas/ganchos.',
        recommendedPart: 'Bomba magnética de desagüe 3 tornillos 110V/220V',
        guideId: 'no-desagua'
      },
      {
        id: 'agua-5',
        title: 'Vaciado prematuro por gravedad (Efecto Sifón)',
        symptom: 'La lavadora mete agua y al mismo tiempo se va saliendo por la manguera de desagüe.',
        quickCheck: 'Medir la altura del codo de desagüe respecto al suelo.',
        probableCause: 'Manguera de desagüe instalada a ras de piso o metida muy profunda en el tubo de desagüe sin respiradero de aire.',
        recommendedPart: 'Codo soporte curvo para manguera de desagüe'
      },
      {
        id: 'agua-6',
        title: 'Sifonamiento continuo con electroválvula apagada',
        symptom: 'Con la lavadora desenchufada, la tina se llena sola lentamente de un día para otro.',
        quickCheck: 'Cerrar la llave de la pared; si para de gotear, la válvula no cierra mecánicamente.',
        probableCause: 'Resorte o empaque de goma de electroválvula deformado por impurezas o agua dura.',
        recommendedPart: 'Electroválvula nueva completa'
      },
      {
        id: 'agua-7',
        title: 'Fuga en mangueras o tina',
        symptom: 'Aparece un charco debajo del mueble durante el bombeo.',
        quickCheck: 'Inspeccionar manguera corrugada de tina a bomba y abrazaderas elásticas.',
        probableCause: 'Manguera de fuelle fisurada o abrazadera oxidada desprendida.',
        recommendedPart: 'Manguera tina-bomba corrugada con abrazadera de resorte',
        guideId: 'presenta-fugas-agua'
      }
    ]
  },
  {
    id: 'motor-movimiento',
    name: 'Motor y movimiento',
    totalFaults: 7,
    iconName: 'Cpu',
    description: 'Motores Direct Drive Inverter, motores con escobillas/correa, capacitores y poleas.',
    faults: [
      {
        id: 'mot-1',
        title: 'Motor no gira pero emite zumbido',
        symptom: 'Al empezar a agitar zumba fuertemente y no arranca el movimiento.',
        quickCheck: 'En motores con correa: intentar girar la polea con la mano con cuidado.',
        probableCause: 'Condensador de arranque desvalorizado o bobinado quemado.',
        recommendedPart: 'Condensador de trabajo permanente 45µF 250V',
        guideId: 'no-lava-o-no-agita'
      },
      {
        id: 'mot-2',
        title: 'Gira únicamente hacia un solo sentido',
        symptom: 'En vez de hacer vaivén izquierda-derecha, gira siempre a un lado enrollando las prendas.',
        quickCheck: 'Medir voltaje alterno en los dos terminales de bobinado del motor.',
        probableCause: 'Uno de los triacs de inversión en la tarjeta electrónica está abierto o dañado.',
        recommendedPart: 'Triac de potencia BTA16-600 o tarjeta de control principal'
      },
      {
        id: 'mot-3',
        title: 'Pérdida de fuerza de lavado con carga',
        symptom: 'Vacía gira bien, pero al meter ropa no puede mover el agua.',
        quickCheck: 'Comprobar tensión de correa y estrías plásticas del buje de la turbina/agitador.',
        probableCause: 'Correa estirada o estrías del agitador barridas.',
        recommendedPart: 'Correa acanalada 4PJ/5PJ / Buje estriado de agitador'
      },
      {
        id: 'mot-4',
        title: 'No acopla el centrifugado (Gira solo el agitador)',
        symptom: 'Al centrifugar el agitador gira a gran velocidad pero el tambor grande permanece quieto arrugando la ropa.',
        quickCheck: 'Revisar actuador de cambio (shift actuator) o kit de engranajes levas (splutch).',
        probableCause: 'Leva de embrague rota o motorcito del actuador quemado.',
        recommendedPart: 'Actuador Whirlpool / Mabe / Kit Splutch',
        guideId: 'no-centrifuga'
      },
      {
        id: 'mot-5',
        title: 'Correa resbalada o rota en el piso',
        symptom: 'Se escucha el motor girar libremente a alta velocidad pero el tambor está inmóvil.',
        quickCheck: 'Retirar tapa trasera metálica para verificar si la correa cayó al piso.',
        probableCause: 'Correa cuarteada por grasa o polea del tambor desalineada.',
        recommendedPart: 'Correa poly-V de repuesto original'
      },
      {
        id: 'mot-6',
        title: 'Falla en sensor Hall (Error LE / 3E en Inverter)',
        symptom: 'El tambor hace un amago de giro de 2 cm, se detiene y marca error LE o 3E.',
        quickCheck: 'Medir voltajes de señal (0-12V) en conector del sensor Hall al girar el rotor a mano.',
        probableCause: 'Circuito integrado de efecto Hall averiado por vibración o calor.',
        recommendedPart: 'Sensor de posición Hall LG Direct Drive / Samsung'
      },
      {
        id: 'mot-7',
        title: 'Tacómetro descalibrado o motor desbocado',
        symptom: 'El motor arranca súbitamente a máxima velocidad sin control en el primer segundo.',
        quickCheck: 'Medir bobina del tacogenerador en la cola del motor (debe medir 60-150 Ω).',
        probableCause: 'Imán del tacómetro desprendido del eje del motor o bobina abierta.',
        recommendedPart: 'Bobina tacométrica / Imán de eje de motor'
      }
    ]
  },
  {
    id: 'sistema-electrico',
    name: 'Sistema eléctrico',
    totalFaults: 6,
    iconName: 'Zap',
    description: 'Líneas de alimentación, interruptores diferenciales, fusibles y protecciones térmicas.',
    faults: [
      {
        id: 'elec-1',
        title: 'Completamente muerta / No enciende',
        symptom: 'No enciende ningún led ni emite sonido al conectar al tomacorriente.',
        quickCheck: 'Medir continuidad del fusible de entrada y voltaje de red de 110V/220V.',
        probableCause: 'Fusible cerámico fundido por pico de tensión o transformador/fuente quemada.',
        recommendedPart: 'Fusible 12A 250V / Kit de fuente de poder',
        guideId: 'no-enciende'
      },
      {
        id: 'elec-2',
        title: 'Dispara el interruptor diferencial o breaker',
        symptom: 'Al iniciar ciclo salta la protección eléctrica del hogar inmediatamente.',
        quickCheck: 'Desconectar sucesivamente resistencia, motor y bomba para aislar el elemento derivado.',
        probableCause: 'Resistencia calefactora perforada con fuga a masa o bobinado de motor con aislamiento roto.',
        recommendedPart: 'Resistencia eléctrica de inmersión / Motor'
      },
      {
        id: 'elec-3',
        title: 'Sensación de corriente o cosquilleo en el chasis',
        symptom: 'Al tocar la chapa metálica de la lavadora se siente descarga eléctrica.',
        quickCheck: 'Medir voltaje entre gabinete y tierra física con multímetro.',
        probableCause: 'Instalación eléctrica sin polo a tierra y filtro RFI descargando masa parásita.',
        recommendedPart: 'Conexión a jabalina de puesta a tierra / Filtro RFI nuevo'
      },
      {
        id: 'elec-4',
        title: 'Fusible térmico abierto',
        symptom: 'La máquina se apagó a mitad del secado o centrifugado y no volvió a prender.',
        quickCheck: 'Medir continuidad del protector térmico adosado al estator del motor.',
        probableCause: 'Sobrecalentamiento del motor por sobrecarga de ropa o ventilación bloqueada.',
        recommendedPart: 'Protector térmico de motor bimetálico 135°C'
      },
      {
        id: 'elec-5',
        title: 'Caída de tensión severa en arranque',
        symptom: 'Las luces de la casa parpadean y la lavadora se reinicia al arrancar el motor.',
        quickCheck: 'Medir caída de voltaje en la toma durante el arranque del motor.',
        probableCause: 'Cable de extensión demasiado delgado o empalmes sulfatados en la instalación doméstica.',
        recommendedPart: 'Circuito eléctrico independiente calibre 12 AWG con toma polo a tierra'
      },
      {
        id: 'elec-6',
        title: 'Cableado sulfatado o roído por roedores',
        symptom: 'Fallos erráticos e intermitentes en diferentes componentes.',
        quickCheck: 'Inspeccionar el arnés inferior de cables y la resina protectora.',
        probableCause: 'Roedores en el piso o sulfato verde por humedad salina.',
        recommendedPart: 'Arnés de cableado reparado con termocontraíble y limpiador dieléctrico'
      }
    ]
  },
  {
    id: 'electronica-tarjetas',
    name: 'Electrónica y tarjetas',
    totalFaults: 5,
    iconName: 'Microchip',
    description: 'Módulos de potencia Inverter, tarjetas de interfaz display, microcontroladores y sensores.',
    faults: [
      {
        id: 'elct-1',
        title: 'Reinicios aleatorios en mitad del ciclo',
        symptom: 'La lavadora se apaga y vuelve a prender como si se desconectara sola.',
        quickCheck: 'Verificar soldaduras frías en condensadores electrolíticos de filtrado.',
        probableCause: 'Condensadores desvalorizados en la etapa de 5V o regulador 7805 recalentado.',
        recommendedPart: 'Condensadores electrolíticos 1000µF 25V / Regulador L7805'
      },
      {
        id: 'elct-2',
        title: 'Triac de bomba o válvula en cortocircuito permanente',
        symptom: 'Apenas se conecta a la toma de corriente, la bomba de desagüe se enciende sin pulsar nada.',
        quickCheck: 'Medir continuidad entre terminales MT1 y MT2 del triac en la placa.',
        probableCause: 'Triac SMD perforado por un corto anterior en la bomba.',
        recommendedPart: 'Triac SMD ACS108-6S o Z0103MN'
      },
      {
        id: 'elct-3',
        title: 'Display congelado o dígitos parpadeando incoherentes',
        symptom: 'Muestra caracteres incompletos y los botones no responden al tacto.',
        quickCheck: 'Limpiar cinta flex o conector de comunicación entre tarjeta de display y placa de potencia.',
        probableCause: 'Humedad en los pulsadores de membrana o microchip display dañado.',
        recommendedPart: 'Tarjeta de interfaz de usuario / Pulsadores microswitch'
      },
      {
        id: 'elct-4',
        title: 'Error de comunicación entre placas (Error E6 / AE)',
        symptom: 'A los 10 segundos de encender marca código de pérdida de bus de datos.',
        quickCheck: 'Medir continuidad en los 3 cables del bus serial entre frontal y potencia.',
        probableCause: 'Optoacoplador de aislamiento de comunicación dañado en la tarjeta principal.',
        recommendedPart: 'Optoacoplador PC817 / Tarjeta principal'
      },
      {
        id: 'elct-5',
        title: 'Sulfatación y daño por humedad bajo la resina epóxica',
        symptom: 'Pistas de cobre carcomidas por vapor de agua y espuma desbordada.',
        quickCheck: 'Retirar con bisturí la silicona en la zona oscurecida de la tarjeta.',
        probableCause: 'Fuga interna de agua que penetró la carcasa de la placa de control.',
        recommendedPart: 'Reconstrucción de pistas con hilo esmaltado y sellado de laca dieléctrica'
      }
    ]
  },
  {
    id: 'lavado-temperatura',
    name: 'Lavado y temperatura',
    totalFaults: 5,
    iconName: 'Flame',
    description: 'Resistencias calefactoras de inmersión, sensores termistores NTC y termostatos de seguridad.',
    faults: [
      {
        id: 'lav-1',
        title: 'No calienta el agua en ciclos de lavado caliente',
        symptom: 'El vidrio frontal permanece completamente frío y el ciclo se prolonga indefinidamente.',
        quickCheck: 'Medir resistencia de la resistencia calefactora con multímetro en ohmios.',
        probableCause: 'Resistencia eléctrica abierta (quemada) o relé de calefacción en la placa desoldado.',
        recommendedPart: 'Resistencia 2000W 110V/220V con sensor NTC'
      },
      {
        id: 'lav-2',
        title: 'Resistencia calefactora abierta o cortada',
        symptom: 'Lectura de OL / infinito entre los dos terminales de la resistencia.',
        quickCheck: 'Colocar multímetro en rango 200 Ω: debe medir entre 15 Ω y 30 Ω.',
        probableCause: 'Filamento interno de níquel-cromo fundido por exceso de cal incrustada.',
        recommendedPart: 'Resistencia calefactora de inmersión con fusible térmico'
      },
      {
        id: 'lav-3',
        title: 'Sensor NTC fuera de rango (Error tE / tE1)',
        symptom: 'La máquina interrumpe el ciclo marcando error de temperatura tE.',
        quickCheck: 'Medir en bornes del termistor NTC a 25°C.',
        probableCause: 'Termistor NTC alterado o con cables sulfatados en la base de la cuba.',
        recommendedPart: 'Sensor NTC 10 kΩ / 12 kΩ / 50 kΩ según fabricante',
        guideId: 'muestra-codigos-error'
      },
      {
        id: 'lav-4',
        title: 'No disuelve ni dosifica el detergente o suavizante',
        symptom: 'Al terminar la carga, el compartimento de suavizante sigue lleno de líquido.',
        quickCheck: 'Verificar si funciona la electroválvula específica del conducto dosificador.',
        probableCause: 'Sifón de plástico del cajetín atorado con suavizante seco o válvula secundaria defectuosa.',
        recommendedPart: 'Cajetín dispensador / Electroválvula doble o triple'
      },
      {
        id: 'lav-5',
        title: 'Tiempo de ciclo infinito en fase de calentamiento',
        symptom: 'El reloj digital se queda clavado en el minuto 45 durante horas.',
        quickCheck: 'Comprobar si el agua alcanza al menos 30°C.',
        probableCause: 'El microprocesador espera que el agua alcance la temperatura programada para avanzar el ciclo.',
        recommendedPart: 'Relé de calentamiento de 16A en tarjeta / Resistencia'
      }
    ]
  },
  {
    id: 'tambor-estructura',
    name: 'Tambor y estructura',
    totalFaults: 6,
    iconName: 'Wrench',
    description: 'Cuba, tambor de acero, rodamientos, retenes, cruceta (araña) y contrapesos.',
    faults: [
      {
        id: 'tam-1',
        title: 'Juego excesivo en el tambor de lavado',
        symptom: 'Al empujar el tambor hacia arriba se siente holgura de varios milímetros.',
        quickCheck: 'Comprobar movimiento independiente entre tambor metálico y tina plástica.',
        probableCause: 'Pista de rodamientos desgastada o eje de acero rayado.',
        recommendedPart: 'Kit de rodamientos + Retén de doble labio',
        guideId: 'ruidos-vibra-demasiado'
      },
      {
        id: 'tam-2',
        title: 'Rodamientos oxidados con ruido ensordecedor',
        symptom: 'Al centrifugar parece un avión jet despegando dentro de la habitación.',
        quickCheck: 'Girar a mano el tambor apagado: sonido áspero y arenoso.',
        probableCause: 'El retén dejó pasar agua con detergente hacia las bolas de acero oxidándolas.',
        recommendedPart: 'Rodamientos SKF 6205-2RS / 6206-2RS + Grasa marina',
        guideId: 'ruidos-vibra-demasiado'
      },
      {
        id: 'tam-3',
        title: 'Cruceta o araña de tambor fracturada',
        symptom: 'El tambor se ladea completamente hacia un lado y raspa el fondo de la tina.',
        quickCheck: 'Revisar si uno de los 3 brazos de aluminio tiene holgura muerta al girar.',
        probableCause: 'Corrosión galvánica del aluminio producida por el fosfato de los detergentes en polvo.',
        recommendedPart: 'Cruceta de tambor original con eje de acero templado'
      },
      {
        id: 'tam-4',
        title: 'Amortiguadores o varillas de suspensión vencidos',
        symptom: 'La lavadora golpea violentamente las paredes laterales del gabinete.',
        quickCheck: 'Presionar la cuba hacia abajo y soltar: Si rebota repetidamente están vencidos.',
        probableCause: 'Pérdida de la grasa de fricción en los vástagos o resortes fatigados.',
        recommendedPart: 'Juego de 4 varillas de suspensión calibradas / Par amortiguadores'
      },
      {
        id: 'tam-5',
        title: 'El tambor roza y quema el fuelle de goma',
        symptom: 'Humo o virutas de goma negra dentro de la ropa lavada.',
        quickCheck: 'Inspeccionar la holgura perimétrica entre borde de tambor y goma frontal.',
        probableCause: 'Eje deformado o rodamiento partido que descentró el tambor.',
        recommendedPart: 'Fuelle de goma nuevo + Reparación de eje de tambor'
      },
      {
        id: 'tam-6',
        title: 'Contrapeso de concreto suelto o fisurado',
        symptom: 'Golpeteo rítmico pesado y polvo de hormigón en la base de la máquina.',
        quickCheck: 'Apretar con llave los 3 tornillos pasantes del bloque de concreto superior/frontal.',
        probableCause: 'Vibraciones extremas que aflojaron los anclajes de fijación del contrapeso.',
        recommendedPart: 'Tornillos reforzados de contrapeso con arandelas Grower'
      }
    ]
  },
  {
    id: 'puerta-controles',
    name: 'Puerta y controles',
    totalFaults: 5,
    iconName: 'ShieldCheck',
    description: 'Seguros de puerta PTC, manijas de apertura, pestillos y botones de selección.',
    faults: [
      {
        id: 'puer-1',
        title: 'Seguro de puerta trancado (No abre al terminar)',
        symptom: 'El ciclo termina pero la puerta permanece bloqueada mecánicamente con ropa adentro.',
        quickCheck: 'Esperar 5 minutos tras desconectar para enfriar la pastilla PTC; si no abre, liberar con cordel auxiliar.',
        probableCause: 'Pastilla PTC del bloqueapuertas fundida en posición cerrada o gancho trabado.',
        recommendedPart: 'Bloqueapuertas térmico PTC 3 pines'
      },
      {
        id: 'puer-2',
        title: 'No detecta puerta cerrada (Error dE / dE1 / Door)',
        symptom: 'La puerta está firmemente cerrada pero al pulsar Inicio pita y dice dE.',
        quickCheck: 'Verificar si el pestillo plástico penetra completamente en la ranura del bloqueapuertas.',
        probableCause: 'Microswitch interno del seguro quemado o bisagra de puerta caída.',
        recommendedPart: 'Bloqueapuertas / Calibración de bisagra de puerta'
      },
      {
        id: 'puer-3',
        title: 'Manija o pestillo de puerta quebrado',
        symptom: 'La manija plástica exterior se siente floja y no acciona el gancho metálico interior.',
        quickCheck: 'Retirar los tornillos del marco interior de la puerta para inspeccionar el resorte y gancho.',
        probableCause: 'Fatiga del plástico por tirar bruscamente antes del desbloqueo.',
        recommendedPart: 'Kit de manija con pestillo, resorte y pasador'
      },
      {
        id: 'puer-4',
        title: 'Pulsadores del panel no responden al tacto',
        symptom: 'El botón de Inicio o el selector de temperatura no reaccionan al oprimirlos.',
        quickCheck: 'Revisar si los vástagos plásticos del panel tocan los microswitches táctiles de la tarjeta.',
        probableCause: 'Pulsador táctil desoldado o vástago plástico partido.',
        recommendedPart: 'Microswitch táctil 6x6mm tipo botón'
      },
      {
        id: 'puer-5',
        title: 'Selector rotativo con falso contacto (Encoder brinca programas)',
        symptom: 'Al girar la perilla de selección los programas saltan de forma caótica en la pantalla.',
        quickCheck: 'Limpiar el encoder rotativo con spray limpiador de contactos sin residuo.',
        probableCause: 'Pistas de cobre del encoder rotativo desgastadas o llenas de polvo aislante.',
        recommendedPart: 'Encoder rotativo 16 pulsos o perilla selectora'
      }
    ]
  },
  {
    id: 'mantenimiento-preventivo',
    name: 'Mantenimiento preventivo',
    totalFaults: 6,
    iconName: 'ShieldAlert',
    description: 'Protocolos de limpieza, desincrustación, purga y calibración periódica.',
    faults: [
      {
        id: 'mant-1',
        title: 'Acumulación de sarro en resistencia y tina',
        symptom: 'Pérdida de eficiencia térmica y manchas blancas en ropa oscura.',
        quickCheck: 'Inspeccionar resistencia por el orificio de la tina con linterna.',
        probableCause: 'Agua dura con alto contenido de carbonato de calcio.',
        recommendedPart: 'Descalcificador profesional con ácido cítrico al 10%'
      },
      {
        id: 'mant-2',
        title: 'Moho negro y malos olores en el fuelle de goma',
        symptom: 'Olor fétido a humedad dentro del tambor que impregna las prendas.',
        quickCheck: 'Apartar el labio inferior del fuelle para inspeccionar la acumulación de lodo y moho.',
        probableCause: 'Dejar la puerta cerrada permanentemente tras lavar y uso excesivo de suavizantes grasosos.',
        recommendedPart: 'Limpiador enzimático clorado para fuelles y mantenimiento de tina'
      },
      {
        id: 'mant-3',
        title: 'Filtro de motas y bomba saturado de residuos',
        symptom: 'El desagüe se vuelve más lento con el paso de las semanas.',
        quickCheck: 'Desenroscar mensualmente el tapón del filtro inferior para evacuar lanas y monedas.',
        probableCause: 'Prendas con desprendimiento de fibras acumuladas en la trampa.',
        recommendedPart: 'Filtro atrapamotas de repuesto'
      },
      {
        id: 'mant-4',
        title: 'Manguera de presostato con grasa y sarro',
        symptom: 'Niveles de agua erráticos (llena de más o de menos).',
        quickCheck: 'Desconectar la manguera y comprobar paso de aire libre soplando.',
        probableCause: 'Espuma saponificada que ingresó a la cámara de compresión.',
        recommendedPart: 'Limpieza de cámara con agua caliente y jeringa'
      },
      {
        id: 'mant-5',
        title: 'Calibración de peso y desbalance (Rutina de servicio)',
        symptom: 'La lavadora no sensa adecuadamente los kilogramos de carga.',
        quickCheck: 'Ejecutar la secuencia de autocalibración de fábrica según la marca.',
        probableCause: 'Pérdida de calibración de fábrica tras cambio de tarjeta o motor.',
        recommendedPart: 'Modo de servicio / Calibración en vacío'
      },
      {
        id: 'mant-6',
        title: 'Limpieza e inspección de electroválvulas y mangueras',
        symptom: 'Riesgo de rotura intempestiva de mangueras de alimentación presurizadas.',
        quickCheck: 'Verificar cada 12 meses que las mangueras trenzadas no tengan ampollas ni grietas.',
        probableCause: 'Envejecimiento de mangueras de caucho sometidas a presión constante de la red hidráulica.',
        recommendedPart: 'Mangueras malladas de acero inoxidable 3/4"'
      }
    ]
  }
];
