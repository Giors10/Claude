import type { Question } from '../types';

const t = String.raw;

/**
 * ESAT Crucible predicted paper — Physics.
 * 27 questions, 40 minutes, no calculator. All content is within P1-P7 of
 * the official specification (GCSE-level physics applied in unfamiliar and
 * multi-step ways). Resultant-force calculations are one-dimensional, as
 * the specification requires. g = 10 N/kg throughout.
 */
export const PH: Question[] = [
  {
    id: 'PH-01',
    module: 'PH',
    n: 1,
    topic: 'P1',
    spec: ['P1.2d', 'P1.2l'],
    title: 'Energy stored in a phone battery',
    difficulty: 2,
    time: 75,
    stem: t`A mobile phone battery supplies a steady voltage of 3.7 V. It is labelled "4000 mAh", which means it can supply a current of 4000 mA for one hour.

How much energy can the battery supply when it is fully charged?`,
    options: [t`14.8 J`, t`888 J`, t`14.8 kJ`, t`53.3 kJ`, t`888 kJ`, t`53.3 MJ`],
    answer: 3,
    hints: [t`Find the charge in coulombs first: $Q = It$ with $I$ in amps and $t$ in seconds.`],
    solution: t`**Charge.**
$$Q = It = 4.0\ \text{A} \times 3600\ \text{s} = 14\,400\ \text{C}.$$

**Energy.** From $V = \dfrac{E}{Q}$:
$$E = QV = 14\,400 \times 3.7 = 53\,280\ \text{J} \approx 53.3\ \text{kJ}.$$`,
    traps: {
      0: t`Multiplies 3.7 V by 4 A but leaves out the time.`,
      1: t`Converts one hour into 60 s instead of 3600 s.`,
      2: t`Treats 4000 mA as 4000 A and leaves out the time.`,
      4: t`Treats 4000 mA as 4000 A and uses minutes instead of seconds.`,
      5: t`Forgets to convert mA to A.`,
    },
    insight: t`"mAh" is a unit of charge: $1\ \text{mAh} = 10^{-3}\ \text{A} \times 3600\ \text{s} = 3.6\ \text{C}$. Energy is charge times voltage.`,
    skills: ['charge', 'energy', 'unit conversion'],
  },
  {
    id: 'PH-02',
    module: 'PH',
    n: 2,
    topic: 'P7',
    spec: ['P7.2e', 'P7.2f'],
    title: 'The uranium-238 decay series',
    difficulty: 2,
    time: 80,
    stem: t`Uranium-238, $^{238}_{\phantom{0}92}\mathrm{U}$, decays through a series of alpha and beta-minus decays to the stable isotope lead-206, $^{206}_{\phantom{0}82}\mathrm{Pb}$.

How many alpha decays and how many beta-minus decays are there in the series?`,
    options: [
      t`6 alpha and 8 beta-minus`,
      t`8 alpha and 6 beta-minus`,
      t`8 alpha and 10 beta-minus`,
      t`10 alpha and 6 beta-minus`,
      t`10 alpha and 8 beta-minus`,
      t`32 alpha and 10 beta-minus`,
    ],
    answer: 1,
    hints: [t`Only alpha decay changes the mass number, so start with the mass numbers.`],
    solution: t`**Alpha decays.** Only alpha decay changes the mass number, and each one reduces it by 4. The mass number falls by $238 - 206 = 32$, so there are $32 \div 4 = 8$ alpha decays.

**Beta-minus decays.** The 8 alpha decays reduce the proton number by $8 \times 2 = 16$, from 92 to 76. The final proton number is 82, so it must rise by 6. Each beta-minus decay raises the proton number by 1, so there are **6** beta-minus decays.`,
    traps: {
      2: t`Uses $92 - 82 = 10$ directly, forgetting that the alpha decays also reduce the proton number.`,
      0: t`Swaps the two numbers.`,
      5: t`Forgets that each alpha particle carries away 4 nucleons, not 1.`,
    },
    insight: t`Balance the mass number first (only alpha changes it), then the proton number.`,
    skills: ['nuclear equations', 'alpha decay', 'beta decay'],
  },
  {
    id: 'PH-03',
    module: 'PH',
    n: 3,
    topic: 'P6',
    spec: ['P6.1h', 'P6.2c', 'P6.3e'],
    title: 'Water waves entering shallow water',
    difficulty: 2,
    time: 90,
    stem: t`Water waves travel from deep water into shallow water, where they travel more slowly. In the deep water the waves have a speed of $0.60\ \text{m s}^{-1}$ and a wavelength of 3.0 cm. In the shallow water their wavelength is 2.0 cm.`,
    statements: [
      t`The frequency of the waves in the shallow water is 20 Hz.`,
      t`The speed of the waves in the shallow water is $0.40\ \text{m s}^{-1}$.`,
      t`If the waves meet the boundary at an angle, they bend away from the normal as they enter the shallow water.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: [
      t`1 only`,
      t`2 only`,
      t`3 only`,
      t`1 and 2 only`,
      t`1 and 3 only`,
      t`2 and 3 only`,
      t`1, 2 and 3`,
      t`none of them`,
    ],
    answer: 3,
    hints: [t`Which quantity never changes when a wave crosses a boundary?`],
    solution: t`**Statement 1.** The frequency is set by the source and does not change at the boundary:
$$f = \frac{v}{\lambda} = \frac{0.60}{0.030} = 20\ \text{Hz}. \quad ✓$$

**Statement 2.** In the shallow water, $v = f\lambda = 20 \times 0.020 = 0.40\ \text{m s}^{-1}$. ✓

**Statement 3.** The waves slow down, so they bend **towards** the normal, not away from it. ✗`,
    traps: {
      6: t`Statement 3 is wrong: waves that slow down bend towards the normal.`,
      4: t`Statement 2 is correct and statement 3 is not.`,
    },
    insight: t`At a boundary the frequency stays fixed; speed and wavelength change in proportion. Slower means bending towards the normal.`,
    skills: ['wave equation', 'refraction'],
  },
  {
    id: 'PH-04',
    module: 'PH',
    n: 4,
    topic: 'P5',
    spec: ['P5.5b', 'P5.4a'],
    title: 'Oil and water in a U-tube',
    difficulty: 2,
    time: 90,
    stem: t`A U-tube contains water. Oil, which does not mix with water, is poured into the left-hand arm until the oil column is 12.0 cm long. The water surface in the right-hand arm is then 9.6 cm above the level of the oil–water boundary, as shown.`,
    diagram: 'ph-utube',
    diagramAlt: 'A U-tube with water in the bottom. The left arm has a 12.0 cm column of oil on top of the water. In the right arm the water surface is 9.6 cm above the level of the oil–water boundary.',
    prompt: t`The density of water is $1000\ \text{kg m}^{-3}$. What is the density of the oil?`,
    options: [
      t`$800\ \text{kg m}^{-3}$`,
      t`$960\ \text{kg m}^{-3}$`,
      t`$1000\ \text{kg m}^{-3}$`,
      t`$1200\ \text{kg m}^{-3}$`,
      t`$1250\ \text{kg m}^{-3}$`,
      t`$1440\ \text{kg m}^{-3}$`,
    ],
    answer: 0,
    hints: [t`Points at the same level in the same continuous liquid are at the same pressure. Use the level of the oil–water boundary.`],
    solution: t`Take the horizontal level through the oil–water boundary. Below this level both arms contain water, so the pressure there is the same in both arms.

Above that level, the left arm has 12.0 cm of oil and the right arm has 9.6 cm of water. Both are open to the atmosphere, so
$$\rho_{\text{oil}}\,g\,(0.120) = \rho_{\text{water}}\,g\,(0.096),$$
$$\rho_{\text{oil}} = 1000 \times \frac{9.6}{12.0} = 800\ \text{kg m}^{-3}.$$`,
    traps: {
      4: t`Inverts the ratio: the oil column is longer, so the oil must be less dense than water.`,
      2: t`Unequal column heights mean the densities cannot be equal.`,
    },
    insight: t`Hydrostatic pressure $\rho g h$: for equal pressures, height is inversely proportional to density.`,
    skills: ['hydrostatic pressure', 'density'],
  },
  {
    id: 'PH-05',
    module: 'PH',
    n: 5,
    topic: 'P4',
    spec: ['P4.1b', 'P4.3b', 'P4.3c'],
    title: 'Black and silver cans',
    difficulty: 2,
    time: 90,
    stem: t`Two identical metal cans are painted, one matt black and the other shiny silver.`,
    statements: [
      t`If the walls of the cans were made thicker (from the same metal), energy would be conducted through them faster.`,
      t`If both cans are filled with water at 80 °C and left in a cool room, the water in the black can initially cools faster.`,
      t`If both cans are filled with water at 10 °C and placed the same distance from a radiant heater, the water in the black can initially warms faster.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: [
      t`1 only`,
      t`2 only`,
      t`3 only`,
      t`1 and 2 only`,
      t`1 and 3 only`,
      t`2 and 3 only`,
      t`1, 2 and 3`,
      t`none of them`,
    ],
    answer: 5,
    hints: [t`A good emitter of infrared is also a good absorber.`],
    solution: t`**Statement 1.** The rate of conduction through a wall *decreases* as the wall gets thicker, because the same temperature difference is spread over a greater distance. ✗

**Statement 2.** Matt black surfaces are better emitters of infrared radiation than shiny silver ones, so the black can loses energy faster. ✓

**Statement 3.** Matt black surfaces are also better absorbers of infrared radiation, so the black can gains energy faster. ✓

Statements 2 and 3 only.`,
    traps: {
      6: t`Statement 1 is wrong: thicker walls conduct energy more slowly.`,
      1: t`Statement 3 is also correct: good emitters are good absorbers.`,
    },
    insight: t`Matt black: best emitter and best absorber. Shiny silver: worst at both (best reflector). A thicker wall of the same material conducts energy more slowly.`,
    skills: ['thermal radiation', 'conduction'],
  },
  {
    id: 'PH-06',
    module: 'PH',
    n: 6,
    topic: 'P1',
    spec: ['P1.2h', 'P1.2i', 'P1.2f'],
    title: 'A warming thermistor in a potential divider',
    difficulty: 3,
    time: 100,
    stem: t`An NTC thermistor and a fixed resistor of resistance 2.0 kΩ are connected in series to a 9.0 V supply. A voltmeter connected across the fixed resistor reads 6.0 V.

The temperature of the thermistor then increases so that its resistance halves.`,
    diagram: 'ph-thermistor',
    diagramAlt: 'A 9.0 V supply in series with a thermistor and a 2.0 kilohm resistor. A voltmeter is connected across the resistor.',
    prompt: t`What is the new reading on the voltmeter? (The voltmeter draws no current.)`,
    options: [t`3.0 V`, t`3.6 V`, t`4.5 V`, t`6.0 V`, t`7.2 V`, t`7.5 V`],
    answer: 4,
    hints: [
      t`In series, the voltage divides in the ratio of the resistances. Use the first reading to find the thermistor's resistance.`,
    ],
    solution: t`**Initially.** The thermistor has $9.0 - 6.0 = 3.0$ V across it. The current is the same through both components, so the voltages are in the ratio of the resistances:
$$R_T = 2.0\ \text{k}\Omega \times \frac{3.0}{6.0} = 1.0\ \text{k}\Omega.$$

**After heating.** $R_T = 0.50\ \text{k}\Omega$ and the total resistance is $2.5\ \text{k}\Omega$, so
$$V_R = 9.0 \times \frac{2.0}{2.5} = 7.2\ \text{V}.$$`,
    traps: {
      5: t`Halves the thermistor's voltage instead of its resistance. The voltage does not scale in the same way, because the current changes too.`,
      3: t`Assumes the reading does not change.`,
      0: t`This is the thermistor's original voltage.`,
    },
    insight: t`In a potential divider, $V_1 : V_2 = R_1 : R_2$. Find unknown resistances from voltage ratios; the current is not needed.`,
    skills: ['potential divider', 'thermistor', 'series circuits'],
  },
  {
    id: 'PH-07',
    module: 'PH',
    n: 7,
    topic: 'P3',
    spec: ['P3.1h', 'P3.1c'],
    title: 'Stopping distance at a higher speed',
    difficulty: 3,
    time: 100,
    stem: t`At a speed of $20\ \text{m s}^{-1}$, a car's braking distance is 25 m. The driver's reaction time is 0.60 s.

Assuming the same braking force, what is the car's total stopping distance (thinking distance plus braking distance) at a speed of $30\ \text{m s}^{-1}$?`,
    options: [t`37.5 m`, t`55.5 m`, t`56.25 m`, t`68.25 m`, t`74.25 m`, t`83.25 m`],
    answer: 4,
    hints: [t`With the same deceleration, $v^2 - u^2 = 2as$ with $v = 0$ shows that the braking distance is proportional to $u^2$.`],
    solution: t`**Thinking distance** (constant speed during the reaction time):
$$30 \times 0.60 = 18\ \text{m}.$$

**Braking distance.** The same braking force gives the same deceleration. From $v^2 - u^2 = 2as$ with $v = 0$, $s \propto u^2$:
$$25 \times \left(\frac{30}{20}\right)^2 = 25 \times 2.25 = 56.25\ \text{m}.$$

**Total:** $18 + 56.25 = 74.25$ m.`,
    traps: {
      0: t`Scales the braking distance in proportion to speed (to 37.5 m) instead of speed squared, and leaves out the thinking distance.`,
      1: t`Adds a braking distance that is only proportional to speed.`,
      2: t`This is the braking distance alone.`,
      3: t`Uses the thinking distance at the old speed (12 m).`,
      5: t`Scales the whole stopping distance by 2.25, but thinking distance is only proportional to speed.`,
    },
    insight: t`Thinking distance $\propto u$; braking distance $\propto u^2$ (same force). Scale them separately.`,
    skills: ['kinematics', 'stopping distance', 'proportionality'],
  },
  {
    id: 'PH-08',
    module: 'PH',
    n: 8,
    topic: 'P2',
    spec: ['P2.3b', 'P2.3d'],
    title: 'Levitating a wire with the motor effect',
    difficulty: 3,
    time: 100,
    stem: t`A straight, horizontal wire of length 0.25 m and mass 20 g lies in an east–west direction. It is in a uniform, horizontal magnetic field of flux density 0.40 T directed due north.

What current in the wire, and in which direction, would make the magnetic force on the wire exactly balance its weight? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [
      t`2.0 A, from west to east`,
      t`2.0 A, from east to west`,
      t`0.50 A, from west to east`,
      t`0.50 A, from east to west`,
      t`20 A, from west to east`,
      t`20 A, from east to west`,
    ],
    answer: 0,
    hints: [
      t`Set $BIL$ equal to the weight, with the mass in kilograms.`,
      t`Fleming's left-hand rule: First finger = Field, seCond finger = Current, thuMb = Motion (force).`,
    ],
    solution: t`**Size.** The weight is $mg = 0.020 \times 10 = 0.20$ N, so the magnetic force must be $0.20$ N upwards:
$$BIL = 0.20 \;\Rightarrow\; I = \frac{0.20}{0.40 \times 0.25} = 2.0\ \text{A}.$$

**Direction.** Using Fleming's left-hand rule, point the first finger north (field) and the thumb upwards (force). The second finger (current) then points **east**, so the current flows from west to east.`,
    traps: {
      1: t`Reverses the current: this would push the wire downwards, adding to its weight.`,
      4: t`Uses a mass of 0.20 kg instead of 0.020 kg.`,
      2: t`Inverts the formula, calculating $\dfrac{BL}{mg}$.`,
    },
    insight: t`$F = BIL$ applies when the wire is perpendicular to the field. Always convert grams to kilograms first.`,
    skills: ['motor effect', 'left-hand rule', 'equilibrium'],
  },
  {
    id: 'PH-09',
    module: 'PH',
    n: 9,
    topic: 'P5',
    spec: ['P5.4a'],
    title: 'Density of a mixture of equal masses',
    difficulty: 3,
    time: 90,
    stem: t`Liquid A has density $0.80\ \text{g cm}^{-3}$ and liquid B has density $1.20\ \text{g cm}^{-3}$. Equal masses of A and B are mixed.

Assuming that the volume of the mixture is the sum of the volumes of A and B, what is the density of the mixture?`,
    options: [
      t`$0.90\ \text{g cm}^{-3}$`,
      t`$0.96\ \text{g cm}^{-3}$`,
      t`$0.98\ \text{g cm}^{-3}$`,
      t`$1.00\ \text{g cm}^{-3}$`,
      t`$1.04\ \text{g cm}^{-3}$`,
      t`$1.20\ \text{g cm}^{-3}$`,
    ],
    answer: 1,
    hints: [t`Pick a convenient mass for each, such as 12 g, and find the two volumes.`],
    solution: t`Take 12 g of each liquid (any mass works; 12 makes the arithmetic easy):
$$V_A = \frac{12}{0.80} = 15\ \text{cm}^3, \qquad V_B = \frac{12}{1.20} = 10\ \text{cm}^3.$$

$$\rho = \frac{24\ \text{g}}{25\ \text{cm}^3} = 0.96\ \text{g cm}^{-3}.$$`,
    traps: {
      3: t`The simple average of the densities is only correct for equal *volumes*. With equal masses there is more of the less dense liquid by volume.`,
    },
    insight: t`Density of a mixture = total mass ÷ total volume. Equal masses give a lower density than equal volumes.`,
    skills: ['density', 'mixtures'],
  },
  {
    id: 'PH-10',
    module: 'PH',
    n: 10,
    topic: 'P3',
    spec: ['P3.4c', 'P3.1e', 'P3.5c'],
    title: 'Weighing yourself in a lift',
    difficulty: 3,
    time: 110,
    stem: t`A person of mass 60 kg stands on a set of bathroom scales in a lift. The graph shows how the velocity of the lift varies with time, taking upwards as positive.`,
    diagram: 'ph-lift',
    diagramAlt: 'Velocity–time graph: velocity rises uniformly from 0 to 3 m/s between 0 and 2 s, stays at 3 m/s until 8 s, then falls uniformly to 0 at 11 s.',
    prompt: t`What are the maximum and minimum readings on the scales during this motion? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [
      t`maximum 690 N, minimum 540 N`,
      t`maximum 690 N, minimum 600 N`,
      t`maximum 600 N, minimum 540 N`,
      t`maximum 690 N, minimum 510 N`,
      t`maximum 750 N, minimum 540 N`,
      t`maximum 780 N, minimum 420 N`,
    ],
    answer: 0,
    hints: [
      t`Find the acceleration in each phase from the gradient of the graph.`,
      t`The scales read the normal contact force $R$, where $R - mg = ma$.`,
    ],
    solution: t`The accelerations are the gradients of the graph:

- 0–2 s: $a = \dfrac{3}{2} = +1.5\ \text{m s}^{-2}$ (upwards);
- 2–8 s: $a = 0$;
- 8–11 s: $a = \dfrac{-3}{3} = -1.0\ \text{m s}^{-2}$.

The scales read the normal force $R$. Newton's second law for the person gives $R - mg = ma$, so $R = m(g + a)$:

- maximum: $60 \times (10 + 1.5) = 690$ N;
- constant velocity: $60 \times 10 = 600$ N;
- minimum: $60 \times (10 - 1.0) = 540$ N.`,
    traps: {
      3: t`Uses $1.5\ \text{m s}^{-2}$ for the deceleration too; that phase lasts 3 s, not 2 s.`,
      1: t`Ignores the deceleration phase.`,
      2: t`Ignores the acceleration phase.`,
    },
    insight: t`Scales measure the normal force, not the weight: $R = m(g + a)$ with upwards positive.`,
    skills: ["Newton's second law", 'velocity–time graphs', 'apparent weight'],
  },
  {
    id: 'PH-11',
    module: 'PH',
    n: 11,
    topic: 'P3',
    spec: ['P3.7a', 'P3.7c', 'P3.7d', 'P3.7f'],
    title: 'Friction on a ramp by energy',
    difficulty: 3,
    time: 100,
    stem: t`A block of mass 2.0 kg is released from rest at the top of a straight ramp that is 5.0 m long and rises 3.0 m vertically. The block reaches the bottom of the ramp with a speed of $6.0\ \text{m s}^{-1}$.

What is the average frictional force acting on the block as it slides down the ramp? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`2.4 N`, t`4.0 N`, t`4.8 N`, t`8.0 N`, t`12 N`, t`24 N`],
    answer: 2,
    hints: [t`Compare the gravitational potential energy lost with the kinetic energy gained. The difference is the work done against friction.`],
    solution: t`- GPE lost: $mgh = 2.0 \times 10 \times 3.0 = 60$ J.
- KE gained: $\tfrac12 mv^2 = \tfrac12 \times 2.0 \times 6.0^2 = 36$ J.

The difference, $60 - 36 = 24$ J, is the work done against friction. Friction acts along the whole 5.0 m length of the ramp, so
$$F = \frac{24\ \text{J}}{5.0\ \text{m}} = 4.8\ \text{N}.$$`,
    traps: {
      3: t`Divides by the vertical height (3.0 m) instead of the distance moved along the ramp.`,
      5: t`This is the work done against friction in joules, not the force.`,
    },
    insight: t`Energy methods avoid resolving forces: work done by friction = (energy lost) and $W = Fd$ along the path.`,
    skills: ['work and energy', 'friction', 'conservation of energy'],
  },
  {
    id: 'PH-12',
    module: 'PH',
    n: 12,
    topic: 'P1',
    spec: ['P1.2i', 'P1.2k', 'P1.2m'],
    title: 'Closing a switch in a parallel branch',
    difficulty: 3,
    time: 110,
    stem: t`In the circuit shown, the battery provides a constant voltage of 12 V. Initially the switch S is open. The switch is then closed.`,
    diagram: 'ph-switch-circuit',
    diagramAlt: 'A 12 V battery in series with a 4 ohm resistor and a parallel section. One branch of the parallel section is a 6 ohm resistor; the other is a 12 ohm resistor in series with an open switch S.',
    prompt: t`Let $P_{\text{open}}$ and $P_{\text{closed}}$ be the power dissipated in the 6 Ω resistor with S open and with S closed. What is the ratio
$$\frac{P_{\text{open}}}{P_{\text{closed}}}\ ?$$`,
    options: [t`$\dfrac{25}{36}$`, t`$\dfrac{5}{6}$`, t`$1$`, t`$\dfrac{6}{5}$`, t`$\dfrac{4}{3}$`, t`$\dfrac{36}{25}$`],
    answer: 5,
    hints: [
      t`With S open, the 12 Ω branch carries no current.`,
      t`With S closed, 6 Ω and 12 Ω in parallel have a combined resistance of 4 Ω.`,
    ],
    solution: t`**S open.** Only the 4 Ω and 6 Ω resistors carry current, in series: $I = \dfrac{12}{10} = 1.2$ A, so the 6 Ω resistor has $1.2 \times 6 = 7.2$ V across it.

**S closed.** The parallel section is $6\ \Omega\ \|\ 12\ \Omega = \dfrac{6 \times 12}{6 + 12} = 4\ \Omega$. The total resistance is 8 Ω, so $I = 1.5$ A and the parallel section has $1.5 \times 4 = 6.0$ V across it.

For a fixed resistor $P = \dfrac{V^2}{R}$, so
$$\frac{P_{\text{open}}}{P_{\text{closed}}} = \left(\frac{7.2}{6.0}\right)^2 = 1.2^2 = 1.44 = \frac{36}{25}.$$

(That is $8.64$ W before and $6.0$ W after.)`,
    traps: {
      3: t`This is the ratio of the voltages; power goes as voltage squared.`,
      0: t`The ratio is inverted: closing S lowers the voltage across the 6 Ω resistor.`,
      2: t`Would be true if the 6 Ω resistor were connected directly across the battery, but the 4 Ω resistor in series takes a bigger share of the voltage once the current rises.`,
    },
    insight: t`Adding a parallel branch lowers the total resistance, raises the total current and increases the voltage "lost" across series resistors.`,
    skills: ['series and parallel circuits', 'power'],
  },
  {
    id: 'PH-13',
    module: 'PH',
    n: 13,
    topic: 'P7',
    spec: ['P7.4a', 'P7.4c'],
    title: 'Half-life and the decay product',
    difficulty: 3,
    time: 90,
    stem: t`A radioactive isotope X decays to a stable isotope Y with a half-life of 8.0 days. A sample initially contains only X.

After how long will the ratio (number of nuclei of Y) : (number of nuclei of X) be $15 : 1$?`,
    options: [t`15 days`, t`16 days`, t`24 days`, t`32 days`, t`40 days`, t`120 days`],
    answer: 3,
    hints: [t`If Y : X = 15 : 1, what fraction of the original X nuclei remain?`],
    solution: t`Every decayed X nucleus becomes a Y nucleus, so a ratio of $15 : 1$ means that $\tfrac{1}{16}$ of the original X remains.

Since $\tfrac{1}{16} = \left(\tfrac12\right)^4$, this takes 4 half-lives:
$$4 \times 8.0 = 32\ \text{days}.$$`,
    traps: {
      5: t`Multiplies the ratio by the half-life.`,
      2: t`After 3 half-lives the ratio is $7 : 1$.`,
      4: t`After 5 half-lives the ratio is $31 : 1$.`,
    },
    insight: t`After $n$ half-lives, the ratio of product to parent is $(2^n - 1) : 1$.`,
    skills: ['half-life', 'radioactive decay'],
  },
  {
    id: 'PH-14',
    module: 'PH',
    n: 14,
    topic: 'P3',
    spec: ['P3.5f', 'P3.4c', 'P3.7f'],
    title: 'A skydiver and two terminal velocities',
    difficulty: 3,
    time: 100,
    stem: t`A skydiver jumps from a stationary balloon, falls until reaching a terminal velocity, then opens their parachute and eventually falls at a new, lower terminal velocity.`,
    statements: [
      t`Immediately after the parachute opens, the skydiver's acceleration is directed upwards.`,
      t`The air resistance on the skydiver at the lower terminal velocity is smaller than it was at the higher terminal velocity.`,
      t`While falling at the lower terminal velocity, the work done against air resistance equals the loss of gravitational potential energy.`,
    ],
    prompt: t`Which of the statements is/are correct?`,
    options: [
      t`1 only`,
      t`2 only`,
      t`3 only`,
      t`1 and 2 only`,
      t`1 and 3 only`,
      t`2 and 3 only`,
      t`1, 2 and 3`,
      t`none of them`,
    ],
    answer: 4,
    hints: [t`What is true of the forces at *any* terminal velocity?`],
    solution: t`**Statement 1.** When the parachute opens, the air resistance suddenly becomes much larger than the weight. The resultant force is upwards, so the skydiver decelerates: the acceleration is directed upwards even though they are still moving down. ✓

**Statement 2.** At any terminal velocity the resultant force is zero, so the air resistance equals the weight. The weight is unchanged, so the air resistance is the same at both terminal velocities. ✗

**Statement 3.** At constant velocity the kinetic energy does not change, so all the gravitational potential energy lost is transferred as work done against air resistance. ✓

Statements 1 and 3 only.`,
    traps: {
      6: t`Statement 2 is wrong: at every terminal velocity the drag equals the weight.`,
      0: t`Statement 3 is also correct, because the kinetic energy is constant.`,
    },
    insight: t`Terminal velocity always means drag = weight. The parachute changes the speed at which that happens, not the size of the drag.`,
    skills: ['terminal velocity', 'forces', 'energy'],
  },
  {
    id: 'PH-15',
    module: 'PH',
    n: 15,
    topic: 'P5',
    spec: ['P5.2b', 'P5.5b'],
    title: 'A bubble rising through a lake',
    difficulty: 3,
    time: 100,
    stem: t`A small air bubble is released at the bottom of a lake that is 30 m deep and rises to the surface. The temperature of the water is the same at all depths, and the mass of air in the bubble stays constant.

Atmospheric pressure is 100 kPa, the density of the water is $1000\ \text{kg m}^{-3}$ and $g = 10\ \text{N kg}^{-1}$.

What is the ratio (volume of the bubble at the surface) : (volume of the bubble at the bottom)?`,
    options: [t`$1 : 4$`, t`$3 : 1$`, t`$4 : 1$`, t`$10 : 1$`, t`$30 : 1$`, t`$31 : 1$`],
    answer: 2,
    hints: [t`The pressure at the bottom includes the atmosphere pressing on the lake's surface.`],
    solution: t`The pressure at the bottom is atmospheric pressure plus the pressure of the water:
$$\begin{aligned} p &= 100\ \text{kPa} + \rho g h \\ &= 100\ \text{kPa} + (1000 \times 10 \times 30)\ \text{Pa} \\ &= 100\ \text{kPa} + 300\ \text{kPa} = 400\ \text{kPa}. \end{aligned}$$

At constant temperature $pV$ is constant, so
$$\frac{V_{\text{surface}}}{V_{\text{bottom}}} = \frac{p_{\text{bottom}}}{p_{\text{surface}}} = \frac{400}{100} = 4.$$`,
    traps: {
      1: t`Uses only the water's pressure, forgetting that the atmosphere also pushes down on the lake.`,
      0: t`The ratio is inverted: the bubble expands as the pressure falls.`,
      4: t`Leaves out the atmosphere and also slips a factor of 10, taking $\rho g h$ as 3000 kPa instead of 300 kPa.`,
      5: t`Includes the atmosphere but takes $\rho g h$ as 3000 kPa: $1000 \times 10 \times 30$ Pa is 300 kPa, not 3000 kPa.`,
    },
    insight: t`Pressure at depth = atmospheric + $\rho g h$. Every 10 m of water adds roughly one atmosphere.`,
    skills: ["Boyle's law", 'hydrostatic pressure'],
  },
  {
    id: 'PH-16',
    module: 'PH',
    n: 16,
    topic: 'P2',
    spec: ['P2.5b', 'P2.5c', 'P2.5d'],
    title: 'Why power is transmitted at high voltage',
    difficulty: 3,
    time: 100,
    stem: t`A power station generates 200 kW of electrical power at a voltage of 400 V. An ideal transformer with a turns ratio (primary : secondary) of $1 : 50$ steps up the voltage before the power is transmitted through cables with a total resistance of 8.0 Ω.

What percentage of the generated power is wasted as heat in the cables?`,
    options: [t`0.04%`, t`0.4%`, t`0.8%`, t`4%`, t`40%`, t`80%`],
    answer: 1,
    hints: [
      t`An ideal transformer transfers all the power: $V_pI_p = V_sI_s$.`,
      t`Power lost in the cables is $I^2R$.`,
    ],
    solution: t`The secondary voltage is $V_s = 400 \times 50 = 20\,000$ V. An ideal transformer transfers all the power, so the current in the cables is
$$I = \frac{P}{V} = \frac{200\,000}{20\,000} = 10\ \text{A}.$$

The power lost in the cables is
$$I^2R = 10^2 \times 8.0 = 800\ \text{W},$$
which is $\dfrac{800}{200\,000} = 0.004 = 0.4\%$ of the power generated.

(Without the transformer the current would be 500 A and the loss would be 2 MW, more than the station generates. That is why power is transmitted at high voltage.)`,
    traps: {
      2: t`Doubles the resistance for "two cables"; the 8.0 Ω is already the total.`,
      0: t`A slip of a factor of 10 in the percentage.`,
    },
    insight: t`For a fixed power, stepping the voltage up by $k$ divides the current by $k$ and the $I^2R$ loss by $k^2$.`,
    skills: ['transformers', 'power transmission'],
  },
  {
    id: 'PH-17',
    module: 'PH',
    n: 17,
    topic: 'P3',
    spec: ['P3.4c', 'P3.2d'],
    title: 'Tension in a train coupling',
    difficulty: 3,
    time: 110,
    stem: t`A locomotive of mass 40 tonnes pulls two wagons, each of mass 30 tonnes, along a straight, level track. A resistive force of 2.0 kN acts on each of the three vehicles. The driving force from the locomotive is 56 kN.

What is the tension in the coupling between the locomotive and the first wagon? (1 tonne = 1000 kg)`,
    options: [t`17 kN`, t`28 kN`, t`30 kN`, t`32 kN`, t`34 kN`, t`56 kN`],
    answer: 4,
    hints: [
      t`Find the acceleration from the whole train first.`,
      t`Then apply $F = ma$ to the two wagons together: the only forward force on them is the tension.`,
    ],
    solution: t`**Whole train.** The resultant force is $56 - 3 \times 2.0 = 50$ kN and the total mass is $100$ t $= 1.0 \times 10^5$ kg, so
$$a = \frac{50\,000}{100\,000} = 0.50\ \text{m s}^{-2}.$$

**The two wagons together** (mass $6.0 \times 10^4$ kg) are pulled forwards by the tension $T$ and held back by $2 \times 2.0 = 4.0$ kN:
$$T - 4.0\ \text{kN} = 6.0 \times 10^4 \times 0.50 = 30\ \text{kN} \;\Rightarrow\; T = 34\ \text{kN}.$$`,
    traps: {
      0: t`This is the tension in the coupling between the two wagons.`,
      2: t`Forgets the resistive forces acting on the wagons.`,
      3: t`Includes the resistive force on only one wagon.`,
    },
    insight: t`For connected bodies, find $a$ from the whole system, then isolate the part beyond the coupling you care about.`,
    skills: ["Newton's second law", 'connected bodies', 'tension'],
  },
  {
    id: 'PH-18',
    module: 'PH',
    n: 18,
    topic: 'P3',
    spec: ['P3.7c', 'P3.7d', 'P3.7e', 'P3.7h'],
    title: 'Power needed by a pump',
    difficulty: 3,
    time: 110,
    stem: t`An electric pump raises water from the bottom of a well 20 m deep and ejects it at the surface through a nozzle at a speed of $10\ \text{m s}^{-1}$. The pump moves 30 kg of water every minute and has an efficiency of 50%.

What is the electrical input power to the pump? ($g = 10\ \text{N kg}^{-1}$)`,
    options: [t`100 W`, t`125 W`, t`200 W`, t`250 W`, t`500 W`, t`7500 W`],
    answer: 3,
    hints: [t`Work per second: each second, 0.50 kg of water gains both gravitational potential energy and kinetic energy.`],
    solution: t`The pump moves $30$ kg per minute $= 0.50$ kg per second. Each second, that water gains:

- GPE: $0.50 \times 10 \times 20 = 100$ J;
- KE: $\tfrac12 \times 0.50 \times 10^2 = 25$ J.

The useful output power is therefore $125$ W. With an efficiency of 50%,
$$P_{\text{in}} = \frac{125}{0.50} = 250\ \text{W}.$$`,
    traps: {
      1: t`This is the useful output power; the efficiency has not been applied.`,
      2: t`Forgets the kinetic energy given to the water.`,
      0: t`Includes only the GPE and ignores the efficiency.`,
      5: t`Treats 30 kg per minute as 30 kg per second (and ignores the efficiency).`,
    },
    insight: t`Power = energy per second. Convert flow rates to kg per second, include every form of energy the output gains, then divide by the efficiency.`,
    skills: ['power', 'efficiency', 'energy'],
  },
  {
    id: 'PH-19',
    module: 'PH',
    n: 19,
    topic: 'P3',
    spec: ['P3.1d', 'P3.1f', 'P3.5d'],
    title: 'Two balls meeting in mid-air',
    difficulty: 3,
    time: 100,
    stem: t`Ball A is dropped from rest from the top of a tower 40 m high. At the same instant, ball B is thrown vertically upwards from the ground directly below A, with a speed of $20\ \text{m s}^{-1}$. Air resistance is negligible.

At what height above the ground do the balls meet? ($g = 10\ \text{m s}^{-2}$)`,
    options: [t`10 m`, t`15 m`, t`20 m`, t`25 m`, t`30 m`, t`The balls never meet.`],
    answer: 2,
    hints: [t`Both balls have the same acceleration. How fast does the gap between them close?`],
    solution: t`Both balls accelerate downwards at $g$, so relative to each other there is no acceleration: the 40 m gap closes at a steady $20\ \text{m s}^{-1}$. They meet after
$$t = \frac{40}{20} = 2.0\ \text{s}.$$

In 2.0 s ball A falls $\tfrac12gt^2 = \tfrac12 \times 10 \times 2.0^2 = 20$ m, so the balls meet $40 - 20 = 20$ m above the ground.

**Check.** Ball B's velocity is $20 - 10 \times 2.0 = 0$ at that moment: it is exactly at the top of its flight, which is $\tfrac12 \times 20 \times 2.0 = 20$ m up ✓`,
    traps: {
      5: t`Ball B reaches its maximum height of 20 m at exactly $t = 2.0$ s, which is when A arrives, so they do meet.`,
    },
    insight: t`Objects with the same acceleration have constant relative velocity: work in the "falling frame" and the gravity cancels.`,
    skills: ['kinematics', 'relative motion', 'free fall'],
  },
  {
    id: 'PH-20',
    module: 'PH',
    n: 20,
    topic: 'P3',
    spec: ['P3.6c', 'P3.7d'],
    title: 'Force on a rebounding ball',
    difficulty: 3,
    time: 110,
    stem: t`A ball of mass 0.25 kg travelling horizontally at $10\ \text{m s}^{-1}$ hits a vertical wall and rebounds along its original path. It loses 64% of its kinetic energy in the collision. The ball is in contact with the wall for 0.050 s.

What is the magnitude of the average force exerted on the ball by the wall?`,
    options: [t`20 N`, t`50 N`, t`68 N`, t`80 N`, t`90 N`, t`100 N`],
    answer: 3,
    hints: [
      t`Kinetic energy is proportional to $v^2$. If 36% of the KE remains, what fraction of the speed remains?`,
      t`Velocity is a vector: the change from $+10$ to $-6$ is not 4.`,
    ],
    solution: t`**Rebound speed.** 36% of the kinetic energy remains, and KE $\propto v^2$, so the speed is multiplied by $\sqrt{0.36} = 0.6$. The rebound speed is $6.0\ \text{m s}^{-1}$.

**Change in momentum.** The velocity changes from $+10$ to $-6.0\ \text{m s}^{-1}$:
$$\Delta p = 0.25 \times (10 + 6.0) = 4.0\ \text{kg m s}^{-1}.$$

**Force** (rate of change of momentum):
$$F = \frac{\Delta p}{\Delta t} = \frac{4.0}{0.050} = 80\ \text{N}.$$`,
    traps: {
      0: t`Subtracts the speeds, ignoring the reversal of direction.`,
      2: t`Takes the rebound speed as 36% of 10, not $\sqrt{0.36} \times 10$.`,
      4: t`Treats 64% as the fraction of KE kept (speed 8.0).`,
      5: t`Ignores the energy loss (rebound at 10).`,
      1: t`Assumes the ball stops dead.`,
    },
    insight: t`Momentum change on rebound adds the speeds. Convert KE fractions to speed fractions with a square root.`,
    skills: ['momentum', 'impulse', 'kinetic energy'],
  },
  {
    id: 'PH-21',
    module: 'PH',
    n: 21,
    topic: 'P3',
    spec: ['P3.3c', 'P3.3d'],
    title: 'Energy stored in springs in series and parallel',
    difficulty: 3,
    time: 110,
    stem: t`Two identical springs each have a spring constant of $200\ \text{N m}^{-1}$. A 4.0 kg mass hangs at rest from the springs, first with the springs connected in series (one below the other) and then with the springs connected in parallel (side by side, sharing the load equally), as shown.`,
    diagram: 'ph-springs',
    diagramAlt: 'Left: two springs joined end to end hanging from a support with a 4.0 kg mass at the bottom. Right: two springs side by side from the support, joined to a bar carrying the 4.0 kg mass.',
    prompt: t`Let $E_{\text{series}}$ and $E_{\text{parallel}}$ be the total elastic potential energy stored in the two springs in each arrangement. What is the ratio
$$\frac{E_{\text{series}}}{E_{\text{parallel}}}\ ?$$
($g = 10\ \text{N kg}^{-1}$; the springs obey Hooke's law and have negligible mass.)`,
    options: [t`$\dfrac14$`, t`$\dfrac12$`, t`$1$`, t`$2$`, t`$4$`, t`$8$`],
    answer: 4,
    hints: [t`In series each spring carries the whole weight; in parallel each carries half.`],
    solution: t`The weight is $mg = 40$ N.

**Series.** Each spring carries the full 40 N, so each extends $x = \dfrac{40}{200} = 0.20$ m:
$$E = 2 \times \tfrac12 \times 200 \times 0.20^2 = 8.0\ \text{J}.$$

**Parallel.** Each spring carries 20 N and extends 0.10 m:
$$E = 2 \times \tfrac12 \times 200 \times 0.10^2 = 2.0\ \text{J}.$$

The ratio is $\dfrac{8.0}{2.0} = 4$.`,
    traps: {
      2: t`Assumes the stored energy depends only on the load. It also depends on how far the springs stretch.`,
      0: t`The ratio is inverted: the series arrangement stretches more and stores more energy.`,
    },
    insight: t`Springs in series: each carries the full load (softer system). In parallel: they share it (stiffer). $E = \tfrac12 Fx = \tfrac12kx^2$.`,
    skills: ["Hooke's law", 'elastic potential energy'],
  },
  {
    id: 'PH-22',
    module: 'PH',
    n: 22,
    topic: 'P6',
    spec: ['P6.4e', 'P6.1g'],
    title: 'A moving bat and its echo',
    difficulty: 3,
    time: 110,
    stem: t`A bat flies directly towards a wall at a constant speed of $10\ \text{m s}^{-1}$. It emits a short pulse of sound and hears the echo 0.50 s later. The speed of sound in air is $340\ \text{m s}^{-1}$.

How far from the wall was the bat when it emitted the pulse?`,
    options: [t`82.5 m`, t`85.0 m`, t`87.5 m`, t`90.0 m`, t`170 m`, t`175 m`],
    answer: 2,
    hints: [t`During the 0.50 s the bat also moves 5.0 m closer. The sound goes to the wall and comes back to meet the bat where it now is.`],
    solution: t`In 0.50 s the sound travels $340 \times 0.50 = 170$ m and the bat travels $10 \times 0.50 = 5.0$ m.

If the bat starts a distance $d$ from the wall, the sound travels $d$ to the wall and then $d - 5.0$ back to meet the bat:
$$2d - 5.0 = 170 \;\Rightarrow\; d = 87.5\ \text{m}.$$`,
    traps: {
      1: t`Ignores the bat's motion.`,
      0: t`Subtracts the bat's 5.0 m instead of adding it.`,
      4: t`Forgets that the sound travels to the wall and back.`,
    },
    insight: t`Echo problems with a moving source: draw a distance line and add up what each thing travels in the same time.`,
    skills: ['echoes', 'speed', 'relative motion'],
  },
  {
    id: 'PH-23',
    module: 'PH',
    n: 23,
    topic: 'P5',
    spec: ['P5.3c', 'P4.4b', 'P3.7e'],
    title: 'From ice to warm water',
    difficulty: 3,
    time: 120,
    stem: t`A 2.0 kW heater is used to turn 0.50 kg of ice at $-20\,^\circ\text{C}$ into water at $40\,^\circ\text{C}$. All the energy from the heater is transferred to the ice and the water.

- specific heat capacity of ice $= 2000\ \text{J kg}^{-1}\,^\circ\text{C}^{-1}$
- specific heat capacity of water $= 4200\ \text{J kg}^{-1}\,^\circ\text{C}^{-1}$
- specific latent heat of fusion of ice $= 3.4 \times 10^5\ \text{J kg}^{-1}$

How long does this take?`,
    options: [t`52 s`, t`85 s`, t`95 s`, t`127 s`, t`135 s`, t`137 s`],
    answer: 5,
    hints: [t`There are three stages: warm the ice to 0 °C, melt it, then warm the water.`],
    solution: t`There are three stages:

1. Warm the ice from $-20$ °C to 0 °C: $0.50 \times 2000 \times 20 = 20\,000$ J.
2. Melt the ice at 0 °C: $0.50 \times 3.4 \times 10^5 = 170\,000$ J.
3. Warm the water from 0 °C to 40 °C: $0.50 \times 4200 \times 40 = 84\,000$ J.

The total is $274\,000$ J, so
$$t = \frac{E}{P} = \frac{274\,000}{2000} = 137\ \text{s}.$$`,
    traps: {
      3: t`Forgets to warm the ice up to 0 °C first.`,
      1: t`Includes only the latent heat.`,
      0: t`Forgets the latent heat, which is by far the largest term.`,
      4: t`Uses $4000$ instead of the given $4200$ for water.`,
    },
    insight: t`Heating through a change of state: sum $mc\Delta\theta$ for each phase plus $mL$ for each change of state.`,
    skills: ['specific heat capacity', 'latent heat', 'power'],
  },
  {
    id: 'PH-24',
    module: 'PH',
    n: 24,
    topic: 'P1',
    spec: ['P1.2e', 'P1.2i', 'P1.2k'],
    title: 'A voltmeter that is not ideal',
    difficulty: 4,
    time: 100,
    stem: t`Two resistors, each of resistance 10 kΩ, are connected in series to a 12 V supply. A voltmeter with a resistance of 10 kΩ is connected across one of the resistors.`,
    diagram: 'ph-voltmeter',
    diagramAlt: 'A 12 V supply in series with two 10 kilohm resistors. A voltmeter of resistance 10 kilohms is connected across the second resistor.',
    prompt: t`What is the reading on the voltmeter?`,
    options: [t`3.0 V`, t`4.0 V`, t`4.5 V`, t`6.0 V`, t`8.0 V`, t`12 V`],
    answer: 1,
    hints: [t`The voltmeter is a 10 kΩ resistor in parallel with the resistor it measures.`],
    solution: t`The voltmeter carries current, so it acts as a 10 kΩ resistor in parallel with the resistor it measures:
$$10\ \text{k}\Omega\ \|\ 10\ \text{k}\Omega = 5.0\ \text{k}\Omega.$$

The circuit is now 10 kΩ in series with 5.0 kΩ, so the voltage divides in the ratio $2 : 1$. The voltmeter reads
$$12 \times \frac{5.0}{15} = 4.0\ \text{V}.$$`,
    traps: {
      3: t`Assumes an ideal voltmeter (infinite resistance). Connecting this meter changes the circuit it measures.`,
      4: t`This is the voltage across the other resistor.`,
    },
    insight: t`A voltmeter should have a resistance much larger than the component it measures; otherwise it lowers the voltage it reads.`,
    skills: ['voltmeters', 'parallel circuits', 'potential divider'],
  },
  {
    id: 'PH-25',
    module: 'PH',
    n: 25,
    topic: 'P1',
    spec: ['P1.2g', 'P1.2i'],
    title: 'A lamp and a resistor sharing the voltage equally',
    difficulty: 4,
    time: 110,
    stem: t`The graph shows how the current varies with the potential difference for a filament lamp and for a fixed resistor.

The lamp and the resistor are connected in series with a variable d.c. supply. The supply voltage is adjusted until the potential difference across the lamp is equal to the potential difference across the resistor.`,
    diagram: 'ph-iv-graph',
    diagramAlt: 'Current against potential difference from 0 to 10 V. The resistor is a straight line through the origin reaching 0.40 A at 8.0 V. The lamp is a curve that starts steeper, passes through 0.20 A at 2.0 V and meets the resistor line at 8.0 V, 0.40 A.',
    prompt: t`What is the supply voltage?`,
    options: [t`4.0 V`, t`6.0 V`, t`8.0 V`, t`10 V`, t`12 V`, t`16 V`],
    answer: 5,
    hints: [
      t`In series, the current is the same in both components.`,
      t`Same current and the same voltage: where on the graph can that happen?`,
    ],
    solution: t`In series the current is the same in both components. If their voltages are also equal, they must have the same current *and* the same voltage, which only happens where their I–V graphs cross: at 8.0 V and 0.40 A.

So each component has 8.0 V across it, and the supply voltage is $8.0 + 8.0 = 16$ V.`,
    traps: {
      2: t`This is the voltage across one component, not the supply.`,
      1: t`At 0.20 A the voltages are 2.0 V and 4.0 V (6.0 V in total), but they are not equal.`,
    },
    insight: t`For series components, read the graph at a common current; for parallel components, read it at a common voltage.`,
    skills: ['I–V characteristics', 'series circuits', 'graph reading'],
  },
  {
    id: 'PH-26',
    module: 'PH',
    n: 26,
    topic: 'P3',
    spec: ['P3.6b', 'P3.7d'],
    title: 'Sharing the energy of an explosion',
    difficulty: 4,
    time: 120,
    stem: t`An object of mass 5.0 kg is at rest. It explodes into two pieces of masses 2.0 kg and 3.0 kg, which move off in opposite directions. The explosion gives the pieces a total kinetic energy of 60 J.

What is the speed of the 2.0 kg piece?`,
    options: [
      t`$3.0\ \text{m s}^{-1}$`,
      t`$4.0\ \text{m s}^{-1}$`,
      t`$6.0\ \text{m s}^{-1}$`,
      t`$7.7\ \text{m s}^{-1}$`,
      t`$12\ \text{m s}^{-1}$`,
      t`$36\ \text{m s}^{-1}$`,
    ],
    answer: 2,
    hints: [
      t`Momentum is conserved: the total momentum is zero before and after.`,
      t`Write the 3.0 kg piece's speed in terms of the 2.0 kg piece's speed, then use the total KE.`,
    ],
    solution: t`**Momentum.** The total momentum is zero before and after, so $2.0v_1 = 3.0v_2$, giving $v_2 = \tfrac23v_1$.

**Energy.**
$$\tfrac12(2.0)v_1^2 + \tfrac12(3.0)\left(\tfrac23v_1\right)^2 = v_1^2 + \tfrac23v_1^2 = \tfrac53v_1^2 = 60.$$

So $v_1^2 = 36$ and $v_1 = 6.0\ \text{m s}^{-1}$ (and $v_2 = 4.0\ \text{m s}^{-1}$).

**Check.** Momenta: $12 = 12$ ✓. Kinetic energies: $36 + 24 = 60$ J ✓`,
    traps: {
      1: t`This is the speed of the 3.0 kg piece.`,
      3: t`Gives all 60 J to the 2.0 kg piece ($v = \sqrt{60}$).`,
      5: t`This is $v^2$, not $v$.`,
    },
    insight: t`In an explosion from rest the pieces have equal and opposite momenta, so the lighter piece takes the larger share of the kinetic energy ($E = p^2/2m$).`,
    skills: ['conservation of momentum', 'kinetic energy'],
  },
  {
    id: 'PH-27',
    module: 'PH',
    n: 27,
    topic: 'P2',
    spec: ['P2.4a', 'P2.4b', 'P2.4c'],
    title: 'A magnet falling through a coil',
    difficulty: 4,
    time: 110,
    stem: t`A bar magnet is dropped vertically, north pole first, through a fixed coil of wire. The coil is connected to a data logger, which records the induced voltage. The magnet speeds up as it falls.

Which graph best shows how the induced voltage varies with time?`,
    options: [
      { diagram: 'ph-emf-a', alt: 'Two pulses of opposite sign; the second pulse is taller and narrower than the first.' },
      { diagram: 'ph-emf-b', alt: 'Two identical pulses of the same sign.' },
      { diagram: 'ph-emf-c', alt: 'Two pulses of opposite sign with equal height and equal width.' },
      { diagram: 'ph-emf-d', alt: 'Two pulses of opposite sign; the second pulse is shorter and wider than the first.' },
      { diagram: 'ph-emf-e', alt: 'Two pulses of the same sign; the second is taller and narrower.' },
      { diagram: 'ph-emf-f', alt: 'A single positive pulse.' },
    ],
    answer: 0,
    hints: [
      t`What happens to the direction of the induced voltage when the magnet leaves the coil compared with when it enters?`,
      t`Is the magnet moving faster or slower as it leaves?`,
    ],
    solution: t`- **Entering.** As the north pole approaches and enters the coil, the magnetic field through the coil increases, inducing a voltage (the first pulse).
- **Leaving.** As the magnet leaves, the field through the coil decreases, so the induced voltage is in the **opposite** direction (the second pulse has the opposite sign).
- **Faster when leaving.** The magnet is moving faster as it leaves, so the field changes more quickly. The second pulse is **larger** and lasts a **shorter** time.

Only graph **A** shows all three features. (In fact the areas of the two pulses are equal, because the field changes by the same total amount on the way in and on the way out.)`,
    traps: {
      2: t`Ignores the fact that the magnet speeds up.`,
      4: t`The induced voltage reverses as the magnet leaves; the two pulses cannot have the same sign.`,
      3: t`The magnet is faster, not slower, when it leaves.`,
    },
    insight: t`Induced voltage depends on the *rate* of change of the magnetic field: faster motion means bigger but briefer pulses; reversing the change reverses the voltage.`,
    skills: ['electromagnetic induction', 'graphs'],
  },
];
