import { RepairGuide } from '../types';

export const REPAIR_GUIDES: RepairGuide[] = [
  {
    id: 'no-desagua',
    title: 'La lavadora no desagua (Retención de agua en tambor)',
    summary: 'El ciclo se detiene al llegar al drenaje o antes del centrifugado. El agua queda atrapada dentro de la cuba y puede emitir zumbidos o códigos de error como OE, 5E, E02 o LD.',
    category: 'Sistema de agua',
    estimatedTime: '30 - 45 min',
    difficulty: 'Intermedia',
    commonSymptoms: [
      'Queda agua estancada al finalizar el ciclo de lavado',
      'La bomba emite un zumbido fuerte pero el agua no sale',
      'La lavadora no pasa al ciclo de centrifugado',
      'Códigos en pantalla: LG (OE), Samsung (5E/SE), Whirlpool (F02/LD), Mabe (E3/E4)'
    ],
    imagePath: '/src/assets/images/washer_drain_pump_testing_1792964966986.jpg',
    toolsNeeded: [
      'Multímetro digital calibrado en escala de Ohmios (Ω)',
      'Destornillador Phillips (#2) y plano',
      'Alicates para abrazaderas elásticas de manguera',
      'Recipiente plano y toallas absorbentes',
      'Linterna de inspección'
    ],
    safetyWarnings: [
      '¡Peligro de descarga eléctrica! Desconecta el cable de alimentación antes de retirar la tapa trasera o inferior.',
      'Riesgo de inundación: Coloca toallas y el recipiente debajo del tapón del filtro antes de desenroscarlo.',
      'Cuidado con objetos punzantes (agujas, monedas oxidadas o ganchos de brasier) alojados en la turbina de la bomba.'
    ],
    step1Identify: {
      question: '¿Qué comportamiento exacto presenta la lavadora cuando debe vaciar el agua?',
      checklist: [
        '¿El tambor tiene agua visible por encima del nivel de la puerta o agitador?',
        '¿Se escucha un zumbido eléctrico en la parte inferior o hay silencio absoluto?',
        '¿Aparece algún código de error parpadeante en el display o leds?',
        '¿La manguera exterior de desagüe se siente rígida o con sobrepeso de agua acumulada?'
      ]
    },
    step2InitialChecks: {
      title: 'Revisiones iniciales no invasivas',
      items: [
        'Verificar la altura de la manguera de desagüe: Debe estar entre 85 cm y 100 cm del piso para evitar efecto sifón o sobreesfuerzo de la bomba.',
        'Inspeccionar el codo exterior de descarga en la tubería de pared en busca de aplastamientos o dobleces.',
        'Desenroscar el filtro atrapa-motas inferior (en frontales) o acceder a la trampa de monedas para limpiar cabellos, alfileres y suciedad acumulada.',
        'Girar manualmente la hélice de la bomba a través del orificio del filtro: Debe girar a saltos magnéticos definidos (cada 90°); no debe estar trabada ni suelta.'
      ]
    },
    step3RootCause: {
      title: 'Diagnóstico diferencial de la causa raíz',
      probableCauses: [
        {
          cause: 'Obstrucción mecánica en hélice o conducto de tina a bomba (moneda, calcetín o sarro)',
          probability: 'Alta',
          howToConfirm: 'Retirar filtro y verificar que la turbina gire libremente sin cuerpos extraños.',
          multimeterCheck: 'No requiere multímetro. Inspección visual y táctil.'
        },
        {
          cause: 'Bobina de la bomba de drenaje abierta o quemada por sobrecalentamiento',
          probability: 'Alta',
          howToConfirm: 'Desconectar los terminales eléctricos de la bomba y medir resistencia en bornes.',
          multimeterCheck: 'En escala de Ohmios (Ω): Valor nominal entre 15 Ω y 25 Ω (bomba 110V/127V) o entre 140 Ω y 180 Ω (bomba 220V). Si marca OL / Infinito = Bobina abierta. Si marca < 5 Ω = Cortocircuito.'
        },
        {
          cause: 'Falta de alimentación desde la tarjeta electrónica (Triac de bomba dañado o relé abierto)',
          probability: 'Media',
          howToConfirm: 'Medir voltaje AC en los conectores que alimentan la bomba durante el paso de drenaje del ciclo.',
          multimeterCheck: 'En escala VAC: Debe medir 110-127 VAC (o 220 VAC según red). Si marca 0 VAC cuando el ciclo demanda desagüe, la falla proviene del triac o pista cortada en la placa.'
        },
        {
          cause: 'Manguera del presostato o cámara de compresión tapada con jabón cuajado',
          probability: 'Baja',
          howToConfirm: 'La lavadora "cree" que aún está llena o vacía por presión de aire residual falseada.',
          multimeterCheck: 'Soplar suavemente por la manguerita del presostato hacia la tina para desobstruir grasa y sarro.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar la clavija eléctrica y cerrar las llaves de agua fría y caliente.',
        'Inclinar la lavadora a 45° apoyada en un taco seguro o retirar la tapa posterior metálica removiendo tornillos Phillips.',
        'Identificar el cuerpo de la bomba de drenaje conectado a la manguera corrugada de la tina.',
        'Desconectar con cuidado el conector eléctrico plástico presionando la pestaña de seguridad.'
      ],
      replacementSteps: [
        'Aflojar la abrazadera elástica de la manguera con alicates y retirar la manguera drenando el agua remanente en una bandeja.',
        'Retirar los 3 tornillos de sujeción que fijan el motor de la bomba al cuerpo hidráulico (carcasa plástica).',
        'Montar el motor magnético nuevo asegurando que el o-ring de goma quede bien asentado y lubricado con vaselina técnica neutra.',
        'Apretar los 3 tornillos en cruz sin sobreapretar para no quebrar el plástico.',
        'Reconectar las mangueras apretando firmemente las abrazaderas y reconectar los cables eléctricos.'
      ],
      tips: [
        'Verifica que la manguera de fuelle a bomba no tenga una moneda de canto que actúe como compuerta cuando hay flujo.',
        'Utiliza bombas con devanado de cobre original; las de aleación de aluminio se recalientan más rápido en climas cálidos.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Seleccionar ciclo "Centrifugado / Desagüe" rápido sin ropa con 5 litros de agua vertidos manualmente en el tambor.',
      safetyChecks: [
        'Verificar ausencia de goteos en las abrazaderas y empaque de la bomba durante el flujo a presión.',
        'Comprobar que el agua sea evacuada en menos de 90 segundos.',
        'Comprobar con pinza amperimétrica que el consumo de la bomba no supere 0.5A - 0.8A.',
        'Confirmar que el motor principal comience a centrifugar a alta velocidad una vez la tina esté vacía.'
      ],
      acceptanceCriteria: 'La lavadora vacía la tina completamente sin ruidos metálicos, el presostato conmuta a estado vacío y el ciclo finaliza con música/pitido de éxito sin alarmas en pantalla.'
    },
    compatibleParts: [
      { name: 'Bomba magnética universal tipo Askoll / Plaset 3 tornillos', specs: '110V-127V 60Hz 30W / 220V 50W', avgPriceCOP: 53200, reference: 'REF-BOMB-ASK3T' },
      { name: 'Bomba de desagüe original LG Inverter / TurboWash', specs: 'Conexión plug directo 120V', avgPriceCOP: 91000, reference: 'LG-4681EA2001T' },
      { name: 'Bomba de desagüe Samsung EcoBubble / Wobble', specs: '120V 35W con trampa de filtro', avgPriceCOP: 81200, reference: 'SAM-DC31-00030A' },
      { name: 'Abrazaderas tipo resorte 32mm reforzadas', specs: 'Acero inoxidable elástico', avgPriceCOP: 6300, reference: 'ABRAZ-32-INOX' }
    ],
    testValues: [
      { component: 'Bobina de bomba 110V/127V', nominal: '15 Ω a 25 Ω', shortCircuit: '< 5 Ω (quema fusible o triac)', openCircuit: 'OL / Infinito (no arranca)' },
      { component: 'Bobina de bomba 220V', nominal: '140 Ω a 180 Ω', shortCircuit: '< 30 Ω', openCircuit: 'OL / Infinito' },
      { component: 'Tensión de llegada a bornes', nominal: '110V - 127V AC', shortCircuit: '0V con fusible reventado', openCircuit: '0V por triac quemado en placa' }
    ]
  },
  {
    id: 'no-llena-agua',
    title: 'La lavadora no llena de agua o llena muy despacio',
    summary: 'Al iniciar cualquier ciclo de lavado, la máquina zumba levemente o se queda esperando y no ingresa caudal de agua suficiente, arrojando código IE, 4E, E1 o F01.',
    category: 'Sistema de agua',
    estimatedTime: '20 - 35 min',
    difficulty: 'Básica',
    commonSymptoms: [
      'Entra un hilo diminuto de agua que tarda más de 20 minutos en cubrir el fondo',
      'No entra agua fría pero sí caliente (o viceversa)',
      'La lavadora no arranca el lavado porque el sensor no detecta subida de nivel',
      'Códigos de error: LG (IE), Samsung (4E/4C), Whirlpool (LF/F01), Haceb (E1)'
    ],
    imagePath: '/src/assets/images/washer_parts_exploded_1792964966841.jpg',
    toolsNeeded: [
      'Multímetro en escala de Ohmios (Ω)',
      'Alicates universales o pinzas de punta',
      'Cepillo pequeño de cerdas duras para descalcificar filtros',
      'Manguera de prueba o cubo para comprobar presión de acueducto'
    ],
    safetyWarnings: [
      'Cerrar siempre las llaves de suministro antes de desenroscar las mangueras de entrada.',
      'Aliviar la presión remanente aflojando la manguera lentamente hacia un paño seco.'
    ],
    step1Identify: {
      question: '¿Hay suministro normal de agua en la vivienda y llaves abiertas?',
      checklist: [
        '¿Las llaves de suministro detrás de la máquina están abiertas al 100%?',
        '¿El filtro de malla plástico en la rosca de la electroválvula tiene arenilla o lodo?',
        '¿Se siente vibración magnética al tocar la electroválvula tras pulsar Inicio?'
      ]
    },
    step2InitialChecks: {
      title: 'Chequeo de filtros y presión de red',
      items: [
        'Retirar la manguera y extraer con pinza el filtro de plástico insertado en la electroválvula.',
        'Limpiar sedimentos, arena o restos de óxido con cepillo y vinagre blanco.',
        'Revisar si la manguera tiene filtro secundario en el extremo de la llave de paso.'
      ]
    },
    step3RootCause: {
      title: 'Comprobación de la electroválvula con multímetro',
      probableCauses: [
        {
          cause: 'Filtro de malla de la válvula obstruido por sedimentos de acueducto',
          probability: 'Alta',
          howToConfirm: 'Inspección visual del tamiz.',
          multimeterCheck: 'No aplica.'
        },
        {
          cause: 'Bobina solenoide de la electroválvula quemada (abierta)',
          probability: 'Alta',
          howToConfirm: 'Desconectar terminales y medir resistencia de cada solenoide.',
          multimeterCheck: 'Resistencia nominal entre 800 Ω y 1.200 Ω (1.2 kΩ) a 110V/127V. Si marca infinito (OL), la bobina está rota internamente.'
        },
        {
          cause: 'Diafragma interno de goma rasgado o resorte calcificado por agua dura',
          probability: 'Media',
          howToConfirm: 'La bobina tiene continuidad correcta y recibe voltaje, pero el émbolo no vence el diafragma.',
          multimeterCheck: 'Mide ~1 kΩ pero no abre paso de agua.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar la lavadora del tomacorriente.',
        'Retirar tornillos de la consola de mandos o panel superior trasero.',
        'Marcar con cinta los cables de válvula fría (azul), caliente (rojo) y prelavado/dispensador.'
      ],
      replacementSteps: [
        'Aflojar la abrazadera de la manguera interna que va a la jabonera.',
        'Desatornillar el soporte metálico de la electroválvula doble o triple.',
        'Instalar la electroválvula nueva respetando los diámetros y posición de los solenoides.',
        'Reconectar mangueras con sus respectivas abrazaderas elásticas y enchufes eléctricos.'
      ],
      tips: [
        'Siempre aplica agua a las mangueras antes de reconectar para purgar residuos de tubería.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Iniciar ciclo normal de lavado y observar caudal durante los primeros 3 minutos.',
      safetyChecks: [
        'Asegurar que no haya micro-gotas en las roscas de las mangueras.',
        'Confirmar que corte el llenado de agua exactamente al alcanzar el nivel seleccionado.'
      ],
      acceptanceCriteria: 'Llenado continuo y uniforme, corte preciso por presostato y avance al ciclo de agitación.'
    },
    compatibleParts: [
      { name: 'Electroválvula doble 110V Universal 180°', specs: '110-127V 60Hz rosca 3/4"', avgPriceCOP: 39200, reference: 'VALV-DOB-110' },
      { name: 'Electroválvula triple LG / Samsung Inverter', specs: '120V con salida para dispensador suavizante', avgPriceCOP: 67200, reference: 'VALV-TRI-LG12' },
      { name: 'Filtros malla de repuesto para electroválvula (Par)', specs: 'Plástico de polipropileno y acero', avgPriceCOP: 7000, reference: 'FILT-VALV-SET2' }
    ],
    testValues: [
      { component: 'Bobina electroválvula 110V', nominal: '800 Ω a 1.200 Ω (1.2 kΩ)', shortCircuit: '< 100 Ω', openCircuit: 'OL / Infinito' },
      { component: 'Bobina electroválvula 220V', nominal: '3.500 Ω a 4.500 Ω (4.5 kΩ)', shortCircuit: '< 500 Ω', openCircuit: 'OL / Infinito' }
    ]
  },
  {
    id: 'no-enciende',
    title: 'La lavadora no enciende (Completamente apagada / Muerta)',
    summary: 'La lavadora no responde al pulsar el botón de encendido (Power), no emite sonido, los leds no iluminan y el panel permanece totalmente inerte.',
    category: 'Sistema eléctrico',
    estimatedTime: '30 - 50 min',
    difficulty: 'Intermedia',
    commonSymptoms: [
      'Al conectar a la toma no hay ningún pitido ni encendido de leds',
      'El interruptor de encendido parece mecánico pero la máquina no reacciona',
      'Hubo un corte de luz o tormenta eléctrica antes de que dejara de funcionar',
      'Fusible térmico o supresor de picos fundido'
    ],
    imagePath: '/src/assets/images/washer_tech_inspection_1792964965813.jpg',
    toolsNeeded: [
      'Multímetro digital con escala de Voltaje AC (V) y continuidad con beep',
      'Destornilladores planos y de estrella aislados a 1000V',
      'Puntas de prueba finas tipo aguja para penetrar silicona/resina de la placa',
      'Detector de fase inductivo'
    ],
    safetyWarnings: [
      '¡Atención! La tarjeta electrónica contiene condensadores electrolíticos de alta capacidad que retienen cargas peligrosas de hasta 350 VDC aún después de desenchufar. Descargar con resistencia de 1kΩ 10W.',
      'Asegúrate de comprobar la toma de corriente antes de desarmar la lavadora.'
    ],
    step1Identify: {
      question: '¿La toma de corriente de la pared suministra el voltaje adecuado?',
      checklist: [
        '¿El breaker o disyuntor del cuadro eléctrico principal está activo?',
        '¿Otro electrodoméstico de alta potencia (plancha o secador) funciona en esa misma toma?',
        '¿El cable de alimentación presenta quemaduras, aplastamiento o mordeduras de roedores?'
      ]
    },
    step2InitialChecks: {
      title: 'Comprobación de la línea de entrada',
      items: [
        'Medir con multímetro en el tomacorriente: Debe registrar entre 110 VAC y 127 VAC (o 220 VAC) estables.',
        'Verificar continuidad entre la clavija del enchufe y la regleta de entrada interna del chasis.',
        'Revisar el filtro antiparásitos (filtro RFI / condensador supresor de ruido) a la entrada del cable.'
      ]
    },
    step3RootCause: {
      title: 'Localización del corte de energía',
      probableCauses: [
        {
          cause: 'Fusible cerámico o de vidrio quemado en la entrada de la placa principal',
          probability: 'Alta',
          howToConfirm: 'Prueba de continuidad con multímetro sobre las patillas del fusible (normalmente de 10A a 15A).',
          multimeterCheck: 'En modo continuidad: Beep audible = 0 Ω (Bueno). Sin sonido y marca OL = Fusible abierto por sobretensión.'
        },
        {
          cause: 'Filtro de interferencias RFI en cortocircuito o abierto',
          probability: 'Media',
          howToConfirm: 'Medir voltaje AC a la salida del filtro supresor.',
          multimeterCheck: 'Entrada 120V / Salida debe medir 120V. Si entra 120V y sale 0V, el filtro está abierto.'
        },
        {
          cause: 'Fuente conmutada de la tarjeta electrónica dañada (IC oscilador tipo LNK304 / TNY278)',
          probability: 'Alta',
          howToConfirm: 'Inspección de la zona de fuente en la placa: Resistencia fusible quemada, diodos rectificadores en corto.',
          multimeterCheck: 'Medir voltaje continuo (VDC) en el condensador principal de filtro (debe haber ~160 VDC en redes de 110V o ~310 VDC en 220V) y ~5 VDC / ~12 VDC a la salida del regulador.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar la lavadora del enchufe.',
        'Acceder a la tarjeta de control desmontando la máscara frontal o panel superior.',
        'Retirar la cubierta plástica de protección de la placa electrónica con cuidado de las trabas plásticas.'
      ],
      replacementSteps: [
        'Si el fusible está quemado, no colocar un puente de alambre: reemplazar por un fusible del amperaje exacto (generalmente 12A / 250V).',
        'Si el fusible vuelve a estallar de inmediato, existe un corto severo en el puente de diodos o en el módulo IPM del motor inverter.',
        'Sustituir la tarjeta electrónica completa o reparar la fuente conmutada reemplazando el IC oscilador y la resistencia de alambre fusible de 47Ω.',
        'Asegurar estanqueidad aplicando barniz de protección dieléctrico contra humedad ambiental.'
      ],
      tips: [
        'Recomienda al cliente instalar un protector de voltaje de 110V/220V para proteger las tarjetas inverter sensibles.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Conectar a través de una lámpara serie de prueba (bombilla incandescente de 100W) para evitar cortos si se reparó placa a nivel componente.',
      safetyChecks: [
        'Encender el panel: Debe emitir el sonido de bienvenida característico.',
        'Verificar que todos los dígitos del display respondan al girar el selector de programas.',
        'Medir derivación a chasis: Entre chasis metálico y tierra no debe haber voltaje parásito (> 2V).'
      ],
      acceptanceCriteria: 'La lavadora enciende inmediatamente al pulsar Power, permite programar ciclos y no produce caídas de tensión.'
    },
    compatibleParts: [
      { name: 'Fusible cerámico retardado 12A / 250V (Paquete x5)', specs: 'Dimensiones 6x30mm o 5x20mm', avgPriceCOP: 11200, reference: 'FUS-CER-12A' },
      { name: 'Filtro antiparásitos supresor de ruido RFI Universal', specs: '0.47uF + 2x0.027uF + 2x0.5mH + 680kΩ', avgPriceCOP: 44800, reference: 'FLT-RFI-UNIV' },
      { name: 'Kit oscilador LNK304GN + Resistencia 47Ω 3W + Inductor', specs: 'Componentes SMD / DIP para reparación de placa', avgPriceCOP: 30800, reference: 'KIT-PWR-LNK304' }
    ],
    testValues: [
      { component: 'Fusible de protección', nominal: '0.1 Ω a 0.5 Ω (Continuidad / Beep)', shortCircuit: 'Normal', openCircuit: 'OL (Quemado)' },
      { component: 'Voltaje standby en microcontrolador', nominal: '5.0 VDC ± 0.2V', shortCircuit: '< 1 VDC', openCircuit: '0 VDC' }
    ]
  },
  {
    id: 'no-centrifuga',
    title: 'La lavadora no centrifuga (Ropa sale empapada)',
    summary: 'La máquina lava y desagua normalmente, pero al llegar al paso de centrifugado final el tambor gira muy lento o no se mueve en lo absoluto, arrojando error UE, dE o uE.',
    category: 'Motor y movimiento',
    estimatedTime: '40 - 60 min',
    difficulty: 'Intermedia',
    commonSymptoms: [
      'Termina el programa pero la ropa está empapada de agua',
      'La bomba se queda funcionando continuamente pero el tambor no acelera',
      'Gira unos segundos despacio y vuelve a meter agua para desapelmazar la ropa',
      'Códigos de error: LG (UE/dE), Samsung (UE/UB), Whirlpool (uL/F03)'
    ],
    imagePath: '/src/assets/images/washer_tech_inspection_1792964965813.jpg',
    toolsNeeded: [
      'Multímetro en continuidad y resistencia',
      'Nivel de burbuja para comprobar nivelación del electrodoméstico',
      'Llave de 10mm o 13mm para patas niveladoras y pernos de motor',
      'Destornillador Torx T20 y Phillips'
    ],
    safetyWarnings: [
      'Nunca intentes frenar el tambor con la mano durante el centrifugado.',
      'El seguro de puerta bloquea la apertura para evitar mutilaciones: no anular el seguro de forma permanente en casa de clientes.'
    ],
    step1Identify: {
      question: '¿La lavadora desaguó el 100% del agua antes de intentar centrifugar?',
      checklist: [
        'Si queda aunque sea 1 litro de agua, el presostato no permite activar alta velocidad.',
        '¿El seguro de tapa hace el sonido "clic" de enclavamiento?',
        '¿La carga de ropa está desbalanceada (ejemplo: una toalla pesada o edredón enrollado)?'
      ]
    },
    step2InitialChecks: {
      title: 'Comprobaciones mecánicas y de carga',
      items: [
        'Asegurar que la lavadora esté perfectamente nivelada con el nivel de burbuja en el marco superior.',
        'Distribuir manualmente las prendas en la tina para evitar desbalance centrífugo.',
        'Verificar el microswitch o seguro electromagnético de tapa (interlock).'
      ]
    },
    step3RootCause: {
      title: 'Causas técnicas de falla de centrifugado',
      probableCauses: [
        {
          cause: 'Seguro de tapa o bloqueapuertas PTC defectuoso',
          probability: 'Alta',
          howToConfirm: 'El microswitch no cierra el contacto de seguridad hacia la placa al mandar la orden de giro rápido.',
          multimeterCheck: 'Medir continuidad en terminales de contacto: Debe dar 0 Ω al activarse el cerrojo. Si marca OL con el pestillo accionado, el seguro está dañado.'
        },
        {
          cause: 'Actuador de cambio (Shift Actuator en Whirlpool/Mabe) o termoactuador trabado',
          probability: 'Alta',
          howToConfirm: 'En lavadoras de carga superior, el actuador no desliza la polea de levas (splutch) para enganchar la tina completa al eje del motor.',
          multimeterCheck: 'Medir bobina del motor del actuador: Nominal ~2.0 kΩ a ~3.5 kΩ a 110V. Comprobar además el optoacoplador del sensor óptico girando la polea.'
        },
        {
          cause: 'Condensador de arranque desvalorizado (en motores convencionales con correa)',
          probability: 'Media',
          howToConfirm: 'El motor zumba y le cuesta arrancar con carga pesada.',
          multimeterCheck: 'En capacímetro: Si el valor marcado es 45 µF y mide menos de 35 µF, el motor no tiene torque centrífugo.'
        },
        {
          cause: 'Varillas de amortiguación (suspension rods) vencidas con cabeceo violento',
          probability: 'Media',
          howToConfirm: 'El tambor golpea las paredes laterales al alcanzar 300 RPM y el sensor de desbalance aborta el giro.',
          multimeterCheck: 'Prueba de rebote: Presionar la tina hacia abajo y soltar. Si rebota más de una vez y oscila, los resortes están desgastados.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar la alimentación eléctrica.',
        'En lavadoras con actuador (Whirlpool/Mabe): Voltear la máquina o acceder por debajo retirando la guarda de la polea.',
        'En lavadoras frontales: Retirar el fuelle de goma para extraer el bloqueapuertas frontal.'
      ],
      replacementSteps: [
        'Reemplazar el seguro de puerta o el actuador de embrague según la causa confirmada.',
        'Si es actuador: Alinear el brazo con la leva dentada de la transmisión.',
        'Si son varillas de suspensión: Cambiar el juego completo de las 4 varillas respetando los colores de los resortes (los traseros soportan el peso del motor).'
      ],
      tips: [
        'Nunca cambies solo una varilla de amortiguador; la tensión desigual desbalanceará la máquina en 2 semanas.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Ciclo de centrifugado con 3 toallas húmedas para simular carga real.',
      safetyChecks: [
        'Comprobar que el seguro de tapa quede bloqueado firmemente sin poder abrirse.',
        'Asegurar que la aceleración sea progresiva hasta las 800 - 1200 RPM sin vibraciones excesivas.'
      ],
      acceptanceCriteria: 'La ropa sale con grado de humedad normal para secado (< 50% de humedad) y la puerta se desbloquea tras 60 segundos de inercia.'
    },
    compatibleParts: [
      { name: 'Actuador de cambio Whirlpool Xpert System 6 pines', specs: '120V 60Hz W10006355', avgPriceCOP: 77000, reference: 'W10006355' },
      { name: 'Bloqueapuertas LG / Samsung 3 terminales', specs: 'PTC 250V con enclavamiento electromecánico', avgPriceCOP: 53200, reference: 'LG-EBF49827801' },
      { name: 'Juego de 4 varillas de suspensión Whirlpool / Haceb', specs: 'Longitud 60cm con resortes calibrados', avgPriceCOP: 100800, reference: 'W10780048-SET4' },
      { name: 'Condensador de arranque de motor 45µF / 250VAC', specs: '45 microfaradios con bornes faston', avgPriceCOP: 25200, reference: 'CAP-45UF-250V' }
    ],
    testValues: [
      { component: 'Bobina de actuador de embrague', nominal: '2.0 kΩ a 3.5 kΩ', shortCircuit: '< 200 Ω', openCircuit: 'OL / Infinito' },
      { component: 'Condensador de arranque (45µF)', nominal: '42.7 µF a 47.3 µF (±5%)', shortCircuit: '0 µF (perforado)', openCircuit: '< 20 µF (desvalorizado)' }
    ]
  },
  {
    id: 'no-lava-o-no-agita',
    title: 'No lava o no agita (Tambor o paleta inmóvil durante lavado)',
    summary: 'La lavadora se llena de agua al nivel programado, pero al momento de comenzar a lavar se queda en silencio, el motor zumba o solo gira hacia un solo sentido.',
    category: 'Motor y movimiento',
    estimatedTime: '45 - 75 min',
    difficulty: 'Avanzada',
    commonSymptoms: [
      'Llena de agua pero se queda parada sin mover las aspas o agitador',
      'El motor intenta arrancar con zumbido pero no tiene fuerza para girar',
      'El agitador gira solo a la derecha y no realiza el vaivén izquierda-derecha',
      'Olor a caucho quemado por correa patinando'
    ],
    imagePath: '/src/assets/images/washer_parts_exploded_1792964966841.jpg',
    toolsNeeded: [
      'Multímetro en escala de Ohmios y voltios AC',
      'Juego de llaves de trinquete (copas/dados) de 8mm a 14mm',
      'Extractor de agitador o cuerda resistente para desclavar agitador',
      'Grasa de litio para engranajes mecánicos'
    ],
    safetyWarnings: [
      'Desconectar la lavadora. Antes de tocar las correas o poleas, desconecta la alimentación para evitar atrapamiento de dedos.'
    ],
    step1Identify: {
      question: '¿El motor gira libremente sin correa o está mecánicamente trabado?',
      checklist: [
        '¿Se escucha el relé de la placa "clic-clac" intentando cambiar de dirección?',
        '¿El plato agitador central tiene juego excesivo o sus estrías plásticas están barridas?',
        '¿La correa de transmisión está floja, agrietada o partida en el piso?'
      ]
    },
    step2InitialChecks: {
      title: 'Inspección de correa, agitador y giro manual',
      items: [
        'Quitar la tapa trasera e intentar girar la polea grande de la transmisión con la mano: Debe girar suavemente en ambos sentidos.',
        'Revisar la tensión de la correa: Debe ceder aproximadamente 1 cm al presionarla con el pulgar en el medio.',
        'Inspeccionar el plato pulsador / turbina: Desatornillar el perno central y verificar que los dientes de acople no estén lisos.'
      ]
    },
    step3RootCause: {
      title: 'Diagnóstico del sistema motriz',
      probableCauses: [
        {
          cause: 'Estrías plásticas del agitador o eje estriado barridas por sobrecarga',
          probability: 'Alta',
          howToConfirm: 'El eje metálico gira pero las aspas de plástico resbalan.',
          multimeterCheck: 'Falla puramente mecánica. Reemplazo del plato o buje estriado.'
        },
        {
          cause: 'Triac de inversión de giro quemado en la tarjeta de control',
          probability: 'Media',
          howToConfirm: 'La máquina gira continuamente hacia un solo lado enrollando toda la ropa.',
          multimeterCheck: 'Medir en bornes del motor: Debe llegar voltaje alternado primero a un devanado y luego al otro. Si uno marca 0V permanente, el triac está abierto en la placa.'
        },
        {
          cause: 'Bobinado del motor quemado o protector térmico interno abierto',
          probability: 'Media',
          howToConfirm: 'Medir resistencia entre los 3 cables del motor (común, giro horario y antihorario).',
          multimeterCheck: 'En motor monofásico: R(Común-Bobina1) debe ser idéntica a R(Común-Bobina2) (ej. ~5.5 Ω cada una). La suma R1+R2 debe ser ~11 Ω.'
        },
        {
          cause: 'Transmisión mecánica trabada por agua filtrada a través del retén',
          probability: 'Baja',
          howToConfirm: 'Presencia de óxido café escurrido sobre la polea y el motor.',
          multimeterCheck: 'Giro manual imposible sin hacer fuerza extrema.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Extraer el agitador aflojando el tornillo de 7/16" o 10mm ubicado bajo la tapita decorativa central.',
        'Retirar la correa de transmisión rodándola con cuidado por el borde de la polea mayor.',
        'Comprobar el sensor de peso/velocidad en motores tipo Mabe (Kraken) debajo de la polea del motor.'
      ],
      replacementSteps: [
        'Si es agitador barrido: Colocar agitador nuevo con buje estriado metálico reforzado.',
        'Si es sensor de peso Mabe: Desconectar el arnés, desatornillar el sensor Hall y sustituirlo.',
        'Si es correa: Colocar la correa nueva primero en la ranura del motor y luego embocarla en la polea grande haciéndola rotar.'
      ],
      tips: [
        'En lavadoras Mabe, el 70% de las fallas de "agita 3 segundos y se detiene parpadeando leds" se debe al sensor de velocidad debajo de la polea del motor.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Ciclo de lavado rápido con agua en nivel bajo.',
      safetyChecks: [
        'Comprobar la cadencia rítmica del vaivén (izquierda - pausa - derecha).',
        'Verificar que el motor no sobrepase los 65°C tras 10 minutos de agitación continua.'
      ],
      acceptanceCriteria: 'Agitación vigorosa en ambos sentidos, arrastre uniforme del agua sin ruidos secos ni patinado de polea.'
    },
    compatibleParts: [
      { name: 'Sensor de peso / velocidad Mabe Kraken', specs: 'Tarjeta sensora Hall para polea de motor', avgPriceCOP: 36400, reference: 'MAB-SENS-VEL-01' },
      { name: 'Correa acanalada tipo Hutchinson / Optibelt 4PJ / 5PJ', specs: 'Longitud adaptada según modelo', avgPriceCOP: 30800, reference: 'CORR-4PJ-UNIV' },
      { name: 'Plato agitador pulsador para Samsung / LG 38cm', specs: 'Buje estriado 11 dientes de bronce', avgPriceCOP: 67200, reference: 'AGIT-SAM-38CM' }
    ],
    testValues: [
      { component: 'Devanados de motor convencional (horario/antihorario)', nominal: '5.0 Ω a 7.5 Ω equilibrados', shortCircuit: '< 1 Ω', openCircuit: 'OL / Infinito' },
      { component: 'Sensor Hall Mabe (Terminal Vcc a Out girando polea)', nominal: 'Pulso alternado 0V a 5V DC', shortCircuit: '0V fijo', openCircuit: '5V fijo sin pulsos' }
    ]
  },
  {
    id: 'ruidos-vibra-demasiado',
    title: 'Hace ruidos extraños o vibra demasiado (Golpeteo / Rugido de avión)',
    summary: 'Durante el centrifugado o lavado, la lavadora emite un ruido similar a una turbina de avión despegando, chirridos metálicos o saltos violentos que desplazan la máquina del sitio.',
    category: 'Tambor y estructura',
    estimatedTime: '1h 30 min - 3h',
    difficulty: 'Avanzada',
    commonSymptoms: [
      'Ruido ensordecedor de rodamientos desgastados durante el centrifugado rápido',
      'La lavadora "camina" por el piso golpeando muebles o paredes',
      'Chillido agudo al arrancar el motor',
      'Manchas de grasa o agua herrumbrosa café en el piso debajo de la máquina'
    ],
    imagePath: '/src/assets/images/washer_drum_mechanism_1792964967597.jpg',
    toolsNeeded: [
      'Juego de dados y maneral de impacto',
      'Extractor mecánico de rodamientos de 3 garras o botador de bronce',
      'Martillo de goma y maza de acero',
      'Grasa marina hidrófuga especial para retenes de lavadora',
      'Nivel de gota'
    ],
    safetyWarnings: [
      'El ensamble de cuba con contrapesos de cemento supera los 35 kg: pide ayuda a un colega para maniobrar la tina y evitar lesiones lumbares.',
      'Asegúrate de retirar los tornillos de transporte en lavadoras nuevas recién instaladas.'
    ],
    step1Identify: {
      question: '¿Qué tipo de ruido se percibe y en qué momento exacto del ciclo ocurre?',
      checklist: [
        '¿Ruido de rugido continuo tipo avión al girar el tambor con la mano apagada? = Rodamientos / balineras rotas.',
        '¿Golpe sordo y seco metálico con tambor caído? = Cruceta o araña de aluminio partida.',
        '¿Chillido estridente al acelerar? = Correa desgastada o polea desalineada.',
        '¿Golpeteo rítmico de la tina contra el gabinete metálico? = Amortiguadores hidráulicos vencidos.'
      ]
    },
    step2InitialChecks: {
      title: 'Prueba manual de holgura de tambor y amortiguación',
      items: [
        'Con la lavadora apagada, abrir la puerta y empujar el borde superior del tambor de acero hacia arriba: Si tiene juego de más de 2 mm respecto a la tina de plástico, los rodamientos o el eje están destruidos.',
        'Girar el tambor con la palma de la mano: Debe rodar en absoluto silencio. Si se siente arenoso o áspero, hay agua dentro de las balineras.',
        'En frontales: Comprobar los amortiguadores inferiores desacoplándolos; si entran y salen sin resistencia hidráulica, están vencidos.'
      ]
    },
    step3RootCause: {
      title: 'Diagnóstico de rodamientos, cruceta y amortiguadores',
      probableCauses: [
        {
          cause: 'Fuga en el retén de agua (retén / sello mecánico) que oxidó los rodamientos (6205 / 6206)',
          probability: 'Alta',
          howToConfirm: 'Giro ruidoso y presencia de chorreo de óxido en la parte trasera de la tina.',
          multimeterCheck: 'No aplica (Mecánica pura).'
        },
        {
          cause: 'Cruceta o soporte de aluminio del tambor corroída por jabón en polvo (galvanismo)',
          probability: 'Media',
          howToConfirm: 'El tambor gira descentrado rozando el fuelle de goma frontal.',
          multimeterCheck: 'Inspección visual desarmando cuba.'
        },
        {
          cause: 'Pernos de transporte traseros colocados por error en lavadoras nuevas',
          probability: 'Baja',
          howToConfirm: 'Verificar los 4 pernos plásticos con tornillo pasante en la pared posterior.',
          multimeterCheck: 'Retirar inmediatamente antes de volver a encender.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar agua y electricidad; retirar tapa superior y panel posterior.',
        'Desmontar fuelle, contrapesos de cemento, motor y amortiguadores.',
        'Suspender y retirar la cuba plástica fuera del chasis metálico.',
        'Abrir la cuba retirando los tornillos perimetrales o cortando termosellado con sierra caladora si es cuba sellada.'
      ],
      replacementSteps: [
        'Extraer los rodamientos gastados con botador y maza golpeando la pista exterior.',
        'Limpiar concienzudamente el alojamiento de aluminio en la semitina trasera.',
        'Insertar los rodamientos nuevos (ejemplo 6205-2RS y 6206-2RS blindados) golpeando únicamente la pista externa.',
        'Instalar el retén nuevo untando grasa especial para retenes resistente al agua caliente y detergente.',
        'Reensamblar el eje del tambor en el conjunto asegurando apriete de pernos con sellador de roscas Loctite.'
      ],
      tips: [
        'Utiliza siempre rodamientos de primera marca (SKF, FAG, NSK) con blindaje de goma 2RS; los rodamientos genéricos fallan en menos de 6 meses.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Ciclo completo de centrifugado en vacío a máxima velocidad (1000 - 1400 RPM).',
      safetyChecks: [
        'Comprobar con estetoscopio mecánico o destornillador en oído la suavidad de giro.',
        'Verificar estanqueidad absoluta de agua con una carga de lavado a 60°C.',
        'Comprobar que el chasis permanezca firme sobre las 4 patas de goma.'
      ],
      acceptanceCriteria: 'Giro silencioso como de fábrica, tambor perfectamente centrado en el fuelle y ausencia de vibraciones anormales.'
    },
    compatibleParts: [
      { name: 'Kit Rodamientos SKF (6205-2RS + 6206-2RS + Retén 37x66x10)', specs: 'Rodamientos blindados alta revolución grado automotriz', avgPriceCOP: 105000, reference: 'KIT-ROD-SKF-01' },
      { name: 'Cruceta de tambor LG / Samsung / Mabe', specs: 'Aluminio fundido con eje de acero inoxidable maquinado', avgPriceCOP: 175000, reference: 'CRUC-LG-FRONT' },
      { name: 'Juego de Amortiguadores de fricción 100N/120N (Par)', specs: 'Amortiguación para carga frontal universal', avgPriceCOP: 58800, reference: 'AMORT-100N-PAIR' }
    ],
    testValues: [
      { component: 'Holgura radial máxima en tambor', nominal: '< 0.5 mm', shortCircuit: 'N/A', openCircuit: '> 3.0 mm (Rodamientos destruidos)' },
      { component: 'Fuerza de amortiguadores', nominal: '100 N a 120 N de resistencia al desplazamiento', shortCircuit: 'N/A', openCircuit: '< 20 N (Vencidos / flojos)' }
    ]
  },
  {
    id: 'presenta-fugas-agua',
    title: 'Presenta fugas de agua (Charco en el piso o goteo continuo)',
    summary: 'Durante el llenado, lavado o centrifugado se forman charcos de agua debajo o detrás de la lavadora, o el agua se escapa por la parte inferior de la puerta.',
    category: 'Sistema de agua',
    estimatedTime: '25 - 45 min',
    difficulty: 'Intermedia',
    commonSymptoms: [
      'Goteo visible en la parte inferior del fuelle de la puerta',
      'Pérdida de agua rápida tan pronto como la máquina empieza a desaguar',
      'Agua que se desborda por la cajetilla del dispensador de detergente',
      'Sensor antifuga (AquaStop) activado con bomba de desagüe permanente'
    ],
    imagePath: '/src/assets/images/washer_parts_exploded_1792964966841.jpg',
    toolsNeeded: [
      'Linterna LED potente',
      'Destornillador para abrazaderas o alicates',
      'Papel secante para ubicar el origen exacto del goteo',
      'Adhesivo sellador de silicona neutra de alta temperatura'
    ],
    safetyWarnings: [
      '¡Agua y electricidad son una combinación mortal! Desenchufar inmediatamente si el agua moja el motor, la bomba o los arneses de cables.'
    ],
    step1Identify: {
      question: '¿En qué fase exacta del ciclo se derrama el agua?',
      checklist: [
        '¿Al abrir las llaves antes de encender? = Manguera de entrada o electroválvula fisurada.',
        '¿Durante los primeros 2 minutos de llenado? = Cajón dispensador o manguera fuelle.',
        '¿Durante el lavado con carga? = Fuelle de puerta perforado o tina rajada.',
        '¿Durante el bombeo de drenaje? = Manguera de desagüe rota o abrazadera suelta.'
      ]
    },
    step2InitialChecks: {
      title: 'Localización visual del goteo con papel secante',
      items: [
        'Colocar tiras de papel absorbente debajo de las juntas para mapear la trayectoria del agua.',
        'Inspeccionar los pliegues inferiores del fuelle de goma de la puerta: Es común encontrar monedas, clavos o aros de sostén que rajaron la goma.',
        'Revisar el cajetín de jabón: Los conductos superiores de rociado suelen obstruirse con jabón en polvo petrificado desviando el chorro fuera del cajón.'
      ]
    },
    step3RootCause: {
      title: 'Diagnóstico del punto de fuga',
      probableCauses: [
        {
          cause: 'Fuelle de puerta perforado por objetos afilados olvidados en bolsillos',
          probability: 'Alta',
          howToConfirm: 'Inspección visual del labio de goma estirándolo con la mano.',
          multimeterCheck: 'No aplica.'
        },
        {
          cause: 'Fuga en el retén del eje de la bomba de drenaje o tapón mal roscado',
          probability: 'Alta',
          howToConfirm: 'Rastro de gotas calcáreas en la carcasa plástica del filtro inferior.',
          multimeterCheck: 'No aplica.'
        },
        {
          cause: 'Manguera de nivel del presostato zafada o cuarteada',
          probability: 'Baja',
          howToConfirm: 'La máquina se desborda continuamente sin cortar el agua.',
          multimeterCheck: 'Soplar por la manguera y verificar retención de presión.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar la máquina de la corriente.',
        'Retirar el alambre con resorte tensor que fija el fuelle al marco frontal usando un destornillador plano fino.',
        'Desmontar el panel frontal si es necesario sustituir mangueras internas.'
      ],
      replacementSteps: [
        'Para cambiar fuelle: Retirar el alambre tensor interior de la tina, extraer la goma vieja, limpiar el borde metálico de restos de jabón, calzar el fuelle nuevo con los orificios de drenaje hacia abajo y recolocar los resortes.',
        'Para mangueras: Cortar 1 cm del extremo cuarteado si da la longitud, o sustituir la manguera instalando abrazaderas nuevas de presión.',
        'Limpiar los difusores del cajón dispensador con cepillo y vinagre caliente para eliminar tapones de cal.'
      ],
      tips: [
        'Unta un poco de agua jabonosa en el labio del fuelle nuevo para que deslice suavemente sobre el canal de la cuba.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Llenado a nivel medio y lavado durante 10 minutos con inspección constante.',
      safetyChecks: [
        'Pasar la mano seca por todos los empalmes y mangueras con la lavadora desenchufada.',
        'Verificar que el piso permanezca completamente seco.'
      ],
      acceptanceCriteria: 'Hermetismo total sin ninguna fuga, sellado perfecto de la puerta y ciclo completado con éxito.'
    },
    compatibleParts: [
      { name: 'Fuelle de puerta de goma para LG Direct Drive', specs: 'Goma EPDM antimoho resistente a detergentes', avgPriceCOP: 119000, reference: 'LG-MDS55242601' },
      { name: 'Fuelle de puerta para Samsung EcoBubble', specs: 'Con ducto de recirculación spray', avgPriceCOP: 123200, reference: 'SAM-DC64-02605A' },
      { name: 'Manguera de drenaje corrugada reforzada 2.0 metros', specs: 'Diámetro terminal 21mm y 29mm con codo', avgPriceCOP: 25200, reference: 'MANG-DREN-2M' }
    ],
    testValues: [
      { component: 'Hermeticidad de manguera de presostato', nominal: 'Mantiene presión de aire por más de 5 minutos', shortCircuit: 'N/A', openCircuit: 'Fuga de aire inmediata' }
    ]
  },
  {
    id: 'muestra-codigos-error',
    title: 'Muestra códigos de error en display o leds parpadeantes',
    summary: 'La lavadora interrumpe el ciclo, emite alarmas sonoras repetitivas y despliega un código alfanumérico en el display (ej. OE, IE, dE, UE, LE, 4E, 5E, E1, F02, etc.) o parpadea un patrón específico de leds.',
    category: 'Electrónica',
    estimatedTime: '20 - 40 min',
    difficulty: 'Intermedia',
    commonSymptoms: [
      'Alarma sonora continua y ciclo congelado',
      'Letras y números extraños en el display digital',
      'En modelos sin display: leds de centrifugado, enjuague y lavado titilan en patrones rítmicos',
      'La máquina se bloquea y la puerta no abre'
    ],
    imagePath: '/src/assets/images/washer_tech_inspection_1792964965813.jpg',
    toolsNeeded: [
      'Multímetro digital para verificación de componentes asociados',
      'Tabla de conversión de códigos de error por marca',
      'Destornillador para desmontar el componente señalado por el código'
    ],
    safetyWarnings: [
      'No reiniciar la lavadora insistentemente sin antes verificar la causa del código; los errores LE o PE pueden quemar el módulo inversor si se fuerzan.'
    ],
    step1Identify: {
      question: '¿Cuál es la marca exacta y el código que aparece en el display?',
      checklist: [
        'Identificar la marca (LG, Samsung, Whirlpool, Mabe, Haceb, Bosch, Electrolux).',
        'Anotar los caracteres exactos del error (ejemplo: OE, 5E, dE, F02, E04, LE, uE).',
        'Si no tiene display: Contar la cantidad de destellos rápidos de los leds de estado.'
      ]
    },
    step2InitialChecks: {
      title: 'Decodificación técnica del código de falla',
      items: [
        'Consultar el módulo "Códigos de Error" integrado en la aplicación para obtener el significado exacto de la marca.',
        'Realizar un reseteo de prueba: Desconectar 5 minutos, mantener pulsado Inicio/Pausa durante 10 segundos y reconectar.',
        'Si el error persiste inmediatamente al conectar, la falla es un sensor abierto o cortocircuito permanente.'
      ]
    },
    step3RootCause: {
      title: 'Prueba del componente indicado por el error',
      probableCauses: [
        {
          cause: 'Sensor de nivel de agua (Presostato electrónico / Transductor de frecuencia) descalibrado o dañado',
          probability: 'Alta',
          howToConfirm: 'Errores tipo PE (LG), 1E/4C (Samsung), F0E2 (Whirlpool).',
          multimeterCheck: 'En presostatos electrónicos medir voltaje DC de alimentación (5 VDC entre extremos) y frecuencia en Hz en el pin central (nominal entre 24 kHz y 26 kHz vacía; baja a 21 kHz llena).'
        },
        {
          cause: 'Sensor de temperatura de agua NTC en corto o abierto',
          probability: 'Media',
          howToConfirm: 'Errores tipo tE (LG), tE1/tE2 (Samsung), F0E5 (Whirlpool).',
          multimeterCheck: 'Medir en bornes del NTC desconectado: Valor nominal a temperatura ambiente (25°C) de 10 kΩ a 50 kΩ según marca. Al calentar con la mano el valor en ohmios debe descender suavemente.'
        },
        {
          cause: 'Sensor de efecto Hall / Tacómetro del motor Inverter defectuoso',
          probability: 'Media',
          howToConfirm: 'Errores tipo LE (LG), 3E (Samsung), E08 (Bosch). El tambor se mueve 2 cm y se detiene.',
          multimeterCheck: 'Medir resistencia entre pines del conector Hall o medir pulsos de 0V a 12V girando el rotor a mano.'
        }
      ]
    },
    step4RepairProcedure: {
      disassemblySteps: [
        'Desconectar la lavadora de la red eléctrica.',
        'Desmontar la tapa o cubierta donde se aloja el componente sospechoso.',
        'Inspeccionar conectores en busca de sulfato verde o pines flojos por vibración.'
      ],
      replacementSteps: [
        'Reemplazar el componente defectuoso (presostato, sensor Hall, sensor NTC o seguro de puerta).',
        'Limpiar los pines del conector con limpiador de contactos electrónicos en aerosol dieléctrico.',
        'Asegurar el arnés con abrazaderas plásticas para que no vibre contra el chasis.'
      ],
      tips: [
        'En marcas LG y Samsung, el 40% de los errores tE o LE son causados por sulfatación en las clavijas del arnés inferior de cables y no por la pieza en sí.'
      ]
    },
    step5FinalVerification: {
      testCycle: 'Acceder al modo de diagnóstico de fábrica (Service Mode) y ejecutar prueba de componentes uno a uno.',
      safetyChecks: [
        'Comprobar que el display muestre "00" o no presente ningún error en memoria.',
        'Realizar un ciclo corto de enjuague y centrifugado completo.'
      ],
      acceptanceCriteria: 'Ciclo completado con normalidad, display limpio de errores y aviso sonoro de finalización.'
    },
    compatibleParts: [
      { name: 'Presostato electrónico LG 3 pines 6501EA1001R', specs: 'Frecuencia nominal 25.5 kHz', avgPriceCOP: 44800, reference: 'LG-6501EA1001R' },
      { name: 'Presostato electrónico Samsung DC96-01703G', specs: 'Conexión 3 pines 5V DC', avgPriceCOP: 49000, reference: 'SAM-DC96-01703G' },
      { name: 'Sensor Hall de motor LG Direct Drive 6501KW2002A', specs: 'Doble sensor Hall para estator Inverter', avgPriceCOP: 58800, reference: 'LG-6501KW2002A' },
      { name: 'Sensor de temperatura NTC de cuba 12 kΩ', specs: 'Rosca / junta de goma para resistencia', avgPriceCOP: 25200, reference: 'NTC-12K-UNIV' }
    ],
    testValues: [
      { component: 'Sensor Presostato electrónico (Frecuencia)', nominal: '24.5 kHz a 26.5 kHz (Cuba vacía)', shortCircuit: '0 Hz', openCircuit: 'Sin señal de oscilación' },
      { component: 'Sensor de temperatura NTC (a 25°C)', nominal: '10 kΩ a 12 kΩ (o 50 kΩ en Samsung)', shortCircuit: '< 500 Ω (tE error)', openCircuit: 'OL / Infinito (tE error)' }
    ]
  }
];
