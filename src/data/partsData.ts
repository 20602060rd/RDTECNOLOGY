import { SparePart } from '../types';

export const SPARE_PARTS: SparePart[] = [
  {
    id: 'part-bomba-askoll',
    name: 'Bomba de desagüe magnética universal 3 tornillos',
    category: 'Agua',
    partNumber: 'BOMB-ASK-110V',
    compatibleBrands: ['Whirlpool', 'LG', 'Samsung', 'Mabe', 'Haceb', 'Electrolux', 'Bosch'],
    avgPriceCOP: 53200, // +40% de 38.000
    nominalSpecs: '110V - 127V AC 60Hz 30W / Acople 3 tornillos bayoneta',
    multimeterRange: '15 Ω a 25 Ω en bornes. Si marca OL (infinito), bobina quemada.',
    failureSymptoms: [
      'La lavadora no evacúa el agua al llegar al ciclo de centrifugado',
      'Zumbido sordo inferior sin expulsión de agua',
      'Código OE (LG), 5E (Samsung), F02 (Whirlpool), E2 (Haceb)'
    ],
    maintenanceTip: 'Revisar la trampa de monedas cada 30 días para evitar que ganchos de brasier o clips traben el rotor.',
    image: '/src/assets/images/washer_drain_pump_testing_1792964966986.jpg'
  },
  {
    id: 'part-electrovalvula-doble',
    name: 'Electroválvula doble entrada 180° universal',
    category: 'Agua',
    partNumber: 'VALV-2VIAS-110',
    compatibleBrands: ['Mabe', 'Whirlpool', 'Haceb', 'Electrolux', 'Centrales'],
    avgPriceCOP: 39200, // +40% de 28.000
    nominalSpecs: '110V - 120V AC / Rosca estándar 3/4" / Salida espigo 12mm',
    multimeterRange: '800 Ω a 1.200 Ω (1.2 kΩ) por cada solenoide.',
    failureSymptoms: [
      'No llena de agua fría o no llena de agua caliente',
      'Llenado excesivamente lento con presión de agua domiciliaria normal',
      'Goteo continuo dentro de la tina con la lavadora apagada y desenchufada'
    ],
    maintenanceTip: 'Limpiar el tamiz plástico de entrada con vinagre blanco cada 6 meses en zonas de agua dura.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  },
  {
    id: 'part-electrovalvula-triple-inverter',
    name: 'Electroválvula triple para LG y Samsung Inverter',
    category: 'Agua',
    partNumber: 'VALV-3VIAS-INV',
    compatibleBrands: ['LG', 'Samsung'],
    avgPriceCOP: 72800, // +40% de 52.000
    nominalSpecs: '120V 60Hz / 3 bobinas: Lavado principal, prelavado y dispensador de suavizante',
    multimeterRange: '950 Ω a 1.250 Ω por bobina. Si marca < 100 Ω, está en corto.',
    failureSymptoms: [
      'No dispensa el suavizante en el último enjuague',
      'Códigos de error 4E / 4C (Samsung) o IE (LG)',
      'Presión de llenado insuficiente en jabonera'
    ],
    maintenanceTip: 'Verificar que los conectores eléctricos con pestaña de seguro hagan contacto firme sin sulfato.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  },
  {
    id: 'part-presostato-lg',
    name: 'Presostato electrónico transductor de frecuencia LG',
    category: 'Agua',
    partNumber: 'LG-6501EA1001R',
    compatibleBrands: ['LG'],
    avgPriceCOP: 44800, // +40% de 32.000
    nominalSpecs: 'Sensor de nivel piezoeléctrico 5V DC / Frecuencia de salida 21 a 26 kHz',
    multimeterRange: '5.0 VDC entre pines extremos. Con frecuencímetro: ~25.5 kHz en cuba vacía.',
    failureSymptoms: [
      'Código de error PE en pantalla',
      'La lavadora se desborda y sigue llenando sin cortar el agua',
      'Marca tina llena sin tener una sola gota de agua'
    ],
    maintenanceTip: 'Nunca soplar con compresor de aire de alta presión en el tubo del presostato porque romperá la membrana interna.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  },
  {
    id: 'part-sensor-hall-lg',
    name: 'Sensor de efecto Hall para motor LG Direct Drive',
    category: 'Motor',
    partNumber: 'LG-6501KW2002A',
    compatibleBrands: ['LG'],
    avgPriceCOP: 58800, // +40% de 42.000
    nominalSpecs: 'Doble sensor de efecto Hall para estator Inverter de 36 polos',
    multimeterRange: 'Resistencia entre pines de señal: 10 kΩ a 15 kΩ. En prueba dinámica: pulsos 0V-12V.',
    failureSymptoms: [
      'Código de error LE en el display',
      'El tambor intenta girar 2 centímetros y se bloquea con alarma sonora',
      'Falso balanceo al arrancar el centrifugado'
    ],
    maintenanceTip: 'Revisar minuciosamente los cables que van al conector del sensor Hall; frecuentemente se cortan por la vibración del motor.',
    image: '/src/assets/images/washer_tech_inspection_1792964965813.jpg'
  },
  {
    id: 'part-sensor-peso-mabe',
    name: 'Sensor de velocidad / peso Mabe Kraken para polea de motor',
    category: 'Motor',
    partNumber: 'MAB-SENS-VEL-01',
    compatibleBrands: ['Mabe', 'GE', 'Centrales'],
    avgPriceCOP: 36400, // +40% de 26.000
    nominalSpecs: 'Tarjeta sensora miniatura con acoplador magnético / Montaje bajo polea',
    multimeterRange: '5V DC de entrada. Al girar la polea con el dedo debe alternar entre 0V y 5V DC en terminal Out.',
    failureSymptoms: [
      'La lavadora agita 3 o 4 segundos y se detiene parpadeando todos los leds',
      'El centrifugado arranca y aborta de inmediato',
      'No detecta el tamaño de la carga de ropa'
    ],
    maintenanceTip: 'Al reemplazarlo, limpiar el imán permanente incrustado dentro de la polea plástica del motor.',
    image: '/src/assets/images/washer_tech_inspection_1792964965813.jpg'
  },
  {
    id: 'part-actuador-whirlpool',
    name: 'Actuador de cambio (Shift Actuator) Whirlpool Xpert System',
    category: 'Motor',
    partNumber: 'W10006355',
    compatibleBrands: ['Whirlpool', 'Maytag', 'Kenmore'],
    avgPriceCOP: 77000, // +40% de 55.000
    nominalSpecs: '120V 60Hz 4W / Conector de 6 pines con tacómetro óptico integrado',
    multimeterRange: 'Bobina de motor sincrónico (pines 2 y 3): 2.0 kΩ a 3.5 kΩ.',
    failureSymptoms: [
      'Código de error F7E1 o F7E5',
      'La máquina lava pero no centrifuga, o centrifuga pero no lava',
      'Ruido de piñones raspando debajo de la tina'
    ],
    maintenanceTip: 'Comprobar que la palanca plástica del actuador encaje correctamente en la ranura de la leva del embrague.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  },
  {
    id: 'part-bloqueapuertas-lg-sam',
    name: 'Bloqueapuertas térmico PTC con solenoide de enclavamiento',
    category: 'Puerta y Controles',
    partNumber: 'BLOQ-PTC-3PIN',
    compatibleBrands: ['LG', 'Samsung', 'Bosch', 'Electrolux'],
    avgPriceCOP: 53200, // +40% de 38.000
    nominalSpecs: '250V AC 16A / Tiempo de retardo de apertura 60-120 segundos tras fin de ciclo',
    multimeterRange: 'Resistencia de pastilla PTC: 600 Ω a 1.200 Ω. Contacto cerrado: 0 Ω.',
    failureSymptoms: [
      'Código de error dE, dE1 o dC en pantalla',
      'La puerta no se puede abrir tras finalizar el lavado',
      'No inicia el ciclo de centrifugado de alta velocidad por seguridad'
    ],
    maintenanceTip: 'Revisar que la lengüeta metálica de la puerta no esté doblada o vencida hacia abajo.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  },
  {
    id: 'part-kit-rodamientos-skf',
    name: 'Kit de rodamientos de alta revolución y retén de doble labio',
    category: 'Mecánica',
    partNumber: 'KIT-ROD-6205-6206',
    compatibleBrands: ['LG', 'Samsung', 'Whirlpool', 'Mabe', 'Haceb', 'Bosch'],
    avgPriceCOP: 105000, // +40% de 75.000
    nominalSpecs: '1x Rodamiento 6205-2RS + 1x 6206-2RS + Retén 37x66x10/12mm + Grasa hidrófuga',
    multimeterRange: 'No aplica (Mecánico). Tolerancia radial < 0.05mm.',
    failureSymptoms: [
      'Ruido ensordecedor de turbina de avión durante el centrifugado',
      'Manchas cafés de agua con óxido debajo de la máquina',
      'Juego vertical del tambor respecto a la cuba superior a 3 mm'
    ],
    maintenanceTip: 'Siempre colocar grasa marina especial para retenes en el labio del retén para evitar fricción seca y garantizar 5+ años de vida útil.',
    image: '/src/assets/images/washer_drum_mechanism_1792964967597.jpg'
  },
  {
    id: 'part-varillas-suspension',
    name: 'Juego de 4 varillas de suspensión calibradas para tina',
    category: 'Mecánica',
    partNumber: 'W10780048-SET4',
    compatibleBrands: ['Whirlpool', 'Haceb', 'Mabe', 'Samsung Carga Superior'],
    avgPriceCOP: 100800, // +40% de 72.000
    nominalSpecs: 'Longitud 60cm / 4 varillas con rótulas plásticas y resortes con código de color',
    multimeterRange: 'No aplica. Resistencia elástica calibrada.',
    failureSymptoms: [
      'La lavadora golpea las paredes laterales violentamente al centrifugar',
      'Códigos de desbalance continuo UE, uL o E3',
      'La tina queda ladeada hacia una esquina'
    ],
    maintenanceTip: 'Reemplazar siempre las 4 varillas simultáneamente. Colocar grasa de silicón de alta viscosidad en las cazoletas superiores.',
    image: '/src/assets/images/washer_drum_mechanism_1792964967597.jpg'
  },
  {
    id: 'part-condensador-arranque',
    name: 'Condensador de arranque y marcha para motor convencional',
    category: 'Eléctrico',
    partNumber: 'CAP-45UF-250V',
    compatibleBrands: ['Whirlpool', 'Mabe', 'Haceb', 'Electrolux', 'Centrales'],
    avgPriceCOP: 25200, // +40% de 18.000
    nominalSpecs: '45 µF (microfaradios) ± 5% / 250V - 450V AC 50/60Hz',
    multimeterRange: 'Con capacímetro: 42.7 µF a 47.3 µF. Si marca < 35 µF, desechar.',
    failureSymptoms: [
      'El motor intenta arrancar, emite zumbido y no gira a menos que se impulse la polea con la mano',
      'El motor se recalienta y salta el protector térmico a los 3 minutos de lavado'
    ],
    maintenanceTip: 'Descargar siempre con una resistencia o bombillo antes de manipular para evitar choque de corriente.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  },
  {
    id: 'part-resistencia-calefactora',
    name: 'Resistencia eléctrica de inmersión 2000W con orificio NTC',
    category: 'Eléctrico',
    partNumber: 'RES-2000W-NTC',
    compatibleBrands: ['LG', 'Samsung', 'Bosch', 'Electrolux'],
    avgPriceCOP: 67200, // +40% de 48.000
    nominalSpecs: '2000W 120V/220V con junta de expansión de goma y fusible térmico interno',
    multimeterRange: 'Resistencia entre terminales: 15 Ω a 30 Ω. Fuga a masa con chasis: > 10 MΩ (Infinito).',
    failureSymptoms: [
      'No calienta el agua en programas de 40°C o 60°C',
      'Dispara el interruptor diferencial / breaker de la casa apenas inicia el lavado',
      'Ciclos de lavado que no terminan nunca'
    ],
    maintenanceTip: 'Descalcificar periódicamente con ácido cítrico si el agua de la zona es dura para evitar perforación del blindaje.',
    image: '/src/assets/images/washer_parts_exploded_1792964966841.jpg'
  }
];
