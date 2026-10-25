import { ErrorCodeItem } from '../types';

export const ERROR_CODES: ErrorCodeItem[] = [
  // LG
  {
    code: 'OE',
    brand: 'LG',
    modelType: 'Inverter',
    description: 'Error de Desagüe / Drenaje (Drain Failure)',
    probableCauses: [
      'Bomba de desagüe bloqueada por monedas, clips o cabellos',
      'Bobina de la bomba de drenaje abierta o quemada',
      'Manguera de salida estrangulada o colocada a más de 1 metro de altura',
      'Falla en el triac de salida de desagüe en la placa electrónica'
    ],
    solutionSteps: [
      'Desenroscar el filtro de la bomba inferior y limpiar residuos mecánicos',
      'Girar la hélice de la bomba para verificar que rote con saltos magnéticos libres',
      'Desconectar la bomba y medir resistencia en bornes con multímetro',
      'Verificar si llegan 110V/220V al conector durante el paso de centrifugado'
    ],
    multimeterTest: 'Resistencia de la bobina de la bomba: 15 Ω a 25 Ω (110V) o 150 Ω (220V). Si marca OL = Bobina abierta (Reemplazar bomba).',
    resetProcedure: 'Apagar la lavadora, desconectar de la toma durante 5 minutos, pulsar y mantener presionado el botón Inicio durante 5 segundos, y volver a encender.'
  },
  {
    code: 'IE',
    brand: 'LG',
    modelType: 'Inverter',
    description: 'Error de Entrada de Agua (Inlet Error)',
    probableCauses: [
      'Grifo de agua cerrado o presión de acueducto insuficiente',
      'Tamiz plástico de la electroválvula saturado de sedimentos y arenilla',
      'Bobina solenoide de electroválvula quemada',
      'Presostato electrónico defectuoso que no detecta el ingreso de agua'
    ],
    solutionSteps: [
      'Cerrar llave, desenroscar manguera y extraer con pinza el filtro de la válvula para lavarlo',
      'Medir resistencia de las bobinas de electroválvula fría y caliente',
      'Comprobar cableado y conectores hacia la placa principal'
    ],
    multimeterTest: 'Resistencia solenoide: 800 Ω a 1.200 Ω (110V) o ~4.000 Ω (220V).',
    resetProcedure: 'Presionar pausa, abrir llave y reanudar ciclo.'
  },
  {
    code: 'dE / dE1 / dE2',
    brand: 'LG',
    modelType: 'Universal',
    description: 'Error de Puerta / Seguro de Tapa (Door Error)',
    probableCauses: [
      'Puerta mal cerrada o trabada con ropa',
      'Bloqueapuertas térmico PTC o interruptor electromagnético dañado',
      'Gancho o pestillo de puerta quebrado o desalineado',
      'Sulfatación en conector de la cerradura'
    ],
    solutionSteps: [
      'Empujar firmemente la puerta hasta oír el pestillo',
      'Inspeccionar el bloqueapuertas y comprobar continuidad del microswitch al cerrarse',
      'Sustituir el mecanismo de seguro de puerta si no enclava'
    ],
    multimeterTest: 'Continuidad en pines de contacto: 0 Ω con cerrojo accionado; OL con puerta abierta.',
    resetProcedure: 'Abrir y cerrar la puerta con firmeza. Si persiste tras 3 intentos, sustituir bloqueapuertas.'
  },
  {
    code: 'UE / uE',
    brand: 'LG',
    modelType: 'Universal',
    description: 'Error de Desbalance de Carga (Unbalanced Error)',
    probableCauses: [
      'Prendas pesadas (edredón, toallas) agrupadas en un solo lado del tambor',
      'Lavadora desnivelada sobre patas de goma flojas',
      'Varillas de suspensión o amortiguadores desgastados',
      'Sensor Hall descalibrado'
    ],
    solutionSteps: [
      'Pausar ciclo, redistribuir la ropa uniformemente con la mano',
      'Ajustar patas niveladoras con nivel de burbuja',
      'Comprobar firmeza de resortes de suspensión'
    ],
    resetProcedure: 'Pausar, redistribuir ropa y presionar Inicio/Pausa.'
  },
  {
    code: 'LE',
    brand: 'LG',
    modelType: 'Inverter',
    description: 'Error de Motor Bloqueado (Locked Drive Motor)',
    probableCauses: [
      'Sobrecarga excesiva de ropa que impide el giro del tambor',
      'Sensor de efecto Hall (sensor de posición) del motor Direct Drive defectuoso',
      'Objeto atrapado entre el tambor y la cuba',
      'Falla en el arnés de cables del estator o módulo inversor IPM'
    ],
    solutionSteps: [
      'Girar el tambor con la mano apagada: debe rotar libremente sin roces mecánicos',
      'Revisar si hay una prenda atrapada entre el fuelle y la tina',
      'Desconectar el conector del sensor Hall y medir resistencia o verificar si hay cables partidos por vibración en el brazo del motor',
      'Sustituir el sensor Hall doble de la carcasa del estator'
    ],
    multimeterTest: 'En pines de sensor Hall: Medir entre Vcc (pin 1) y salidas Ha/Hb (pines 4 y 5): nominal ~10 kΩ a ~15 kΩ con multímetro.',
    resetProcedure: 'Desconectar de la corriente durante 10 minutos para reiniciar los circuitos de protección térmica del IPM.'
  },
  {
    code: 'PE',
    brand: 'LG',
    modelType: 'Inverter',
    description: 'Error de Sensor de Nivel / Presostato (Pressure Sensor)',
    probableCauses: [
      'Presostato de frecuencia electrónico averiado',
      'Manguera del presostato zafada, perforada o tapada con detergente seco',
      'Cableado de 3 hilos sulfatado o mordido por roedores'
    ],
    solutionSteps: [
      'Inspeccionar la manguera transparente desde la cámara de compresión en la tina hasta el presostato',
      'Desconectar la manguera y soplar suavemente hacia la tina para limpiar residuos',
      'Medir voltaje de alimentación (5 VDC) que llega al presostato'
    ],
    multimeterTest: 'Voltaje DC entre pines extremos del presostato: 5.0 VDC. Frecuencia en pin central: 24.5 kHz a 26.5 kHz (en vacío).',
    resetProcedure: 'Revisar manguera y reconectar conector firmemente.'
  },
  {
    code: 'tE',
    brand: 'LG',
    modelType: 'Carga Frontal',
    description: 'Error de Termistor / Sensor de Temperatura (Thermistor Error)',
    probableCauses: [
      'Sensor termistor NTC abierto o en cortocircuito',
      'Conector del sensor en la base de la resistencia oxidado por humedad',
      'Resistencia calefactora quemada'
    ],
    solutionSteps: [
      'Acceder a la parte posterior de la tina donde está montada la resistencia',
      'Desconectar el conector del NTC y medir resistencia a temperatura ambiente'
    ],
    multimeterTest: 'Sensor NTC a 25°C: 10 kΩ a 12 kΩ (o 40-50 kΩ según versión). Al frotar con la mano debe bajar progresivamente. Si marca 0 Ω o OL = Dañado.',
    resetProcedure: 'Sustituir el sensor NTC e iniciar ciclo en frío.'
  },
  {
    code: 'CL',
    brand: 'LG',
    modelType: 'Universal',
    description: 'Bloqueo para Niños Activado (Child Lock)',
    probableCauses: [
      'Función de protección infantil activada voluntaria o accidentalmente'
    ],
    solutionSteps: [
      'No es una falla técnica. Los botones no responderán mientras CL esté en pantalla.',
      'Identificar los dos botones con el símbolo de una cara de bebé o candado (habitualmente "Enjuague + Centrifugado" o botón "Child Lock").',
      'Mantener pulsados ambos botones simultáneamente durante 3 a 5 segundos continuos hasta oír un pitido.'
    ],
    resetProcedure: 'Pulsar y mantener los botones indicados con candado durante 3 segundos.'
  },

  // SAMSUNG
  {
    code: '4E / 4C',
    brand: 'Samsung',
    modelType: 'Universal',
    description: 'Falla en el Suministro de Agua (Water Supply Error)',
    probableCauses: [
      'Llaves de paso cerradas o manguera de entrada doblada',
      'Filtro de entrada con arenilla o cal',
      'Electroválvula doble 110V/220V quemada',
      'Presostato electrónico que no detecta llenado tras 15 minutos'
    ],
    solutionSteps: [
      'Limpiar tamiz de la válvula con cepillo',
      'Medir bobina de la electroválvula con multímetro',
      'Comprobar manguera de presostato'
    ],
    multimeterTest: 'Bobina de electroválvula Samsung: ~1.1 kΩ (110V) o ~4.2 kΩ (220V).',
    resetProcedure: 'Apagar la máquina, abrir llaves y reanudar.'
  },
  {
    code: '5E / 5C / SE',
    brand: 'Samsung',
    modelType: 'Universal',
    description: 'Falla en el Drenaje de Agua (Drain Error)',
    probableCauses: [
      'Filtro atrapamotas inferior tapado con monedas, pelusa o pasadores',
      'Bomba de drenaje quemada o hélice partida',
      'Manguera de salida sumergida o doblada',
      'Falla en el triac de desagüe en tarjeta'
    ],
    solutionSteps: [
      'Drenar agua por el tubito auxiliar inferior y sacar tapón del filtro para limpiar',
      'Medir bobina de la bomba de desagüe',
      'Verificar tensión 110V en cables de bomba durante drenado'
    ],
    multimeterTest: 'Bobina de bomba: 16 Ω a 22 Ω (110V). Si marca OL = Abierta.',
    resetProcedure: 'Limpiar trampa de filtro y reiniciar ciclo.'
  },
  {
    code: 'dE / dC / dE1',
    brand: 'Samsung',
    modelType: 'Universal',
    description: 'Error de Puerta Abierta / Seguro de Puerta',
    probableCauses: [
      'Puerta mal cerrada o seguro de puerta dañado',
      'Lengüeta de la puerta desalineada con el orificio del chasis',
      'Microswitch de seguridad roto'
    ],
    solutionSteps: [
      'Cerrar con firmeza y escuchar el enganche mecánico',
      'Comprobar bloqueapuertas con multímetro',
      'Verificar arnés de la cerradura'
    ],
    multimeterTest: 'Continuidad en microswitch con pestillo presionado: 0 Ω.',
    resetProcedure: 'Abrir y cerrar puerta firmemente.'
  },
  {
    code: 'UE / Ub / E4',
    brand: 'Samsung',
    modelType: 'Universal',
    description: 'Desbalance de Ropa en Tambor (Unbalanced Load)',
    probableCauses: [
      'Carga desbalanceada (pocas prendas grandes o nudo de sábanas)',
      'Lavadora no nivelada',
      'Amortiguadores vencidos o resortes de cuba sueltos'
    ],
    solutionSteps: [
      'Abrir y desenredar prendas distribuyéndolas en círculo',
      'Nivelar patas inferiores con tuerca de ajuste',
      'Revisar si el tambor oscila libremente sin amortiguación'
    ],
    resetProcedure: 'Distribuir ropa y presionar Inicio.'
  },
  {
    code: '3E / 3C / 3C1',
    brand: 'Samsung',
    modelType: 'Inverter',
    description: 'Falla de Motor / Sensor Tacómetro / Hall',
    probableCauses: [
      'Sobrecarga en el tambor',
      'Bobinas del motor Direct Drive en cortocircuito o desbalanceadas',
      'Sensor Hall del motor averiado o conector desajustado',
      'Placa de potencia Inverter dañada'
    ],
    solutionSteps: [
      'Verificar que el tambor no esté trabado manualmente',
      'Medir resistencia entre los 3 devanados del motor (U, V, W): deben tener el mismo valor exacto',
      'Revisar conector del sensor de revoluciones en el motor'
    ],
    multimeterTest: 'En devanados de motor Inverter (U-V, V-W, U-W): Los 3 valores deben ser idénticos (ej. ~11.5 Ω a ~16 Ω cada uno). Si uno difiere por más de 1 Ω, hay espiras en corto.',
    resetProcedure: 'Desconectar 15 minutos para resetear inversor.'
  },
  {
    code: 'SUD / 5UD',
    brand: 'Samsung',
    modelType: 'Universal',
    description: 'Exceso de Espuma Detectado (Over Foaming)',
    probableCauses: [
      'Uso excesivo de detergente no apto para lavadoras automáticas (no HE)',
      'Detergente común de baja biodegradabilidad generador de burbujas excesivas'
    ],
    solutionSteps: [
      'La lavadora esperará automáticamente a que la espuma baje (puede tardar hasta 2 horas con bomba activa)',
      'Realizar un ciclo de enjuague adicional con agua caliente sin detergente',
      'Instruir al cliente a utilizar detergente líquido con sello "HE" (High Efficiency) y dosificar adecuadamente'
    ],
    resetProcedure: 'Esperar a que baje la espuma automáticamente o ejecutar ciclo de desagüe manual.'
  },

  // WHIRLPOOL
  {
    code: 'F02 / LD',
    brand: 'Whirlpool',
    modelType: 'Carga Superior',
    description: 'Drenaje Largo / Long Drain (El agua tarda más de 5 min en vaciar)',
    probableCauses: [
      'Bomba de desagüe averiada o con hélice desgastada',
      'Manguera de drenaje doblada o tubo de pared atascado',
      'Presostato atorado indicando nivel alto erróneo'
    ],
    solutionSteps: [
      'Limpiar trampa de monedas y manguera corrugada',
      'Comprobar bobina de la bomba de desagüe (110V: 15-25 Ω)',
      'Revisar manguerita de presostato'
    ],
    multimeterTest: 'Bomba 110V: 15 Ω a 25 Ω.',
    resetProcedure: 'Pulsar Cancelar dos veces seguidas para borrar error.'
  },
  {
    code: 'F01 / LF',
    brand: 'Whirlpool',
    modelType: 'Carga Superior',
    description: 'Llenado Largo / Long Fill (No alcanza nivel en 13 minutos)',
    probableCauses: [
      'Mangueras de agua estranguladas o llaves cerradas',
      'Filtros de tamiz de electroválvula atascados',
      'Sifonamiento de agua por manguera de desagüe demasiado baja'
    ],
    solutionSteps: [
      'Revisar que la manguera de drenaje esté a mínimo 85 cm de altura',
      'Limpiar filtros de entrada',
      'Probar electroválvulas con multímetro'
    ],
    multimeterTest: 'Electroválvula Whirlpool: 800 Ω a 1.200 Ω.',
    resetProcedure: 'Pulsar Cancelar, abrir llaves y reiniciar.'
  },
  {
    code: 'F03 / uL',
    brand: 'Whirlpool',
    modelType: 'Carga Superior',
    description: 'Carga Desbalanceada / Unbalanced Load',
    probableCauses: [
      'Ropa amontonada en un extremo de la canasta',
      'Varillas de suspensión vencidas (amortiguadores colgantes de tina)',
      'Anillo de balance de la tina sin líquido salino compensador'
    ],
    solutionSteps: [
      'Distribuir prendas equitativamente',
      'Probar rebote de la tina con la mano: Si baila descontroladamente cambiar las 4 varillas de suspensión W10780048'
    ],
    resetProcedure: 'Reordenar carga y pulsar Inicio.'
  },
  {
    code: 'F7E1 / F7E5',
    brand: 'Whirlpool',
    modelType: 'Carga Superior',
    description: 'Falla del Actuador de Cambio (Shift Actuator Fault)',
    probableCauses: [
      'El actuador no logra mover el embrague (splutch) entre lavado y centrifugado',
      'Sensor óptico de velocidad del actuador sucio de grasa o dañado',
      'Leva de plástico o resorte de embrague partido'
    ],
    solutionSteps: [
      'Acostarse bajo la máquina y retirar el cobertor plástico de la polea',
      'Revisar el actuador (caja roja o blanca con 6 pines): comprobar que el brazo encaje en la leva',
      'Medir resistencia del pequeño motor sincrónico del actuador'
    ],
    multimeterTest: 'Pines de motor del actuador (pines 2 y 3): 2.0 kΩ a 3.5 kΩ.',
    resetProcedure: 'Realizar calibración de fábrica: Girar perilla selectora: 1 clic antihorario, 3 clics horario, 1 clic antihorario, 1 clic horario; luego presionar Inicio.'
  },

  // MABE / KRAKEN / AQUA SAVER
  {
    code: 'E1',
    brand: 'Mabe',
    modelType: 'Carga Superior',
    description: 'Falla de Llenado de Agua (Tiempo excedido de llenado)',
    probableCauses: [
      'Baja presión de acueducto o grifos semicerrados',
      'Filtros de electroválvula atascados',
      'Presostato de frecuencia defectuoso'
    ],
    solutionSteps: [
      'Limpiar cedazos de manguera de agua',
      'Medir electroválvulas en escala de ohmios',
      'Revisar manguerita de presión de tina'
    ],
    multimeterTest: 'Electroválvula: 1.0 kΩ ± 10%.',
    resetProcedure: 'Apagar la máquina durante 1 minuto.'
  },
  {
    code: 'E2',
    brand: 'Mabe',
    modelType: 'Carga Superior',
    description: 'Falla de Desagüe / Tiempo Excedido',
    probableCauses: [
      'Bomba de agua quemada o trabada con residuos',
      'Manguera de drenaje aplastada'
    ],
    solutionSteps: [
      'Revisar filtro y cuerpo de bomba bajo la lavadora',
      'Comprobar bobina con multímetro (15-25 Ω)'
    ],
    multimeterTest: 'Bobina de bomba: ~20 Ω.',
    resetProcedure: 'Desconectar de la red eléctrica.'
  },
  {
    code: 'Leds Parpadean (Sensor de Velocidad)',
    brand: 'Mabe',
    modelType: 'Carga Superior',
    description: 'Agita 3 Segundos, se Detiene y Titilan los Leds de Centrifugado/Lavado',
    probableCauses: [
      'Sensor de peso / sensor Hall de velocidad defectuoso (ubicado debajo de la polea del motor)',
      'Imán de la polea del motor desprendido o sucio de óxido',
      'Correa floja que resbala en el arranque'
    ],
    solutionSteps: [
      'Retirar la correa y aflojar la tuerca de la polea del motor para acceder a la pequeña tarjeta con sensor de efecto Hall',
      'Limpiar el imán incrustado en el interior de la polea',
      'Reemplazar la tarjetita sensora Hall de Mabe (referencia muy común y económica)',
      'Ajustar tensión de la correa'
    ],
    multimeterTest: 'Con multímetro en Voltios DC: Medir voltaje entre tierra y señal mientras se rota la polea con el dedo; debe oscilar entre 0V y 5V DC en pulsos rítmicos.',
    resetProcedure: 'Desconectar 5 minutos y reiniciar en ciclo corto.'
  },

  // HACEB (Colombia: Arezzo, Assento, Espacio, Digital)
  {
    code: 'E1',
    brand: 'Haceb',
    modelType: 'Carga Superior',
    description: 'Falla de Suministro de Agua',
    probableCauses: [
      'Grifos de entrada cerrados o presión domiciliaria baja',
      'Filtros de entrada con lodo o caliche',
      'Electroválvula desvalorizada'
    ],
    solutionSteps: [
      'Limpiar tamiz de electroválvula',
      'Medir solenoide con multímetro (~1.1 kΩ)',
      'Revisar manguera de presostato'
    ],
    multimeterTest: 'Electroválvula: 950 Ω a 1.250 Ω.',
    resetProcedure: 'Cerrar tapa y presionar Inicio/Pausa.'
  },
  {
    code: 'E2',
    brand: 'Haceb',
    modelType: 'Carga Superior',
    description: 'Falla de Drenaje / Desagüe',
    probableCauses: [
      'Bomba de desagüe atascada con monedas o bobina quemada',
      'Manguera de drenaje doblada o atascada en sifón de piso'
    ],
    solutionSteps: [
      'Desmontar bomba inferior y limpiar trampa',
      'Medir bobina en ohmios (15-25 Ω)'
    ],
    multimeterTest: 'Resistencia bomba: 18 Ω ± 3 Ω a 110V.',
    resetProcedure: 'Apagar por 2 minutos y reiniciar centrifugado.'
  },
  {
    code: 'E3',
    brand: 'Haceb',
    modelType: 'Carga Superior',
    description: 'Desbalance de Tina o Tapa Abierta en Centrifugado',
    probableCauses: [
      'Ropa apelmazada en un lado del tambor',
      'Switche de seguridad de tapa con terminales sulfatados',
      'Varillas amortiguadoras con grasa reseca'
    ],
    solutionSteps: [
      'Acomodar prendas en la canasta',
      'Verificar contacto del switch de tapa',
      'Nivelar patas de apoyo'
    ],
    multimeterTest: 'Continuidad switch de tapa: 0 Ω cerrado.',
    resetProcedure: 'Abrir y cerrar tapa.'
  },
  {
    code: 'E4',
    brand: 'Haceb',
    modelType: 'Carga Superior',
    description: 'Error de Presostato / Nivel de Agua',
    probableCauses: [
      'Presostato electrónico defectuoso',
      'Manguera de nivel pinchada o desconectada de la trampa de aire'
    ],
    solutionSteps: [
      'Comprobar estado de la manguera de goma',
      'Medir señal del presostato'
    ],
    multimeterTest: 'Voltaje 5V DC en terminales de presostato.',
    resetProcedure: 'Revisar conexiones de la tarjeta principal.'
  },

  // BOSCH
  {
    code: 'E18 / F18',
    brand: 'Bosch',
    modelType: 'Carga Frontal',
    description: 'Filtro de Bomba Bloqueado / Tiempo de Desagüe Excedido',
    probableCauses: [
      'Monedas, horquillas o botones en el filtro inferior de la bomba',
      'Bomba de drenaje quemada o hélice partida',
      'Tubo de desagüe obstruido'
    ],
    solutionSteps: [
      'Abrir la compuerta inferior derecha, desenroscar el tapón y limpiar la cámara',
      'Girar la hélice con el dedo: debe girar a impulsos magnéticos',
      'Comprobar bobina con multímetro (220V: ~140-160 Ω)'
    ],
    multimeterTest: 'Bobina de bomba Bosch 220V: 140 Ω a 170 Ω.',
    resetProcedure: 'Limpiar filtro y seleccionar programa Centrifugar/Vaciar.'
  },
  {
    code: 'E17 / F17',
    brand: 'Bosch',
    modelType: 'Carga Frontal',
    description: 'Tiempo de Llenado de Agua Superado',
    probableCauses: [
      'Llave de paso cerrada o manguera AquaStop bloqueada',
      'Filtro tamiz de la manguera lleno de sarro'
    ],
    solutionSteps: [
      'Limpiar filtro de entrada en la toma posterior',
      'Verificar válvula AquaStop en el extremo del grifo'
    ],
    multimeterTest: 'Válvula 220V: ~4.000 Ω.',
    resetProcedure: 'Presionar botón de Inicio.'
  },

  // ELECTROLUX
  {
    code: 'E10 / E11',
    brand: 'Electrolux',
    modelType: 'Universal',
    description: 'Problema en la Entrada de Agua',
    probableCauses: [
      'Baja presión en la red doméstica',
      'Filtro de malla de la manguera sucio',
      'Electroválvula averiada'
    ],
    solutionSteps: [
      'Limpiar tamiz de la electroválvula',
      'Medir resistencia de bobinas'
    ],
    multimeterTest: 'Electroválvula: 1.0 kΩ (110V) / 3.8 kΩ (220V).',
    resetProcedure: 'Revisar llaves de agua y reiniciar.'
  },
  {
    code: 'E20 / E21',
    brand: 'Electrolux',
    modelType: 'Universal',
    description: 'Problema en la Evacuación de Agua',
    probableCauses: [
      'Filtro de desagüe atorado',
      'Bomba de drenaje dañada',
      'Manguera de vaciado atascada'
    ],
    solutionSteps: [
      'Limpiar trampa de impurezas',
      'Medir continuidad de la bomba'
    ],
    multimeterTest: 'Bomba 110V: 18 Ω a 24 Ω.',
    resetProcedure: 'Limpiar filtro y seleccionar ciclo de centrifugado.'
  }
];
