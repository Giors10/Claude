import type { Question } from '../../types';
import { STATEMENT_OPTIONS, ST } from '../shared';

const t = String.raw;

/**
 * Mock 2 (Forge) — Physics.
 * 27 questions, 40 minutes, no calculator; g = 10 N kg⁻¹. Realistic ESAT
 * style with seven "which statements are correct" questions, pitched a
 * little above real difficulty.
 */
export const PH: Question[] = [
  {
    id: '2-PH-01',
    module: 'PH',
    n: 1,
    topic: 'P1',
    spec: ['P1.2j', 'P1.2n', 'P1.2f'],
    title: 'Energy in one resistor of a series circuit',
    difficulty: 1,
    time: 65,
    stem: t`A 12 V battery of negligible internal resistance is connected in series with three resistors of resistance $4.0\ \Omega$, $6.0\ \Omega$ and $14\ \Omega$.

How much energy is transferred by the $6.0\ \Omega$ resistor in 2.0 minutes?`,
    options: [t`3.0 J`, t`90 J`, t`180 J`, t`420 J`, t`720 J`, t`2880 J`],
    answer: 2,
    hints: [t`In series the resistances add, and the same current flows through every resistor.`],
    solution: t`The total resistance is $4.0 + 6.0 + 14 = 24\ \Omega$, so the current is
$$I = \frac{12}{24} = 0.50\ \text{A}.$$

The potential difference across the $6.0\ \Omega$ resistor is $V = IR = 0.50 \times 6.0 = 3.0$ V. In 2.0 minutes $= 120$ s,
$$E = VIt = 3.0 \times 0.50 \times 120 = 180\ \text{J}.$$`,
    traps: {
      0: t`Uses $t = 2$: the time must be in seconds, $120$ s.`,
      1: t`Uses 60 s instead of 120 s.`,
      3: t`$420$ J is the energy transferred by the $14\ \Omega$ resistor.`,
      4: t`$720$ J is the energy supplied by the battery to the whole circuit.`,
      5: t`Puts the full 12 V across the $6.0\ \Omega$ resistor; in series the 12 V is shared between the three resistors.`,
    },
    insight: t`In a series circuit, find the current from the total resistance first, then the share of the voltage across each component.`,
    skills: ['series circuits', 'energy transferred', 'resistance'],
  },
  {
    id: '2-PH-02',
    module: 'PH',
    n: 2,
    topic: 'P7',
    spec: ['P7.1a', 'P7.1c', 'P7.1d', 'P7.1f', 'P7.1g'],
    title: 'Particles in an iron ion',
    difficulty: 1,
    time: 60,
    stem: t`An ion of iron is represented by $^{56}_{26}\text{Fe}^{3+}$.

How many protons, neutrons and electrons does the ion contain?`,
    options: [
      t`26 protons, 30 neutrons, 23 electrons`,
      t`26 protons, 30 neutrons, 26 electrons`,
      t`26 protons, 30 neutrons, 29 electrons`,
      t`26 protons, 56 neutrons, 23 electrons`,
      t`30 protons, 26 neutrons, 23 electrons`,
      t`23 protons, 33 neutrons, 23 electrons`,
    ],
    answer: 0,
    hints: [t`The lower number is the atomic (proton) number; the upper number counts protons and neutrons together.`, t`A positive ion has *lost* electrons.`],
    solution: t`- The atomic number 26 is the number of protons.
- The mass number 56 counts protons and neutrons, so there are $56 - 26 = 30$ neutrons.
- A neutral iron atom has 26 electrons. The $3+$ charge means it has lost 3 electrons (each carries a charge of $-1$), leaving $26 - 3 = 23$ electrons.`,
    traps: {
      2: t`A $3+$ ion has *lost* 3 electrons; gaining electrons would make it negative.`,
      1: t`Ignores the charge: a neutral atom has 26 electrons, but this ion has lost 3.`,
      3: t`56 is the mass number, the total of protons and neutrons.`,
      4: t`Swaps the numbers: the lower number (26) is the proton number.`,
      5: t`Ionisation changes only the number of electrons; the nucleus is unchanged.`,
    },
    insight: t`Ionisation changes only the electrons: a positive ion has lost electrons, and the nucleus stays the same.`,
    skills: ['atomic structure', 'nuclide notation', 'ions'],
  },
  {
    id: '2-PH-03',
    module: 'PH',
    n: 3,
    topic: 'P6',
    spec: ['P6.4e', 'P6.4f', 'P6.4g'],
    title: 'Sonar depth and hearing',
    difficulty: 1,
    time: 65,
    stem: t`A ship's sonar sends a pulse of sound of frequency 40 kHz straight down. The echo from the sea bed is detected 0.40 s after the pulse is sent. Sound travels at $1500\ \text{m s}^{-1}$ in sea water.

How deep is the sea, and could a person hear the pulse?`,
    options: [
      t`300 m; yes, it is audible`,
      t`300 m; no, it is ultrasound`,
      t`600 m; yes, it is audible`,
      t`600 m; no, it is ultrasound`,
      t`150 m; no, it is ultrasound`,
      t`3750 m; no, it is ultrasound`,
    ],
    answer: 1,
    hints: [t`In 0.40 s the pulse travels down to the sea bed *and* back.`],
    solution: t`In 0.40 s the pulse travels $1500 \times 0.40 = 600$ m. This is the distance down and back, so the depth is
$$\frac{600}{2} = 300\ \text{m}.$$

Humans hear frequencies from about 20 Hz to 20 kHz. At 40 kHz the pulse is ultrasound, so it cannot be heard.`,
    traps: {
      0: t`40 kHz is above the upper limit of human hearing, about 20 kHz.`,
      3: t`600 m is the total distance the pulse travels, down and back.`,
      4: t`Halves the distance twice.`,
      5: t`Divides the speed by the time instead of multiplying.`,
    },
    insight: t`For an echo, the distance to the reflector is half of speed × time.`,
    skills: ['echoes', 'ultrasound', 'range of hearing'],
  },
  {
    id: '2-PH-04',
    module: 'PH',
    n: 4,
    topic: 'P6',
    spec: ['P6.1a', 'P6.1b', 'P6.1c', 'P6.1d', 'P6.4d'],
    title: 'Describing waves',
    difficulty: 2,
    time: 70,
    stem: t`Consider the following statements about waves.`,
    statements: [
      t`Waves transfer energy from one place to another without any overall movement of the material they travel through.`,
      t`Light, ripples on water and sound are all transverse waves.`,
      t`In a sound wave, a compression is a region where the air particles are closer together than normal, and a rarefaction is a region where they are further apart.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`In which direction do the air particles vibrate in a sound wave?`],
    solution: t`**Statement 1.** True: the particles of the medium vibrate about fixed positions and pass energy on; the material itself does not travel with the wave. ✓

**Statement 2.** False: light and water ripples are transverse, but sound is **longitudinal**: the air particles vibrate parallel to the direction the wave travels. ✗

**Statement 3.** True: these are the definitions of compressions and rarefactions in a longitudinal wave. ✓

Statements 1 and 3 only.`,
    traps: {
      [ST.all]: t`Sound is longitudinal, not transverse.`,
      [ST.s3]: t`Statement 1 is also true: a wave carries energy, not the medium.`,
    },
    insight: t`Transverse: vibrations at right angles to the direction of travel (light, water ripples). Longitudinal: vibrations along it (sound), with compressions and rarefactions.`,
    skills: ['wave properties', 'transverse and longitudinal waves'],
  },
  {
    id: '2-PH-05',
    module: 'PH',
    n: 5,
    topic: 'P3',
    spec: ['P3.1a', 'P3.1b', 'P3.1g'],
    title: 'Average speed and average velocity on a track',
    difficulty: 2,
    time: 75,
    stem: t`An athlete runs one and a half laps of a circular track of circumference 400 m in 100 s.

What are her average speed and the size of her average velocity over the 100 s?`,
    options: [
      t`$6.0\ \text{m s}^{-1}$ and $0$`,
      t`$6.0\ \text{m s}^{-1}$ and $2.0\ \text{m s}^{-1}$`,
      t`$6.0\ \text{m s}^{-1}$ and $\dfrac{2}{\pi}\ \text{m s}^{-1}$`,
      t`$4.0\ \text{m s}^{-1}$ and $\dfrac{4}{\pi}\ \text{m s}^{-1}$`,
      t`$6.0\ \text{m s}^{-1}$ and $6.0\ \text{m s}^{-1}$`,
      t`$6.0\ \text{m s}^{-1}$ and $\dfrac{4}{\pi}\ \text{m s}^{-1}$`,
    ],
    answer: 5,
    hints: [t`Speed uses the distance travelled; velocity uses the displacement (straight-line distance from the start).`, t`After one and a half laps she is exactly opposite her starting point.`],
    solution: t`**Average speed** uses the distance travelled: $1.5 \times 400 = 600$ m, so
$$\text{average speed} = \frac{600}{100} = 6.0\ \text{m s}^{-1}.$$

**Average velocity** uses the displacement. After one and a half laps she is diametrically opposite the start, so her displacement is one diameter:
$$d = \frac{400}{\pi}\ \text{m}, \qquad \text{average velocity} = \frac{400/\pi}{100} = \frac{4}{\pi}\ \text{m s}^{-1} \approx 1.3\ \text{m s}^{-1}.$$`,
    traps: {
      0: t`After one and a half laps she is not back at the start: she is on the opposite side of the track.`,
      1: t`Uses the half-lap distance *along the track*, 200 m; displacement is the straight line across, a diameter.`,
      2: t`Uses the radius, $\tfrac{200}{\pi}$ m, instead of the diameter.`,
      3: t`Uses one lap instead of one and a half for the distance.`,
      4: t`Speed and velocity are only equal in size for motion in a straight line in one direction.`,
    },
    insight: t`Speed is distance ÷ time (a scalar); velocity is displacement ÷ time (a vector), and on a curved path they differ.`,
    skills: ['speed and velocity', 'distance and displacement', 'scalars and vectors'],
  },
  {
    id: '2-PH-06',
    module: 'PH',
    n: 6,
    topic: 'P2',
    spec: ['P2.2a', 'P2.2b'],
    title: 'Compass beside a current-carrying wire',
    difficulty: 2,
    time: 70,
    stem: t`A long, straight wire passes vertically through a horizontal sheet of card. A steady current flows **upwards** in the wire. A small plotting compass is placed on the card a few centimetres due west of the wire.

Ignoring the Earth's magnetic field, in which direction does the north pole of the compass needle point?`,
    options: [t`north`, t`north-east`, t`east`, t`south`, t`south-west`, t`west`],
    answer: 3,
    hints: [t`The field lines around a straight wire are circles centred on the wire.`, t`Right-hand grip rule: thumb along the current, fingers curl the way the field goes.`],
    solution: t`The field lines are circles around the wire, and the compass needle lines up along the circle, at right angles to the line joining it to the wire.

Use the right-hand grip rule with the thumb pointing up (along the current): the fingers curl **anticlockwise** when the card is viewed from above.

On an anticlockwise circle seen from above (north at the top), a point due west of the centre is moving **south**. So the needle's north pole points south.`,
    traps: {
      0: t`This is the direction for a clockwise field: it comes from using the left hand, or from a current flowing down.`,
      2: t`The field around a wire goes round the wire, not towards it.`,
      5: t`The field around a wire goes round the wire, not away from it.`,
    },
    insight: t`Around a straight wire the field lines are circles; the right-hand grip rule gives their direction, and a compass lies along them.`,
    skills: ['magnetic effect of a current', 'right-hand grip rule'],
  },
  {
    id: '2-PH-07',
    module: 'PH',
    n: 7,
    topic: 'P6',
    spec: ['P6.1e', 'P6.1f', 'P6.1h'],
    title: 'Frequency and wavelength from a displacement–time graph',
    difficulty: 2,
    time: 75,
    stem: t`A wave travels along a rope at $12\ \text{m s}^{-1}$. The graph shows how the displacement of one point on the rope varies with time.`,
    diagram: 'p2-ph-wave',
    diagramAlt: 'Displacement against time for one point on the rope: a wave of amplitude 2.0 cm with a peak at t = 0 and at every 0.25 s after that, up to 1.00 s.',
    prompt: t`What are the frequency and the wavelength of the wave?`,
    options: [
      t`0.25 Hz and 48 m`,
      t`2.0 Hz and 6.0 m`,
      t`4.0 Hz and 0.33 m`,
      t`4.0 Hz and 3.0 m`,
      t`4.0 Hz and 48 m`,
      t`8.0 Hz and 1.5 m`,
    ],
    answer: 3,
    hints: [t`The time between two neighbouring peaks is the period $T$, and $f = \dfrac{1}{T}$.`],
    solution: t`Neighbouring peaks are $0.25$ s apart, so the period is $T = 0.25$ s and the frequency is
$$f = \frac{1}{T} = \frac{1}{0.25} = 4.0\ \text{Hz}.$$

Then from $v = f\lambda$,
$$\lambda = \frac{v}{f} = \frac{12}{4.0} = 3.0\ \text{m}.$$

(The graph shows time, not distance, so the wavelength cannot be read from it directly.)`,
    traps: {
      0: t`Uses the period, 0.25 s, as if it were the frequency.`,
      1: t`Takes two cycles as the period.`,
      2: t`Divides $f$ by $v$ instead of $v$ by $f$.`,
      4: t`Divides $v$ by the period instead of by the frequency.`,
      5: t`Takes the time from a peak to the next trough (half a period) as the period.`,
    },
    insight: t`A displacement–time graph gives the period (and so the frequency); a displacement–distance graph gives the wavelength. Link them with $v = f\lambda$.`,
    skills: ['wave equation', 'period and frequency', 'reading graphs'],
  },
  {
    id: '2-PH-08',
    module: 'PH',
    n: 8,
    topic: 'P2',
    spec: ['P2.5a', 'P2.5b', 'P2.5c'],
    title: 'Step-down transformer for a lamp',
    difficulty: 2,
    time: 75,
    stem: t`A transformer has 2000 turns on its primary coil and 100 turns on its secondary coil. The primary coil is connected to the 230 V mains, and the secondary coil supplies a lamp that is working normally at a power of 46 W.

Assuming the transformer is 100% efficient, what is the voltage across the lamp and the current in the primary coil?`,
    options: [
      t`11.5 V and 0.20 A`,
      t`11.5 V and 4.0 A`,
      t`11.5 V and 80 A`,
      t`4600 V and 0.20 A`,
      t`4600 V and 0.010 A`,
      t`11.5 V and 0.010 A`,
    ],
    answer: 0,
    hints: [t`$\dfrac{V_p}{V_s} = \dfrac{n_p}{n_s}$, and for a 100% efficient transformer $V_pI_p = V_sI_s$.`],
    solution: t`**Secondary voltage.** The turns ratio is $2000 : 100 = 20 : 1$, so this is a step-down transformer:
$$V_s = 230 \times \frac{100}{2000} = 11.5\ \text{V}.$$

**Primary current.** With no losses, the power into the primary equals the 46 W delivered to the lamp:
$$I_p = \frac{P}{V_p} = \frac{46}{230} = 0.20\ \text{A}.$$

(The lamp current is $46 \div 11.5 = 4.0$ A: the current is stepped *up* by the same factor of 20 that the voltage is stepped down.)`,
    traps: {
      1: t`4.0 A is the current in the secondary coil (the lamp), not the primary.`,
      2: t`Multiplies the lamp current by 20; a step-down transformer has a *smaller* current in the primary.`,
      3: t`Uses the turns ratio upside down: with fewer secondary turns the voltage goes down, not up.`,
    },
    insight: t`A transformer that steps voltage down steps current up by the same factor, so that $V_pI_p = V_sI_s$.`,
    skills: ['transformers', 'turns ratio', 'power'],
  },
  {
    id: '2-PH-09',
    module: 'PH',
    n: 9,
    topic: 'P7',
    spec: ['P7.2c', 'P7.2d', 'P7.3a', 'P7.3b', 'P7.3c'],
    title: 'Comparing alpha, beta and gamma',
    difficulty: 2,
    time: 70,
    stem: t`Consider the following statements about nuclear radiation.`,
    statements: [
      t`Alpha particles are more strongly ionising than beta particles or gamma rays, and they are stopped by a sheet of paper.`,
      t`A beta particle is a high-speed electron emitted from the nucleus of an atom.`,
      t`Gamma rays are deflected by a magnetic field, but by less than beta particles because they are more massive.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s12,
    hints: [t`Only charged particles are deflected by a magnetic field.`],
    solution: t`**Statement 1.** True: alpha particles are the most strongly ionising, so they lose their energy quickly and are stopped by paper (or a few centimetres of air). ✓

**Statement 2.** True: a beta particle is a fast electron. It is created in the nucleus when a neutron changes into a proton. ✓

**Statement 3.** False: gamma rays are electromagnetic waves with no charge (and no mass), so they are **not** deflected by magnetic or electric fields. ✗

Statements 1 and 2 only.`,
    traps: {
      [ST.all]: t`Gamma rays carry no charge, so a magnetic field does not deflect them at all.`,
      [ST.s1]: t`Statement 2 is also true: a beta particle is an electron emitted from the nucleus.`,
    },
    insight: t`Alpha: most ionising, least penetrating. Gamma: least ionising, most penetrating, and undeflected because it is uncharged.`,
    skills: ['alpha, beta and gamma', 'ionisation', 'deflection in fields'],
  },
  {
    id: '2-PH-10',
    module: 'PH',
    n: 10,
    topic: 'P1',
    spec: ['P1.2a', 'P1.2h'],
    title: 'Which lamps light?',
    difficulty: 2,
    time: 80,
    stem: t`In the circuit shown, the diodes are ideal and the four lamps are identical.`,
    diagram: 'p2-ph-diodes',
    diagramAlt: 'A cell with its longer plate at the bottom. Lamp S is in the top wire. Between the top and bottom wires are three parallel branches: lamp P with a diode whose arrow points down; lamp Q with a diode whose arrow points up; and lamp R with two diodes, one pointing up and one pointing down.',
    prompt: t`Which lamps are lit?`,
    options: [t`P and S only`, t`Q and S only`, t`Q only`, t`Q, R and S only`, t`P, Q and S only`, t`none of the lamps`],
    answer: 1,
    hints: [t`The longer plate of the cell symbol is the positive terminal.`, t`An ideal diode lets current pass only in the direction its arrow points.`],
    solution: t`The longer plate of the cell is its positive terminal, and it is at the **bottom**. So conventional current leaves the bottom of the cell, flows along the bottom wire, **up** through the branches, and returns along the top wire through lamp S.

- Branch P: the diode points down, against the current, so it blocks: P is off.
- Branch Q: the diode points up, with the current: Q is lit.
- Branch R: the two diodes point in opposite directions, so one always blocks: R is off.
- Lamp S carries the current that flows through branch Q: S is lit.

Q and S only.`,
    traps: {
      0: t`Reads the cell the wrong way round. The longer plate is positive, so the current flows up the branches.`,
      2: t`Lamp S is in series with the whole network, so it carries the current flowing through Q.`,
      3: t`R is in series with two diodes pointing in opposite directions; one of them always blocks.`,
    },
    insight: t`Find the direction of conventional current first (out of the long plate), then let each diode pass current only along its arrow.`,
    skills: ['circuit symbols', 'diodes', 'series and parallel'],
  },
  {
    id: '2-PH-11',
    module: 'PH',
    n: 11,
    topic: 'P3',
    spec: ['P3.7a', 'P3.7b', 'P3.7e', 'P3.7g', 'P3.7h'],
    title: 'Efficiency of a lifting motor',
    difficulty: 2,
    time: 80,
    stem: t`An electric motor lifts a 40 kg load vertically through 6.0 m at a constant speed. The lift takes 12 s, and the electrical power input to the motor is 250 W.

What is the efficiency of the motor, and how much energy is wasted during the lift? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`20% and 600 J`, t`80% and 600 J`, t`80% and 50 J`, t`80% and 2400 J`, t`80% and 3000 J`, t`125% and 600 J`],
    answer: 1,
    hints: [t`Useful energy = work done lifting the load = $mgh$. Total energy supplied = power × time.`],
    solution: t`**Useful energy.** At constant speed, the work done lifting the load equals its gain in gravitational potential energy:
$$mgh = 40 \times 10 \times 6.0 = 2400\ \text{J}.$$

**Energy supplied.** $250 \times 12 = 3000$ J.

**Efficiency.**
$$\frac{2400}{3000} = 0.80 = 80\%.$$

**Wasted energy.** $3000 - 2400 = 600$ J, mostly transferred to the thermal store of the motor and its surroundings.`,
    traps: {
      0: t`20% is the fraction of the energy that is *wasted*, not the efficiency.`,
      2: t`50 W is the wasted *power*; over 12 s it wastes $50 \times 12 = 600$ J.`,
      3: t`2400 J is the useful energy, not the wasted energy.`,
      4: t`3000 J is the total energy supplied.`,
      5: t`Divides input by output; an efficiency can never be more than 100%.`,
    },
    insight: t`Efficiency = useful output ÷ total input (energy or power), and the wasted energy is the difference.`,
    skills: ['work done', 'efficiency', 'power'],
  },
  {
    id: '2-PH-12',
    module: 'PH',
    n: 12,
    topic: 'P1',
    spec: ['P1.1a', 'P1.1b', 'P1.1c', 'P1.1d'],
    title: 'Charging a rod by friction',
    difficulty: 3,
    time: 80,
    stem: t`A polythene rod is rubbed with a dry woollen cloth. Afterwards the rod is negatively charged.`,
    statements: [
      t`Positive charges moved from the rod onto the cloth.`,
      t`The rod will attract small pieces of paper that are uncharged.`,
      t`Aircraft are connected to earth while they are refuelled, so that charge produced by friction flows away instead of building up and causing a spark.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s23,
    hints: [t`Which charged particles are free to move from one material to another?`, t`A charged object can induce charges on a nearby neutral object.`],
    solution: t`**Statement 1.** False. Only electrons move when materials are rubbed together. The rod became negative because electrons moved **from the cloth onto the rod**; the cloth is left positive because it lost electrons. ✗

**Statement 2.** True. The negative rod repels electrons in the paper towards the far side, leaving the near side slightly positive. The attraction between unlike charges on the near side is stronger than the repulsion from the further side, so the neutral paper is attracted. ✓

**Statement 3.** True. Fuel flowing through the pipe can charge the aircraft by friction; connecting it to earth lets that charge flow away safely. ✓

Statements 2 and 3 only.`,
    traps: {
      [ST.all]: t`Statement 1 is false: charging by friction moves electrons, never positive charges.`,
      [ST.s3]: t`Statement 2 is also true: a charged rod attracts neutral paper by inducing charges on it.`,
    },
    insight: t`Charging by friction is always the transfer of electrons. A charged object attracts a neutral one by inducing opposite charge on its near side.`,
    skills: ['static electricity', 'induced charge', 'earthing'],
  },
  {
    id: '2-PH-13',
    module: 'PH',
    n: 13,
    topic: 'P3',
    spec: ['P3.5a', 'P3.5b', 'P3.5c', 'P3.5d', 'P3.1h'],
    title: 'Throwing a ball upwards on planet X',
    difficulty: 3,
    time: 90,
    stem: t`On planet X, a rock of mass 2.0 kg has a weight of 5.0 N. An astronaut on planet X throws a ball vertically upwards from ground level at $10\ \text{m s}^{-1}$.

Ignoring air resistance, what is the greatest height the ball reaches, and how long is it in the air?`,
    options: [t`5.0 m and 2.0 s`, t`10 m and 4.0 s`, t`20 m and 4.0 s`, t`40 m and 4.0 s`, t`40 m and 8.0 s`, t`20 m and 8.0 s`],
    answer: 5,
    hints: [t`First find the gravitational field strength on planet X: $g = \dfrac{W}{m}$.`, t`At the top the ball is momentarily at rest.`],
    solution: t`The gravitational field strength on planet X is
$$g = \frac{W}{m} = \frac{5.0}{2.0} = 2.5\ \text{N kg}^{-1},$$
so a freely falling object accelerates at $2.5\ \text{m s}^{-2}$ there.

**Greatest height.** At the top $v = 0$. From $v^2 = u^2 - 2gh$:
$$h = \frac{u^2}{2g} = \frac{10^2}{2 \times 2.5} = 20\ \text{m}.$$

**Time in the air.** The ball takes $\dfrac{u}{g} = \dfrac{10}{2.5} = 4.0$ s to reach the top and, with no air resistance, the same time to fall back: $8.0$ s in total.`,
    traps: {
      0: t`Uses $g = 10\ \text{N kg}^{-1}$, the value for Earth.`,
      1: t`Uses the rock's weight, 5.0 N, as if it were the field strength.`,
      2: t`4.0 s is only the time to reach the top.`,
      4: t`Forgets the 2 in $h = \dfrac{u^2}{2g}$.`,
    },
    insight: t`Mass is the same everywhere; weight depends on $g$. Find $g = W/m$ first, then use the equations of motion with that acceleration.`,
    skills: ['mass and weight', 'free fall', 'equations of motion'],
  },
  {
    id: '2-PH-14',
    module: 'PH',
    n: 14,
    topic: 'P4',
    spec: ['P4.1a', 'P4.2a', 'P4.2b', 'P4.3a'],
    title: 'Conduction, convection and radiation',
    difficulty: 3,
    time: 75,
    stem: t`Consider the following statements about the transfer of thermal energy.`,
    statements: [
      t`Metals are good thermal conductors mainly because their atoms are packed more closely together than the atoms of non-metals.`,
      t`When the water at the bottom of a kettle is heated, it expands, becomes less dense and rises, setting up a convection current.`,
      t`Thermal radiation is infrared radiation, and it can travel through a vacuum.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s23,
    hints: [t`What do metals contain that non-metals do not?`],
    solution: t`**Statement 1.** False. Metals conduct well mainly because they contain **free electrons**, which move through the metal and carry energy quickly from hot regions to cold ones. ✗

**Statement 2.** True. Heated water expands, so its density falls; the less dense water rises and cooler, denser water sinks to take its place, forming a convection current. ✓

**Statement 3.** True. Thermal radiation is infrared electromagnetic radiation; like all electromagnetic waves it needs no medium, which is how the Sun's energy reaches the Earth. ✓

Statements 2 and 3 only.`,
    traps: {
      [ST.all]: t`Statement 1 gives the wrong reason: metals conduct well because of their free electrons.`,
      [ST.s2]: t`Statement 3 is also true: infrared radiation crosses a vacuum.`,
    },
    insight: t`Conduction in metals: free electrons. Convection: density changes in fluids. Radiation: infrared waves, which need no medium.`,
    skills: ['conduction', 'convection', 'thermal radiation'],
  },
  {
    id: '2-PH-15',
    module: 'PH',
    n: 15,
    topic: 'P5',
    spec: ['P5.5a', 'P5.4a'],
    title: 'Pressure of a block on its third face',
    difficulty: 3,
    time: 90,
    stem: t`A solid rectangular block has a volume of $0.0080\ \text{m}^3$ and a density of $4000\ \text{kg m}^{-3}$.

When it rests on one of its faces it exerts a pressure of 16 000 Pa on the floor. When it rests on a second face it exerts a pressure of 4000 Pa.

What pressure does it exert when it rests on its third face? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`2000 Pa`, t`6000 Pa`, t`8000 Pa`, t`10 000 Pa`, t`12 000 Pa`, t`20 000 Pa`],
    answer: 2,
    hints: [t`Find the weight of the block, then the areas of the first two faces.`, t`The three different faces have areas $ab$, $bc$ and $ca$, and the volume is $abc$.`],
    solution: t`**Weight.** $W = \rho V g = 4000 \times 0.0080 \times 10 = 320$ N.

**Areas of the first two faces.** $A = \dfrac{W}{p}$:
$$A_1 = \frac{320}{16\,000} = 0.020\ \text{m}^2, \qquad A_2 = \frac{320}{4000} = 0.080\ \text{m}^2.$$

**Third face.** If the edges are $a$, $b$ and $c$, the face areas are $ab$, $bc$ and $ca$, and their product is $(abc)^2 = V^2$. So
$$A_3 = \frac{V^2}{A_1A_2} = \frac{(0.0080)^2}{0.020 \times 0.080} = 0.040\ \text{m}^2,$$
and the pressure is
$$p_3 = \frac{320}{0.040} = 8000\ \text{Pa}.$$

**Check.** For a uniform block standing on a face, $p = \dfrac{\rho V g}{A} = \rho g h$, where $h$ is its height. The heights are $0.40$ m and $0.10$ m, so the third edge is $\dfrac{0.0080}{0.40 \times 0.10} = 0.20$ m and $p_3 = 4000 \times 10 \times 0.20 = 8000$ Pa ✓`,
    traps: {
      3: t`Averages the two pressures; pressure is not shared out like that.`,
      4: t`Takes the difference of the two pressures.`,
      5: t`Adds the two pressures.`,
    },
    insight: t`Pressure = force ÷ area. For a uniform block the weight is fixed, so the pressure depends only on the area of the face it rests on (equivalently, $p = \rho g h$).`,
    skills: ['pressure', 'density', 'problem solving'],
  },
  {
    id: '2-PH-16',
    module: 'PH',
    n: 16,
    topic: 'P2',
    spec: ['P2.1a', 'P2.1b', 'P2.1c', 'P2.1d', 'P2.3f'],
    title: 'Magnets and magnetic materials',
    difficulty: 3,
    time: 80,
    stem: t`Consider the following statements about magnets.`,
    statements: [
      t`Outside a bar magnet, the magnetic field lines run from its north pole to its south pole.`,
      t`When an unmagnetised iron nail is held near the north pole of a magnet, the end of the nail nearest the magnet becomes a north pole.`,
      t`The core of the electromagnet on a scrapyard crane is made of iron rather than steel, so that it loses its magnetism and drops the scrap when the current is switched off.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s13,
    hints: [t`An induced magnet is always attracted, never repelled.`],
    solution: t`**Statement 1.** True: by convention, field lines leave a north pole and enter a south pole. ✓

**Statement 2.** False. The nail becomes an induced magnet, and the end nearest the magnet's north pole becomes a **south** pole. That is why the nail is attracted: unlike poles attract. ✗

**Statement 3.** True. Iron is a magnetically soft material: it is magnetised easily but loses its magnetism as soon as the current stops. Steel is hard and would stay magnetised, so the crane could not drop its load. ✓

Statements 1 and 3 only.`,
    traps: {
      [ST.all]: t`Statement 2 is false: the near end of the nail becomes a south pole, which is why it is attracted.`,
      [ST.s1]: t`Statement 3 is also true: electromagnets use soft iron so they can be switched off.`,
    },
    insight: t`Induced magnetism always leads to attraction: the near end gets the opposite pole. Soft iron (temporary) for electromagnets, steel (permanent) for magnets.`,
    skills: ['magnetic fields', 'induced magnetism', 'electromagnets'],
  },
  {
    id: '2-PH-17',
    module: 'PH',
    n: 17,
    topic: 'P3',
    spec: ['P3.6a', 'P3.6b', 'P3.7d', 'P3.7g'],
    title: 'Energy lost when trolleys collide and stick',
    difficulty: 3,
    time: 90,
    stem: t`A trolley of mass 2.0 kg moving to the right at $3.0\ \text{m s}^{-1}$ collides head-on with a trolley of mass 1.0 kg moving to the left at $3.0\ \text{m s}^{-1}$. The trolleys stick together.

How much kinetic energy is transferred to other energy stores in the collision?`,
    options: [t`0 J`, t`1.5 J`, t`4.5 J`, t`9.0 J`, t`12 J`, t`13.5 J`],
    answer: 4,
    hints: [t`Momentum is a vector: take right as positive, so the 1.0 kg trolley has negative momentum.`],
    solution: t`**Momentum.** Taking right as positive, the total momentum before the collision is
$$2.0 \times 3.0 + 1.0 \times (-3.0) = 3.0\ \text{kg m s}^{-1}.$$

Momentum is conserved, so the combined 3.0 kg moves off at
$$v = \frac{3.0}{3.0} = 1.0\ \text{m s}^{-1}\ \text{to the right}.$$

**Kinetic energy.** Before: $\tfrac{1}{2}(2.0)(3.0)^2 + \tfrac{1}{2}(1.0)(3.0)^2 = 9.0 + 4.5 = 13.5$ J. After: $\tfrac{1}{2}(3.0)(1.0)^2 = 1.5$ J.

So $13.5 - 1.5 = 12$ J is transferred to other stores (mainly thermal, and some as sound).`,
    traps: {
      0: t`Adds the momenta as if both trolleys moved to the right, giving 3.0 m s⁻¹ afterwards and no apparent loss. Momentum is a vector.`,
      1: t`1.5 J is the kinetic energy left after the collision.`,
      5: t`13.5 J is the kinetic energy before the collision; some of it remains afterwards.`,
    },
    insight: t`Momentum is always conserved in a collision, but kinetic energy is not: when objects stick together, kinetic energy is transferred to other stores.`,
    skills: ['conservation of momentum', 'kinetic energy', 'inelastic collisions'],
  },
  {
    id: '2-PH-18',
    module: 'PH',
    n: 18,
    topic: 'P3',
    spec: ['P3.4d', 'P3.2a', 'P3.2c'],
    title: "Newton's third law pairs for a car and trailer",
    difficulty: 3,
    time: 80,
    stem: t`A car is pulling a trailer along a straight, level road, and both are speeding up.`,
    statements: [
      t`The force of the car on the trailer is larger than the force of the trailer on the car; this is why the trailer speeds up.`,
      t`The frictional force of the road on the car's driving wheels, and the frictional force of those wheels on the road, form a Newton's third law pair.`,
      t`The weight of the trailer and the normal contact force of the road on the trailer form a Newton's third law pair.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s2,
    hints: [t`The two forces in a third-law pair act on *different* objects, are of the *same type*, and are always equal and opposite.`],
    solution: t`The two forces in a Newton's third law pair act on two **different** objects, are of the **same type**, and are always **equal and opposite**.

**Statement 1.** False. The car pulls the trailer exactly as hard as the trailer pulls back on the car, even while accelerating. The trailer speeds up because the car's pull on it is greater than the resistive forces **on the trailer**. ✗

**Statement 2.** True. Both are friction forces, between the same two objects (road and wheels), acting on different objects in opposite directions. ✓

**Statement 3.** False. Both forces act on the **same** object (the trailer), and they are different types of force. The partner of the trailer's weight is the trailer's gravitational pull on the Earth. ✗

Statement 2 only.`,
    traps: {
      [ST.s23]: t`Statement 3 describes two forces on the same object, so they cannot be a third-law pair.`,
      [ST.s12]: t`Third-law forces are always equal in size, whether or not anything is accelerating.`,
    },
    insight: t`Third-law pairs: same type of force, equal and opposite, on two different objects. Forces that balance on one object are not a third-law pair.`,
    skills: ["Newton's third law", 'types of force', 'free-body diagrams'],
  },
  {
    id: '2-PH-19',
    module: 'PH',
    n: 19,
    topic: 'P4',
    spec: ['P4.4a', 'P4.4b'],
    title: 'Heating water with energy losses',
    difficulty: 3,
    time: 90,
    stem: t`A 3.0 kW immersion heater is used to heat 60 kg of water from 15 °C to 55 °C. 20% of the energy supplied by the heater is lost to the surroundings.

The specific heat capacity of water is $4200\ \text{J kg}^{-1}\,°\text{C}^{-1}$. How long does the heating take?`,
    options: [t`42 minutes`, t`56 minutes`, t`67.2 minutes`, t`70 minutes`, t`87.5 minutes`, t`96.25 minutes`],
    answer: 3,
    hints: [t`Energy needed $= mc\Delta\theta$, with $\Delta\theta = 40$ °C.`, t`Only 80% of the heater's 3.0 kW reaches the water.`],
    solution: t`**Energy needed by the water.**
$$E = mc\Delta\theta = 60 \times 4200 \times 40 = 10\,080\,000\ \text{J}.$$

**Useful power.** Only 80% of the heater's power reaches the water: $0.80 \times 3000 = 2400$ W.

**Time.**
$$t = \frac{10\,080\,000}{2400} = 4200\ \text{s} = 70\ \text{minutes}.$$`,
    traps: {
      1: t`Ignores the energy lost to the surroundings.`,
      2: t`Adds 20% to the energy needed instead of dividing by 0.80. If 20% is lost, the heater must supply $\tfrac{1}{0.8} = 1.25$ times the energy needed.`,
      4: t`Applies the 20% loss twice.`,
      5: t`Uses the final temperature, 55 °C, instead of the temperature rise, 40 °C.`,
    },
    insight: t`With losses, the useful power is efficiency × input power; divide the energy needed by that, not by the full power.`,
    skills: ['specific heat capacity', 'efficiency', 'power'],
  },
  {
    id: '2-PH-20',
    module: 'PH',
    n: 20,
    topic: 'P2',
    spec: ['P2.4d', 'P2.4e'],
    title: 'Spinning a generator twice as fast',
    difficulty: 3,
    time: 80,
    stem: t`The graph shows the output voltage of a simple ac generator, in which a coil rotates at a steady rate in a uniform magnetic field.`,
    diagram: 'p2-ph-gen',
    diagramAlt: 'Output voltage against time: a sine wave with peak voltage V0 and period T, shown for two complete cycles up to time 2T.',
    prompt: t`The coil is now rotated twice as fast. Which graph shows the new output voltage, drawn to the same scales?`,
    options: [
      { diagram: 'p2-ph-gen-a', alt: 'A sine wave with peak voltage 2V0 and period T' },
      { diagram: 'p2-ph-gen-b', alt: 'A sine wave with peak voltage V0 and period T/2' },
      { diagram: 'p2-ph-gen-c', alt: 'A sine wave with peak voltage 2V0 and period 2T' },
      { diagram: 'p2-ph-gen-d', alt: 'A sine wave with peak voltage V0 and period 2T' },
      { diagram: 'p2-ph-gen-e', alt: 'A sine wave with peak voltage 2V0 and period T/2' },
      { diagram: 'p2-ph-gen-f', alt: 'A voltage that never goes negative, with peaks of 2V0 every quarter of T' },
    ],
    answer: 4,
    hints: [t`Faster rotation cuts the field lines faster. What does that do to the size of the induced voltage?`, t`What happens to the time taken for one revolution?`],
    solution: t`Rotating the coil twice as fast has two effects.

- **Peak voltage doubles.** The coil cuts the magnetic field lines twice as fast, so the induced voltage is twice as large: $2V_0$.
- **Period halves.** Each revolution takes half the time, so one cycle of the output takes $\tfrac{T}{2}$ (the frequency doubles).

The output is still alternating, because a simple ac generator connects the coil to the circuit through **slip rings**. So the graph is a sine wave of peak $2V_0$ and period $\tfrac{T}{2}$: graph E.`,
    traps: {
      0: t`Faster rotation also shortens each cycle: the period halves as well.`,
      1: t`Faster rotation also induces a larger voltage: the peak doubles as well.`,
      2: t`A faster coil completes each cycle in *less* time, so the period halves rather than doubles.`,
      5: t`This one-way output comes from a split-ring commutator (a dc generator). An ac generator uses slip rings.`,
    },
    insight: t`For a generator, faster rotation means both a bigger peak voltage and a higher frequency.`,
    skills: ['ac generator', 'electromagnetic induction', 'reading graphs'],
  },
  {
    id: '2-PH-21',
    module: 'PH',
    n: 21,
    topic: 'P6',
    spec: ['P6.3a', 'P6.3b', 'P6.2a'],
    title: 'A ray reflected by two mirrors',
    difficulty: 3,
    time: 90,
    stem: t`Two plane mirrors meet at $O$ at an angle of $70°$. A ray of light strikes the first mirror at $P$ with an angle of incidence of $50°$, reflects, and then strikes the second mirror at $Q$.`,
    diagram: 'p2-ph-mirrors',
    diagramAlt: 'Two plane mirrors meeting at O at 70 degrees. A ray arrives at P on the lower mirror at 50 degrees to the normal, reflects up to Q on the other mirror and reflects again. The angle between the final ray and the normal at Q is marked theta.',
    prompt: t`What is the angle of reflection, $\theta$, at the second mirror?`,
    options: [t`$20°$`, t`$30°$`, t`$40°$`, t`$50°$`, t`$60°$`, t`$70°$`],
    answer: 0,
    hints: [t`The angle of reflection at $P$ is $50°$, so the reflected ray makes $40°$ with the surface of the first mirror.`, t`Use the angles of triangle $OPQ$.`],
    solution: t`At $P$ the angle of reflection equals the angle of incidence, $50°$, so the reflected ray makes $90° - 50° = 40°$ with the **surface** of the first mirror.

In triangle $OPQ$ the angle at $O$ is $70°$ and the angle at $P$ is $40°$, so the angle at $Q$, between the ray and the second mirror, is
$$180° - 70° - 40° = 70°.$$

The angle of incidence at $Q$ is measured from the normal:
$$90° - 70° = 20°,$$
and the angle of reflection equals it: $\theta = 20°$.`,
    solutionDiagram: 'p2-ph-mirrors-sol',
    traps: {
      5: t`$70°$ is the angle between the ray and the second mirror's surface; angles of reflection are measured from the normal.`,
      1: t`Uses $50°$ (measured from the normal) as the angle at $P$ in the triangle, instead of $40°$ (measured from the mirror).`,
      4: t`Uses $50°$ instead of $40°$ at $P$, and then gives the angle to the mirror rather than to the normal.`,
      3: t`The angle of incidence is not the same at the two mirrors.`,
    },
    insight: t`Angles of incidence and reflection are measured from the normal. In a triangle of rays and mirrors, use the angles to the mirror surfaces ($90°$ minus the angle to the normal).`,
    skills: ['law of reflection', 'ray diagrams', 'angles in a triangle'],
  },
  {
    id: '2-PH-22',
    module: 'PH',
    n: 22,
    topic: 'P2',
    spec: ['P2.3a', 'P2.3c', 'P2.3e'],
    title: 'How a dc motor works',
    difficulty: 3,
    time: 80,
    stem: t`A simple dc motor has a coil that can rotate between the poles of a permanent magnet. The coil is connected to a battery through a split-ring commutator.`,
    statements: [
      t`Increasing the number of turns on the coil, without changing the current, has no effect on the turning effect on the coil.`,
      t`Reversing both the direction of the current and the direction of the magnetic field makes the motor turn the other way.`,
      t`The split-ring commutator reverses the current in the coil every half turn, so that the coil keeps turning in the same direction.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: STATEMENT_OPTIONS,
    answer: ST.s3,
    hints: [t`Each turn of wire in the field feels its own force.`, t`What does reversing one factor do? What about reversing two?`],
    solution: t`**Statement 1.** False. Each turn of wire carrying current in the field feels a force, so more turns give a larger total force on each side of the coil and a larger turning effect. ✗

**Statement 2.** False. Reversing the current reverses the force, and so does reversing the field. Reversing **both** reverses the force twice, so the motor turns the **same** way as before. ✗

**Statement 3.** True. Without the commutator, the forces would reverse the rotation after each half turn; reversing the current every half turn keeps the turning effect in the same direction. ✓

Statement 3 only.`,
    traps: {
      [ST.s23]: t`Reversing both the current and the field leaves the direction of the force unchanged.`,
      [ST.s13]: t`More turns carrying the same current give a larger turning effect.`,
    },
    insight: t`The motor effect depends on the current, the field and the number of turns; reversing one of current or field reverses the force, but reversing both does not.`,
    skills: ['motor effect', 'dc motor', 'commutator'],
  },
  {
    id: '2-PH-23',
    module: 'PH',
    n: 23,
    topic: 'P3',
    spec: ['P3.3a', 'P3.3c', 'P3.3d'],
    title: 'Extra energy stored in a stretched spring',
    difficulty: 4,
    time: 100,
    stem: t`The graph shows how the force needed to stretch a spring varies with its extension. The spring obeys Hooke's law up to the point $P$.`,
    diagram: 'p2-ph-spring',
    diagramAlt: 'Force against extension for a spring: a straight line from the origin to P at 5.0 cm and 10 N, then a curve that becomes less steep.',
    prompt: t`How much energy must be transferred to the spring to increase its extension from 2.0 cm to 4.0 cm?`,
    options: [t`0.04 J`, t`0.08 J`, t`0.12 J`, t`0.16 J`, t`0.24 J`, t`12 J`],
    answer: 2,
    hints: [t`Find the spring constant from the straight part of the graph, in N m⁻¹.`, t`Energy stored $= \tfrac{1}{2}ke^2$. Find it at both extensions and subtract.`],
    solution: t`Both extensions are below $P$, so Hooke's law applies. From the straight part of the graph,
$$k = \frac{10\ \text{N}}{0.050\ \text{m}} = 200\ \text{N m}^{-1}.$$

The energy stored is $\tfrac{1}{2}ke^2$:
$$E_{4\,\text{cm}} = \tfrac{1}{2} \times 200 \times 0.040^2 = 0.16\ \text{J}, \qquad E_{2\,\text{cm}} = \tfrac{1}{2} \times 200 \times 0.020^2 = 0.04\ \text{J}.$$

The extra energy is $0.16 - 0.04 = 0.12$ J.

**Check with the area under the graph.** Between 2.0 cm and 4.0 cm the area is a trapezium with parallel sides of 4.0 N and 8.0 N and width 0.020 m: $\tfrac{1}{2}(4.0 + 8.0) \times 0.020 = 0.12$ J ✓`,
    traps: {
      0: t`Uses $\tfrac{1}{2}k(\Delta e)^2$ with $\Delta e = 2.0$ cm, as if the spring started unstretched.`,
      3: t`$0.16$ J is the total energy stored at 4.0 cm; the spring already stored $0.04$ J at 2.0 cm.`,
      1: t`Uses $\tfrac{1}{2} \times 8.0\ \text{N} \times 0.020$ m, a triangle, instead of the trapezium between 2.0 cm and 4.0 cm.`,
      4: t`Forgets the $\tfrac{1}{2}$ in the area of the trapezium.`,
      5: t`Works in centimetres: the extension must be in metres for the energy to come out in joules.`,
    },
    insight: t`The energy stored in a spring is the area under its force–extension graph. Between two extensions the area is a trapezium: $\tfrac{1}{2}k(e_2^2 - e_1^2)$.`,
    skills: ["Hooke's law", 'elastic potential energy', 'area under a graph'],
  },
  {
    id: '2-PH-24',
    module: 'PH',
    n: 24,
    topic: 'P3',
    spec: ['P3.1e', 'P3.1f'],
    title: 'When does the object return to its start?',
    difficulty: 4,
    time: 100,
    stem: t`The velocity–time graph shows the motion of an object along a straight line. The object starts from rest at $t = 0$.`,
    diagram: 'p2-ph-vt',
    diagramAlt: 'Velocity against time: from 0 the velocity rises to 6 m/s at 2 s, stays at 6 m/s until 6 s, falls to 0 at 8 s and on to −6 m/s at 10 s, then stays at −6 m/s until 16 s.',
    prompt: t`At what time does the object pass back through its starting point?`,
    options: [t`8 s`, t`10 s`, t`12 s`, t`14 s`, t`15 s`, t`16 s`],
    answer: 4,
    hints: [t`Displacement is the area between the graph and the time axis, with area below the axis counting as negative.`],
    solution: t`The displacement is the area under the velocity–time graph, with area below the time axis counting as negative.

**Forwards (0 to 8 s).** The area is a trapezium: $\tfrac{1}{2}(8 + 4) \times 6 = 36$ m.

**Backwards (from 8 s).** From 8 s to 10 s the area is a triangle of $\tfrac{1}{2} \times 2 \times 6 = 6$ m, so at 10 s the object is $36 - 6 = 30$ m from the start. After that it moves back at a steady $6\ \text{m s}^{-1}$, so it needs a further
$$\frac{30}{6} = 5\ \text{s}.$$

It passes its starting point at $t = 10 + 5 = 15$ s.`,
    solutionDiagram: 'p2-ph-vt-sol',
    traps: {
      0: t`At 8 s the velocity is zero: the object stops and turns round at its furthest point from the start.`,
      5: t`By 16 s the object has gone 6 m past its starting point.`,
      2: t`Assumes the motion is symmetric about $t = 8$ s; it is not, because the object moves back at a steady $6\ \text{m s}^{-1}$.`,
      1: t`At 10 s the velocity reaches $-6\ \text{m s}^{-1}$, but the object is still 30 m from the start.`,
    },
    insight: t`On a velocity–time graph, area gives displacement: areas below the axis cancel areas above. The object is back at the start when the two are equal.`,
    skills: ['velocity–time graphs', 'displacement from area'],
  },
  {
    id: '2-PH-25',
    module: 'PH',
    n: 25,
    topic: 'P5',
    spec: ['P5.3a', 'P5.3b', 'P5.3c', 'P4.4b'],
    title: 'Reading a heating curve',
    difficulty: 4,
    time: 100,
    stem: t`A solid sample of substance X is heated at a constant rate, with no energy lost to the surroundings. The graph shows how its temperature changes with time.`,
    diagram: 'p2-ph-heating',
    diagramAlt: 'Temperature against time: from −10 °C the temperature rises to 30 °C at 2 minutes, stays at 30 °C until 5 minutes, rises to 110 °C at 13 minutes, stays at 110 °C until 34 minutes, then rises again.',
    prompt: t`Which of the following gives the ratio of the specific heat capacity of liquid X to that of solid X, and the ratio of the specific latent heat of vaporisation of X to its specific latent heat of fusion?`,
    options: [
      t`$\dfrac{c_\text{liquid}}{c_\text{solid}} = \dfrac{1}{2}$ and $\dfrac{L_\text{vap}}{L_\text{fus}} = 7$`,
      t`$\dfrac{c_\text{liquid}}{c_\text{solid}} = 2$ and $\dfrac{L_\text{vap}}{L_\text{fus}} = 7$`,
      t`$\dfrac{c_\text{liquid}}{c_\text{solid}} = 2$ and $\dfrac{L_\text{vap}}{L_\text{fus}} = \dfrac{1}{7}$`,
      t`$\dfrac{c_\text{liquid}}{c_\text{solid}} = \dfrac{1}{2}$ and $\dfrac{L_\text{vap}}{L_\text{fus}} = \dfrac{1}{7}$`,
      t`$\dfrac{c_\text{liquid}}{c_\text{solid}} = 1$ and $\dfrac{L_\text{vap}}{L_\text{fus}} = 7$`,
      t`$\dfrac{c_\text{liquid}}{c_\text{solid}} = 2$ and $\dfrac{L_\text{vap}}{L_\text{fus}} = \dfrac{11}{3}$`,
    ],
    answer: 1,
    hints: [
      t`The heating power $P$ and the mass $m$ are the same throughout. On a sloping part, $P = mc \times (\text{rate of temperature rise})$.`,
      t`On a flat part, the energy supplied is $P \times$ (time), which equals $mL$.`,
    ],
    solution: t`The power $P$ and the mass $m$ are the same throughout.

**Specific heat capacities.** On a sloping section, $P = mc \times \dfrac{\Delta\theta}{\Delta t}$, so $c$ is inversely proportional to the rate of temperature rise.

- Solid: from $-10$ °C to $30$ °C in 2 minutes, 20 °C per minute.
- Liquid: from $30$ °C to $110$ °C in 8 minutes, 10 °C per minute.

The liquid warms at half the rate, so $\dfrac{c_\text{liquid}}{c_\text{solid}} = 2$.

**Specific latent heats.** On a flat section the energy supplied, $Pt$, equals $mL$, so $L$ is proportional to the length of the flat section.

- Melting (fusion): from 2 to 5 minutes, 3 minutes.
- Boiling (vaporisation): from 13 to 34 minutes, 21 minutes.

So $\dfrac{L_\text{vap}}{L_\text{fus}} = \dfrac{21}{3} = 7$.`,
    traps: {
      0: t`A shallower slope means a *larger* specific heat capacity: the same power produces a slower temperature rise.`,
      2: t`The boiling section lasts longer, so vaporisation needs *more* energy per kilogram than melting.`,
      4: t`Solid and liquid forms of the same substance generally have different specific heat capacities; here the slopes differ.`,
      5: t`Compares the boiling and melting *temperatures* (110 and 30), instead of the *lengths* of the flat sections.`,
    },
    insight: t`On a heating curve at constant power: the steepness of a sloping part is inversely proportional to $c$, and the length of a flat part is proportional to $L$.`,
    skills: ['heating curves', 'specific latent heat', 'specific heat capacity'],
  },
  {
    id: '2-PH-26',
    module: 'PH',
    n: 26,
    topic: 'P1',
    spec: ['P1.2i', 'P1.2k', 'P1.2e', 'P1.2m'],
    title: 'Working back from an ammeter reading',
    difficulty: 4,
    time: 110,
    stem: t`In the circuit shown, the ammeter reads 0.50 A. The supply and the ammeter have negligible resistance, and the voltmeter has a very high resistance.`,
    diagram: 'p2-ph-circuit',
    diagramAlt: 'A supply in series with a 4.0 ohm resistor, with a voltmeter connected across the 4.0 ohm resistor. The circuit then divides into two parallel branches: a 6.0 ohm resistor, and a 12 ohm resistor in series with the ammeter.',
    prompt: t`What is the reading on the voltmeter, and what is the power output of the supply?`,
    options: [t`2.0 V and 4.0 W`, t`3.0 V and 6.75 W`, t`6.0 V and 9.0 W`, t`6.0 V and 18 W`, t`6.0 V and 12 W`, t`12 V and 18 W`],
    answer: 3,
    hints: [t`Parallel branches have the same potential difference across them.`, t`The current through the 4.0 Ω resistor is the total of the two branch currents.`],
    solution: t`**Parallel section.** The p.d. across the $12\ \Omega$ resistor is $0.50 \times 12 = 6.0$ V. The $6.0\ \Omega$ resistor is in parallel, so it has the same 6.0 V across it and carries $\dfrac{6.0}{6.0} = 1.0$ A.

**Main current.** $0.50 + 1.0 = 1.5$ A flows through the $4.0\ \Omega$ resistor.

**Voltmeter.** $V = 1.5 \times 4.0 = 6.0$ V.

**Supply.** Its voltage is $6.0 + 6.0 = 12$ V, so its power output is
$$P = VI = 12 \times 1.5 = 18\ \text{W}.$$

Check: the three resistors dissipate $1.5^2 \times 4.0 + 1.0^2 \times 6.0 + 0.50^2 \times 12 = 9.0 + 6.0 + 3.0 = 18$ W ✓`,
    traps: {
      0: t`Uses 0.50 A as the current in the $4.0\ \Omega$ resistor; the $6.0\ \Omega$ branch carries current too.`,
      1: t`Shares the current in proportion to resistance. The *smaller* resistance takes the *larger* current (1.0 A in the $6.0\ \Omega$ resistor).`,
      2: t`9.0 W is the power in the $4.0\ \Omega$ resistor only.`,
      5: t`The voltmeter is connected across the $4.0\ \Omega$ resistor, not across the supply.`,
    },
    insight: t`Work outwards from what you know: branch voltage from the ammeter, then the other branch's current, then the total current.`,
    skills: ['parallel circuits', 'meters', 'electrical power'],
  },
  {
    id: '2-PH-27',
    module: 'PH',
    n: 27,
    topic: 'P3',
    spec: ['P3.7a', 'P3.7c', 'P3.7e', 'P3.7f', 'P3.7h', 'P3.2d'],
    title: 'Fuel used by a car climbing a hill',
    difficulty: 5,
    time: 140,
    stem: t`A car of mass 1200 kg is driven up a straight hill at a constant speed of $20\ \text{m s}^{-1}$. The road rises 1 m vertically for every 20 m travelled along it. The total resistive force from friction and air resistance is 500 N.

The engine is 25% efficient, and the fuel releases 40 MJ of energy for every kilogram burned.

At what rate does the car burn fuel? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`$0.55\ \text{g s}^{-1}$`, t`$1.0\ \text{g s}^{-1}$`, t`$1.2\ \text{g s}^{-1}$`, t`$2.2\ \text{g s}^{-1}$`, t`$8.8\ \text{g s}^{-1}$`, t`$25\ \text{g s}^{-1}$`],
    answer: 3,
    hints: [
      t`Work out what happens in 1 second: how far the car travels along the road, and how much height it gains.`,
      t`Useful power = rate of gain of gravitational potential energy + rate of doing work against the resistive force.`,
    ],
    solution: t`Consider one second of the motion. The car travels 20 m along the road and so rises $\tfrac{20}{20} = 1$ m. Its speed, and so its kinetic energy, does not change.

- Gain in gravitational potential energy per second: $mgh = 1200 \times 10 \times 1 = 12\,000$ J.
- Work done against the resistive force per second: $500 \times 20 = 10\,000$ J.

So the useful power output of the engine is $22\,000$ W. At 25% efficiency, the fuel must supply
$$\frac{22\,000}{0.25} = 88\,000\ \text{W} = 88\,000\ \text{J s}^{-1}.$$

Each kilogram of fuel releases $40 \times 10^6$ J, so the fuel is burned at
$$\frac{88\,000}{40 \times 10^6} = 0.0022\ \text{kg s}^{-1} = 2.2\ \text{g s}^{-1}.$$`,
    traps: {
      0: t`Ignores the efficiency: only a quarter of the fuel's energy becomes useful work.`,
      1: t`Ignores the climb: the car also gains 12 000 J of gravitational potential energy every second.`,
      2: t`Ignores the resistive force.`,
      4: t`Divides by the efficiency twice.`,
      5: t`Treats the car as rising vertically at $20\ \text{m s}^{-1}$; it rises only 1 m for every 20 m along the road.`,
    },
    insight: t`For power problems, think "per second": energy gained per second plus work done against resistance per second, then divide by the efficiency.`,
    skills: ['power', 'gravitational potential energy', 'efficiency', 'energy from fuels'],
  },
];
